
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LearningResource } from './useResourceDiscovery';

interface ResourceFetcherOptions {
  taskId: string;
  skillName: string;
  taskTitle: string;
  taskType: string;
  roadmapId: string;
}

export const useResourceFetcher = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateResourcesForTask = async (options: ResourceFetcherOptions) => {
    console.log('🚀 Starting resource generation for task:', options.taskId);
    console.log('📋 Task details:', {
      title: options.taskTitle,
      skill: options.skillName,
      type: options.taskType,
      roadmapId: options.roadmapId
    });
    
    setIsGenerating(true);
    
    try {
      console.log('📡 Calling generate-learning-resources edge function...');
      
      // Call our edge function to generate resources
      const { data, error } = await supabase.functions.invoke('generate-learning-resources', {
        body: {
          taskId: options.taskId,
          skillName: options.skillName,
          taskTitle: options.taskTitle,
          taskType: options.taskType,
          roadmapId: options.roadmapId
        }
      });

      if (error) {
        console.error('❌ Edge function error:', error);
        throw error;
      }

      console.log('✅ Edge function response:', data);
      console.log(`📊 Generated ${data?.resources?.length || 0} resources`);
      
      return data;
    } catch (error) {
      console.error('💥 Error in resource generation:', error);
      throw error;
    } finally {
      setIsGenerating(false);
      console.log('🏁 Resource generation process completed');
    }
  };

  return {
    generateResourcesForTask,
    isGenerating
  };
};
