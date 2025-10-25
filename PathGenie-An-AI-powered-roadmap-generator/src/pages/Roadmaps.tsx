
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Zap, Target, Clock, TrendingUp, Star, Users, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import RoadmapCard from '@/components/RoadmapCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import RoadmapCardSkeleton from '@/components/ui/RoadmapCardSkeleton';
import { Input } from '@/components/ui/input';

const Roadmaps = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    fetchRoadmaps();
  }, [user]);
  const fetchRoadmaps = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRoadmaps(data || []);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
      setError('Failed to load roadmaps. Please try again.');
      toast.error('Failed to load roadmaps');
    } finally {
      setLoading(false);
    }
  };
  const handleRoadmapClick = (roadmapId: string) => {
    navigate(`/roadmap/${roadmapId}`);
  };

  const handleCreateNew = () => {
    navigate('/#skill-generator');
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleScrollToSection = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  const filteredRoadmaps = roadmaps.filter(roadmap =>
    roadmap.skill_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roadmap.end_goal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roadmap.current_level?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                My Learning Roadmaps
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <RoadmapCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorState
              message={error}
              onRetry={fetchRoadmaps}
              className="min-h-[60vh]"
            />
          </div>
        </div>
      </div>
    );  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SEO 
        title="My Learning Roadmaps - PathGenie"
        description="View and manage your personalized AI-generated learning roadmaps. Track your progress, access curated resources, and master new skills with PathGenie."
        keywords="my roadmaps, learning progress, skill tracking, personal dashboard, learning management"
        url="/roadmaps"
        noIndex={true}
      />
      <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-12 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-400/30 rounded-full px-6 py-2 mb-6">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-200 text-sm font-medium">AI-Powered Learning</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-glow">
              My Learning Roadmaps
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your personalized journey to mastery. Track progress, achieve goals, and unlock your potential with AI-guided learning paths.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{roadmaps.length}</div>
                <div className="text-gray-300 text-sm">Active Roadmaps</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {roadmaps.reduce((acc, roadmap) => acc + parseInt(roadmap.timeline || '4'), 0)}
                </div>
                <div className="text-gray-300 text-sm">Total Weeks</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {roadmaps.reduce((acc, roadmap) => acc + parseInt(roadmap.time_commitment || '10'), 0)}h
                </div>
                <div className="text-gray-300 text-sm">Weekly Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 pb-16">
        {/* Search and Stats */}
        {roadmaps.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search roadmaps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                />
              </div>
              <div className="text-gray-300 text-sm">
                {filteredRoadmaps.length} {filteredRoadmaps.length === 1 ? 'roadmap' : 'roadmaps'}
              </div>
            </div>
          </div>
        )}        {roadmaps.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="w-12 h-12 text-purple-400" />}
            title="Start Your Learning Journey"
            description="Create your first AI-powered roadmap and transform the way you learn. Get personalized recommendations, structured timelines, and expert guidance."
            actionLabel="Create Your First Roadmap"
            onAction={handleCreateNew}
            className="max-w-2xl mx-auto"
          />
        ) : filteredRoadmaps.length === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12 text-purple-400" />}
            title="No roadmaps found"
            description="Try adjusting your search terms or create a new roadmap to get started."
            actionLabel="Create New Roadmap"
            onAction={handleCreateNew}
            className="max-w-2xl mx-auto"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoadmaps.map((roadmap, index) => (
              <div
                key={roadmap.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RoadmapCard
                  roadmap={roadmap}
                  onClick={() => handleRoadmapClick(roadmap.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Roadmaps;
