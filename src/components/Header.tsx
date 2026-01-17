import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Palette, Users, Trophy } from "lucide-react";
import { StarCounter } from "@/components/progress/StarCounter";
import { useProgress } from "@/hooks/useProgress";

export const Header = () => {
  const location = useLocation();
  const { stars } = useProgress();
  
  const isActive = (path: string) => {
    if (path === "/resources") {
      return location.pathname.startsWith("/resources") || location.pathname.startsWith("/resource");
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-soft">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:animate-wiggle">✨</span>
          <span className="font-display text-xl font-bold text-foreground">
            CurioKids
          </span>
          <span className="text-2xl group-hover:animate-wiggle">🌈</span>
        </Link>

        {/* Star Counter */}
        <Link to="/progress" className="hidden sm:block hover:scale-105 transition-transform">
          <StarCounter count={stars} size="sm" />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          <Link to="/resources">
            <Button
              variant={isActive("/resources") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Resources</span>
            </Button>
          </Link>
          <Link to="/progress">
            <Button
              variant={isActive("/progress") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant={isActive("/dashboard") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Parents</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
