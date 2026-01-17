import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";
import { ResourceCard } from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "@/components/Sparkles";
import { WorksheetActivity } from "@/components/worksheets/WorksheetActivity";
import { getResourceById, getRelatedResources, categories } from "@/data/resources";
import { ArrowLeft, Download, Printer, Heart, Share2, Play, FileText } from "lucide-react";

const difficultyConfig = {
  easy: { label: "Easy Peasy", color: "bg-mint text-mint-foreground", stars: "⭐" },
  medium: { label: "Just Right", color: "bg-cta text-cta-foreground", stars: "⭐⭐" },
  challenging: { label: "Brain Buster", color: "bg-accent text-accent-foreground", stars: "⭐⭐⭐" },
};

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showActivity, setShowActivity] = useState(false);
  const resource = id ? getResourceById(id) : null;
  const relatedResources = resource ? getRelatedResources(resource) : [];
  const category = resource ? categories.find((c) => c.id === resource.category) : null;
  const isWorksheet = resource?.category === "worksheets";

  if (!resource || !category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl mb-4">🔍</span>
          <h1 className="text-2xl font-display font-bold mb-4">Resource not found</h1>
          <Link to="/resources">
            <Button variant="cta">Back to Resources</Button>
          </Link>
        </div>
      </div>
    );
  }

  const difficulty = difficultyConfig[resource.difficulty];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-card/50 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/resources" className="hover:text-foreground transition-colors">
              Resources
            </Link>
            <span>/</span>
            <Link to={`/resources/${resource.category}`} className="hover:text-foreground transition-colors">
              {category.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{resource.title}</span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <Link to={`/resources/${resource.category}`}>
              <Button variant="ghost" size="sm" className="mb-4 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to {category.name}
              </Button>
            </Link>

            {/* Preview Card */}
            <div className="relative bg-gradient-to-br from-lavender via-sky to-mint rounded-3xl overflow-hidden shadow-float mb-8">
              <Sparkles count={10} />
              <div className="aspect-[4/3] flex items-center justify-center relative z-10">
                <span className="text-[12rem] animate-float-gentle drop-shadow-lg">
                  {resource.thumbnail}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {resource.title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              {resource.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {isWorksheet && (
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="gap-2"
                  onClick={() => setShowActivity(!showActivity)}
                >
                  {showActivity ? (
                    <>
                      <FileText className="w-5 h-5" />
                      View Details
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Start Activity
                    </>
                  )}
                </Button>
              )}
              {!isWorksheet && (
                <Button variant="cta" size="lg" className="gap-2">
                  <Download className="w-5 h-5" />
                  Download PDF
                </Button>
              )}
              <Button variant="outline" size="lg" className="gap-2">
                <Printer className="w-5 h-5" />
                Print
              </Button>
              <Button variant="ghost" size="lg" className="gap-2">
                <Heart className="w-5 h-5" />
                Save
              </Button>
              <Button variant="ghost" size="lg" className="gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </Button>
            </div>

            {/* Interactive Worksheet Activity */}
            {isWorksheet && showActivity && (
              <div className="mt-8 animate-slide-up">
                <div className="bg-gradient-to-br from-mint/10 to-lavender/10 rounded-3xl p-6 border-2 border-primary/20">
                  <WorksheetActivity resourceId={resource.id} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h3 className="font-display font-bold mb-4">Activity Details</h3>
              
              <div className="space-y-4">
                {/* Age Recommendation */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Recommended Ages</span>
                  <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">
                    {resource.ageRange} years
                  </Badge>
                </div>

                {/* Difficulty */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <div className="flex items-center gap-2">
                    <Badge className={`${difficulty.color} text-sm px-3 py-1`}>
                      {difficulty.label}
                    </Badge>
                  </div>
                </div>

                {/* Stars Visual */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Challenge Level</span>
                  <span className="text-xl">{difficulty.stars}</span>
                </div>

                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Materials Needed (placeholder) */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h3 className="font-display font-bold mb-4">What You'll Need</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span>✏️</span> Crayons or colored pencils
                </li>
                <li className="flex items-center gap-2">
                  <span>📄</span> Printer (or drawing paper)
                </li>
                <li className="flex items-center gap-2">
                  <span>✨</span> Your imagination!
                </li>
              </ul>
            </div>

            {/* Parent Tip */}
            <div className="bg-lavender/30 rounded-2xl p-6">
              <h3 className="font-display font-bold mb-2 flex items-center gap-2">
                <span>💡</span> Parent Tip
              </h3>
              <p className="text-sm text-muted-foreground">
                Encourage your child to tell you about their creation! 
                Storytelling builds language skills and confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-bold mb-6">
              You Might Also Like ✨
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedResources.map((related, index) => (
                <ResourceCard
                  key={related.id}
                  {...related}
                  delay={index * 100}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ResourceDetail;
