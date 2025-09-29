import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VirtualTryOn from "@/components/VirtualTryOn";
import ProductCatalog from "@/components/ProductCatalog";
import AIStylist from "@/components/AIStylist";
import { SkinAnalysis } from "@/components/SkinAnalysis";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <VirtualTryOn />
        <ProductCatalog />
        <SkinAnalysis />
        <AIStylist />
      </main>
    </div>
  );
};

export default Index;
