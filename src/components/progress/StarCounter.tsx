import { Star } from "lucide-react";

interface StarCounterProps {
  count: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const StarCounter = ({ count, size = "md", showLabel = true }: StarCounterProps) => {
  const sizeClasses = {
    sm: "text-sm gap-1",
    md: "text-base gap-2",
    lg: "text-xl gap-2",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]} bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 px-3 py-1.5 rounded-full shadow-soft border border-amber-200/50`}>
      <Star className={`${iconSizes[size]} text-amber-500 fill-amber-400 animate-pulse-gentle`} />
      <span className="font-display font-bold text-amber-700 dark:text-amber-300">
        {count}
      </span>
      {showLabel && (
        <span className="text-amber-600/70 dark:text-amber-400/70 text-sm hidden sm:inline">
          {count === 1 ? "star" : "stars"}
        </span>
      )}
    </div>
  );
};
