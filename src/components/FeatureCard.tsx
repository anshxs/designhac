import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: "lavender" | "mint" | "peach" | "sky";
  delay?: number;
}

const colorClasses = {
  lavender: "bg-lavender/30 border-lavender hover:bg-lavender/50",
  mint: "bg-mint/30 border-mint hover:bg-mint/50",
  peach: "bg-peach/30 border-peach hover:bg-peach/50",
  sky: "bg-sky/30 border-sky hover:bg-sky/50",
};

const iconBgClasses = {
  lavender: "bg-lavender",
  mint: "bg-mint",
  peach: "bg-peach",
  sky: "bg-sky",
};

export const FeatureCard = ({ icon, title, description, color, delay = 0 }: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group relative p-6 rounded-3xl border-2 transition-all duration-500 cursor-pointer",
        "hover:shadow-float hover:-translate-y-2 hover:scale-[1.02]",
        colorClasses[color],
        "animate-slide-up opacity-0"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-4",
          "shadow-soft group-hover:shadow-glow transition-all duration-300",
          "group-hover:scale-110 group-hover:rotate-3",
          iconBgClasses[color]
        )}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gradient transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      
      {/* Decorative corner sparkle */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-cta rounded-full opacity-0 group-hover:opacity-100 animate-sparkle transition-opacity" />
    </div>
  );
};
