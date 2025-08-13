import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Sparkles, Wand2, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Fashion model in elegant studio" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 float">
        <div className="glass p-4 rounded-xl">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute top-40 right-20 float" style={{animationDelay: '1s'}}>
        <div className="glass p-4 rounded-xl">
          <Wand2 className="h-8 w-8 text-accent" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge className="bg-gradient-primary text-white px-4 py-2 text-sm font-medium">
              ✨ Powered by AI & Computer Vision
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Virtual Fashion
            </span>
            <br />
            <span className="text-foreground">
              Redefined
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of online shopping with AI-powered styling, real-time virtual try-on, 
            and personalized recommendations based on your body shape and skin tone.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button variant="hero" size="xl" className="w-full sm:w-auto group">
              <Camera className="h-5 w-5 mr-2" />
              Start Virtual Try-On
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="elegant" size="xl" className="w-full sm:w-auto">
              Explore Catalog
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="glass p-6 rounded-xl hover-lift">
              <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Virtual Try-On</h3>
              <p className="text-muted-foreground text-sm">
                See how clothes look on you with advanced AR technology
              </p>
            </div>
            <div className="glass p-6 rounded-xl hover-lift">
              <div className="bg-gradient-accent p-3 rounded-lg w-fit mx-auto mb-4">
                <Wand2 className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Styling</h3>
              <p className="text-muted-foreground text-sm">
                Get personalized outfit recommendations from our AI stylist
              </p>
            </div>
            <div className="glass p-6 rounded-xl hover-lift">
              <div className="bg-gradient-secondary p-3 rounded-lg w-fit mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
              <p className="text-muted-foreground text-sm">
                Find perfect fits based on your body type and preferences
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;