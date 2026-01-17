import { cn } from "@/lib/utils";

interface MascotProps {
  type: "owl" | "fox" | "bunny" | "sheep";
  className?: string;
}

export const Mascot = ({ type, className }: MascotProps) => {
  const mascots = {
    owl: "🦉",
    fox: "🦊",
    bunny: "🐰",
    sheep: "🐑",
  };

  return (
    <div
      className={cn(
        "text-5xl select-none animate-float-gentle",
        className
      )}
    >
      {mascots[type]}
    </div>
  );
};
