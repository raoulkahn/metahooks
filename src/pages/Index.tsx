
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
            <h2 className="text-3xl font-bold text-primary">Examples</h2>
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl space-y-4">
                <h3 className="text-xl font-semibold text-primary">Food & Recipe</h3>
                <p className="text-primary/80">Quick and easy 5-ingredient pasta recipe perfect for busy weeknights! 🍝 #cooking #foodie</p>
              </div>
              <div className="glass p-6 rounded-xl space-y-4">
                <h3 className="text-xl font-semibold text-primary">Fitness</h3>
                <p className="text-primary/80">3 exercises to build strong core muscles without equipment! 💪 #fitness #workout</p>
              </div>
              <div className="glass p-6 rounded-xl space-y-4">
                <h3 className="text-xl font-semibold text-primary">Travel</h3>
                <p className="text-primary/80">Hidden gems in Bali you won't find in tourist guides! 🌴 #travel #wanderlust</p>
              </div>
            </div>
          </div>

          {/* Mobile App Preview Column */}
          <div className="flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Mobile App Preview"
              className="rounded-2xl shadow-2xl max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
