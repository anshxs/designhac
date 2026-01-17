import { Header } from "@/components/Header";
import { Sparkles } from "@/components/Sparkles";
import { ProgressDashboard } from "@/components/progress/ProgressDashboard";
import { AchievementPopup } from "@/components/progress/AchievementPopup";
import { useProgress } from "@/hooks/useProgress";

const Progress = () => {
  const { newAchievement, dismissNewAchievement } = useProgress();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Achievement Popup */}
      {newAchievement && (
        <AchievementPopup
          achievement={newAchievement}
          onDismiss={dismissNewAchievement}
        />
      )}
      
      {/* Hero */}
      <section className="relative py-12 px-4 gradient-magic overflow-hidden">
        <Sparkles count={12} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <span className="text-2xl">🏆</span>
            <span className="font-display font-bold">My Adventures</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
            Your <span className="text-gradient">Progress</span> & Rewards
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how far you've come! Collect stars and unlock awesome badges.
          </p>
        </div>
      </section>

      {/* Progress Dashboard */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <ProgressDashboard />
      </main>
    </div>
  );
};

export default Progress;
