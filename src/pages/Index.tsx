
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PlatformButton from '@/components/PlatformButton';

const Index = () => {
  const [platform, setPlatform] = useState<'instagram' | 'facebook'>('instagram');
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
      </div>
    </div>
  );
};

export default Index;
