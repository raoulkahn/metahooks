
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Wand2, Type, Music, Upload, Heart, MessageCircle, Bookmark, Send } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState('image');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 px-4">
      <div className="max-w-6xl mx-auto pt-8 pb-20">
        {/* Header Section with iPhone Mockup */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-3">
            AI Content Studio
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto mb-12">
            Create stunning content for Meta platforms with the power of AI.
            Generate images, captions, and more - all optimized for maximum engagement.
          </p>

          {/* iPhone Mockup */}
          <div className="relative mx-auto w-[280px] h-[572px] bg-black rounded-[45px] border-[14px] border-black shadow-xl">
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-40 bg-black rounded-b-3xl z-20"></div>
            
            {/* Screen Content */}
            <div className="h-full w-full bg-white rounded-[32px] overflow-hidden">
              {/* Instagram Header */}
              <div className="flex items-center p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600"></div>
                  <span className="font-semibold">aicontentstudio</span>
                </div>
              </div>

              {/* Post Image */}
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Image className="w-16 h-16 text-white" />
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <Heart className="w-6 h-6" />
                    <MessageCircle className="w-6 h-6" />
                    <Send className="w-6 h-6" />
                  </div>
                  <Bookmark className="w-6 h-6" />
                </div>
                <p className="text-sm">
                  <span className="font-semibold">aicontentstudio</span> Create engaging content with AI-powered tools 🚀 #AIContent #SocialMedia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <Tabs defaultValue="image" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-transparent h-auto p-0">
            <TabsTrigger 
              value="image" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-8 py-3"
            >
              <Image className="mr-2 h-4 w-4" />
              Image
            </TabsTrigger>
            <TabsTrigger 
              value="text" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-8 py-3"
            >
              <Type className="mr-2 h-4 w-4" />
              Text
            </TabsTrigger>
            <TabsTrigger 
              value="style" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-8 py-3"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Style
            </TabsTrigger>
            <TabsTrigger 
              value="audio" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-8 py-3"
            >
              <Music className="mr-2 h-4 w-4" />
              Audio
            </TabsTrigger>
          </TabsList>

          <Card className="border-2">
            <CardContent className="p-6">
              <TabsContent value="image" className="m-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Generate Images</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Describe the image you want to generate..."
                        className="min-h-[120px] text-lg"
                      />
                      <Button className="w-full py-6 text-lg">
                        Generate Image
                      </Button>
                    </div>
                    <div className="flex flex-col items-center justify-center min-h-[300px] bg-secondary/50 rounded-lg border-2 border-dashed">
                      <Upload className="h-12 w-12 text-primary/40 mb-4" />
                      <p className="text-primary/60">Generated image will appear here</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text" className="m-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Generate Text Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="What would you like to write about?"
                        className="min-h-[120px] text-lg"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Button className="py-6 text-lg">Caption</Button>
                        <Button className="py-6 text-lg">Hashtags</Button>
                      </div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-6">
                      <p className="text-primary/60">Generated text will appear here</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="style" className="m-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Style Transfer</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center min-h-[200px] bg-secondary/50 rounded-lg border-2 border-dashed">
                        <Upload className="h-12 w-12 text-primary/40 mb-4" />
                        <p className="text-primary/60">Upload an image to transform</p>
                      </div>
                      <Button className="w-full py-6 text-lg">
                        Apply Style
                      </Button>
                    </div>
                    <div className="flex flex-col items-center justify-center min-h-[200px] bg-secondary/50 rounded-lg border-2 border-dashed">
                      <Upload className="h-12 w-12 text-primary/40 mb-4" />
                      <p className="text-primary/60">Transformed image will appear here</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="audio" className="m-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Audio Enhancement</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center min-h-[200px] bg-secondary/50 rounded-lg border-2 border-dashed">
                        <Upload className="h-12 w-12 text-primary/40 mb-4" />
                        <p className="text-primary/60">Upload audio file</p>
                      </div>
                      <Button className="w-full py-6 text-lg">
                        Transcribe Audio
                      </Button>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-6">
                      <p className="text-primary/60">Transcription will appear here</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
