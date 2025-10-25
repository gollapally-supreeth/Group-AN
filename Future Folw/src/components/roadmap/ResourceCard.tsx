import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Bookmark, Clock, Star, Github, BookOpen, Play, Code, Headphones, BarChart3, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { LearningResource, UserResourceProgress } from '@/hooks/useResourceDiscovery';

interface ResourceCardProps {
  resource: LearningResource;
  userProgress?: UserResourceProgress;
  onStatusChange: (resourceId: string, status: UserResourceProgress['status']) => void;
  compact?: boolean;
}

const getResourceTypeIcon = (type: string) => {
  switch (type) {
    case 'reading': return <BookOpen className="w-4 h-4" />;
    case 'video': return <Play className="w-4 h-4" />;
    case 'interactive': return <Code className="w-4 h-4" />;
    case 'audio': return <Headphones className="w-4 h-4" />;
    case 'visual': return <BarChart3 className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
};

const getResourceTypeColor = (type: string) => {
  switch (type) {
    case 'reading': return 'bg-blue-900/20 border-blue-500/30 text-blue-300';
    case 'video': return 'bg-red-900/20 border-red-500/30 text-red-300';
    case 'interactive': return 'bg-green-900/20 border-green-500/30 text-green-300';
    case 'audio': return 'bg-purple-900/20 border-purple-500/30 text-purple-300';
    case 'visual': return 'bg-orange-900/20 border-orange-500/30 text-orange-300';
    default: return 'bg-gray-900/20 border-gray-500/30 text-gray-300';
  }
};

const getSourceIcon = (source: string) => {
  if (source.toLowerCase().includes('github')) return <Github className="w-4 h-4" />;
  if (source.toLowerCase().includes('youtube')) return <Play className="w-4 h-4" />;
  return null;
};

const getQualityStars = (score: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-3 h-3 ${
        i < score ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
      }`}
    />
  ));
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'completed': return 'bg-green-900/30 text-green-300 border-green-500/30';
    case 'in_progress': return 'bg-blue-900/30 text-blue-300 border-blue-500/30';
    case 'bookmarked': return 'bg-yellow-900/30 text-yellow-300 border-yellow-500/30';
    case 'skipped': return 'bg-gray-900/30 text-gray-300 border-gray-500/30';
    default: return 'bg-purple-900/30 text-purple-300 border-purple-500/30';
  }
};

const getDifficultyColor = (level?: string) => {
  switch (level) {
    case 'beginner': return 'bg-green-900/30 text-green-300';
    case 'intermediate': return 'bg-yellow-900/30 text-yellow-300';
    case 'advanced': return 'bg-red-900/30 text-red-300';
    default: return 'bg-gray-900/30 text-gray-300';
  }
};

const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  userProgress,
  onStatusChange,
  compact = false
}) => {
  const handleStatusChange = (status: UserResourceProgress['status']) => {
    onStatusChange(resource.id, status);
  };

  const typeColor = getResourceTypeColor(resource.resource_type);
  const isCompleted = userProgress?.status === 'completed';
  const isBookmarked = userProgress?.status === 'bookmarked';  if (compact) {
    return (      <div className="group flex items-center justify-between p-3 sm:p-4 bg-slate-800/60 backdrop-blur-xl border border-slate-600/40 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1">          <div className="relative flex items-center gap-2 sm:gap-3 flex-1">
          <div className={`p-1.5 sm:p-2 rounded-md border ${typeColor}`}>
            {getResourceTypeIcon(resource.resource_type)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-white truncate text-sm sm:text-base">{resource.title}</h4>
            <div className="flex items-center gap-2 sm:gap-3 mt-1">
              <div className="flex items-center gap-1">
                {getQualityStars(resource.quality_score)}
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{resource.estimated_time_minutes}min</span>
              </div>
              {resource.is_official && (
                <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50">
                  <Award className="w-3 h-3 mr-1" />
                  Official
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleStatusChange(isBookmarked ? 'planned' : 'bookmarked')}
            className={`p-2 ${isBookmarked ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-400 hover:text-yellow-400'}`}
          >
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            asChild
            className="p-2 text-gray-400 hover:text-gray-300"
          >
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    );
  }  return (
    <div className={`group relative p-4 sm:p-5 border rounded-lg transition-transform duration-300 hover:-translate-y-1 backdrop-blur-xl shadow-lg ${
      isCompleted ? 'bg-green-500/10 border-green-400/30' : 'bg-slate-800/60 border-slate-600/40'
    }`}>
      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">        <div className="flex items-start gap-2 sm:gap-3 flex-1">
          <div className={`p-1.5 sm:p-2 rounded-md border ${typeColor}`}>
            {getResourceTypeIcon(resource.resource_type)}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">{resource.title}</h4>
            <div className="flex items-center gap-2 mb-2">
              {getSourceIcon(resource.source)}
              <span className="text-xs sm:text-sm text-gray-400">{resource.source}</span>
              {resource.is_official && (
                <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50">
                  <Award className="w-3 h-3 mr-1" />
                  Official
                </Badge>
              )}
            </div>
            {resource.description && (
              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                {resource.description}
              </p>
            )}
          </div>
        </div>
        {userProgress?.status && (
          <Badge className={`text-xs ${getStatusColor(userProgress.status)}`}>
            {userProgress.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
            {userProgress.status.replace('_', ' ')}
          </Badge>
        )}
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {getQualityStars(resource.quality_score)}
            <span className="text-xs text-gray-400 ml-1">{resource.quality_score}/5</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{resource.estimated_time_minutes} min</span>
          </div>
          {resource.difficulty_level && (
            <Badge className={`text-xs ${getDifficultyColor(resource.difficulty_level)}`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {resource.difficulty_level}
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange(isBookmarked ? 'planned' : 'bookmarked')}
            className={`text-sm ${
              isBookmarked 
                ? 'text-yellow-300 border-yellow-500/30 bg-yellow-900/20 hover:bg-yellow-900/30' 
                : 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4 mr-1" />
            {isBookmarked ? 'Saved' : 'Save'}
          </Button>
          <Button
            size="sm"
            onClick={() => handleStatusChange(isCompleted ? 'planned' : 'completed')}
            className={`text-sm ${
              isCompleted
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </>
            ) : (
              'Mark Done'
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            asChild
            className="text-sm bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-700 hover:text-white"
          >
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-1" />
              Open
            </a>
          </Button>
        </div>
      </div>

      {/* Tags */}
      {resource.tags && resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 5).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs text-gray-300 bg-slate-700/30 border-slate-600/50">
              #{tag}
            </Badge>
          ))}
          {resource.tags.length > 5 && (
            <Badge variant="outline" className="text-xs text-gray-300 bg-slate-700/30 border-slate-600/50">
              +{resource.tags.length - 5} more
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceCard;
