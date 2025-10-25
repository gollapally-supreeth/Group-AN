import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  HelpCircle, 
  BookOpen, 
  MessageCircle, 
  Zap, 
  CreditCard,
  Settings,
  Shield,
  Users,
  ExternalLink
} from 'lucide-react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Help = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleScrollToSection = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Zap,
      color: "text-green-400 bg-green-500/20 border-green-400/30",
      questions: [
        {
          q: "How do I create my first roadmap?",
          a: "Simply click 'Generate Your Roadmap' on the homepage, enter your learning goal, current experience level, and time commitment. Our AI will create a personalized 4-week learning path for you."
        },
        {
          q: "What makes PathGenie different from other learning platforms?",
          a: "PathGenie uses AI to create truly personalized roadmaps that adapt to your specific goals, experience level, and schedule. Instead of one-size-fits-all courses, you get a custom learning journey."
        },
        {
          q: "Do I need any prior experience to use PathGenie?",
          a: "Not at all! Our AI creates roadmaps for all experience levels, from complete beginners to advanced learners. Just specify your current level when creating a roadmap."
        }
      ]
    },
    {
      title: "Subscription & Billing",
      icon: CreditCard,
      color: "text-purple-400 bg-purple-500/20 border-purple-400/30",
      questions: [
        {
          q: "What's included in the Pro plan?",
          a: "Pro includes unlimited roadmaps, advanced AI features, priority support, exclusive content, progress analytics, and early access to new features."
        },
        {
          q: "Can I cancel my subscription anytime?",
          a: "Yes! You can cancel your subscription at any time from your account settings. You'll retain Pro features until the end of your billing period."
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 14-day money-back guarantee for new subscribers. If you're not satisfied, contact our support team for a full refund."
        }
      ]
    },
    {
      title: "Using the Platform",
      icon: Settings,
      color: "text-blue-400 bg-blue-500/20 border-blue-400/30",
      questions: [
        {
          q: "How accurate are the AI-generated roadmaps?",
          a: "Our AI is trained on curated educational content and industry best practices. Roadmaps are continuously improved based on user feedback and success rates."
        },
        {
          q: "Can I customize my roadmap?",
          a: "Yes! You can modify tasks, adjust timelines, add your own resources, and mark items as complete. The roadmap adapts to your progress."
        },
        {
          q: "How do I track my progress?",
          a: "Each task and week has completion tracking. You can mark items as done, view your overall progress, and see analytics in your dashboard."
        }
      ]
    },
    {
      title: "Community & Support",
      icon: Users,
      color: "text-cyan-400 bg-cyan-500/20 border-cyan-400/30",
      questions: [
        {
          q: "How do I get help if I'm stuck?",
          a: "You can contact our support team, join our Discord community, or browse the help center. Pro users get priority support response."
        },
        {
          q: "Can I share my roadmaps with others?",
          a: "Yes! You can make your roadmaps public and share them with the community. Others can use your roadmaps as inspiration for their learning journey."
        },
        {
          q: "Is there a mobile app?",
          a: "PathGenie is fully responsive and works perfectly on mobile browsers. A dedicated mobile app is coming soon!"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SEO 
        title="Help Center - PathGenie"
        description="Find answers to common questions about PathGenie. Get help with creating roadmaps, managing subscriptions, and using our AI-powered learning platform."
        keywords="help center, FAQ, support, tutorial, how to use, troubleshooting"
        url="/help"
      />
      <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
      
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-400/30">
                <HelpCircle className="w-8 h-8 text-orange-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Help Center</h1>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about using PathGenie to accelerate your learning journey.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Getting Started Guide</h3>
              <p className="text-gray-300 text-sm mb-4">Learn the basics and create your first roadmap</p>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Read Guide
              </Button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Contact Support</h3>
              <p className="text-gray-300 text-sm mb-4">Get personal help from our team</p>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Get Help
              </Button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <Users className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Join Community</h3>
              <p className="text-gray-300 text-sm mb-4">Connect with other learners on Discord</p>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ExternalLink className="w-4 h-4 mr-2" />
                Join Discord
              </Button>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-lg border ${category.color}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-l-2 border-purple-400/30 pl-6">
                      <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                      <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Still Need Help */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">Still Need Help?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-3 rounded-xl"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Discord Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
