import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Target, CheckCircle, BookOpen, Star } from 'lucide-react';
import RoadmapTask from './RoadmapTask';

interface RoadmapWeekProps {
  week: any;
  completedTasks: Set<string>;
  onToggleTask: (taskId: string) => void;
  isOpen: boolean;
  onToggleWeek: (weekNumber: number) => void;
  roadmapId?: string;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
    case 'Intermediate': return 'bg-amber-500/20 text-amber-300 border-amber-400/30';
    case 'Advanced': return 'bg-red-500/20 text-red-300 border-red-400/30';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
  }
};

const RoadmapWeek: React.FC<RoadmapWeekProps> = ({
  week,
  completedTasks,
  onToggleTask,
  isOpen,
  onToggleWeek,
  roadmapId
}) => {
  const weekTasks = week.tasks?.length || 0;
  const weekCompleted = week.tasks?.filter((task: any) => completedTasks.has(task.id)).length || 0;
  const weekProgress = weekTasks > 0 ? (weekCompleted / weekTasks) * 100 : 0;  return (
    <Card
      className="group bg-slate-800/60 backdrop-blur-xl border border-slate-600/40 shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      
      <Collapsible open={isOpen} onOpenChange={() => onToggleWeek(week.week)}>
        <CollapsibleTrigger asChild>
          <CardHeader className="relative cursor-pointer hover:bg-slate-700/40 transition-all duration-300 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-6">                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                  {week.week}
                </div><div className="flex-1">
                  <CardTitle className="text-lg sm:text-2xl text-white mb-2">
                    Week {week.week}: {week.title}
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg text-gray-300">{week.description}</CardDescription>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <Badge className={`${getDifficultyColor(week.difficulty)} border text-xs sm:text-sm px-2 sm:px-3 py-1`}>
                  {week.difficulty}
                </Badge>
                <div className="text-left sm:text-right">
                  <div className="text-base sm:text-lg font-bold text-purple-400 mb-1">{Math.round(weekProgress)}%</div>
                  <Progress value={weekProgress} className="w-20 sm:w-24 bg-gray-700 h-2" />
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4 sm:space-y-6 p-4 sm:p-6">
            {week.goals && week.goals.length > 0 && (
              <div className="p-4 sm:p-6 bg-purple-500/20 border border-purple-400/30 rounded-xl sm:rounded-2xl">
                <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3 text-purple-300">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  Week Goals
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {week.goals.map((goal: string, idx: number) => (                    <li key={idx} className="flex items-center gap-2 sm:gap-3 text-gray-300 text-sm sm:text-base">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {week.tasks && week.tasks.length > 0 && (
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-bold text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-purple-300">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  Learning Tasks
                </h4>
                {week.tasks.map((task: any) => (
                  <RoadmapTask
                    key={task.id}
                    task={task}
                    completed={completedTasks.has(task.id)}
                    onToggle={onToggleTask}
                    roadmapId={roadmapId}
                  />
                ))}
              </div>
            )}

            {week.checkpoint && (
              <div className="p-4 sm:p-6 bg-purple-500/20 border border-purple-400/30 rounded-xl sm:rounded-2xl">
                <h4 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2 sm:gap-3 text-purple-300">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  Week Checkpoint
                </h4>
                <p className="text-purple-200 text-sm sm:text-lg">{week.checkpoint}</p>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default RoadmapWeek;
