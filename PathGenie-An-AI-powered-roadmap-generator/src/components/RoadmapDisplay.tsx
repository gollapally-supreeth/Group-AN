
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Download, Share, Bell } from 'lucide-react';
import { toast } from 'sonner';
import RoadmapWeek from './roadmap/RoadmapWeek';

interface RoadmapDisplayProps {
  roadmapData?: any;
  roadmapId?: string;
  onBack?: () => void;
}

const RoadmapDisplay: React.FC<RoadmapDisplayProps> = ({ roadmapData, roadmapId, onBack }) => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [openWeeks, setOpenWeeks] = useState<Set<number>>(new Set([1]));
  // Early return if no roadmap data is provided
  if (!roadmapData) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-8 shadow-xl">
          <h3 className="text-white text-xl font-semibold mb-2">No Roadmap Data</h3>
          <p className="text-gray-400">Unable to load roadmap content. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const displayData = roadmapData;

  // Handle missing weeks data
  if (!displayData.weeks || !Array.isArray(displayData.weeks) || displayData.weeks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-8 shadow-xl">
          <h3 className="text-white text-xl font-semibold mb-2">No Weeks Data</h3>
          <p className="text-gray-400">This roadmap doesn't contain any weekly content yet.</p>
        </div>
      </div>
    );
  }

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const toggleWeek = (weekNumber: number) => {
    const newOpenWeeks = new Set(openWeeks);
    if (newOpenWeeks.has(weekNumber)) {
      newOpenWeeks.delete(weekNumber);
    } else {
      newOpenWeeks.add(weekNumber);
    }
    setOpenWeeks(newOpenWeeks);
  };

  const handleExportToPDF = () => {
    const roadmapText = `
${displayData.title}
Duration: ${displayData.duration}
Time Commitment: ${displayData.totalHours} hours/week

${displayData.weeks.map(week => `
Week ${week.week}: ${week.title}
${week.description}
Difficulty: ${week.difficulty}

Goals:
${week.goals?.map(goal => `• ${goal}`).join('\n') || ''}

Tasks:
${week.tasks?.map(task => `• ${task.title} (${task.duration})`).join('\n') || ''}

Checkpoint: ${week.checkpoint || 'N/A'}
`).join('\n')}
    `;

    const blob = new Blob([roadmapText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roadmap.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Roadmap exported successfully!');
  };

  const handleShareRoadmap = async () => {
    const shareText = `Check out this learning roadmap! ${displayData.duration} journey to master new skills.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: displayData.title,
          text: shareText,
          url: window.location.href,
        });
        toast.success('Roadmap shared successfully!');
      } catch (error) {
        if (error.name !== 'AbortError') {
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const shareText = `Check out this learning roadmap! ${window.location.href}`;
    navigator.clipboard.writeText(shareText).then(() => {
      toast.success('Roadmap link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

  const handleGetReminders = () => {
    toast.success('Reminders feature coming soon! We\'ll notify you about your learning milestones.');
  };

  const totalTasks = displayData.weeks.reduce((acc, week) => acc + (week.tasks?.length || 0), 0);
  const completedCount = completedTasks.size;
  const progressPercentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;
  return (
    <div className="space-y-6">
      {/* Progress Overview - Simplified */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">
          <div className="flex-1">
            {displayData.summary && (
              <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                {displayData.summary}
              </p>
            )}
            {displayData.motivationalTip && (
              <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-3 sm:p-4">
                <p className="text-purple-200 text-sm sm:text-base font-medium">
                  💡 {displayData.motivationalTip}
                </p>
              </div>
            )}
          </div>
            <div className="sm:text-right">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 sm:p-6 min-w-[200px]">
              <div className="text-2xl sm:text-4xl font-bold text-purple-400 mb-2">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-gray-300 mb-3 font-medium text-sm sm:text-base">Complete</div>
              <Progress value={progressPercentage} className="w-full bg-gray-700/50 h-2 sm:h-3" />
              <div className="text-xs sm:text-sm text-gray-400 mt-2">
                {completedCount} of {totalTasks} tasks
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Roadmap */}
      <div className="space-y-6 sm:space-y-8">
        {displayData.weeks?.map((week, index) => {
          const isOpen = openWeeks.has(week.week);
          return (
            <RoadmapWeek
              key={week.week}
              week={week}
              completedTasks={completedTasks}
              onToggleTask={toggleTask}
              isOpen={isOpen}
              onToggleWeek={toggleWeek}
              roadmapId={roadmapId}
            />
          );
        })}
      </div>      {/* Action Buttons - Mobile Optimized with better blending */}
      <div className="mt-12 sm:mt-16">
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Export & Share Your Progress</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              onClick={handleExportToPDF}
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Export to PDF
            </Button>
            <Button 
              onClick={handleShareRoadmap}
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Share className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Share Roadmap
            </Button>
            <Button 
              onClick={handleGetReminders}
              size="lg" 
              variant="outline"
              className="border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400/80 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-xl backdrop-blur-sm transition-all duration-300"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Set Reminders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDisplay;
