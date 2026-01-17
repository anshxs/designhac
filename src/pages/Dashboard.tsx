import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sparkles } from "@/components/Sparkles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResourceCard } from "@/components/ResourceCard";
import { resources } from "@/data/resources";
import { Brain, Heart, Hand, Lightbulb, BookOpen, Star, Download } from "lucide-react";

const skillCollections = [
  {
    id: "creativity",
    name: "Creativity & Imagination",
    icon: <Lightbulb className="w-6 h-6" />,
    description: "Activities that spark creative thinking and artistic expression",
    color: "bg-lavender",
    resourceIds: ["rainbow-unicorn", "character-creator", "cardboard-castle"],
  },
  {
    id: "motor-skills",
    name: "Fine Motor Skills",
    icon: <Hand className="w-6 h-6" />,
    description: "Cutting, drawing, and crafting for dexterity development",
    color: "bg-mint",
    resourceIds: ["paper-butterfly", "step-by-step-butterfly", "nature-crown"],
  },
  {
    id: "emotional",
    name: "Emotional Learning",
    icon: <Heart className="w-6 h-6" />,
    description: "Understanding feelings and building empathy",
    color: "bg-accent",
    resourceIds: ["emotion-faces", "emotion-stories", "feelings-story-cards"],
  },
  {
    id: "cognitive",
    name: "Problem Solving",
    icon: <Brain className="w-6 h-6" />,
    description: "Puzzles and challenges that build logical thinking",
    color: "bg-sky",
    resourceIds: ["maze-kingdom", "dragon-drawing", "story-dice"],
  },
];

const parentTips = [
  {
    icon: "🎨",
    title: "Embrace the Mess",
    content: "Creative play is rarely tidy! Prepare the space with covers and let them explore freely.",
  },
  {
    icon: "🗣️",
    title: "Ask Open Questions",
    content: "Instead of 'Is that a dog?', try 'Tell me about your picture!' to encourage storytelling.",
  },
  {
    icon: "⏰",
    title: "Follow Their Lead",
    content: "Let children set the pace. If they want to color the sky purple, that's perfect!",
  },
  {
    icon: "🌟",
    title: "Celebrate Process",
    content: "Focus praise on effort and exploration rather than the final result.",
  },
];

const ageRecommendations = [
  { age: "4-5", emoji: "🐣", activities: ["Simple coloring", "Sock puppets", "Story starters"], color: "bg-mint/30" },
  { age: "6-8", emoji: "🦋", activities: ["Step-by-step drawing", "Nature journals", "Character creation"], color: "bg-lavender/30" },
  { age: "9-12", emoji: "🦅", activities: ["Complex crafts", "Creative writing", "Brain teasers"], color: "bg-sky/30" },
];

const Dashboard = () => {
  const featuredResources = resources.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative py-16 px-4 gradient-magic overflow-hidden">
        <Sparkles count={15} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-2xl">👋</span>
            <span className="font-display font-bold">Welcome, Creative Guide!</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Parent & Teacher <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resources, tips, and curated collections to support your child's creative journey.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Skill Collections */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-2">
            Curated by <span className="text-gradient">Skill Area</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Focused collections for targeted learning and development
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCollections.map((collection, index) => (
              <div
                key={collection.id}
                className={`${collection.color} rounded-2xl p-6 hover:shadow-float transition-all duration-300 animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card rounded-xl shadow-soft">
                    {collection.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {collection.description}
                    </p>
                    <Badge variant="outline" className="bg-card/50">
                      {collection.resourceIds.length} activities
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Age Recommendations */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-2">
            Recommendations by <span className="text-gradient">Age</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Activities perfectly matched to your child's developmental stage
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ageRecommendations.map((rec, index) => (
              <div
                key={rec.age}
                className={`${rec.color} rounded-2xl p-6 animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center mb-4">
                  <span className="text-5xl block mb-2">{rec.emoji}</span>
                  <h3 className="font-display font-bold text-xl">Ages {rec.age}</h3>
                </div>
                <ul className="space-y-2">
                  {rec.activities.map((activity) => (
                    <li key={activity} className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-cta" />
                      {activity}
                    </li>
                  ))}
                </ul>
                <Link to={`/collections/age/${rec.age}`}>
                  <Button variant="outline" size="sm" className="w-full mt-4 bg-card">
                    View Collection
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Parent Tips */}
        <section className="bg-card rounded-3xl p-8 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-display font-bold">
              Tips for Guiding <span className="text-gradient">Creative Play</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parentTips.map((tip, index) => (
              <div
                key={tip.title}
                className="flex gap-4 p-4 bg-background rounded-xl animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-3xl">{tip.icon}</span>
                <div>
                  <h4 className="font-display font-bold mb-1">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Downloads */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">
              Popular <span className="text-gradient">Downloads</span>
            </h2>
            <Button variant="ghost" className="gap-2">
              <Download className="w-4 h-4" />
              Download All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredResources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                {...resource}
                delay={index * 100}
              />
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-gradient-to-r from-lavender via-sky to-mint rounded-3xl p-8 text-center">
          <span className="text-5xl block mb-4">📬</span>
          <h2 className="text-2xl font-display font-bold mb-2">
            Get Weekly Creative Ideas
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join our newsletter for new activities, seasonal crafts, and exclusive printables!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="cta" size="lg">
              Subscribe ✨
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
