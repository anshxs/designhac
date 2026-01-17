import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sparkles } from "@/components/Sparkles";
import { ResourceCard } from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { resources } from "@/data/resources";
import { ArrowLeft } from "lucide-react";

const ageGroupData: Record<string, { emoji: string; title: string; description: string; color: string }> = {
  "4-5": {
    emoji: "🐣",
    title: "Little Explorers",
    description: "Simple and fun activities perfect for early learners",
    color: "from-mint/30 to-sky/30",
  },
  "6-8": {
    emoji: "🦋",
    title: "Creative Adventurers",
    description: "Engaging activities for growing minds and developing skills",
    color: "from-lavender/30 to-mint/30",
  },
  "9-12": {
    emoji: "🦅",
    title: "Master Creators",
    description: "Challenging projects for confident young creators",
    color: "from-sky/30 to-lavender/30",
  },
};

const parseAgeRange = (ageRange: string): [number, number] => {
  const [min, max] = ageRange.split("-").map(Number);
  return [min, max];
};

const isAgeInRange = (resourceAge: string, targetRange: string): boolean => {
  const [resourceMin, resourceMax] = parseAgeRange(resourceAge);
  const [targetMin, targetMax] = parseAgeRange(targetRange);
  
  // Check if there's any overlap between the ranges
  return resourceMin <= targetMax && resourceMax >= targetMin;
};

const AgeCollection = () => {
  const { ageRange } = useParams<{ ageRange: string }>();
  
  const groupData = ageGroupData[ageRange || ""] || {
    emoji: "🌟",
    title: "Activities",
    description: "Fun activities for kids",
    color: "from-lavender/30 to-mint/30",
  };

  const filteredResources = resources.filter((resource) => 
    isAgeInRange(resource.ageRange, ageRange || "")
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className={`relative py-12 px-4 bg-gradient-to-r ${groupData.color} overflow-hidden`}>
        <Sparkles count={10} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="text-7xl mb-4 animate-bounce-soft">{groupData.emoji}</div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
            Ages {ageRange}: <span className="text-gradient">{groupData.title}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {groupData.description}
          </p>
          
          <div className="mt-4 inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="font-display font-bold">{filteredResources.length} activities</span>
            <span className="text-muted-foreground">available</span>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                {...resource}
                delay={index * 50}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-display font-bold mb-2">No activities found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find activities for this age range.
            </p>
            <Link to="/resources">
              <Button variant="cta">Browse All Resources</Button>
            </Link>
          </div>
        )}

        {/* Age-specific tips */}
        {ageRange === "6-8" && (
          <section className="mt-16 bg-card rounded-3xl p-8 shadow-card">
            <h2 className="text-2xl font-display font-bold mb-6 text-center">
              💡 Tips for Ages 6-8
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl mb-3">✏️</div>
                <h3 className="font-display font-bold mb-2">Step-by-Step Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Kids this age thrive with clear instructions. Break activities into small, manageable steps.
                </p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🎭</div>
                <h3 className="font-display font-bold mb-2">Encourage Creativity</h3>
                <p className="text-sm text-muted-foreground">
                  Let them add their own ideas! Personal touches make activities more meaningful.
                </p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">⏰</div>
                <h3 className="font-display font-bold mb-2">15-20 Minute Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  Keep activities focused. Short, engaging sessions work better than long ones.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AgeCollection;
