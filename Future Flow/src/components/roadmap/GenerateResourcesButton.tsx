
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { useResourceFetcher } from '@/hooks/useResourceFetcher';
import { toast } from 'sonner';

interface GenerateResourcesButtonProps {
  task: any;
  roadmapId: string;
  onResourcesGenerated: () => void;
}

const GenerateResourcesButton: React.FC<GenerateResourcesButtonProps> = ({
  task,
  roadmapId,
  onResourcesGenerated
}) => {
  const { generateResourcesForTask, isGenerating } = useResourceFetcher();

  const handleGenerateResources = async () => {
    console.log('🎯 Generate button clicked for task:', task.title);
    
    try {
      toast.info('🔄 Generating learning resources...', { duration: 2000 });
      
      await generateResourcesForTask({
        taskId: task.id,
        skillName: task.skill || 'general',
        taskTitle: task.title,
        taskType: task.type,
        roadmapId: roadmapId
      });
      
      console.log('🎉 Resources generated successfully!');
      toast.success('✅ Learning resources generated successfully!');
      onResourcesGenerated();
    } catch (error) {
      console.error('🚨 Failed to generate resources:', error);
      toast.error('❌ Failed to generate learning resources');
    }
  };

  return (
    <Button
      onClick={handleGenerateResources}
      disabled={isGenerating}
      size="sm"
      variant="outline"
      className="text-sm bg-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-600/30 hover:text-purple-200"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Resources
        </>
      )}
    </Button>
  );
};

export default GenerateResourcesButton;
