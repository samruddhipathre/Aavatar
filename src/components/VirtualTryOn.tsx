import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Zap, RotateCcw, Download, Share2 } from "lucide-react";

const VirtualTryOn = () => {
  const [selectedItem, setSelectedItem] = useState("dress");
  const [isProcessing, setIsProcessing] = useState(false);

  const items = [
    { id: "dress", name: "Lavender Maxi Dress", price: "$89", color: "Lavender" },
    { id: "blazer", name: "Beige Linen Blazer", price: "$129", color: "Beige" },
    { id: "top", name: "Silk Camisole", price: "$65", color: "Cream" },
  ];

  const handleTryOn = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <Badge className="bg-gradient-accent text-foreground mb-4">
          Virtual Try-On Studio
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
          See How It Looks on <span className="bg-gradient-primary bg-clip-text text-transparent">You</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload your photo or use your camera for real-time virtual try-on experience
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Virtual Try-On Interface */}
        <Card className="glass p-6 border-border/50">
          <div className="aspect-[3/4] bg-gradient-hero rounded-xl border border-border/30 flex items-center justify-center mb-6 overflow-hidden relative">
            {isProcessing ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-muted-foreground">Processing virtual try-on...</p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-gradient-primary p-4 rounded-full w-fit mx-auto">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-lg font-medium mb-2">Ready for Virtual Try-On</p>
                  <p className="text-sm text-muted-foreground">Upload photo or start camera</p>
                </div>
              </div>
            )}
            
            {/* Overlay Controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button variant="glass" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="hero" onClick={handleTryOn} disabled={isProcessing}>
              <Camera className="h-4 w-4 mr-2" />
              Start Camera
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </Card>

        {/* Product Selection */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Choose Items to Try On</h3>
          
          <div className="space-y-4">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className={`p-4 cursor-pointer transition-all hover-lift ${
                  selectedItem === item.id ? 'ring-2 ring-primary shadow-elegant' : ''
                }`}
                onClick={() => setSelectedItem(item.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium">{item.color}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.price}</p>
                  </div>
                  {selectedItem === item.id && (
                    <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Try-On Actions */}
          <div className="space-y-3">
            <Button variant="hero" size="lg" className="w-full" onClick={handleTryOn}>
              <Zap className="h-4 w-4 mr-2" />
              Try On Selected Item
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Save Result
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Look
              </Button>
            </div>
          </div>

          {/* AI Recommendations */}
          <Card className="glass p-4 border-accent/30">
            <h4 className="font-medium mb-2 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-primary" />
              AI Styling Tip
            </h4>
            <p className="text-sm text-muted-foreground">
              This lavender dress complements your cool undertones perfectly! 
              Try pairing it with our silver accessories collection.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VirtualTryOn;