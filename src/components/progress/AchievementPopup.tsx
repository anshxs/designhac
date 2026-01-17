import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles } from "lucide-react";
import type { Achievement } from "@/hooks/useProgress";

interface AchievementPopupProps {
  achievement: Achievement;
  onDismiss: () => void;
}

export const AchievementPopup = ({ achievement, onDismiss }: AchievementPopupProps) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" onClick={onDismiss} />
      
      <div className="relative bg-card rounded-3xl p-8 shadow-float animate-scale-in pointer-events-auto max-w-sm w-full text-center border-2 border-cta/30">
        {/* Confetti/sparkle effects */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-cta animate-pulse" />
            <div className="absolute -top-2 -left-4 text-2xl animate-bounce">✨</div>
            <div className="absolute -top-2 -right-4 text-2xl animate-bounce delay-100">✨</div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onDismiss}
        >
          <X className="w-4 h-4" />
        </Button>
        
        <div className="space-y-4">
          <div className="text-sm font-medium text-cta uppercase tracking-wider animate-pulse">
            🎉 Achievement Unlocked! 🎉
          </div>
          
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cta to-accent flex items-center justify-center shadow-glow animate-bounce-subtle">
            <span className="text-5xl">{achievement.icon}</span>
          </div>
          
          <div>
            <h3 className="text-2xl font-display font-bold text-foreground">
              {achievement.title}
            </h3>
            <p className="text-muted-foreground mt-1">
              {achievement.description}
            </p>
          </div>
          
          <Button variant="cta" onClick={onDismiss} className="mt-4">
            Awesome! 🌟
          </Button>
        </div>
      </div>
    </div>
  );
};
