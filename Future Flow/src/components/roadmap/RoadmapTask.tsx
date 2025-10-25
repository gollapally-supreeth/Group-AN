
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Play, ExternalLink, CheckCircle2, Info, PlayCircle, BookOpen, Layers, Sparkles, Award, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { useResourceDiscovery } from '@/hooks/useResourceDiscovery';
import ResourceFormatTabs from './ResourceFormatTabs';
import GenerateResourcesButton from './GenerateResourcesButton';

interface RoadmapTaskProps {
  task: any;
  completed: boolean;
  onToggle: (taskId: string) => void;
  roadmapId?: string;
}

const getTaskTypeIcon = (type: string) => {
  switch (type) {
    case 'video': return <PlayCircle className="w-4 h-4" />;
    case 'reading': return <BookOpen className="w-4 h-4" />;
    case 'practice': return <TrendingUp className="w-4 h-4" />;
    case 'project': return <Award className="w-4 h-4" />;
    default: return <Sparkles className="w-4 h-4" />;
  }
};

const getTaskTypeColor = (type: string) => {
  switch (type) {
    case 'video': return 'bg-red-500/10 border-red-400/30 text-red-300';
    case 'reading': return 'bg-blue-500/10 border-blue-400/30 text-blue-300';
    case 'practice': return 'bg-green-500/10 border-green-400/30 text-green-300';
    case 'project': return 'bg-purple-500/10 border-purple-400/30 text-purple-300';
    default: return 'bg-white/10 border-white/20 text-gray-300';
  }
};

const RoadmapTask: React.FC<RoadmapTaskProps> = ({ task, completed, onToggle, roadmapId }) => {
  const [showResources, setShowResources] = useState(false);
  
  const {
    resources,
    userProgress,
    loading: resourcesLoading,
    updateResourceStatus,
    getResourceTypeCounts,
    refetch
  } = useResourceDiscovery(task.id, task.skill || 'general', roadmapId || '');

  const hasYouTubeVideo = task.youtubeLink && task.youtubeLink !== 'undefined';
  const typeCounts = getResourceTypeCounts();
  const totalAlternativeResources = resources.length;
  const taskTypeColor = getTaskTypeColor(task.type);

  const handleResourcesGenerated = () => {
    refetch();
  };  return (
    <TooltipProvider>
      <div className={`group relative rounded-xl border transition-transform duration-300 hover:-translate-y-1 ${
        completed 
          ? 'bg-green-500/10 border-green-400/30 shadow-lg shadow-green-500/5' 
          : 'bg-slate-800/60 border-slate-600/40 shadow-lg backdrop-blur-xl'
      }`}>
        
        {/* Task Header */}
        <div className="relative p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">            {/* Task Icon with animation */}
            <div className={`flex-shrink-0 p-2 sm:p-3 rounded-xl border ${taskTypeColor} shadow-sm`}>
              {getTaskTypeIcon(task.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              {/* Title and Checkbox */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <h3 className={`text-base sm:text-lg font-semibold leading-tight ${
                  completed ? 'line-through text-gray-400' : 'text-white'
                }`}>
                  {task.title}
                </h3>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <Info className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-300" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs bg-slate-800/90 backdrop-blur-xl border-slate-600 text-white">
                      <p className="text-sm">This task builds essential skills for mastering {task.skill || 'this topic'}.</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Checkbox
                    checked={completed}
                    onCheckedChange={() => onToggle(task.id)}
                    className="w-4 h-4 sm:w-5 sm:h-5 border-gray-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                </div>
              </div>
              
              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-xs font-medium bg-slate-700/40 text-slate-300 border-slate-600/40">
                  {task.type}
                </Badge>
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs font-medium">{task.duration}</span>
                </div>
                {task.difficulty && (
                  <Badge variant="outline" className="text-xs bg-slate-700/30 text-slate-300 border-slate-600/40">
                    {task.difficulty}
                  </Badge>
                )}
              </div>
              
              {/* Resource info */}
              <p className="text-sm text-slate-400 font-medium">{task.resource || 'Learning Resource'}</p>
            </div>
          </div>
        </div>        {/* YouTube Video Section - Most Popular Video */}
        {hasYouTubeVideo && (
          <div className="mx-3 sm:mx-6 mb-4 sm:mb-6">            <div className="group bg-slate-800/60 backdrop-blur-xl border border-slate-600/40 rounded-xl p-4 sm:p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1">
              
              {/* Section Header */}
              <div className="relative flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">              <div className="p-1.5 sm:p-2 bg-red-500/10 rounded-lg border border-red-400/30">
                <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-300" />
              </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm sm:text-base">Recommended Video</h4>
                  <p className="text-xs sm:text-sm text-gray-400">Most popular tutorial for this task</p>
                </div>
                <Badge className="text-xs bg-yellow-500/20 text-yellow-300 border-yellow-500/30 backdrop-blur-sm">
                  Popular
                </Badge>
              </div>
              
              {/* Video Content */}
              <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5">
                {/* Thumbnail */}
                {task.youtubeThumbnail && (
                  <div className="lg:col-span-1">
                    <a
                      href={task.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-24 sm:h-32 rounded-lg overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 shadow-sm hover:shadow-lg group/thumb"
                    >
                      <img
                        src={task.youtubeThumbnail}
                        alt={`YouTube: ${task.title}`}
                        className="object-cover w-full h-full transform group-hover/thumb:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </a>
                  </div>
                )}
                
                {/* Video Details */}
                <div className="lg:col-span-2">
                  <h5 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base leading-snug">
                    {task.youtubeTitle || 'Tutorial Video'}
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                    Watch this popular video to learn the concepts step by step.
                  </p>
                  <a
                    href={task.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-500/10 text-red-300 text-xs sm:text-sm font-medium rounded-lg hover:bg-red-500/20 transition-all duration-300 border border-red-400/30 hover:border-red-400/50 transform hover:scale-105"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    Watch Video
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}{/* Additional Learning Resources - Task Specific */}
        <div className="mx-3 sm:mx-6 mb-4 sm:mb-6">
          <Collapsible open={showResources} onOpenChange={setShowResources}>
            <CollapsibleTrigger asChild>
              <button className="w-full p-3 sm:p-5 bg-slate-800/60 backdrop-blur-xl border border-slate-600/40 rounded-xl hover:bg-slate-700/60 transition-all duration-200 text-left group">
                <div className="flex items-center justify-between">
                  {/* Section Header */}
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="p-1.5 sm:p-2 bg-slate-700/60 rounded-lg border border-slate-500/40 group-hover:bg-slate-600/60 transition-colors">
                      <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-sm sm:text-base">Additional Resources</h4>
                      <p className="text-xs sm:text-sm text-gray-400 truncate sm:whitespace-normal">
                        {totalAlternativeResources > 0 
                          ? `${totalAlternativeResources} resource${totalAlternativeResources !== 1 ? 's' : ''} available`
                          : 'Generate learning materials'
                        }
                      </p>
                    </div>
                  </div>
                  
                  {/* Resource Type Indicators or Generate Button */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    {totalAlternativeResources > 0 ? (
                      <>
                        <div className="hidden sm:flex items-center gap-2">
                          {Object.entries(typeCounts).slice(0, 3).map(([type, count]) => (
                            <Badge key={type} variant="secondary" className="text-xs bg-white/10 text-gray-300 border-white/20">
                              {type}: {count}
                            </Badge>
                          ))}
                        </div>
                        <div className="sm:hidden">
                          <Badge variant="secondary" className="text-xs bg-white/10 text-gray-300 border-white/20">
                            {totalAlternativeResources}
                          </Badge>
                        </div>
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-200 ${showResources ? 'rotate-180' : ''}`}>
                          <svg className="w-full h-full text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <GenerateResourcesButton 
                        task={task}
                        roadmapId={roadmapId || ''}
                        onResourcesGenerated={handleResourcesGenerated}
                      />
                    )}
                  </div>
                </div>
              </button>
            </CollapsibleTrigger>            <CollapsibleContent className="mt-3 sm:mt-4">
              {totalAlternativeResources > 0 ? (
                <div className="p-3 sm:p-5 bg-slate-800/60 backdrop-blur-xl border border-slate-600/40 rounded-xl">
                  <ResourceFormatTabs
                    resources={resources}
                    userProgress={userProgress}
                    onStatusChange={updateResourceStatus}
                    typeCounts={typeCounts}
                  />
                </div>
              ) : (
                <div className="p-3 sm:p-5 bg-slate-800/60 backdrop-blur-xl border border-slate-600/40 rounded-xl text-center">
                  <p className="text-gray-400 text-xs sm:text-sm">Click "Generate Resources" to fetch learning materials specifically for this task.</p>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>        {/* Task Checkpoint */}
        {task.checkpoint && (
          <div className="mx-3 sm:mx-6 mb-4 sm:mb-6">            <div className="group bg-slate-800/60 backdrop-blur-xl border border-slate-600/40 rounded-xl p-4 sm:p-5 shadow-lg transition-transform duration-300 hover:-translate-y-1">
              
              <div className="relative flex items-start gap-2 sm:gap-4">
                <div className="p-1.5 sm:p-2 bg-green-500/10 rounded-lg border border-green-400/30 flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">Success Checkpoint</h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{task.checkpoint}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default RoadmapTask;
