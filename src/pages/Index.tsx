
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, RefreshCw } from "lucide-react";
import PlatformButton from '@/components/PlatformButton';
import { supabase } from "@/integrations/supabase/client";

interface Hook {
  type: 'visual' | 'verbal';
  content: string;
}

const Index = () => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHooks, setGeneratedHooks] = useState<Hook[]>([]);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please describe your video content first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-hooks', {
        body: { content: content.trim() }
      });

      if (error) {
        throw error;
      }

      setGeneratedHooks(data.hooks);
      
      toast({
        title: "Hooks generated!",
        description: "Scroll down to see your new hooks.",
      });
    } catch (error) {
      console.error('Error generating hooks:', error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your hooks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The hook has been copied to your clipboard.",
    });
  };

  const handleReset = () => {
    setContent('');
    setGeneratedHooks([]);
    toast({
      title: "Content cleared",
      description: "You can now start a new generation.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 px-4">
      <div className="flex items-center justify-center gap-2 pt-6">
        <span className="text-primary font-medium">Powered by OpenAI</span>
      </div>
      <div className="max-w-4xl mx-auto pt-6 pb-24 animate-fade-up">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-3">
            Meta Video Hook Optimizer
          </h1>
          <p className="text-lg text-primary/80">
            Create engaging hooks for Reels and Stories across Meta platforms
          </p>
        </div>

        <div className="glass rounded-2xl p-7 space-y-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <PlatformButton platform="instagram" />
            <PlatformButton platform="facebook" />
          </div>

          <div className="space-y-3">
            <Textarea
              placeholder='Describe your video content, e.g. "5 minute alfredo pasta dish"'
              className="min-h-[130px] text-lg p-4 resize-none bg-background/50"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end">
              <span className="text-sm text-primary/70">
                {content.length}/500 characters
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              className="py-2 sm:py-5 text-base sm:text-lg font-medium px-8 sm:px-12"
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
            {generatedHooks.length > 0 && (
              <Button
                variant="outline"
                className="py-2 sm:py-5 text-base sm:text-lg font-medium px-8"
                onClick={handleReset}
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Generated Hooks Section */}
        {generatedHooks.length > 0 && (
          <div className="mt-12 space-y-6">
            <h2 className="text-3xl font-bold text-primary">Your Generated Hooks</h2>
            <div className="space-y-6">
              {generatedHooks.map((hook, index) => (
                <div key={index} className="glass p-6 rounded-xl space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-primary/80 text-lg">{hook.content}</p>
                      <p className="text-sm text-primary/60 mt-2">
                        Perfect for: {hook.type === 'visual' ? 'Video captions' : 'Opening speech'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(hook.content)}
                      className="shrink-0"
                    >
                      <Copy className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-primary/70 mt-8">
              Not quite what you're looking for? Click "Generate Hooks" again to get new suggestions!
            </p>
          </div>
        )}

        {/* Examples Section - Only show if no hooks have been generated */}
        {generatedHooks.length === 0 && (
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
                      <path d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 14 14.2091 14 12C14 9.79086 14.2091 8 12 8" stroke="currentColor" strokeWidth="2"/>
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
                <div className="absolute top-0 left-0 right-0 h-11 z-20 px-5 flex items-center justify-between text-white">
                  <span className="text-sm font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12.5 2.75H11.5C7.77208 2.75 4.75 5.77208 4.75 9.5V14.5C4.75 18.2279 7.77208 21.25 11.5 21.25H12.5C16.2279 21.25 19.25 18.2279 19.25 14.5V9.5C19.25 5.77208 16.2279 2.75 12.5 2.75Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M3 12C3 7.02944 3 7 4 7H20C21.1046 7 22 7.89543 22 9V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V9ZM20 9H4V15H20V9Z" fill="currentColor"/>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V9ZM20 9H4V15H20V9Z" fill="currentColor"/>
                      <path d="M18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute top-11 left-0 right-0 h-14 z-20 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
                      <div className="w-full h-full rounded-full bg-black">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                          alt="User Avatar"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-semibold">foodie_creator</span>
                      <span className="text-white/60 text-sm">17h</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-white/80">•••</button>
                    <button className="text-white hover:text-white/80">✕</button>
                  </div>
                </div>
                <div className="relative w-full aspect-[9/16] rounded-[32px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                  <img
                    src="/lovable-uploads/21c333f2-339a-4898-9886-99ba9a7f52e0.png"
                    alt="Story Content"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-16 left-4 right-4">
                    <p className="text-white text-sm leading-snug">
                      Quick and easy 5-ingredient pasta recipe perfect for busy weeknights! 🍝 #cooking #foodie
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-full">
                      <input
                        type="text"
                        placeholder="Send message..."
                        className="w-full bg-transparent text-white placeholder-white/60 text-sm py-2 px-4 focus:outline-none"
                        readOnly
                      />
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <button className="text-white hover:text-white/80">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                      <button className="text-white hover:text-white/80">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 3L9.218 10.083M11.698 20.334L22 3.001H2L9.218 10.084L11.698 20.334Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-primary/70 text-center max-w-sm">
                Get both verbal hooks and captions for your videos
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
