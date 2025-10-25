
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, Settings, Star, Users } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/contexts/AuthContext';
import { RazorpayService } from '@/services/razorpay';
import { toast } from 'sonner';

const SubscriptionCard = () => {
  const { subscription, isProUser, refreshSubscription } = useSubscription();
  const { user } = useAuth();

  const handleUpgradeClick = async () => {
    if (!user?.email) {
      toast.error('Please sign in to upgrade to Pro');
      return;
    }

    await RazorpayService.initializePayment(
      user.email,
      user.user_metadata?.full_name || user.email.split('@')[0]
    );
  };

  const handleManageSubscription = async () => {
    try {
      await RazorpayService.cancelSubscription();
      toast.success('Subscription cancelled successfully');
      refreshSubscription();
    } catch (error: any) {
      toast.error(error.message || 'Failed to manage subscription');
    }
  };

  const freeFeatures = [
    '1 AI roadmap per month',
    'Basic progress tracking',
    'Community support',
    'Access to curated resources'
  ];

  const proFeatures = [
    'Unlimited AI roadmaps',
    'Share roadmaps publicly',
    'Advanced progress analytics',
    'Priority support & live chat',
    'Export to PDF & other formats',
    'Custom learning styles',
    'Advanced AI customization'
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Free Plan */}
      <Card className={`relative group transition-all duration-300 border ${
        !isProUser 
          ? 'bg-slate-800/50 border-purple-500/30 ring-2 ring-purple-500/20 shadow-purple-500/10 shadow-lg backdrop-blur-sm' 
          : 'bg-slate-800/30 border-purple-400/20 hover:border-purple-300/30 backdrop-blur-sm'
      }`}>
        <CardHeader className="text-center pb-4 pt-6">
          {!isProUser && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1">
                Current Plan
              </Badge>
            </div>
          )}
          <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/20 backdrop-blur-sm p-3 mb-4 group-hover:scale-110 transition-transform duration-300 border border-purple-400/30">
            <Star className="w-full h-full text-purple-300" />
          </div>
          <CardTitle className="text-xl font-bold text-white mb-2">Free Plan</CardTitle>
          <div className="flex items-baseline justify-center mb-3">
            <span className="text-3xl font-bold text-white">₹0</span>
            <span className="text-white/80 ml-1 text-base">/month</span>
          </div>
          <CardDescription className="text-white/80 text-sm text-center">
            Perfect for getting started with AI-powered learning
          </CardDescription>
        </CardHeader>        <CardContent className="space-y-4 px-6 pb-6">
          <ul className="space-y-2">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex items-start text-white/90">
                <Check className="w-4 h-4 mr-3 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          {!isProUser && (
            <Button 
              disabled 
              variant="outline" 
              className="w-full bg-slate-700/50 border-purple-400/30 text-white cursor-default backdrop-blur-sm mt-4 py-3"
            >
              <Star className="w-4 h-4 mr-2" />
              Current Plan
            </Button>
          )}
        </CardContent>
      </Card>      {/* Pro Plan */}
      <Card className={`relative group transition-all duration-300 border ${
        isProUser 
          ? 'bg-slate-800/50 border-purple-500/30 ring-2 ring-purple-500/20 shadow-purple-500/20 shadow-xl scale-105 backdrop-blur-sm' 
          : 'bg-slate-800/30 border-purple-400/20 hover:border-purple-300/30 hover:scale-105 backdrop-blur-sm'
      }`}>
        <CardHeader className="text-center pb-4 pt-6">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className={`text-white text-xs font-bold px-3 py-1 ${
              isProUser 
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}>
              {isProUser ? '✨ Active' : '⭐ Most Popular'}
            </Badge>
          </div>
          <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/20 backdrop-blur-sm p-3 mb-4 group-hover:scale-110 transition-transform duration-300 border border-purple-400/30">
            <Crown className="w-full h-full text-purple-300" />
          </div>
          <CardTitle className="text-xl font-bold text-white mb-2 flex items-center justify-center">
            <Crown className="w-5 h-5 mr-2 text-purple-300" />
            Pro Plan
          </CardTitle>
          <div className="flex items-baseline justify-center mb-3">
            <span className="text-3xl font-bold text-white">₹79</span>
            <span className="text-white/80 ml-1 text-base">/month</span>
          </div>
          <CardDescription className="text-white/80 text-sm text-center">
            Unlimited access to all premium features
          </CardDescription>
        </CardHeader>        <CardContent className="space-y-4 px-6 pb-6">
          <ul className="space-y-2">
            {proFeatures.map((feature, index) => (
              <li key={index} className="flex items-start text-white/90">
                <Check className="w-4 h-4 mr-3 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          
          {/* Pro Benefits Highlight */}
          <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-400/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-cyan-300" />
              <span className="text-sm font-medium text-white">Special Benefits</span>
            </div>
            <ul className="text-sm text-white/90 space-y-1">
              <li className="flex items-start">
                <span className="text-cyan-300 mr-2">•</span>
                <span>Browse roadmaps from other users</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-300 mr-2">•</span>
                <span>No monthly limits or restrictions</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-300 mr-2">•</span>
                <span>Early access to new features</span>
              </li>
            </ul>
          </div>          
          {isProUser ? (
            <div className="space-y-3">
              {subscription.subscription_end && (
                <div className="text-center">
                  <p className="text-sm text-white/80">
                    Next billing: {new Date(subscription.subscription_end).toLocaleDateString('en-IN')}
                  </p>
                </div>
              )}              <Button
                variant="outline"
                onClick={handleManageSubscription}
                className="w-full bg-slate-700/50 border-purple-400/30 text-white hover:bg-slate-600/50 backdrop-blur-sm hover:border-purple-300/50 py-3"
              >
                <Settings className="w-4 h-4 mr-2" />
                Cancel Subscription
              </Button>
            </div>
          ) : (            <Button
              onClick={handleUpgradeClick}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-purple-500/30 transition-all duration-200 py-3 border-0 mt-4"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Pro - ₹79/month
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionCard;
