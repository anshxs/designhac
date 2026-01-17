import { cn } from "@/lib/utils";

interface SparkleProps {
  className?: string;
  count?: number;
}

export const Sparkles = ({ className, count = 20 }: SparkleProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cta rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            opacity: 0.6 + Math.random() * 0.4,
            transform: `scale(${0.5 + Math.random() * 1})`,
          }}
        />
      ))}
    </div>
  );
};
