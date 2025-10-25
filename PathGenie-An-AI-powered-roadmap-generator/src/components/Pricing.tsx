
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Crown, Users, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { RazorpayService } from '@/services/razorpay';
import { toast } from 'sonner';
import AuthModal from './AuthModal';

interface PricingProps {
  onAuthClick?: () => void;
}

const Pricing = ({ onAuthClick }: PricingProps) => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleButtonClick = async (planName: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (planName === "Pro" && user?.email) {
      await RazorpayService.initializePayment(
        user.email,
        user.user_metadata?.full_name || user.email.split('@')[0]
      );
    } else if (planName === "Free") {
      toast.info('You are already on the free plan!');
    }
  };
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for trying out our AI roadmap generator",
      icon: Star,
      features: [
        "1 AI-generated roadmap per month",
        "Basic progress tracking",
        "Community support",
        "Access to curated resources"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "₹79",
      period: "/month",
      description: "Unlock unlimited learning potential",
      icon: Crown,
      features: [
        "Unlimited AI-generated roadmaps",
        "Share your roadmaps publicly",
        "Advanced progress analytics",
        "Priority support & live chat",
        "Export to PDF & other formats"
      ],
      highlights: [
        "Browse roadmaps from other users",
        "No monthly limits or restrictions"
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      popular: true
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-400/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-200 text-sm font-medium">Choose Your Plan</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Simple Pricing
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start free and upgrade to Pro for just ₹79/month
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative group hover:shadow-xl transition-all duration-300 border ${
                  plan.popular 
                    ? 'bg-slate-800/50 border-purple-500/30 ring-2 ring-purple-500/20 scale-105 shadow-purple-500/10 shadow-xl backdrop-blur-sm' 
                    : 'bg-slate-800/30 border-purple-400/20 hover:border-purple-300/30 backdrop-blur-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4 pt-6">
                  <div className={`w-12 h-12 mx-auto rounded-xl bg-purple-500/20 backdrop-blur-sm p-3 mb-4 group-hover:scale-110 transition-transform duration-300 border border-purple-400/30`}>
                    <Icon className="w-full h-full text-purple-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center mb-3">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-white/80 ml-1 text-base">{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className="text-white/80 text-sm text-center">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 px-6 pb-6">
                  <div className="space-y-3">
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-white/90">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.highlights && (
                      <div className="pt-2">
                        <ul className="space-y-2">
                          {plan.highlights.map((highlight, highlightIndex) => (
                            <li key={highlightIndex} className="flex items-start gap-2 text-left">
                              <Users className="w-4 h-4 text-cyan-300 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-white/90">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>                  <Button 
                    variant={plan.buttonVariant}
                    onClick={() => handleButtonClick(plan.name)}
                    className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 mt-4 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/30 border-0' 
                        : 'bg-slate-700/50 hover:bg-slate-600/50 text-white backdrop-blur-sm border-purple-400/30 hover:border-purple-300/50'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Value proposition */}
        <div className="text-center mt-10">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">Why ₹79?</h3>
            <p className="text-white/90 leading-relaxed">
              Quality education should be accessible. At just ₹79/month, 
              our Pro plan costs less than a coffee per week.
            </p>
          </div>        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Pricing;
