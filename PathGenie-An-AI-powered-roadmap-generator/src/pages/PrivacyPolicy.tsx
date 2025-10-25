import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Shield, Scale, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleScrollToSection = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SEO 
        title="Privacy Policy - PathGenie"
        description="Learn how PathGenie collects, uses, and protects your personal information. Our commitment to user privacy and data security."
        keywords="privacy policy, data protection, user privacy, GDPR compliance, data security"
        url="/privacy-policy"
      />
      <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Privacy Policy</h1>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-400 mt-4">Last updated: June 16, 2025</p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl">
            <div className="prose prose-invert max-w-none">
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-400" />
                  Information We Collect
                </h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create an account or update your profile</li>
                    <li>Generate learning roadmaps</li>
                    <li>Subscribe to our services</li>
                    <li>Contact us for support</li>
                    <li>Participate in surveys or feedback</li>
                  </ul>
                  <p>This may include your name, email address, learning preferences, and usage patterns.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Generate personalized learning roadmaps</li>
                    <li>Process payments and manage subscriptions</li>
                    <li>Send you updates, newsletters, and important notices</li>
                    <li>Respond to your comments and questions</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and prevent fraud</li>
                    <li>With trusted service providers who assist in our operations</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>We implement appropriate security measures to protect your personal information, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and monitoring</li>
                    <li>Access controls and authentication requirements</li>
                    <li>Secure payment processing through trusted providers</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Request a copy of your data</li>
                    <li>Lodge a complaint with supervisory authorities</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <div className="text-gray-300 leading-relaxed">
                  <p>If you have questions about this Privacy Policy, please contact us at:</p>
                  <div className="mt-4 p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                    <p><strong>Email:</strong> privacy@pathgenie.com</p>
                    <p><strong>Address:</strong> PathGenie Privacy Team</p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
