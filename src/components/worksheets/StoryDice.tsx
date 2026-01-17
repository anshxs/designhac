import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "@/components/Sparkles";
import { Dices, RotateCcw, Wand2, Star } from "lucide-react";

const characterDice = ["👸", "🧙‍♂️", "🦸", "🐉", "🤖", "🦊"];
const placeDice = ["🏰", "🌲", "🚀", "🏝️", "🌋", "🎪"];
const itemDice = ["🗝️", "📜", "💎", "🪄", "🗡️", "🎭"];
const actionDice = ["flying", "searching", "hiding", "dancing", "building", "dreaming"];

interface DiceState {
  character: string;
  place: string;
  item: string;
  action: string;
  isRolling: boolean;
}

interface StoryDiceProps {
  onComplete?: (stars: number) => void;
  isCompleted?: boolean;
}

export const StoryDice = ({ onComplete, isCompleted }: StoryDiceProps) => {
  const [dice, setDice] = useState<DiceState>({
    character: "❓",
    place: "❓",
    item: "❓",
    action: "???",
    isRolling: false,
  });
  const [story, setStory] = useState("");
  const [showComplete, setShowComplete] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);

  const rollDice = () => {
    setDice((prev) => ({ ...prev, isRolling: true }));
    setHasRolled(true);

    // Animate rolling
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDice({
        character: characterDice[Math.floor(Math.random() * characterDice.length)],
        place: placeDice[Math.floor(Math.random() * placeDice.length)],
        item: itemDice[Math.floor(Math.random() * itemDice.length)],
        action: actionDice[Math.floor(Math.random() * actionDice.length)],
        isRolling: true,
      });
      rollCount++;
      if (rollCount >= 10) {
        clearInterval(rollInterval);
        setDice((prev) => ({ ...prev, isRolling: false }));
      }
    }, 100);
  };

  const handleComplete = () => {
    if (story.length >= 50) {
      setShowComplete(true);
      const starsEarned = story.length >= 150 ? 2 : 1;
      onComplete?.(starsEarned);
    }
  };

  if (showComplete || isCompleted) {
    return (
      <div className="relative bg-gradient-to-br from-lavender/20 to-peach/20 rounded-3xl p-8 text-center">
        <Sparkles count={30} />
        <div className="text-8xl mb-6 animate-bounce-soft">📚</div>
        <h3 className="text-3xl font-display font-bold text-primary mb-4">
          Incredible Storyteller!
        </h3>
        <p className="text-lg text-muted-foreground mb-4">
          You created an amazing story with your dice!
        </p>
        
        {/* Stars earned */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Star className="w-8 h-8 text-amber-500 fill-amber-400" />
          <span className="text-2xl font-display font-bold text-amber-600">
            +{story.length >= 150 ? 2 : 1} Stars earned!
          </span>
          {story.length >= 150 && <Star className="w-8 h-8 text-amber-500 fill-amber-400" />}
        </div>
        
        {showComplete && (
          <div className="bg-card rounded-2xl p-6 max-w-lg mx-auto mb-6 text-left">
            <div className="flex gap-4 mb-4 justify-center text-4xl">
              <span>{dice.character}</span>
              <span>{dice.place}</span>
              <span>{dice.item}</span>
            </div>
            <h4 className="font-bold mb-3 text-center">📖 Your Story</h4>
            <p className="text-muted-foreground italic">"{story}"</p>
          </div>
        )}
        
        <Button
          variant="cta"
          size="xl"
          onClick={() => {
            setShowComplete(false);
            setStory("");
            setHasRolled(false);
            setDice({
              character: "❓",
              place: "❓",
              item: "❓",
              action: "???",
              isRolling: false,
            });
          }}
        >
          {isCompleted ? "Create Another Story! 🎲" : "Roll Again! 🎲"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Instructions */}
      <div className="bg-gradient-to-r from-lavender/30 to-peach/30 rounded-2xl p-6 text-center">
        <h3 className="text-xl font-display font-bold mb-2">🎲 How to Play</h3>
        <p className="text-muted-foreground">
          Roll the dice to get a character, place, item, and action. Then create a story using all of them!
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          <Star className="w-3 h-3 inline text-amber-500" /> Write 150+ characters for bonus stars!
        </p>
      </div>

      {/* Dice Area */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`bg-card rounded-2xl p-6 text-center ${dice.isRolling ? "animate-wiggle" : ""}`}>
          <div className="text-sm text-muted-foreground mb-2">Character</div>
          <div className={`text-6xl ${dice.isRolling ? "animate-spin" : "animate-bounce-soft"}`}>
            {dice.character}
          </div>
        </div>
        <div className={`bg-card rounded-2xl p-6 text-center ${dice.isRolling ? "animate-wiggle" : ""}`}>
          <div className="text-sm text-muted-foreground mb-2">Place</div>
          <div className={`text-6xl ${dice.isRolling ? "animate-spin" : "animate-bounce-soft"}`}>
            {dice.place}
          </div>
        </div>
        <div className={`bg-card rounded-2xl p-6 text-center ${dice.isRolling ? "animate-wiggle" : ""}`}>
          <div className="text-sm text-muted-foreground mb-2">Item</div>
          <div className={`text-6xl ${dice.isRolling ? "animate-spin" : "animate-bounce-soft"}`}>
            {dice.item}
          </div>
        </div>
        <div className={`bg-card rounded-2xl p-6 text-center ${dice.isRolling ? "animate-wiggle" : ""}`}>
          <div className="text-sm text-muted-foreground mb-2">Action</div>
          <div className="text-2xl font-bold text-primary capitalize">
            {dice.action}
          </div>
        </div>
      </div>

      {/* Roll Button */}
      <div className="text-center">
        <Button
          variant="magic"
          size="xl"
          onClick={rollDice}
          disabled={dice.isRolling}
          className="min-w-[200px]"
        >
          <Dices className="mr-2 h-5 w-5" />
          {dice.isRolling ? "Rolling..." : hasRolled ? "Roll Again!" : "Roll the Dice!"}
        </Button>
      </div>

      {/* Story Writing */}
      {hasRolled && !dice.isRolling && (
        <div className="bg-card rounded-2xl p-6 animate-slide-up">
          <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Now write your story!
          </h3>
          <div className="bg-lavender/20 rounded-xl p-4 mb-4">
            <p className="text-sm">
              <strong>Story starter:</strong> Once upon a time, {dice.character} was {dice.action} in {dice.place} when they found {dice.item}...
            </p>
          </div>
          <textarea
            className="w-full h-40 p-4 rounded-xl border-2 border-muted focus:border-primary outline-none resize-none bg-background"
            placeholder="Continue the story! What happens next? Be as creative as you want!"
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-sm text-muted-foreground">
                {story.length}/50 characters minimum
              </span>
              {story.length >= 150 && (
                <span className="text-xs text-amber-600 ml-2">⭐ Bonus stars!</span>
              )}
            </div>
            <Button
              variant="cta"
              onClick={handleComplete}
              disabled={story.length < 50}
            >
              Complete Story! ✨
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
