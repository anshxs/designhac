import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface AchievementBadgeProps {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
}

export const AchievementBadge = ({
  icon,
  title,
  description,
  unlocked,
  size = "md",
  showDetails = true,
}: AchievementBadgeProps) => {
  const sizeClasses = {
    sm: "w-12 h-12 text-xl",
    md: "w-16 h-16 text-2xl",
    lg: "w-20 h-20 text-3xl",
  };

  return (
    <div className={cn(
      "flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300",
      unlocked 
        ? "bg-gradient-to-br from-lavender/50 to-mint/50 shadow-soft hover:shadow-float hover:scale-105" 
        : "bg-muted/50 opacity-60"
    )}>
      <div className={cn(
        "relative rounded-full flex items-center justify-center transition-all",
        sizeClasses[size],
        unlocked 
          ? "bg-gradient-to-br from-cta to-accent shadow-glow" 
          : "bg-muted border-2 border-dashed border-muted-foreground/30"
      )}>
        {unlocked ? (
          <span className="animate-bounce-subtle">{icon}</span>
        ) : (
          <Lock className="w-5 h-5 text-muted-foreground/50" />
        )}
        
        {unlocked && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow-md">
            ✓
          </div>
        )}
      </div>
      
      {showDetails && (
        <div className="text-center">
          <h4 className={cn(
            "font-display font-bold text-sm",
            unlocked ? "text-foreground" : "text-muted-foreground"
          )}>
            {title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2 max-w-[120px]">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};
