
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubscriptionCard from '@/components/SubscriptionCard';
import { toast } from 'sonner';
import { Sparkles, ArrowLeft, Check, Shield, Globe, Star, Zap, Crown, Users, Award, Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const { user } = useAuth();
  const { refreshSubscription } = useSubscription();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Handle successful checkout
    if (searchParams.get('success') === 'true') {
      toast.success('🎉 Welcome to Pro! Your subscription is now active.');
      setTimeout(() => {
        refreshSubscription();
      }, 2000);
    }
    
    // Handle canceled checkout
    if (searchParams.get('canceled') === 'true') {
      toast.info('Checkout was canceled. You can try again anytime.');
    }

    // Handle payment completion
    if (searchParams.get('payment') === 'completed') {
      toast.success('Payment completed successfully! Activating your Pro subscription...');
      setTimeout(() => {
        refreshSubscription();
      }, 1500);
    }
  }, [searchParams, refreshSubscription]);

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleScrollToSection = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="flex justify-start mb-8">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="lg"
              className="border-purple-400/40 text-purple-300 hover:bg-purple-500/20 hover:text-white hover:border-purple-400/80 font-medium bg-black/30 backdrop-blur-sm transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-400/30 rounded-full px-8 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-200 text-base font-medium">Choose Your Plan</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Simple Pricing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Start free and upgrade when you're ready. Pro plan at just ₹79/month - less than ₹3 per day!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-emerald-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="font-medium">Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span className="font-medium">No Hidden Fees</span>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="mb-20">
            <SubscriptionCard />
          </div>

          {/* Value Proposition */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm border border-emerald-400/20 rounded-3xl p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Why Just ₹79/month?</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 mx-auto text-emerald-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Affordable Learning</h3>
                  <p className="text-gray-300 text-sm">Less than a coffee per day for unlimited AI-powered education</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto text-cyan-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">For Everyone</h3>
                  <p className="text-gray-300 text-sm">Quality education should be accessible to all learners</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 mx-auto text-yellow-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Premium Value</h3>
                  <p className="text-gray-300 text-sm">Enterprise-grade AI technology at student-friendly pricing</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                We believe everyone deserves access to personalized, AI-powered learning. 
                That's why we've priced our Pro plan to be incredibly affordable while still providing 
                cutting-edge technology and unlimited access to all features.
              </p>
            </div>
          </div>

          {/* Trust & Security Section */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border border-purple-400/20 rounded-3xl p-10 max-w-5xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Trusted & Secure</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Bank-Level Security</h3>
                  <p className="text-gray-300 text-sm">256-bit SSL encryption with Razorpay</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Growing Community</h3>
                  <p className="text-gray-300 text-sm">Join thousands of learners across India</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">5-Star Experience</h3>
                  <p className="text-gray-300 text-sm">Highly rated learning platform</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-400/20">
                <div className="flex items-center justify-center gap-3 text-emerald-400">
                  <Check className="w-5 h-5" />
                  <span className="font-medium text-lg">Cancel anytime • Instant access • 24/7 support</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-left hover:border-purple-400/30 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-white mb-3">Can I cancel anytime?</h3>
                <p className="text-gray-300">Yes, you can cancel your subscription at any time. You'll continue to have Pro access until the end of your billing period.</p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-left hover:border-purple-400/30 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-white mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-300">We accept all major credit cards, debit cards, UPI, and digital wallets through Razorpay's secure payment processing.</p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-left hover:border-purple-400/30 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-white mb-3">Why ₹79 per month?</h3>
                <p className="text-gray-300">We believe quality education should be accessible. At ₹79/month, our Pro plan costs less than ₹3 per day, making it affordable for everyone.</p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-left hover:border-purple-400/30 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-white mb-3">Need help?</h3>
                <p className="text-gray-300">Our support team is here to help. Pro users get priority support with faster response times. We're committed to your success!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
