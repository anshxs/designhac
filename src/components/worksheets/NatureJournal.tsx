import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles } from "@/components/Sparkles";
import { Check, Leaf, Bug, Cloud, Sun, Droplets, Star } from "lucide-react";

interface JournalEntry {
  date: string;
  weather: string[];
  discoveries: string[];
  drawing: string;
  notes: string;
}

interface NatureJournalProps {
  onComplete?: (stars: number) => void;
  isCompleted?: boolean;
}

const weatherOptions = [
  { id: "sunny", icon: Sun, label: "Sunny ☀️" },
  { id: "cloudy", icon: Cloud, label: "Cloudy ☁️" },
  { id: "rainy", icon: Droplets, label: "Rainy 🌧️" },
];

const discoveryOptions = [
  { id: "leaf", icon: Leaf, label: "Found a leaf 🍂" },
  { id: "bug", icon: Bug, label: "Saw a bug 🐛" },
  { id: "flower", label: "Found a flower 🌸" },
  { id: "bird", label: "Spotted a bird 🐦" },
  { id: "rock", label: "Cool rock 🪨" },
  { id: "animal", label: "Saw an animal 🦔" },
];

export const NatureJournal = ({ onComplete, isCompleted }: NatureJournalProps) => {
  const [entry, setEntry] = useState<JournalEntry>({
    date: new Date().toLocaleDateString(),
    weather: [],
    discoveries: [],
    drawing: "",
    notes: "",
  });
  const [showComplete, setShowComplete] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);

  const toggleWeather = (id: string) => {
    setEntry((prev) => ({
      ...prev,
      weather: prev.weather.includes(id)
        ? prev.weather.filter((w) => w !== id)
        : [...prev.weather, id],
    }));
  };

  const toggleDiscovery = (id: string) => {
    setEntry((prev) => ({
      ...prev,
      discoveries: prev.discoveries.includes(id)
        ? prev.discoveries.filter((d) => d !== id)
        : [...prev.discoveries, id],
    }));
  };

  const handleComplete = () => {
    setShowComplete(true);
    const starsEarned = progress === 100 ? 2 : 1;
    onComplete?.(starsEarned);
  };

  const progress =
    (entry.weather.length > 0 ? 25 : 0) +
    (entry.discoveries.length > 0 ? 25 : 0) +
    (entry.drawing ? 25 : 0) +
    (entry.notes ? 25 : 0);

  if (showComplete || isCompleted) {
    return (
      <div className="relative bg-gradient-to-br from-mint/20 to-lavender/20 rounded-3xl p-8 text-center">
        <Sparkles count={30} />
        <div className="text-8xl mb-6 animate-bounce-soft">🎉</div>
        <h3 className="text-3xl font-display font-bold text-primary mb-4">
          Amazing Nature Explorer!
        </h3>
        <p className="text-lg text-muted-foreground mb-4">
          You completed your nature journal entry for today!
        </p>
        
        {/* Stars earned */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Star className="w-8 h-8 text-amber-500 fill-amber-400" />
          <span className="text-2xl font-display font-bold text-amber-600">
            +{progress === 100 ? 2 : 1} Stars earned!
          </span>
          {progress === 100 && <Star className="w-8 h-8 text-amber-500 fill-amber-400" />}
        </div>
        
        {showComplete && (
          <div className="bg-card rounded-2xl p-6 max-w-md mx-auto mb-6 text-left">
            <h4 className="font-bold mb-3">📔 Your Journal Entry</h4>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Date:</strong> {entry.date}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Weather:</strong>{" "}
              {entry.weather
                .map((w) => weatherOptions.find((o) => o.id === w)?.label)
                .join(", ")}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Discoveries:</strong>{" "}
              {entry.discoveries
                .map((d) => discoveryOptions.find((o) => o.id === d)?.label)
                .join(", ")}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Notes:</strong> {entry.notes}
            </p>
          </div>
        )}
        
        <Button
          variant="cta"
          size="xl"
          onClick={() => {
            setShowComplete(false);
            setEntry({
              date: new Date().toLocaleDateString(),
              weather: [],
              discoveries: [],
              drawing: "",
              notes: "",
            });
          }}
        >
          {isCompleted ? "Do it Again! 🌱" : "Start New Entry 🌱"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="bg-card rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Your Progress</span>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-primary font-bold">{progress}%</span>
          </div>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-mint to-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {progress === 100 ? "⭐ Complete for 2 stars!" : "Complete all sections for bonus stars!"}
        </p>
      </div>

      {/* Date */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
          📅 Today's Date
        </h3>
        <div className="text-2xl font-bold text-primary">{entry.date}</div>
      </div>

      {/* Weather */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
          🌤️ What's the weather like?
          {entry.weather.length > 0 && (
            <Check className="w-5 h-5 text-mint" />
          )}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {weatherOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleWeather(option.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                entry.weather.includes(option.id)
                  ? "border-primary bg-primary/10 scale-105"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="text-3xl mb-2">
                {option.id === "sunny" && "☀️"}
                {option.id === "cloudy" && "☁️"}
                {option.id === "rainy" && "🌧️"}
              </div>
              <div className="text-sm font-medium">{option.label.split(" ")[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Discoveries */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
          🔍 What did you discover?
          {entry.discoveries.length > 0 && (
            <Check className="w-5 h-5 text-mint" />
          )}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {discoveryOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleDiscovery(option.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                entry.discoveries.includes(option.id)
                  ? "border-primary bg-primary/10"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <Checkbox checked={entry.discoveries.includes(option.id)} />
                <span className="text-sm font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Drawing Area */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
          🎨 Draw what you found!
          {entry.drawing && <Check className="w-5 h-5 text-mint" />}
        </h3>
        <div className="border-2 border-dashed border-muted rounded-xl p-8 text-center bg-background">
          {!drawingMode ? (
            <div>
              <div className="text-4xl mb-4">✏️</div>
              <p className="text-muted-foreground mb-4">
                Describe or imagine your drawing
              </p>
              <Button
                variant="outline"
                onClick={() => setDrawingMode(true)}
              >
                Start Drawing Description
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                placeholder="Describe what you drew (e.g., 'A big green leaf with spots')"
                value={entry.drawing}
                onChange={(e) =>
                  setEntry((prev) => ({ ...prev, drawing: e.target.value }))
                }
                className="text-center"
              />
              <p className="text-xs text-muted-foreground">
                💡 Tip: You can print this page and draw a real picture!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
          📝 Your nature notes
          {entry.notes && <Check className="w-5 h-5 text-mint" />}
        </h3>
        <textarea
          className="w-full h-32 p-4 rounded-xl border-2 border-muted focus:border-primary outline-none resize-none bg-background"
          placeholder="Write about your nature adventure today! What sounds did you hear? What did things smell like? How did you feel?"
          value={entry.notes}
          onChange={(e) =>
            setEntry((prev) => ({ ...prev, notes: e.target.value }))
          }
        />
      </div>

      {/* Complete Button */}
      <div className="text-center">
        <Button
          variant="cta"
          size="xl"
          onClick={handleComplete}
          disabled={progress < 50}
          className="min-w-[200px]"
        >
          {progress < 50 ? "Complete at least 50%" : "Complete Journal Entry! 🌟"}
        </Button>
        {progress < 50 && (
          <p className="text-sm text-muted-foreground mt-2">
            Fill in at least 2 sections to complete your entry
          </p>
        )}
      </div>
    </div>
  );
};
