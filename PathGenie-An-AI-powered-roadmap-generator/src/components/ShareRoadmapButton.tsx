
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Globe, Lock, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface ShareRoadmapButtonProps {
  roadmapId: string;
  isPublic: boolean;
  onUpdate: (isPublic: boolean) => void;
}

const ShareRoadmapButton: React.FC<ShareRoadmapButtonProps> = ({ 
  roadmapId, 
  isPublic, 
  onUpdate 
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleTogglePublic = async () => {
    if (!user) {
      toast.error('Please log in to manage roadmap visibility');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('roadmaps')
        .update({ 
          is_public: !isPublic,
          shared_at: !isPublic ? new Date().toISOString() : null
        })
        .eq('id', roadmapId)
        .eq('user_id', user.id);

      if (error) throw error;

      onUpdate(!isPublic);
      toast.success(
        !isPublic 
          ? 'Roadmap is now public and shared with community!' 
          : 'Roadmap is now private'
      );
    } catch (error) {
      console.error('Error updating roadmap visibility:', error);
      toast.error('Failed to update roadmap visibility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleTogglePublic}
      disabled={loading}
      variant={isPublic ? "secondary" : "outline"}
      size="lg"
      className={`transition-all duration-300 ${
        isPublic 
          ? 'bg-emerald-600/20 text-emerald-200 border-emerald-400/30 hover:bg-emerald-600/30' 
          : 'border-gray-400/40 text-gray-300 hover:bg-gray-500/20 hover:text-white hover:border-gray-400/80'
      } font-medium bg-black/30 backdrop-blur-sm`}
    >
      {isPublic ? (
        <>
          <Globe className="w-4 h-4 mr-2" />
          Public
          <Lock className="w-4 h-4 ml-2" />
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          Make Public
        </>
      )}
    </Button>
  );
};

export default ShareRoadmapButton;
