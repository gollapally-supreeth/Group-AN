
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionData {
  tier: string;
  subscribed: boolean;
  subscription_end?: string;
}

interface UsageData {
  gemini: number;
  youtube: number;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData>(() => {
    // Initialize from localStorage if available
    const cached = localStorage.getItem('subscription_status');
    return cached ? JSON.parse(cached) : { tier: 'free', subscribed: false };
  });
  const [usage, setUsage] = useState<UsageData>({ gemini: 0, youtube: 0 });
  const [loading, setLoading] = useState(() => {
    // If we have cached data, start with loading false
    const cached = localStorage.getItem('subscription_status');
    return !cached;
  });
  const [lastFetch, setLastFetch] = useState<number>(0);
  const { user } = useAuth();

  const fetchSubscription = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Prevent excessive API calls - only fetch once per minute
    const now = Date.now();
    if (now - lastFetch < 60000 && lastFetch > 0) {
      setLoading(false);
      return;
    }

    try {
      const { data: subscriber } = await supabase
        .from('subscribers')
        .select('subscribed, subscription_tier, subscription_end')
        .eq('user_id', user.id)
        .maybeSingle();

      if (subscriber) {
        const isActive = subscriber.subscribed && 
          (!subscriber.subscription_end || new Date(subscriber.subscription_end) > new Date());
        
        const newSubscription = {
          tier: isActive ? subscriber.subscription_tier : 'free',
          subscribed: isActive,
          subscription_end: subscriber.subscription_end
        };
        
        setSubscription(newSubscription);
        // Cache the subscription status
        localStorage.setItem('subscription_status', JSON.stringify(newSubscription));
      } else {
        const freeSubscription = {
          tier: 'free',
          subscribed: false
        };
        setSubscription(freeSubscription);
        localStorage.setItem('subscription_status', JSON.stringify(freeSubscription));
      }
      
      setLastFetch(now);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      // On error, don't reset - keep current state
    } finally {
      setLoading(false);
    }
  };

  const fetchUsage = async () => {
    if (!user) return;

    try {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthStart = firstDayOfMonth.toISOString().split('T')[0];
      
      const { data: usageData } = await supabase
        .from('api_usage_tracking')
        .select('api_type, request_count')
        .eq('user_id', user.id)
        .gte('date', monthStart);

      const usageMap = { gemini: 0, youtube: 0 };
      usageData?.forEach(item => {
        if (item.api_type === 'gemini') usageMap.gemini += item.request_count;
        if (item.api_type === 'youtube') usageMap.youtube += item.request_count;
      });

      setUsage(usageMap);
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSubscription();
      fetchUsage();
    } else {
      setLoading(false);
      setSubscription({ tier: 'free', subscribed: false });
      localStorage.removeItem('subscription_status');
    }
  }, [user]);

  const refreshSubscription = () => {
    if (user) {
      setLastFetch(0); // Reset cache
      fetchSubscription();
      fetchUsage();
    }
  };

  return {
    subscription,
    usage,
    loading,
    refreshSubscription,
    isProUser: subscription.subscribed && subscription.tier === 'pro'
  };
};
