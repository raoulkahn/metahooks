
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PlatformButton from '@/components/PlatformButton';

const Index = () => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 px-4">
      <div className="flex items-center justify-center gap-2 pt-8">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M10.5 3.75H7.5C6.67157 3.75 6 4.42157 6 5.25V18.75C6 19.5784 6.67157 20.25 7.5 20.25H10.5C11.3284 20.25 12 19.5784 12 18.75V5.25C12 4.42157 11.3284 3.75 10.5 3.75Z"
            fill="currentColor"
          />
          <path
            d="M16.5 3.75H13.5C12.6716 3.75 12 4.42157 12 5.25V18.75C12 19.5784 12.6716 20.25 13.5 20.25H16.5C17.3284 20.25 18 19.5784 18 18.75V5.25C18 4.42157 17.3284 3.75 16.5 3.75Z"
            fill="currentColor"
          />
        </svg>
        <span className="text-primary font-medium">Powered by OpenAI</span>
      </div>
      <div className="max-w-4xl mx-auto pt-8 pb-24 animate-fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Meta Video Hook Optimizer
          </h1>
          <p className="text-lg text-primary/80">
            Create engaging hooks for Reels and Stories across Meta platforms
          </p>
        </div>

        <div className="glass rounded-2xl p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PlatformButton platform="instagram" />
            <PlatformButton platform="facebook" />
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="Describe your video content or topic..."
              className="min-h-[150px] text-lg p-4 resize-none bg-background/50"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end">
              <span className="text-sm text-primary/70">
                {content.length}/500 characters
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              className="py-2 sm:py-6 text-base sm:text-lg font-medium px-8 sm:px-12"
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
        </div>

        {/* Examples and Mobile App Preview Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Examples Column */}
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-primary">Hook Examples</h2>
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
                    <path d="M19 12C19 12 15.5 18 12 18C8.5 18 5 12 5 12C5 12 8.5 6 12 6C15.5 6 19 12 19 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Visual Captions
                </h3>
                <div className="glass p-6 rounded-xl space-y-4">
                  <p className="text-primary/80">"Quick and easy 5-ingredient pasta recipe perfect for busy weeknights! 🍝 #cooking #foodie"</p>
                  <p className="text-sm text-primary/60">Perfect for: Recipe video captions</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Verbal Hooks
                </h3>
                <div className="glass p-6 rounded-xl space-y-4">
                  <p className="text-primary/80">"Hey fitness fam! Ever wondered how to get killer abs without any equipment? In this video, I'm sharing my top 3 bodyweight exercises that transformed my core."</p>
                  <p className="text-sm text-primary/60">Perfect for: Video intro speech</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile App Preview Column */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative max-w-[280px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 rounded-[32px]" />
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Mobile App Preview"
                className="rounded-[32px] w-full aspect-[9/16] object-cover"
              />
              <div className="absolute bottom-6 left-4 right-4">
                <p className="text-white text-sm leading-snug">
                  Quick and easy 5-ingredient pasta recipe perfect for busy weeknights! 🍝 #cooking #foodie
                </p>
              </div>
            </div>
            <p className="text-sm text-primary/70 text-center max-w-sm">
              Get both verbal hooks and captions for your videos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
