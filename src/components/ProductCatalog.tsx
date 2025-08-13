import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Filter, Search, Camera, ShoppingBag } from "lucide-react";

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const categories = [
    { id: "all", name: "All Items" },
    { id: "dresses", name: "Dresses" },
    { id: "tops", name: "Tops" },
    { id: "bottoms", name: "Bottoms" },
    { id: "outerwear", name: "Outerwear" },
  ];

  const products = [
    {
      id: "1",
      name: "Lavender Silk Maxi Dress",
      price: "$189",
      originalPrice: "$240",
      category: "dresses",
      color: "Lavender",
      sizes: ["XS", "S", "M", "L", "XL"],
      badge: "Bestseller",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Beige Linen Blazer",
      price: "$129",
      category: "outerwear",
      color: "Beige",
      sizes: ["S", "M", "L"],
      badge: "New",
      rating: 4.6,
    },
    {
      id: "3",
      name: "Cream Silk Camisole",
      price: "$65",
      category: "tops",
      color: "Cream",
      sizes: ["XS", "S", "M", "L"],
      rating: 4.7,
    },
    {
      id: "4",
      name: "Rose Gold Pleated Skirt",
      price: "$95",
      category: "bottoms",
      color: "Rose Gold",
      sizes: ["XS", "S", "M"],
      badge: "Limited",
      rating: 4.9,
    },
    {
      id: "5",
      name: "Soft Cashmere Cardigan",
      price: "$159",
      category: "outerwear",
      color: "Dusty Rose",
      sizes: ["S", "M", "L", "XL"],
      rating: 4.8,
    },
    {
      id: "6",
      name: "Minimalist Wrap Dress",
      price: "$145",
      category: "dresses",
      color: "Sage",
      sizes: ["XS", "S", "M", "L"],
      badge: "Trending",
      rating: 4.7,
    },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const toggleLike = (productId: string) => {
    setLikedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <Badge className="bg-gradient-secondary text-foreground mb-4">
          Curated Collection
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
          Discover Your <span className="bg-gradient-primary bg-clip-text text-transparent">Perfect Style</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Handpicked pieces designed to complement every body type and skin tone
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="whitespace-nowrap"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group overflow-hidden border-border/50 hover-lift">
            {/* Product Image */}
            <div className="aspect-[3/4] bg-gradient-hero relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-xs font-medium">{product.color}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.name}</p>
                </div>
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <Button variant="glass" size="icon">
                  <Camera className="h-4 w-4" />
                </Button>
                <Button variant="hero">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Quick Add
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 space-y-2">
                {product.badge && (
                  <Badge className={`
                    ${product.badge === 'Bestseller' ? 'bg-primary' : ''}
                    ${product.badge === 'New' ? 'bg-success' : ''}
                    ${product.badge === 'Limited' ? 'bg-accent' : ''}
                    ${product.badge === 'Trending' ? 'bg-gradient-primary' : ''}
                  `}>
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Like Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm"
                onClick={() => toggleLike(product.id)}
              >
                <Heart 
                  className={`h-4 w-4 ${
                    likedItems.includes(product.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-muted-foreground'
                  }`} 
                />
              </Button>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Sizes: {product.sizes.join(", ")}</span>
                <span>★ {product.rating}</span>
              </div>

              <div className="flex space-x-2">
                <Button variant="hero" className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Try On
                </Button>
                <Button variant="outline" className="flex-1">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </section>
  );
};

export default ProductCatalog;