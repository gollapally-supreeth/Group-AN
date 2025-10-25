
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Target, TrendingUp, Users, Eye, EyeOff, Share2, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import RoadmapDisplay from '@/components/RoadmapDisplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShareRoadmapButton from '@/components/ShareRoadmapButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorState from '@/components/ui/ErrorState';
import { Badge } from '@/components/ui/badge';

const RoadmapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Redirect to landing page if user is not authenticated
    if (!user) {
      navigate('/');
      return;
    }
    
    if (id) {
      fetchRoadmap();
    }
  }, [id, user, navigate]);

  const fetchRoadmap = async () => {
    try {
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setRoadmap(data);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
      toast.error('Failed to load roadmap');
      navigate('/roadmaps');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleScrollToSection = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  const handleRoadmapUpdate = (isPublic: boolean) => {
    if (roadmap) {
      setRoadmap({ ...roadmap, is_public: isPublic });
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LoadingSpinner 
              size="lg" 
              text="Loading your roadmap..." 
              className="min-h-[60vh]"
            />
          </div>
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorState
              title="Roadmap Not Found"
              message="The roadmap you're looking for doesn't exist or you don't have permission to view it."
              onRetry={() => navigate('/roadmaps')}
              className="min-h-[60vh]"
            />
          </div>
        </div>
      </div>
    );
  }
  const isOwner = user && user.id === roadmap.user_id;

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-400/30';
      default: return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-3xl"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button & Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="sm"
              className="border-purple-400/40 text-purple-300 hover:bg-purple-500/20 hover:text-white hover:border-purple-400/80 font-medium bg-black/30 backdrop-blur-sm transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Roadmaps
            </Button>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {roadmap.is_public && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30">
                  <Eye className="w-3 h-3 mr-1" />
                  Public
                </Badge>
              )}
              {!roadmap.is_public && isOwner && (
                <Badge variant="secondary" className="bg-slate-500/20 text-slate-300 border-slate-400/30">
                  <EyeOff className="w-3 h-3 mr-1" />
                  Private
                </Badge>
              )}
              {isOwner && (
                <ShareRoadmapButton
                  roadmapId={roadmap.id}
                  isPublic={roadmap.is_public || false}
                  onUpdate={handleRoadmapUpdate}
                />
              )}
            </div>
          </div>

          {/* Title & Goal */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              {roadmap.skill_name}
            </h1>
            {roadmap.end_goal && (
              <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                🎯 {roadmap.end_goal}
              </p>
            )}
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-gray-300 text-xs sm:text-sm font-medium">Level</span>
              </div>
              <Badge className={`${getLevelColor(roadmap.current_level)} text-xs sm:text-sm font-semibold`}>
                {roadmap.current_level}
              </Badge>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <span className="text-gray-300 text-xs sm:text-sm font-medium">Per Week</span>
              </div>
              <span className="text-white text-lg sm:text-xl font-bold">{roadmap.time_commitment}h</span>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-gray-300 text-xs sm:text-sm font-medium">Duration</span>
              </div>
              <span className="text-white text-lg sm:text-xl font-bold">{roadmap.timeline || '4'} weeks</span>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className="text-gray-300 text-xs sm:text-sm font-medium">Style</span>
              </div>
              <span className="text-white text-sm sm:text-base font-semibold capitalize">
                {roadmap.learning_style?.split('_').join(' ') || 'Mixed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <RoadmapDisplay 
            roadmapData={roadmap.generated_data} 
            roadmapId={roadmap.id}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RoadmapView;
