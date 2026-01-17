import { Header } from "@/components/Header";
import { CategoryCard } from "@/components/CategoryCard";
import { Sparkles } from "@/components/Sparkles";
import { FloatingCloud } from "@/components/FloatingCloud";
import { categories } from "@/data/resources";

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 gradient-magic overflow-hidden">
        <Sparkles count={20} />
        <FloatingCloud className="top-10 left-10" size="md" />
        <FloatingCloud className="bottom-10 right-20" size="sm" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block text-6xl mb-6 animate-bounce-soft">🎨</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Explore <span className="text-gradient">Magical Resources</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover hundreds of creative activities, printables, and adventures 
            designed to spark joy and curiosity in young minds!
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Choose Your <span className="text-gradient">Adventure</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                {...category}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fun Stats */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="text-4xl mb-2">📄</div>
              <div className="text-3xl font-display font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Printables</div>
            </div>
            <div className="p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="text-4xl mb-2">✏️</div>
              <div className="text-3xl font-display font-bold text-mint">50+</div>
              <div className="text-sm text-muted-foreground">Drawing Guides</div>
            </div>
            <div className="p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="text-4xl mb-2">🎭</div>
              <div className="text-3xl font-display font-bold text-accent">30+</div>
              <div className="text-sm text-muted-foreground">Craft Projects</div>
            </div>
            <div className="p-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <div className="text-4xl mb-2">📚</div>
              <div className="text-3xl font-display font-bold text-cta">75+</div>
              <div className="text-sm text-muted-foreground">Story Prompts</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
