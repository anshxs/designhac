import { NatureJournal } from "./NatureJournal";
import { StoryDice } from "./StoryDice";
import { MazeGame } from "./MazeGame";
import { EmotionWorkbook } from "./EmotionWorkbook";
import { useProgress } from "@/hooks/useProgress";

interface WorksheetActivityProps {
  resourceId: string;
}

export const WorksheetActivity = ({ resourceId }: WorksheetActivityProps) => {
  const { completeActivity, isActivityCompleted } = useProgress();
  
  const handleComplete = (starsEarned: number = 1) => {
    completeActivity(resourceId, starsEarned);
  };

  const completed = isActivityCompleted(resourceId);

  switch (resourceId) {
    case "nature-journal":
      return <NatureJournal onComplete={handleComplete} isCompleted={completed} />;
    case "story-dice":
      return <StoryDice onComplete={handleComplete} isCompleted={completed} />;
    case "maze-kingdom":
      return <MazeGame onComplete={handleComplete} isCompleted={completed} />;
    case "emotion-faces":
      return <EmotionWorkbook onComplete={handleComplete} isCompleted={completed} />;
    default:
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚧</div>
          <p className="text-muted-foreground">
            This worksheet activity is coming soon!
          </p>
        </div>
      );
  }
};
