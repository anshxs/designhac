import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  colorScheme?: "default" | "rainbow" | "category";
  categoryColor?: string;
}

export const ProgressBar = ({
  value,
  label,
  showPercentage = true,
  size = "md",
  colorScheme = "default",
  categoryColor,
}: ProgressBarProps) => {
  const sizeClasses = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  };

  const getProgressColor = () => {
    if (colorScheme === "category" && categoryColor) {
      return categoryColor;
    }
    if (colorScheme === "rainbow") {
      if (value < 25) return "bg-sky";
      if (value < 50) return "bg-mint";
      if (value < 75) return "bg-lavender";
      return "bg-gradient-to-r from-cta to-accent";
    }
    return "bg-primary";
  };

  return (
    <div className="w-full space-y-1">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && (
            <span className="font-medium text-foreground">{label}</span>
          )}
          {showPercentage && (
            <span className="font-display font-bold text-primary">
              {value}%
            </span>
          )}
        </div>
      )}
      
      <div className={cn(
        "relative w-full overflow-hidden rounded-full bg-secondary",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out rounded-full",
            getProgressColor()
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
        
        {/* Animated shimmer effect */}
        {value > 0 && value < 100 && (
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
            style={{ width: `${value}%` }}
          />
        )}
        
        {/* Completion celebration */}
        {value >= 100 && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
        )}
      </div>
    </div>
  );
};
