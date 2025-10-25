
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface LearningResource {
  id: string;
  task_id: string;
  skill_name: string;
  title: string;
  url: string;
  resource_type: 'reading' | 'video' | 'interactive' | 'audio' | 'visual';
  source: string;
  description?: string;
  quality_score: number;
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
  estimated_time_minutes: number;
  tags: string[];
  metadata: any;
  is_official: boolean;
  roadmap_id?: string;
  created_at: string;
  updated_at: string;
}

export interface UserResourceProgress {
  id: string;
  user_id: string;
  resource_id: string;
  roadmap_id: string;
  status: 'planned' | 'in_progress' | 'completed' | 'bookmarked' | 'skipped';
  started_at?: string;
  completed_at?: string;
  rating?: number;
  notes?: string;
}

export const useResourceDiscovery = (taskId: string, skillName: string, roadmapId: string) => {
  const { user } = useAuth();
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, UserResourceProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (taskId && skillName && roadmapId) {
      fetchResources();
      if (user) {
        fetchUserProgress();
      }
    }
  }, [taskId, skillName, roadmapId, user]);

  const fetchResources = async () => {
    console.log('🔍 Fetching resources for task:', taskId, 'roadmap:', roadmapId);
    
    try {
      const { data, error } = await supabase
        .from('learning_resources')
        .select('*')
        .eq('task_id', taskId)
        .eq('roadmap_id', roadmapId)
        .order('quality_score', { ascending: false });

      if (error) throw error;
      
      console.log(`📚 Found ${data?.length || 0} resources for task ${taskId} in roadmap ${roadmapId}`);
      
      // Type cast the data to match our LearningResource interface
      const typedResources = (data || []).map(item => ({
        ...item,
        resource_type: item.resource_type as LearningResource['resource_type'],
        difficulty_level: item.difficulty_level as LearningResource['difficulty_level']
      }));
      
      setResources(typedResources);
    } catch (error) {
      console.error('💥 Error fetching resources:', error);
    }
  };

  const fetchUserProgress = async () => {
    if (!user) return;

    console.log('👤 Fetching user progress for roadmap:', roadmapId);

    try {
      const { data, error } = await supabase
        .from('user_resource_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('roadmap_id', roadmapId);

      if (error) throw error;

      console.log(`📊 Found progress for ${data?.length || 0} resources`);

      const progressMap: Record<string, UserResourceProgress> = {};
      
      (data || []).forEach((progress) => {
        progressMap[progress.resource_id] = progress as UserResourceProgress;
      });

      setUserProgress(progressMap);
    } catch (error) {
      console.error('💥 Error fetching user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateResourceStatus = async (resourceId: string, status: UserResourceProgress['status']) => {
    if (!user) return;

    try {
      const existingProgress = userProgress[resourceId];
      const updateData: any = {
        user_id: user.id,
        resource_id: resourceId,
        roadmap_id: roadmapId,
        status,
        updated_at: new Date().toISOString(),
      };

      if (status === 'in_progress' && !existingProgress?.started_at) {
        updateData.started_at = new Date().toISOString();
      }

      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('user_resource_progress')
        .upsert(updateData, { onConflict: 'user_id,resource_id' })
        .select('*')
        .single();

      if (error) throw error;

      setUserProgress(prev => ({
        ...prev,
        [resourceId]: data as UserResourceProgress
      }));
    } catch (error) {
      console.error('Error updating resource status:', error);
    }
  };

  const getResourcesByType = (type: LearningResource['resource_type']) => {
    return resources.filter(resource => resource.resource_type === type);
  };

  const getResourceTypeCounts = () => {
    return resources.reduce((acc, resource) => {
      acc[resource.resource_type] = (acc[resource.resource_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  return {
    resources,
    userProgress,
    loading,
    updateResourceStatus,
    getResourcesByType,
    getResourceTypeCounts,
    refetch: fetchResources
  };
};
