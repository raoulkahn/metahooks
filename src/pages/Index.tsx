
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
            className="w-full py-2 sm:py-6 text-base sm:text-lg font-medium px-3"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Hooks'
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
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                      alt="Person working on laptop" 
                      className="object-cover w-full h-full brightness-90"
                    />
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white">
                        <img 
                          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-white text-sm font-medium">
                        <p>techcreator</p>
                        <p className="opacity-75 text-xs">Original audio</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
                      <p className="text-white text-center font-medium">
                        The 5AM routine that helped me land my dream tech job 💻
                      </p>
                      <p className="text-white/80 text-sm text-center mt-1">
                        #techlife #coding #productivity #developer
                      </p>
                    </div>
                    <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
                      <div className="bg-black/20 backdrop-blur-sm p-2 rounded-full">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" />
                        </svg>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <div className="bg-black/20 backdrop-blur-sm p-2 rounded-full">
                          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </div>
                        <span className="text-white text-sm">23.4k</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <div className="bg-black/20 backdrop-blur-sm p-2 rounded-full">
                          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                          </svg>
                        </div>
                        <span className="text-white text-sm">1.2k</span>
                      </div>
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
