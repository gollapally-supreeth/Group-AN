
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, TrendingUp } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { Link } from 'react-router-dom';

const UsageIndicator = () => {
  const { subscription, usage, isProUser } = useSubscription();

  if (isProUser) {
    return (
      <div className="flex items-center gap-2">
        <Crown className="w-4 h-4 text-yellow-400" />
        <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-medium">
          Pro
        </Badge>
      </div>
    );
  }

  const monthlyLimit = 1;
  const usagePercent = Math.min((usage.gemini / monthlyLimit) * 100, 100);
  const remainingRoadmaps = Math.max(monthlyLimit - usage.gemini, 0);

  const getProgressColor = () => {
    if (usagePercent === 0) return 'bg-cyan-400';
    if (usagePercent < 100) return 'bg-cyan-500';
    return 'bg-red-400';
  };

  const getProgressBgColor = () => {
    return 'bg-slate-700/50';
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-1 min-w-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300 font-medium">Roadmaps</span>
          <span className="text-xs text-cyan-400 font-semibold">{remainingRoadmaps}/{monthlyLimit}</span>
        </div>
        <div className={`h-2 w-full rounded-full ${getProgressBgColor()} overflow-hidden border border-slate-600/30`}>
          <div 
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor()} shadow-sm`}
            style={{ width: `${usagePercent}%` }}
          />
        </div>
      </div>
      {remainingRoadmaps === 0 && (
        <Link to="/pricing">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400 text-xs hover:bg-cyan-400/20 cursor-pointer transition-colors group">
            <TrendingUp className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
            Upgrade
          </Badge>
        </Link>
      )}
    </div>
  );
};

export default UsageIndicator;
