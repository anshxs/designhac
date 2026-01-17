import { useProgress } from "@/hooks/useProgress";
import { StarCounter } from "./StarCounter";
import { AchievementBadge } from "./AchievementBadge";
import { ProgressBar } from "./ProgressBar";
import { categories } from "@/data/resources";
import { Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgressDashboardProps {
  compact?: boolean;
}

export const ProgressDashboard = ({ compact = false }: ProgressDashboardProps) => {
  const {
    stars,
    completedActivities,
    getTotalProgress,
    getCategoryProgress,
    getAchievements,
    resetProgress,
  } = useProgress();

  const achievements = getAchievements();
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalProgress = getTotalProgress();

  if (compact) {
    return (
      <div className="bg-card rounded-2xl p-4 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg">Your Progress</h3>
          <StarCounter count={stars} size="sm" />
        </div>
        <ProgressBar value={totalProgress} label="Overall Progress" size="sm" colorScheme="rainbow" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="w-4 h-4 text-cta" />
          <span>{unlockedCount} of {achievements.length} badges earned</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with stars */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold">
            Your <span className="text-gradient">Progress</span>
          </h2>
          <p className="text-muted-foreground">
            {completedActivities.length} activities completed
          </p>
        </div>
        <StarCounter count={stars} size="lg" />
      </div>

      {/* Overall Progress */}
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <ProgressBar 
          value={totalProgress} 
          label="Overall Adventure Progress" 
          size="lg" 
          colorScheme="rainbow" 
        />
        
        <div className="mt-4 text-center">
          {totalProgress === 100 ? (
            <p className="text-lg font-display font-bold text-cta animate-pulse">
              🎊 Amazing! You've completed everything! 🎊
            </p>
          ) : totalProgress >= 75 ? (
            <p className="text-muted-foreground">Almost there! Keep going! 🚀</p>
          ) : totalProgress >= 50 ? (
            <p className="text-muted-foreground">Halfway through! You're doing great! ⭐</p>
          ) : totalProgress >= 25 ? (
            <p className="text-muted-foreground">Great start! Keep exploring! 🌟</p>
          ) : (
            <p className="text-muted-foreground">Let the adventure begin! 🎨</p>
          )}
        </div>
      </div>

      {/* Category Progress */}
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h3 className="font-display font-bold text-lg mb-4">Progress by Category</h3>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <span className="text-2xl w-8">{category.icon}</span>
              <div className="flex-1">
                <ProgressBar
                  value={getCategoryProgress(category.id)}
                  label={category.name}
                  size="sm"
                  showPercentage={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-cta" />
            Achievement Badges
          </h3>
          <span className="text-sm text-muted-foreground">
            {unlockedCount}/{achievements.length} unlocked
          </span>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {achievements.map((achievement) => (
            <AchievementBadge
              key={achievement.id}
              icon={achievement.icon}
              title={achievement.title}
              description={achievement.description}
              unlocked={achievement.unlocked}
              size="sm"
              showDetails={true}
            />
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm("Are you sure you want to reset all progress? This cannot be undone!")) {
              resetProgress();
            }
          }}
          className="text-muted-foreground hover:text-destructive"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Progress
        </Button>
      </div>
    </div>
  );
};
