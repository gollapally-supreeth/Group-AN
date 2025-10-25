
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Target, TrendingUp, Users } from 'lucide-react';

interface RoadmapCardProps {
  roadmap: {
    id: string;
    skill_name: string;
    current_level: string;
    time_commitment: string;
    learning_style?: string;
    end_goal?: string;
    timeline?: string;
    created_at: string;
  };
  onClick: () => void;
  showPublicBadge?: boolean;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap, onClick, showPublicBadge = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-600/20 text-green-200 border-green-400/30';
      case 'Intermediate': return 'bg-yellow-600/20 text-yellow-200 border-yellow-400/30';
      case 'Advanced': return 'bg-red-600/20 text-red-200 border-red-400/30';
      default: return 'bg-purple-600/20 text-purple-200 border-purple-400/30';
    }
  };

  return (
    <Card 
      className="bg-slate-900/30 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      {/* Gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={`${getLevelColor(roadmap.current_level)} border font-medium`}
            >
              {roadmap.current_level}
            </Badge>
            {showPublicBadge && (
              <Badge 
                variant="secondary" 
                className="bg-cyan-600/20 text-cyan-200 border-cyan-400/30 border font-medium"
              >
                <Users className="w-3 h-3 mr-1" />
                Public
              </Badge>
            )}
          </div>
          <span className="text-sm text-gray-400 font-medium">
            {formatDate(roadmap.created_at)}
          </span>
        </div>
        <CardTitle className="text-2xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
          {roadmap.skill_name}
        </CardTitle>
        <CardDescription className="text-gray-300 text-base leading-relaxed">
          {roadmap.end_goal || 'General mastery and skill development'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-300 p-2 bg-slate-800/30 rounded-lg backdrop-blur-sm">
              <Clock className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-sm font-medium">{roadmap.time_commitment}h/week</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 p-2 bg-slate-800/30 rounded-lg backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="text-sm font-medium">{roadmap.timeline || '4'} weeks</span>
            </div>
          </div>
          
          {roadmap.learning_style && (
            <div className="flex items-center gap-2 text-gray-300 p-2 bg-slate-800/30 rounded-lg backdrop-blur-sm">
              <Target className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-sm font-medium capitalize">{roadmap.learning_style} learning</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-gray-300 p-2 bg-gradient-to-r from-purple-800/20 to-pink-800/20 border border-purple-400/20 rounded-lg backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="text-sm font-medium">AI-Generated Program</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapCard;
