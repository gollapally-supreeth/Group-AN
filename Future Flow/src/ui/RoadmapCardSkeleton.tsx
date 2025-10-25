import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const RoadmapCardSkeleton = () => {
  return (
    <div className="bg-slate-900/30 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-20 bg-purple-500/20" />
        <Skeleton className="h-5 w-5 bg-purple-500/20 rounded-full" />
      </div>
      <Skeleton className="h-8 w-3/4 bg-purple-500/20" />
      <Skeleton className="h-4 w-full bg-purple-500/20" />
      <Skeleton className="h-4 w-2/3 bg-purple-500/20" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-12 bg-purple-500/20 rounded-lg" />
        <Skeleton className="h-12 bg-purple-500/20 rounded-lg" />
      </div>
    </div>
  );
};

export default RoadmapCardSkeleton;
