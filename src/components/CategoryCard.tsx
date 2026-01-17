import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: "lavender" | "mint" | "peach" | "sky";
  delay?: number;
}

const colorClasses = {
  lavender: "bg-lavender hover:shadow-[0_20px_50px_-12px_hsl(270_60%_70%/0.4)]",
  mint: "bg-mint hover:shadow-[0_20px_50px_-12px_hsl(160_60%_75%/0.4)]",
  peach: "bg-peach hover:shadow-[0_20px_50px_-12px_hsl(25_80%_85%/0.4)]",
  sky: "bg-sky hover:shadow-[0_20px_50px_-12px_hsl(200_80%_85%/0.4)]",
};

export const CategoryCard = ({ id, name, description, icon, color, delay = 0 }: CategoryCardProps) => {
  return (
    <Link
      to={`/resources/${id}`}
      className={`group block p-8 rounded-3xl ${colorClasses[color]} transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 shadow-card animate-slide-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-6xl mb-4 group-hover:animate-wiggle transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold text-foreground mb-2">
        {name}
      </h3>
      <p className="text-muted-foreground">
        {description}
      </p>
      <div className="mt-4 inline-flex items-center gap-2 text-foreground font-semibold group-hover:gap-3 transition-all">
        Explore
        <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
};
