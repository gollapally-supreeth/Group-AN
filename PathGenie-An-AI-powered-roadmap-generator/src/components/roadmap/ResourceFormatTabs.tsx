
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, Code, Headphones, BarChart3, FileText, Github } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { LearningResource } from '@/hooks/useResourceDiscovery';
import ResourceCard from './ResourceCard';

interface ResourceFormatTabsProps {
  resources: LearningResource[];
  userProgress: Record<string, any>;
  onStatusChange: (resourceId: string, status: any) => void;
  typeCounts: Record<string, number>;
}

const formatConfig = {
  reading: { 
    icon: BookOpen, 
    label: 'Articles & Docs', 
    color: 'text-blue-300 border-blue-500/30 bg-blue-900/20 hover:bg-blue-900/30'
  },
  video: { 
    icon: Play, 
    label: 'Videos', 
    color: 'text-red-300 border-red-500/30 bg-red-900/20 hover:bg-red-900/30'
  },
  interactive: { 
    icon: Code, 
    label: 'GitHub & Code', 
    color: 'text-green-300 border-green-500/30 bg-green-900/20 hover:bg-green-900/30'
  },
  audio: { 
    icon: Headphones, 
    label: 'Audio', 
    color: 'text-purple-300 border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30'
  },
  visual: { 
    icon: BarChart3, 
    label: 'Visual', 
    color: 'text-orange-300 border-orange-500/30 bg-orange-900/20 hover:bg-orange-900/30'
  }
};

const ResourceFormatTabs: React.FC<ResourceFormatTabsProps> = ({
  resources,
  userProgress,
  onStatusChange,
  typeCounts
}) => {
  // Get the first available format type as default, or null if no resources
  const availableTypes = Object.keys(formatConfig).filter(type => (typeCounts[type] || 0) > 0);
  const [selectedFormat, setSelectedFormat] = useState<string>(availableTypes[0] || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const getFilteredResources = () => {
    if (!selectedFormat) return resources;
    return resources.filter(resource => resource.resource_type === selectedFormat);
  };

  const filteredResources = getFilteredResources();

  // Sort resources by quality score and official status
  const sortedResources = filteredResources.sort((a, b) => {
    if (a.is_official && !b.is_official) return -1;
    if (!a.is_official && b.is_official) return 1;
    return b.quality_score - a.quality_score;
  });
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Format Selection */}
      <div className="space-y-3">
        <h3 className="font-medium text-white text-sm sm:text-base">Choose Learning Format</h3>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
          {Object.entries(formatConfig).map(([type, config]) => {
            const count = typeCounts[type] || 0;
            if (count === 0) return null;

            const Icon = config.icon;
            const isSelected = selectedFormat === type;
            
            return (
              <Button
                key={type}
                size="sm"
                variant={isSelected ? 'default' : 'outline'}
                onClick={() => setSelectedFormat(type)}
                className={`text-xs sm:text-sm px-2 sm:px-3 py-2 flex-1 sm:flex-none ${
                  isSelected
                    ? 'bg-purple-600/90 text-white border-purple-500/50 hover:bg-purple-700/90 backdrop-blur-sm'
                    : 'bg-slate-800/50 text-slate-300 border-slate-600/30 hover:bg-slate-700/70 hover:text-white backdrop-blur-sm'
                }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{config.label}</span>
                <span className="sm:hidden">{config.label.split(' ')[0]}</span>
                <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs bg-slate-600/50 text-slate-300 border-slate-500/30">{count}</Badge>
              </Button>
            );
          })}
        </div>
      </div>      {/* Resources Display */}
      <div className="space-y-3 sm:space-y-4">
        {/* Always show first 3 resources */}
        {sortedResources.slice(0, 3).map((resource, index) => (
          <div key={resource.id} className="relative">
            {index === 0 && resource.is_official && (
              <div className="absolute -top-2 -right-2 z-10">
                <Badge className="text-xs bg-green-500/20 text-green-300 border-green-500/30 backdrop-blur-sm">
                  Official
                </Badge>
              </div>
            )}
            {index === 0 && !resource.is_official && (
              <div className="absolute -top-2 -right-2 z-10">
                <Badge className="text-xs bg-yellow-500/20 text-yellow-300 border-yellow-500/30 backdrop-blur-sm">
                  Top Quality
                </Badge>
              </div>
            )}
            <ResourceCard
              resource={resource}
              userProgress={userProgress[resource.id]}
              onStatusChange={onStatusChange}
              compact={false}
            />
          </div>
        ))}

        {/* Show more resources if available */}
        {sortedResources.length > 3 && (
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 sm:mt-4 text-xs sm:text-sm bg-slate-800/50 text-slate-300 border-slate-600/30 hover:bg-slate-700/70 hover:text-white backdrop-blur-sm py-2 sm:py-3"
              >
                {isExpanded ? (
                  <>Show Less</>
                ) : (
                  <>Show {sortedResources.length - 3} More Resource{sortedResources.length - 3 > 1 ? 's' : ''}</>
                )}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-3 mt-3 sm:mt-4">
              {sortedResources.slice(3).map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  userProgress={userProgress[resource.id]}
                  onStatusChange={onStatusChange}
                  compact={true}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>      {/* Empty state */}
      {filteredResources.length === 0 && (
        <div className="text-center py-6 sm:py-8">
          <div className="p-4 sm:p-6 bg-slate-800/30 border border-slate-600/20 rounded-xl backdrop-blur-sm">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-3" />
            <h3 className="text-gray-300 font-medium mb-1 text-sm sm:text-base">No Resources Available</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              No {selectedFormat ? formatConfig[selectedFormat as keyof typeof formatConfig]?.label.toLowerCase() : ''} resources are currently available for this task.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceFormatTabs;
