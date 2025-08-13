import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Sparkles, User, Bot, Camera, Palette, Ruler } from "lucide-react";

const AIStylist = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your AI stylist. I can help you find the perfect outfit based on your body type, skin tone, and personal style. What would you like to explore today?",
      timestamp: "now"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickActions = [
    { icon: Camera, text: "Analyze my photo", color: "primary" },
    { icon: Palette, text: "Find my colors", color: "accent" },
    { icon: Ruler, text: "Body type styling", color: "secondary" },
  ];

  const suggestions = [
    "What colors look best on me?",
    "Outfit for a dinner date",
    "Professional wardrobe essentials",
    "Casual weekend looks"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputMessage,
      timestamp: "now"
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "bot" as const,
        content: "Based on your request, I'd recommend exploring soft, muted tones that complement your natural coloring. Would you like me to show you some specific pieces from our collection?",
        timestamp: "now"
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <Badge className="bg-gradient-primary text-white mb-4">
          ✨ AI-Powered Styling
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
          Your Personal <span className="bg-gradient-primary bg-clip-text text-transparent">AI Stylist</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get personalized fashion advice, outfit recommendations, and styling tips tailored to your unique features
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* AI Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="glass border-border/50 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-primary p-2 rounded-full">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Stylist</h3>
                  <p className="text-sm text-success">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-gradient-secondary' 
                        : 'bg-gradient-primary'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div className="p-4 border-t border-border/50">
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask me anything about fashion and styling..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button variant="hero" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Styling Tools */}
        <div className="space-y-6">
          <Card className="glass p-6 border-border/50">
            <h3 className="font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Quick Styling Tools
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <action.icon className="h-4 w-4 mr-3" />
                  {action.text}
                </Button>
              ))}
            </div>
          </Card>

          {/* Style Profile */}
          <Card className="glass p-6 border-border/50">
            <h3 className="font-semibold mb-4">Your Style Profile</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Body Type</p>
                <Badge variant="secondary">Not analyzed yet</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Skin Tone</p>
                <Badge variant="secondary">Not analyzed yet</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Style Preference</p>
                <Badge variant="secondary">Not set</Badge>
              </div>
              <Button variant="hero" size="sm" className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Complete Analysis
              </Button>
            </div>
          </Card>

          {/* Recent Recommendations */}
          <Card className="glass p-6 border-border/50">
            <h3 className="font-semibold mb-4">Recent Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">Dress</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Lavender Maxi Dress</p>
                  <p className="text-xs text-muted-foreground">Perfect for your skin tone</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <span className="text-foreground text-xs">Blazer</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Beige Linen Blazer</p>
                  <p className="text-xs text-muted-foreground">Complements your style</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIStylist;