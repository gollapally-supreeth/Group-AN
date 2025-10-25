
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Users, Target, Clock, TrendingUp, Star, Search, ArrowLeft, Crown, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import RoadmapCard from '@/components/RoadmapCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';

const Community = () => {
  const { user } = useAuth();
  const { isProUser, loading: subscriptionLoading } = useSubscription();
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPublicRoadmaps();
  }, []);

  const fetchPublicRoadmaps = async () => {
    try {
      // Fetch ALL public roadmaps, not filtered by user
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log('Fetched public roadmaps:', data);
      setRoadmaps(data || []);
    } catch (error) {
      console.error('Error fetching public roadmaps:', error);
      toast.error('Failed to load community roadmaps');
    } finally {
      setLoading(false);
    }
  };

  const handleRoadmapClick = (roadmapId: string) => {
    navigate(`/roadmap/${roadmapId}`);
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

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <div className="text-white text-xl">Loading community roadmaps...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show Pro upgrade prompt for free users
  if (!isProUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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

            {/* Pro upgrade section */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="bg-slate-800/40 backdrop-blur-xl border border-purple-400/30 rounded-3xl p-16 shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-purple-400/30">
                  <Lock className="w-12 h-12 text-purple-400" />
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                  Community Roadmaps
                </h1>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Browse and discover learning roadmaps shared by our Pro community members. 
                  Get inspired by others' learning journeys and find new paths to master your skills.
                </p>

                <div className="bg-gradient-to-r from-purple-800/20 to-pink-800/20 border border-purple-400/30 rounded-2xl p-8 mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Crown className="w-6 h-6 text-purple-400" />
                    <h3 className="text-2xl font-bold text-white">Pro Feature</h3>
                  </div>
                  <p className="text-gray-300 mb-6 text-lg">
                    Access to community roadmaps is available exclusively for Pro subscribers. 
                    Upgrade to Pro to unlock this feature and many more!
                  </p>
                  
                  <ul className="text-left text-gray-300 space-y-3 mb-8 max-w-2xl mx-auto">
                    <li className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span>Browse roadmaps from other learners</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span>Share your own roadmaps with the community</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>Unlimited AI-generated roadmaps</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/pricing')}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade to Pro - ₹79/month
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/roadmaps')}
                    variant="outline"
                    size="lg"
                    className="border-purple-400/40 text-purple-300 hover:bg-purple-500/20 hover:text-white hover:border-purple-400/80 font-medium bg-black/30 backdrop-blur-sm px-10 py-4 rounded-xl"
                  >
                    View My Roadmaps
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-400/30 rounded-full px-6 py-2 mb-6">
              <Crown className="w-4 h-4 text-purple-400" />
              <span className="text-purple-200 text-sm font-medium">Pro Community</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Community Roadmaps
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover and explore learning roadmaps shared by our Pro community. Get inspired by others' learning journeys and find new paths to master your skills.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search roadmaps by skill, goal, or level..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20"
                />
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{roadmaps.length}</div>
                <div className="text-gray-300 text-sm">Public Roadmaps</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {new Set(roadmaps.map(r => r.skill_name)).size}
                </div>
                <div className="text-gray-300 text-sm">Unique Skills</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {filteredRoadmaps.length}
                </div>
                <div className="text-gray-300 text-sm">
                  {searchTerm ? 'Matching Results' : 'Total Roadmaps'}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {filteredRoadmaps.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-16 shadow-2xl max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-purple-400/30">
                  <Users className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {searchTerm ? 'No matching roadmaps found' : 'No public roadmaps yet'}
                </h3>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  {searchTerm 
                    ? 'Try adjusting your search terms or browse all available roadmaps.'
                    : 'Be the first to share your learning journey with the community!'
                  }
                </p>
                
                {searchTerm ? (
                  <Button 
                    onClick={() => setSearchTerm('')}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg mr-4"
                  >
                    Clear Search
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate('/roadmaps')}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg"
                  >
                    Create Your First Roadmap
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <p className="text-gray-300 text-lg">
                  Showing {filteredRoadmaps.length} of {roadmaps.length} community roadmaps
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
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
                      showPublicBadge={true}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;
