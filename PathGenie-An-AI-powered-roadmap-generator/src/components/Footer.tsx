import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  Sparkles,
  Twitter,
  Linkedin,
  Github,
  MessageCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const navigateToPage = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailInputRef.current?.value?.trim();

    if (email) {
      toast({
        variant: 'default',
        title: 'Subscribed!',
        description: 'You’ll get learning tips and roadmap updates in your inbox.',
      });
      emailInputRef.current.value = '';
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/pathgenie_ai',
      color: 'hover:text-blue-400',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/company/pathgenie',
      color: 'hover:text-blue-500',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/pathgenie',
      color: 'hover:text-gray-300',
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      href: 'https://discord.gg/pathgenie',
      color: 'hover:text-purple-400',
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-black to-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* CTA */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Ready to Master Your Next Skill?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of learners already using AI-powered roadmaps to accelerate their growth.
          </p>
          <Button
            onClick={scrollToTop}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Generate Your Roadmap Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <Separator className="mb-12 bg-white/20" />

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                PathGenie
              </h3>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              AI-powered personalized learning roadmaps that turn scattered tutorials into 4-week mastery journeys.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`p-2 bg-white/10 rounded-lg border border-white/20 text-gray-400 ${social.color} transition hover:bg-white/20 hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><button onClick={() => navigateToPage('/roadmaps')} className="hover:text-purple-400">Features</button></li>
              <li><button onClick={() => navigateToPage('/pricing')} className="hover:text-purple-400">Pricing</button></li>
              <li><button onClick={() => navigateToPage('/community')} className="hover:text-purple-400">Community</button></li>
              <li><a href="#features" className="hover:text-purple-400">How it Works</a></li>
              <li><a href="#testimonials" className="hover:text-purple-400">Success Stories</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><button onClick={() => navigateToPage('/about')} className="hover:text-purple-400">About Us</button></li>
              <li><button onClick={() => navigateToPage('/contact')} className="hover:text-purple-400">Contact</button></li>
              
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal & Support</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><button onClick={() => navigateToPage('/privacy-policy')} className="hover:text-purple-400">Privacy Policy</button></li>
              <li><button onClick={() => navigateToPage('/terms-of-service')} className="hover:text-purple-400">Terms of Service</button></li>
              <li><button onClick={() => navigateToPage('/help')} className="hover:text-purple-400">Help Center</button></li>
              <li><button onClick={() => navigateToPage('/contact')} className="hover:text-purple-400">Support</button></li>
              
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="text-center max-w-xl mx-auto">
              <Mail className="w-8 h-8 mx-auto text-purple-400 mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-sm text-gray-300 mb-6">Get weekly tips and roadmap updates straight to your inbox.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  ref={emailInputRef}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-900/50 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg text-sm"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <Separator className="mb-6 bg-white/20" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-xs">
          <span>© 2025 PathGenie. All rights reserved. Built with ❤️ for learners worldwide.</span>
          <div className="flex gap-4">
            <button onClick={() => navigateToPage('/privacy-policy')} className="hover:text-purple-400">Privacy</button>
            <button onClick={() => navigateToPage('/terms-of-service')} className="hover:text-purple-400">Terms</button>
            <button onClick={() => navigateToPage('/contact')} className="hover:text-purple-400">Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
