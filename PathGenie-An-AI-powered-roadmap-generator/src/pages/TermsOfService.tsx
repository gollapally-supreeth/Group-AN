import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Scale, FileText, Shield, AlertTriangle } from 'lucide-react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService = () => {
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
        title="Terms of Service - PathGenie"
        description="Read PathGenie's terms of service and user agreement. Understand your rights and responsibilities when using our AI-powered learning platform."
        keywords="terms of service, user agreement, terms and conditions, legal terms, platform rules"
        url="/terms-of-service"
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
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
                <Scale className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Terms of Service</h1>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These terms govern your use of PathGenie's AI-powered learning platform and services.
            </p>
            <p className="text-sm text-gray-400 mt-4">Last updated: June 16, 2025</p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl">
            <div className="prose prose-invert max-w-none">
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-400" />
                  Acceptance of Terms
                </h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>By accessing and using PathGenie ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                  <p>These Terms of Service ("Terms") apply to all users of the Service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Service Description</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>PathGenie provides AI-powered personalized learning roadmaps and educational content. Our services include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>AI-generated learning roadmaps tailored to your goals</li>
                    <li>Curated educational resources and materials</li>
                    <li>Progress tracking and learning analytics</li>
                    <li>Community features and content sharing</li>
                    <li>Premium subscription services</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>To access certain features, you must register for an account. You agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain the security of your password</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>You may use our Service only for lawful purposes. You agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on others' intellectual property rights</li>
                    <li>Upload malicious content or code</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use the Service for commercial purposes without permission</li>
                    <li>Share your account credentials with others</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>For premium services:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payments are processed securely through third-party providers</li>
                    <li>Subscriptions automatically renew unless cancelled</li>
                    <li>Refunds are subject to our refund policy</li>
                    <li>We reserve the right to change pricing with notice</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>The Service and its original content, features, and functionality are owned by PathGenie and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
                  <p>You retain rights to content you create, but grant us a license to use, modify, and display it in connection with the Service.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  Limitation of Liability
                </h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>PathGenie provides the Service "as is" without any warranty. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.</p>
                  <p>Our total liability shall not exceed the amount you paid for the Service in the twelve months preceding the claim.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>We reserve the right to update these Terms at any time. We will notify users of any changes by posting the new Terms on this page and updating the "Last updated" date.</p>
                  <p>Your continued use of the Service after such changes constitutes acceptance of the new Terms.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <div className="text-gray-300 leading-relaxed">
                  <p>For questions about these Terms, please contact us at:</p>
                  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                    <p><strong>Email:</strong> legal@pathgenie.com</p>
                    <p><strong>Address:</strong> PathGenie Legal Team</p>
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

export default TermsOfService;
