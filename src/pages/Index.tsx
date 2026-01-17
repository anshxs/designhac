import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "@/components/Sparkles";
import { FloatingCloud } from "@/components/FloatingCloud";
import { FeatureCard } from "@/components/FeatureCard";
import heroImage from "@/assets/hero-wonderland.jpg";
import { Palette, BookOpen, Puzzle, Music, Rocket, Stars } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        
        {/* Gradient Overlays for readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-sky/30 via-transparent to-transparent" />
        
        {/* Sparkles */}
        <Sparkles className="z-[2]" count={30} />
        
        {/* Floating Clouds */}
        <FloatingCloud className="top-20 left-10 animate-cloud-drift" size="lg" delay={0} />
        <FloatingCloud className="top-40 right-20 animate-cloud-drift" size="md" delay={5} />
        <FloatingCloud className="bottom-40 left-1/4 animate-cloud-drift" size="sm" delay={10} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-10">
          <div className="animate-slide-up">
            {/* Logo/Brand */}
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-card/90 backdrop-blur-md shadow-float animate-float-gentle">
              <span className="text-3xl">✨</span>
              <span className="font-display text-2xl font-bold text-foreground">CurioKids</span>
              <span className="text-3xl">🌈</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 leading-tight drop-shadow-lg">
              <span className="block text-foreground">Welcome to</span>
              <span className="text-gradient drop-shadow-lg">Wonderland</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-md bg-card/60 backdrop-blur-sm rounded-2xl px-6 py-4">
              Where curiosity takes flight! Join magical adventures in learning through 
              <span className="text-primary font-bold"> art</span>,
              <span className="text-mint font-bold"> stories</span>,
              <span className="text-accent font-bold"> puzzles</span> & 
              <span className="text-cta font-bold"> music</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/resources">
                <Button variant="cta" size="xl" className="group shadow-float">
                  <Rocket className="group-hover:animate-bounce-soft" />
                  Start Exploring
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="bg-card/80 backdrop-blur-sm border-card hover:bg-card">
                  <Stars className="text-cta" />
                  For Parents
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-soft">
          <div className="w-8 h-12 rounded-full border-2 border-foreground/30 bg-card/40 backdrop-blur-sm flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-foreground/50 rounded-full animate-fade-in" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 gradient-magic relative">
        <Sparkles count={15} />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Magical Learning <span className="text-gradient">Adventures</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every child is a natural explorer. Discover worlds of wonder through play-based learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Palette className="w-8 h-8 text-primary-foreground" />}
              title="Creative Art Studio"
              description="Paint with digital brushes, sculpt with virtual clay, and let imagination run wild in our rainbow art workshop!"
              color="lavender"
              delay={100}
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-mint-foreground" />}
              title="Story Treehouse"
              description="Interactive tales where YOU choose the adventure! Read, listen, and create your own magical stories."
              color="mint"
              delay={200}
            />
            <FeatureCard
              icon={<Puzzle className="w-8 h-8 text-secondary-foreground" />}
              title="Puzzle Paradise"
              description="Brain-tickling challenges from easy peasy to super tricky. Watch puzzle pieces come alive!"
              color="peach"
              delay={300}
            />
            <FeatureCard
              icon={<Music className="w-8 h-8 text-accent-foreground" />}
              title="Music Meadow"
              description="Compose symphonies with magical instruments, dance with rhythm games, and discover the joy of music!"
              color="sky"
              delay={400}
            />
            <FeatureCard
              icon={<Rocket className="w-8 h-8 text-cta-foreground" />}
              title="Science Lab"
              description="Safe, exciting experiments that make you go 'WOW!' Explore volcanoes, stars, and crazy chemistry!"
              color="lavender"
              delay={500}
            />
            <FeatureCard
              icon={<Stars className="w-8 h-8 text-primary-foreground" />}
              title="Achievement Island"
              description="Earn sparkly badges, unlock secret levels, and celebrate every step of your learning journey!"
              color="mint"
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-lavender/20 to-background relative overflow-hidden">
        <FloatingCloud className="top-10 left-5" size="md" />
        <FloatingCloud className="bottom-10 right-10" size="lg" />
        <Sparkles count={10} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-10 shadow-float animate-scale-in">
            <div className="text-6xl mb-6 animate-wiggle inline-block">🎈</div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Begin Your <span className="text-gradient">Adventure?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of curious kids exploring, creating, and learning something magical every day!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="magic" size="xl">
                🚀 Join Free Today
              </Button>
              <Button variant="secondary" size="lg">
                👋 Take a Tour
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-mint">✓</span> Safe & Ad-Free
              </div>
              <div className="flex items-center gap-2">
                <span className="text-mint">✓</span> Parent Dashboard
              </div>
              <div className="flex items-center gap-2">
                <span className="text-mint">✓</span> 100+ Activities
              </div>
              <div className="flex items-center gap-2">
                <span className="text-mint">✓</span> Ages 4-12
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-card/50 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">✨</span>
            <span className="font-display text-xl font-bold">CurioKids Wonderland</span>
            <span className="text-2xl">🌈</span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Where every day is a new adventure in learning!
          </p>
          <div className="flex justify-center gap-4 text-2xl">
            <span className="hover:scale-125 transition-transform cursor-pointer">🦉</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">🦊</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">🐰</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">🐑</span>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            © 2025 CurioKids Wonderland. Made with 💜 for curious minds everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
