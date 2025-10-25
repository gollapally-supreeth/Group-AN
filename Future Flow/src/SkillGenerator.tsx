
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, User, Clock, Target, BookOpen, Zap, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import SubscriptionButton from './SubscriptionButton';

const SkillGenerator = () => {
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [timeCommitment, setTimeCommitment] = useState('10');
  const [learningStyle, setLearningStyle] = useState('');
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState('4');
  const { subscription, usage, refreshSubscription, isProUser } = useSubscription();

  const monthlyLimit = 1;
  const canGenerateRoadmap = isProUser || usage.gemini < monthlyLimit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skill.trim()) {
      toast.error('Please enter a skill you want to learn');
      return;
    }

    if (!user) {
      toast.error('Please sign in to generate a roadmap');
      return;
    }

    if (!canGenerateRoadmap) {
      toast.error('Monthly roadmap limit reached. Upgrade to Pro for unlimited access!');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-roadmap', {
        body: { 
          skill: skill.trim(), 
          level, 
          timeCommitment, 
          learningStyle,
          goal: goal.trim(),
          timeline: parseInt(timeline)
        }
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(data.fromCache ? 'Roadmap loaded from cache!' : 'Roadmap generated successfully!');
        refreshSubscription(); // Refresh usage after generation
        navigate('/roadmaps');
      } else {
        throw new Error('Failed to generate roadmap');
      }
    } catch (error) {
      console.error('Error generating roadmap:', error);
      if (error.message?.includes('Monthly roadmap generation limit reached')) {
        toast.error('Monthly limit reached. Upgrade to Pro for unlimited roadmaps!');
      } else {
        toast.error('Failed to generate roadmap. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-400/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-200 text-sm font-medium">AI-Powered Learning</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Generate Your Learning Roadmap
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us what you want to learn, and we'll create a personalized roadmap just for you
          </p>
        </div>        <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-200 mb-3">
                  <BookOpen className="w-4 h-4" />
                  What skill do you want to learn? *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    placeholder="e.g., React, Python, UI/UX Design"
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-200 mb-3">
                  <User className="w-4 h-4" />
                  Current Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="Beginner" className="bg-slate-800">Beginner</option>
                  <option value="Intermediate" className="bg-slate-800">Intermediate</option>
                  <option value="Advanced" className="bg-slate-800">Advanced</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-200 mb-3">
                  <Clock className="w-4 h-4" />
                  Time Commitment (hours/week)
                </label>
                <select
                  value={timeCommitment}
                  onChange={(e) => setTimeCommitment(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="5" className="bg-slate-800">5 hours/week</option>
                  <option value="10" className="bg-slate-800">10 hours/week</option>
                  <option value="15" className="bg-slate-800">15 hours/week</option>
                  <option value="20" className="bg-slate-800">20 hours/week</option>
                  <option value="25" className="bg-slate-800">25+ hours/week</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-200 mb-3">
                  <Target className="w-4 h-4" />
                  Timeline (weeks)
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="2" className="bg-slate-800">2 weeks (Intensive)</option>
                  <option value="4" className="bg-slate-800">4 weeks (Standard)</option>
                  <option value="6" className="bg-slate-800">6 weeks (Comprehensive)</option>
                  <option value="8" className="bg-slate-800">8 weeks (In-depth)</option>
                  <option value="12" className="bg-slate-800">12 weeks (Mastery)</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-200 mb-3">
                  <Zap className="w-4 h-4" />
                  Learning Style
                </label>
                <select
                  value={learningStyle}
                  onChange={(e) => setLearningStyle(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="" className="bg-slate-800">Select your preference</option>
                  <option value="Visual" className="bg-slate-800">Visual (videos, diagrams)</option>
                  <option value="Reading" className="bg-slate-800">Reading (articles, documentation)</option>
                  <option value="Hands-on" className="bg-slate-800">Hands-on (projects, practice)</option>
                  <option value="Mixed" className="bg-slate-800">Mixed approach</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-200 mb-3">
                  <Target className="w-4 h-4" />
                  Specific Goal (optional)
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g., Build a web app, Get certified"
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="text-center pt-6">
              <Button
                type="submit"
                disabled={isLoading || !user || !canGenerateRoadmap}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-16 py-6 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Generating Your Roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mr-3" />
                    Generate My Roadmap
                  </>
                )}
              </Button>
              
              {!user && (
                <p className="text-gray-400 text-sm mt-4">
                  Please sign in to generate your personalized roadmap
                </p>
              )}
              
              {user && !canGenerateRoadmap && (
                <div className="mt-4 space-y-3">
                  <p className="text-amber-400 text-sm">
                    Monthly limit reached. Upgrade to Pro for unlimited roadmaps!
                  </p>
                  <SubscriptionButton size="sm" />
                </div>
              )}
              
              {user && !isProUser && canGenerateRoadmap && (
                <div className="mt-4 space-y-3">
                  <p className="text-gray-400 text-sm">
                    Free tier: {monthlyLimit - usage.gemini} roadmap{monthlyLimit - usage.gemini !== 1 ? 's' : ''} remaining this month
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <Link to="/pricing" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                      Upgrade to Pro for unlimited access
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillGenerator;
