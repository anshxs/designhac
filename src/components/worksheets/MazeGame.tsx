import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "@/components/Sparkles";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Star } from "lucide-react";

type Cell = "path" | "wall" | "start" | "end" | "player" | "visited";
type Position = { x: number; y: number };

interface MazeGameProps {
  onComplete?: (stars: number) => void;
  isCompleted?: boolean;
}

const easyMaze: Cell[][] = [
  ["start", "path", "wall", "wall", "wall"],
  ["wall", "path", "path", "path", "wall"],
  ["wall", "wall", "wall", "path", "wall"],
  ["wall", "path", "path", "path", "wall"],
  ["wall", "path", "wall", "wall", "wall"],
  ["wall", "path", "path", "path", "end"],
];

const mediumMaze: Cell[][] = [
  ["start", "path", "wall", "path", "path", "path", "wall"],
  ["wall", "path", "wall", "path", "wall", "path", "wall"],
  ["wall", "path", "path", "path", "wall", "path", "wall"],
  ["wall", "wall", "wall", "path", "wall", "path", "path"],
  ["wall", "path", "path", "path", "path", "wall", "path"],
  ["wall", "path", "wall", "wall", "wall", "wall", "path"],
  ["wall", "path", "path", "path", "path", "path", "end"],
];

const hardMaze: Cell[][] = [
  ["start", "path", "wall", "path", "path", "path", "wall", "path"],
  ["wall", "path", "wall", "path", "wall", "path", "wall", "path"],
  ["wall", "path", "path", "path", "wall", "path", "path", "path"],
  ["wall", "wall", "wall", "path", "wall", "wall", "wall", "path"],
  ["wall", "path", "path", "path", "path", "path", "wall", "path"],
  ["wall", "path", "wall", "wall", "wall", "path", "wall", "path"],
  ["path", "path", "path", "wall", "path", "path", "wall", "path"],
  ["wall", "wall", "path", "wall", "path", "wall", "wall", "path"],
  ["wall", "path", "path", "path", "path", "path", "path", "end"],
];

const difficulties = [
  { id: "easy", label: "Easy 🌟", maze: easyMaze, emoji: "🐣", stars: 1 },
  { id: "medium", label: "Medium 🌟🌟", maze: mediumMaze, emoji: "🐥", stars: 2 },
  { id: "hard", label: "Hard 🌟🌟🌟", maze: hardMaze, emoji: "🦅", stars: 3 },
];

export const MazeGame = ({ onComplete, isCompleted }: MazeGameProps) => {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [maze, setMaze] = useState<Cell[][]>([]);
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [completionTime, setCompletionTime] = useState<number>(0);
  const [starsEarned, setStarsEarned] = useState(1);

  const startGame = (diff: string) => {
    const selectedDiff = difficulties.find((d) => d.id === diff);
    if (!selectedDiff) return;

    const newMaze = selectedDiff.maze.map((row) => [...row]);
    setMaze(newMaze);
    setDifficulty(diff);
    setPlayerPos({ x: 0, y: 0 });
    setVisited(new Set(["0,0"]));
    setMoves(0);
    setShowComplete(false);
    setStartTime(Date.now());
  };

  const movePlayer = (dx: number, dy: number) => {
    if (showComplete) return;

    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    // Check bounds
    if (newY < 0 || newY >= maze.length || newX < 0 || newX >= maze[0].length) {
      return;
    }

    // Check if wall
    if (maze[newY][newX] === "wall") {
      return;
    }

    // Move player
    setPlayerPos({ x: newX, y: newY });
    setVisited((prev) => new Set([...prev, `${newX},${newY}`]));
    setMoves((prev) => prev + 1);

    // Check if reached end
    if (maze[newY][newX] === "end") {
      const time = Math.floor((Date.now() - startTime) / 1000);
      setCompletionTime(time);
      const diffData = difficulties.find((d) => d.id === difficulty);
      const earnedStars = diffData?.stars || 1;
      setStarsEarned(earnedStars);
      setShowComplete(true);
      onComplete?.(earnedStars);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!difficulty || showComplete) return;
      
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          movePlayer(0, -1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [difficulty, showComplete, playerPos, maze]);

  if (showComplete) {
    const diffData = difficulties.find((d) => d.id === difficulty);
    return (
      <div className="relative bg-gradient-to-br from-mint/20 to-sky/20 rounded-3xl p-8 text-center">
        <Sparkles count={30} />
        <div className="text-8xl mb-6 animate-bounce-soft">🏆</div>
        <h3 className="text-3xl font-display font-bold text-primary mb-4">
          You Found the Castle!
        </h3>
        <p className="text-lg text-muted-foreground mb-4">
          Amazing navigation skills, brave explorer!
        </p>
        
        {/* Stars earned */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[...Array(starsEarned)].map((_, i) => (
            <Star key={i} className="w-8 h-8 text-amber-500 fill-amber-400" />
          ))}
          <span className="text-2xl font-display font-bold text-amber-600">
            +{starsEarned} Stars earned!
          </span>
        </div>
        
        <div className="bg-card rounded-2xl p-6 max-w-sm mx-auto mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{moves}</div>
              <div className="text-sm text-muted-foreground">Moves</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-mint">{completionTime}s</div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="text-lg">{diffData?.emoji} {diffData?.label} completed!</div>
          </div>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            variant="outline"
            size="lg"
            onClick={() => startGame(difficulty!)}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="cta"
            size="lg"
            onClick={() => setDifficulty(null)}
          >
            Choose New Level 🗺️
          </Button>
        </div>
      </div>
    );
  }

  if (!difficulty) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-mint/30 to-sky/30 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-display font-bold mb-2">🏰 Castle Maze Challenge</h3>
          <p className="text-muted-foreground">
            Help the brave knight find the path to the castle! Choose your difficulty level.
          </p>
          {isCompleted && (
            <p className="text-xs text-mint mt-2">✓ Previously completed!</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {difficulties.map((diff) => (
            <button
              key={diff.id}
              onClick={() => startGame(diff.id)}
              className="bg-card hover:bg-card/80 rounded-2xl p-6 text-center transition-all hover:scale-105 border-2 border-transparent hover:border-primary"
            >
              <div className="text-5xl mb-4">{diff.emoji}</div>
              <div className="text-xl font-display font-bold mb-2">{diff.label}</div>
              <div className="text-sm text-muted-foreground mb-2">
                {diff.id === "easy" && "5x6 maze - Perfect for beginners!"}
                {diff.id === "medium" && "7x7 maze - A bit tricky!"}
                {diff.id === "hard" && "8x9 maze - For maze masters!"}
              </div>
              <div className="flex justify-center gap-1">
                {[...Array(diff.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-400" />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex justify-between items-center bg-card rounded-xl p-4">
        <div className="flex gap-6">
          <div>
            <span className="text-sm text-muted-foreground">Moves: </span>
            <span className="font-bold text-primary">{moves}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Level: </span>
            <span className="font-bold">{difficulties.find((d) => d.id === difficulty)?.label}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => startGame(difficulty)}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Restart
        </Button>
      </div>

      {/* Maze */}
      <div className="flex justify-center">
        <div className="bg-card rounded-2xl p-4 inline-block">
          {maze.map((row, y) => (
            <div key={y} className="flex">
              {row.map((cell, x) => {
                const isPlayer = playerPos.x === x && playerPos.y === y;
                const isVisitedCell = visited.has(`${x},${y}`) && !isPlayer;
                
                return (
                  <div
                    key={`${x}-${y}`}
                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl transition-all ${
                      cell === "wall"
                        ? "bg-stone-700"
                        : cell === "end"
                        ? "bg-gradient-to-br from-amber-300 to-amber-500"
                        : isVisitedCell
                        ? "bg-mint/30"
                        : "bg-stone-200"
                    }`}
                  >
                    {isPlayer && "🧑‍🦱"}
                    {cell === "end" && !isPlayer && "🏰"}
                    {cell === "start" && !isPlayer && "🚩"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground mb-2">
          Use arrow keys or buttons to move
        </p>
        <Button
          variant="outline"
          size="lg"
          onClick={() => movePlayer(0, -1)}
          className="w-16 h-16"
        >
          <ArrowUp className="h-8 w-8" />
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => movePlayer(-1, 0)}
            className="w-16 h-16"
          >
            <ArrowLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => movePlayer(0, 1)}
            className="w-16 h-16"
          >
            <ArrowDown className="h-8 w-8" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => movePlayer(1, 0)}
            className="w-16 h-16"
          >
            <ArrowRight className="h-8 w-8" />
          </Button>
        </div>
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={() => setDifficulty(null)}>
          ← Back to Level Select
        </Button>
      </div>
    </div>
  );
};
