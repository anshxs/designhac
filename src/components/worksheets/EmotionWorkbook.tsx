import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "@/components/Sparkles";
import { ChevronRight, ChevronLeft, Check, Star } from "lucide-react";

interface EmotionWorkbookProps {
  onComplete?: (stars: number) => void;
  isCompleted?: boolean;
}

const emotions = [
  { emoji: "😊", name: "Happy", color: "bg-yellow-100" },
  { emoji: "😢", name: "Sad", color: "bg-blue-100" },
  { emoji: "😠", name: "Angry", color: "bg-red-100" },
  { emoji: "😨", name: "Scared", color: "bg-purple-100" },
  { emoji: "😲", name: "Surprised", color: "bg-pink-100" },
  { emoji: "🤔", name: "Confused", color: "bg-orange-100" },
];

const scenarios = [
  { text: "You get a surprise birthday party!", answer: "😲" },
  { text: "Someone took your favorite toy", answer: "😠" },
  { text: "You're playing with your best friend", answer: "😊" },
  { text: "You lost your pet", answer: "😢" },
  { text: "You hear a loud noise at night", answer: "😨" },
  { text: "You don't understand the homework", answer: "🤔" },
];

export const EmotionWorkbook = ({ onComplete, isCompleted }: EmotionWorkbookProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [matchAnswers, setMatchAnswers] = useState<Record<number, string>>({});
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [showComplete, setShowComplete] = useState(false);

  const pages = [
    { id: "intro", title: "Meet the Feelings!" },
    { id: "match", title: "Match the Feeling" },
    { id: "reflect-happy", title: "When I Feel Happy" },
    { id: "reflect-sad", title: "When I Feel Sad" },
    { id: "reflect-angry", title: "When I Feel Angry" },
    { id: "draw", title: "Draw Your Feeling" },
  ];

  const handleMatchSelect = (scenarioIndex: number, emoji: string) => {
    setMatchAnswers((prev) => ({ ...prev, [scenarioIndex]: emoji }));
  };

  const getMatchScore = () => {
    let correct = 0;
    scenarios.forEach((scenario, index) => {
      if (matchAnswers[index] === scenario.answer) correct++;
    });
    return correct;
  };

  const totalProgress = () => {
    let completed = 0;
    // Intro always counts
    completed += 1;
    // Match page - need at least 4 correct
    if (Object.keys(matchAnswers).length >= 4) completed += 1;
    // Reflections
    if (reflections["happy"]) completed += 1;
    if (reflections["sad"]) completed += 1;
    if (reflections["angry"]) completed += 1;
    // Drawing
    if (selectedEmotion) completed += 1;
    return Math.round((completed / pages.length) * 100);
  };

  const handleComplete = () => {
    if (totalProgress() >= 80) {
      setShowComplete(true);
      const starsEarned = totalProgress() === 100 ? 2 : 1;
      onComplete?.(starsEarned);
    }
  };

  if (showComplete || isCompleted) {
    return (
      <div className="relative bg-gradient-to-br from-peach/20 to-lavender/20 rounded-3xl p-8 text-center">
        <Sparkles count={30} />
        <div className="text-8xl mb-6 animate-bounce-soft">🌈</div>
        <h3 className="text-3xl font-display font-bold text-primary mb-4">
          Feelings Explorer Champion!
        </h3>
        <p className="text-lg text-muted-foreground mb-4">
          You learned so much about emotions today!
        </p>
        
        {/* Stars earned */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Star className="w-8 h-8 text-amber-500 fill-amber-400" />
          <span className="text-2xl font-display font-bold text-amber-600">
            +{totalProgress() === 100 ? 2 : 1} Stars earned!
          </span>
          {totalProgress() === 100 && <Star className="w-8 h-8 text-amber-500 fill-amber-400" />}
        </div>
        
        {showComplete && (
          <div className="bg-card rounded-2xl p-6 max-w-md mx-auto mb-6">
            <h4 className="font-bold mb-4">📊 Your Results</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{getMatchScore()}/6</div>
                <div className="text-sm text-muted-foreground">Matches Correct</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-mint">{Object.keys(reflections).length}</div>
                <div className="text-sm text-muted-foreground">Reflections</div>
              </div>
            </div>
          </div>
        )}
        
        <Button
          variant="cta"
          size="xl"
          onClick={() => {
            setShowComplete(false);
            setCurrentPage(0);
            setMatchAnswers({});
            setReflections({});
            setSelectedEmotion(null);
          }}
        >
          {isCompleted ? "Explore Again! 🔄" : "Start Over 🔄"}
        </Button>
      </div>
    );
  }

  const renderPage = () => {
    switch (pages[currentPage].id) {
      case "intro":
        return (
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-display font-bold">
              Let's Learn About Feelings! 💭
            </h3>
            <p className="text-muted-foreground">
              Everyone has feelings. They help us understand ourselves and others.
              Let's meet some feelings!
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {emotions.map((emotion) => (
                <div
                  key={emotion.name}
                  className={`${emotion.color} rounded-2xl p-4 text-center transition-transform hover:scale-110`}
                >
                  <div className="text-5xl mb-2">{emotion.emoji}</div>
                  <div className="text-sm font-medium">{emotion.name}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Click Next to start the activities! →
            </p>
          </div>
        );

      case "match":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold mb-2">
                Match the Feeling! 🎯
              </h3>
              <p className="text-muted-foreground">
                Read each situation and pick the feeling that matches.
              </p>
            </div>
            <div className="space-y-4">
              {scenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <p className="flex-1 font-medium">{scenario.text}</p>
                  <div className="flex gap-2 flex-wrap">
                    {emotions.map((emotion) => (
                      <button
                        key={emotion.emoji}
                        onClick={() => handleMatchSelect(index, emotion.emoji)}
                        className={`text-2xl p-2 rounded-lg transition-all ${
                          matchAnswers[index] === emotion.emoji
                            ? matchAnswers[index] === scenario.answer
                              ? "bg-mint/50 ring-2 ring-mint"
                              : "bg-red-100 ring-2 ring-red-300"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {emotion.emoji}
                      </button>
                    ))}
                  </div>
                  {matchAnswers[index] === scenario.answer && (
                    <Check className="w-6 h-6 text-mint flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-primary">
                Score: {getMatchScore()}/{scenarios.length}
              </p>
            </div>
          </div>
        );

      case "reflect-happy":
      case "reflect-sad":
      case "reflect-angry":
        const emotionKey = pages[currentPage].id.split("-")[1];
        const emotionData = emotions.find(
          (e) => e.name.toLowerCase() === emotionKey
        );
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-7xl mb-4">{emotionData?.emoji}</div>
              <h3 className="text-2xl font-display font-bold mb-2">
                {pages[currentPage].title}
              </h3>
            </div>
            <div className="bg-card rounded-xl p-6">
              <label className="block text-lg font-medium mb-4">
                What makes you feel {emotionKey}?
              </label>
              <textarea
                className="w-full h-24 p-4 rounded-xl border-2 border-muted focus:border-primary outline-none resize-none bg-background"
                placeholder={`I feel ${emotionKey} when...`}
                value={reflections[emotionKey] || ""}
                onChange={(e) =>
                  setReflections((prev) => ({
                    ...prev,
                    [emotionKey]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="bg-card rounded-xl p-6">
              <label className="block text-lg font-medium mb-4">
                What do you do when you feel {emotionKey}?
              </label>
              <textarea
                className="w-full h-24 p-4 rounded-xl border-2 border-muted focus:border-primary outline-none resize-none bg-background"
                placeholder={`When I feel ${emotionKey}, I like to...`}
                value={reflections[`${emotionKey}-do`] || ""}
                onChange={(e) =>
                  setReflections((prev) => ({
                    ...prev,
                    [`${emotionKey}-do`]: e.target.value,
                  }))
                }
              />
            </div>
            {reflections[emotionKey] && (
              <div className="text-center">
                <span className="inline-flex items-center gap-2 text-mint">
                  <Check className="w-5 h-5" />
                  Great reflection!
                </span>
              </div>
            )}
          </div>
        );

      case "draw":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-display font-bold mb-2">
                Draw How You Feel Right Now! 🎨
              </h3>
              <p className="text-muted-foreground">
                First, pick the emotion that matches how you're feeling.
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {emotions.map((emotion) => (
                <button
                  key={emotion.name}
                  onClick={() => setSelectedEmotion(emotion.emoji)}
                  className={`${emotion.color} rounded-2xl p-4 text-center transition-all ${
                    selectedEmotion === emotion.emoji
                      ? "ring-4 ring-primary scale-110"
                      : "hover:scale-105"
                  }`}
                >
                  <div className="text-4xl mb-2">{emotion.emoji}</div>
                  <div className="text-sm font-medium">{emotion.name}</div>
                </button>
              ))}
            </div>
            {selectedEmotion && (
              <div className="bg-card rounded-xl p-6 text-center animate-slide-up">
                <p className="text-lg mb-4">
                  You're feeling{" "}
                  <strong>
                    {emotions.find((e) => e.emoji === selectedEmotion)?.name}
                  </strong>{" "}
                  {selectedEmotion}
                </p>
                <div className="border-2 border-dashed border-muted rounded-xl p-8 bg-background">
                  <p className="text-muted-foreground">
                    🖍️ Print this page and draw a picture of how you feel!
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-card rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Your Progress</span>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-primary font-bold">{totalProgress()}%</span>
          </div>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-peach to-lavender rounded-full transition-all duration-500"
            style={{ width: `${totalProgress()}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {totalProgress() === 100 ? "⭐ Complete for 2 stars!" : "Complete all activities for bonus stars!"}
        </p>
        <div className="flex justify-between mt-2">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setCurrentPage(index)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                currentPage === index
                  ? "bg-primary text-primary-foreground"
                  : index < currentPage
                  ? "bg-mint text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-gradient-to-br from-peach/10 to-lavender/10 rounded-2xl p-6 min-h-[400px]">
        {renderPage()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {currentPage === pages.length - 1 ? (
          <Button
            variant="cta"
            onClick={handleComplete}
            disabled={totalProgress() < 80}
          >
            Complete Workbook! 🎉
          </Button>
        ) : (
          <Button
            variant="magic"
            onClick={() => setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1))}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
