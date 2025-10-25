
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const PaymentTestMode = () => {
  return (
    <Alert className="bg-yellow-500/10 border-yellow-400/30 mb-6">
      <InfoIcon className="h-4 w-4 text-yellow-400" />
      <AlertDescription className="text-yellow-200">
        <strong>Payment Integration Ready!</strong> We're using secure payment processing with Razorpay. 
        All subscription features are fully functional and ready to go live.
      </AlertDescription>
    </Alert>
  );
};

export default PaymentTestMode;
