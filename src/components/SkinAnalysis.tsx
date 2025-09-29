import { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Palette, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SkinAnalysisResult {
  id: string;
  skin_tone: string;
  undertone: string;
  analysis_results: any;
  recommendations: any;
  created_at: string;
}

export const SkinAnalysis = () => {
  const { user } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!user || !selectedImage) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to use skin analysis",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);

    try {
      // Convert base64 to blob for upload
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      
      // Upload image to storage
      const fileName = `${user.id}/${Date.now()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('skin-analysis')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('skin-analysis')
        .getPublicUrl(fileName);

      // Simulate AI analysis (in a real app, this would call an AI service)
      const analysisResult = {
        skin_tone: getRandomSkinTone(),
        undertone: getRandomUndertone(),
        analysis_results: {
          hydration_level: Math.floor(Math.random() * 100),
          oiliness: Math.floor(Math.random() * 100),
          sensitivity: Math.floor(Math.random() * 100),
          age_appearance: Math.floor(Math.random() * 10) + 20,
        },
        recommendations: {
          foundation_shades: getFoundationRecommendations(),
          colors_to_wear: getColorRecommendations(),
          skincare_tips: getSkincareRecommendations(),
        },
      };

      // Save analysis to database
      const { data, error } = await supabase
        .from('skin_analysis')
        .insert({
          user_id: user.id,
          image_url: publicUrl,
          skin_tone: analysisResult.skin_tone,
          undertone: analysisResult.undertone,
          analysis_results: analysisResult.analysis_results,
          recommendations: analysisResult.recommendations,
        })
        .select()
        .single();

      if (error) throw error;

      setResult(data);
      toast({
        title: "Analysis Complete!",
        description: "Your skin analysis has been completed successfully.",
      });
    } catch (error) {
      console.error('Error analyzing skin:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze your skin. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const getRandomSkinTone = () => {
    const tones = ['Fair', 'Light', 'Medium', 'Tan', 'Deep'];
    return tones[Math.floor(Math.random() * tones.length)];
  };

  const getRandomUndertone = () => {
    const undertones = ['Cool', 'Warm', 'Neutral'];
    return undertones[Math.floor(Math.random() * undertones.length)];
  };

  const getFoundationRecommendations = () => {
    return ['Ivory 110', 'Natural Beige 220', 'Warm Sand 320'];
  };

  const getColorRecommendations = () => {
    return ['Navy Blue', 'Coral Pink', 'Forest Green', 'Burgundy'];
  };

  const getSkincareRecommendations = () => {
    return [
      'Use a gentle cleanser twice daily',
      'Apply moisturizer with SPF in the morning',
      'Consider adding a vitamin C serum',
      'Use a hydrating night cream',
    ];
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            AI Skin Analysis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your photo and get personalized color recommendations based on your skin tone
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Upload Your Photo
              </CardTitle>
              <CardDescription>
                Take or upload a clear photo of your face in natural lighting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              
              {selectedImage ? (
                <div className="space-y-4">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Different Photo
                    </Button>
                    <Button
                      onClick={analyzeImage}
                      disabled={analyzing || !user}
                      className="flex-1"
                    >
                      {analyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Analyze Skin
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full h-32 border-dashed"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p>Click to upload a photo</p>
                  </div>
                </Button>
              )}

              {!user && (
                <p className="text-sm text-muted-foreground text-center">
                  Please sign in to use skin analysis
                </p>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                Your personalized skin analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Skin Tone & Undertone</h4>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{result.skin_tone}</Badge>
                      <Badge variant="outline">{result.undertone} Undertone</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Skin Analysis
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Hydration Level:</span>
                        <span>{result.analysis_results?.hydration_level || 0}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Oil Level:</span>
                        <span>{result.analysis_results?.oiliness || 0}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sensitivity:</span>
                        <span>{result.analysis_results?.sensitivity || 0}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Recommended Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.recommendations?.colors_to_wear?.map((color: string, index: number) => (
                        <Badge key={index} variant="outline">{color}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Foundation Matches</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.recommendations?.foundation_shades?.map((shade: string, index: number) => (
                        <Badge key={index} variant="secondary">{shade}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload a photo to see your analysis results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};