
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import PlatformButton from '@/components/PlatformButton';

const Index = () => {
  const [platform, setPlatform] = useState<'instagram' | 'facebook'>('instagram');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showExample, setShowExample] = useState(true);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Please enter your video content or topic",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement AI hook generation
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay
      toast({
        title: "Hooks generated successfully!",
        description: "Your platform-optimized hooks are ready.",
      });
    } catch (error) {
      toast({
        title: "Error generating hooks",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="max-w-4xl mx-auto pt-16 pb-24 animate-fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meta Video Hook Optimizer
          </h1>
          <p className="text-lg text-gray-600">
            Create engaging hooks for Reels and Stories across Meta platforms
          </p>
        </div>

        <div className="glass rounded-2xl p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PlatformButton
              platform="instagram"
              isSelected={platform === 'instagram'}
              onClick={() => setPlatform('instagram')}
            />
            <PlatformButton
              platform="facebook"
              isSelected={platform === 'facebook'}
              onClick={() => setPlatform('facebook')}
            />
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="Describe your video content or topic..."
              className="min-h-[150px] text-lg p-4 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end">
              <span className="text-sm text-gray-500">
                {content.length}/500 characters
              </span>
            </div>
          </div>

          <Button
            className="w-full py-6 text-lg font-medium"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Hooks...
              </>
            ) : (
              'Generate Platform-Optimized Hooks'
            )}
          </Button>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Example Analysis</h2>
          <p className="text-gray-600 mb-8">
            See how the AI generates hooks you can use as verbal intros or on-screen captions
          </p>
        </div>

        <div className="glass rounded-2xl p-8 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Example Input:</h3>
              <p className="text-gray-600">
                "I'm creating a video showcasing my morning routine as a software engineer, including my productivity hacks and how I stay energized throughout the day."
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Generated Hooks:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">For Verbal Intros:</h4>
                  <p className="text-gray-600 p-3 bg-gray-50 rounded-lg">
                    "Want to 10x your productivity as a developer? My morning routine changed everything..."
                  </p>
                  <p className="text-gray-600 p-3 bg-gray-50 rounded-lg">
                    "Ever wondered how top engineers stay productive? Let me show you my secret..."
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">For On-Screen Text:</h4>
                  <div className="relative aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Video thumbnail example" 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-center font-medium">
                        The 5AM routine that helped me land my dream tech job 💻
                      </p>
                      <p className="text-white/80 text-sm text-center mt-1">
                        #techlife #coding #productivity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Pro Tip:</strong> Use verbal hooks in your first 3 seconds of speaking, and overlay text hooks during key moments or as opening cards. Combine both for maximum engagement!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
