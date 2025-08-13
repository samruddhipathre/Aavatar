import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, ShoppingBag, User, Menu, X, Camera, MessageCircle } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass border-b border-border/50 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
              VirtuStyle
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Shop</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Virtual Try-On</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              AI Stylist
              <Badge variant="secondary" className="ml-2 text-xs">NEW</Badge>
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">About</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-accent">3</Badge>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-primary">2</Badge>
            </Button>
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              AI Chat
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 mt-4 pt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Shop</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Virtual Try-On</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium flex items-center">
                AI Stylist
                <Badge variant="secondary" className="ml-2 text-xs">NEW</Badge>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">About</a>
              <div className="flex items-center space-x-3 pt-4">
                <Button variant="outline" className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="hero" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  AI Chat
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;