import { cn } from "@/lib/utils";

interface FloatingCloudProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

export const FloatingCloud = ({ className, size = "md", delay = 0 }: FloatingCloudProps) => {
  const sizeClasses = {
    sm: "w-16 h-8",
    md: "w-24 h-12",
    lg: "w-40 h-20",
  };

  return (
    <div
      className={cn(
        "absolute opacity-60",
        sizeClasses[size],
        className
      )}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      <svg viewBox="0 0 100 50" className="w-full h-full fill-cloud animate-drift">
        <ellipse cx="25" cy="35" rx="20" ry="15" />
        <ellipse cx="50" cy="30" rx="25" ry="18" />
        <ellipse cx="75" cy="35" rx="20" ry="15" />
        <ellipse cx="40" cy="22" rx="18" ry="14" />
        <ellipse cx="60" cy="22" rx="18" ry="14" />
      </svg>
    </div>
  );
};
