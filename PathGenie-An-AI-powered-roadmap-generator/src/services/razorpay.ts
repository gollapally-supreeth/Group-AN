
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export class RazorpayService {
  private static async createOrder(userEmail: string, userName?: string) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('Please sign in to continue');
      }

      const response = await supabase.functions.invoke('razorpay-create-checkout', {
        body: {
          userEmail,
          userName,
          amount: 7900, // ₹79 in paise
          currency: 'INR'
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to create order');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  private static async verifyPayment(paymentData: any) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('Authentication required');
      }

      // The webhook will handle the subscription activation
      // We just need to refresh the subscription status
      return { success: true };
    } catch (error: any) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }

  public static async initializePayment(userEmail: string, userName?: string) {
    try {
      // Check if Razorpay SDK is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please refresh the page and try again.');
      }

      // Create order
      const orderData = await this.createOrder(userEmail, userName);
      
      const options: RazorpayOptions = {
        key: orderData.razorpayKeyId,
        amount: 7900, // ₹79 in paise
        currency: 'INR',
        name: 'PathGenie',
        description: 'Pro Subscription - Unlimited AI Roadmaps',
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            await this.verifyPayment(response);
            
            // Show success message
            toast.success('🎉 Payment successful! Activating your Pro subscription...');
            
            // Redirect to success page
            setTimeout(() => {
              window.location.href = '/pricing?payment=completed';
            }, 2000);
            
          } catch (error: any) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: userName || '',
          email: userEmail,
        },
        theme: {
          color: '#8B5CF6' // Purple theme matching the app
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled. You can try again anytime.');
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

    } catch (error: any) {
      console.error('Payment initialization error:', error);
      toast.error(error.message || 'Failed to initialize payment. Please try again.');
    }
  }

  public static async checkSubscriptionStatus() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        return null;
      }

      const response = await supabase.functions.invoke('razorpay-check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Error checking subscription:', error);
      return null;
    }
  }

  public static async cancelSubscription() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('Authentication required');
      }

      // Since we're using one-time payments, cancellation means setting subscription to inactive
      const response = await supabase.functions.invoke('razorpay-subscription-manager', {
        body: { action: 'cancel' },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to cancel subscription');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  }
}
