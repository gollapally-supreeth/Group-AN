
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { RazorpayService } from '@/services/razorpay';
import { toast } from 'sonner';

interface SubscriptionButtonProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ 
  variant = 'default', 
  size = 'default',
  className = ''
}) => {
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
  return (
    <Button
      disabled={!user}
      onClick={handleUpgradeClick}
      variant={variant}
      size={size}
      className={`${className} ${
        variant === 'default' 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200' 
          : ''
      }`}
    >
      <Crown className="w-4 h-4 mr-2" />
      Upgrade to Pro
    </Button>
  );
};

export default SubscriptionButton;
