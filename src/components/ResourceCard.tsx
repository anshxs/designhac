import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  ageRange: string;
  difficulty: "easy" | "medium" | "challenging";
  delay?: number;
}

const difficultyColors = {
  easy: "bg-mint text-mint-foreground",
  medium: "bg-cta text-cta-foreground",
  challenging: "bg-accent text-accent-foreground",
};

const difficultyLabels = {
  easy: "Easy Peasy",
  medium: "Just Right",
  challenging: "Brain Buster",
};

export const ResourceCard = ({
  id,
  title,
  description,
  thumbnail,
  ageRange,
  difficulty,
  delay = 0,
}: ResourceCardProps) => {
  return (
    <Link
      to={`/resource/${id}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-2 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Thumbnail */}
      <div className="h-40 bg-gradient-to-br from-lavender via-sky to-mint flex items-center justify-center">
        <span className="text-7xl group-hover:scale-110 group-hover:animate-wiggle transition-transform duration-300">
          {thumbnail}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Badges */}
        <div className="flex gap-2 mb-3">
          <Badge variant="outline" className="text-xs bg-background">
            Ages {ageRange}
          </Badge>
          <Badge className={`text-xs ${difficultyColors[difficulty]}`}>
            {difficultyLabels[difficulty]}
          </Badge>
        </div>

        <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
};
