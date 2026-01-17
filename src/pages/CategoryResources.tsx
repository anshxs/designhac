import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { ResourceCard } from "@/components/ResourceCard";
import { Sparkles } from "@/components/Sparkles";
import { Button } from "@/components/ui/button";
import { categories, getResourcesByCategory } from "@/data/resources";
import { ArrowLeft } from "lucide-react";

const colorClasses = {
  lavender: "from-lavender/30",
  mint: "from-mint/30",
  peach: "from-peach/30",
  sky: "from-sky/30",
};

const CategoryResources = () => {
  const { category } = useParams<{ category: string }>();
  const categoryData = categories.find((c) => c.id === category);
  const resources = category ? getResourcesByCategory(category) : [];

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl mb-4">🔍</span>
          <h1 className="text-2xl font-display font-bold mb-4">Category not found</h1>
          <Link to="/resources">
            <Button variant="cta">Back to Resources</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Hero */}
      <section className={`relative py-16 px-4 bg-gradient-to-b ${colorClasses[categoryData.color]} to-background overflow-hidden`}>
        <Sparkles count={15} />
        
        <div className="max-w-6xl mx-auto">
          <Link to="/resources">
            <Button variant="ghost" size="sm" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              All Resources
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl animate-wiggle">{categoryData.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                {categoryData.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                {categoryData.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-muted-foreground mb-8">
            {resources.length} magical activities to explore
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                {...resource}
                delay={index * 100}
              />
            ))}
          </div>

          {resources.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">🌟</span>
              <h2 className="text-xl font-display font-bold mb-2">
                More adventures coming soon!
              </h2>
              <p className="text-muted-foreground">
                We're creating magical new content for this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryResources;
