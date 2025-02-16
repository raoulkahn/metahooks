import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Wand2, Type, Music, Upload, Heart, MessageCircle, Bookmark, Send, Video, MoreHorizontal, X } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState('image');
  const [audioText, setAudioText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState('');

  const sampleContent = {
    image: {
      preview: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      caption: "Beautiful sunset captured by AI 🌅 Perfect moment where nature meets technology ✨ #Sunset #AIArt #NatureMagic"
    },
    video: {
      preview: "https://i.giphy.com/media/YWUpVw86AtIbe/giphy.gif",
      caption: "Stunning sunset timelapse created with AI 🌅✨ Watch how the colors transform! #Timelapse #AIVideo #SunsetMagic"
    },
    text: {
      preview: "✍️ AI-Generated Caption Example:\n\nChasing sunsets and dreams 🌅\nNature's daily masterpiece painted across the sky.\nWhere golden hours meet infinite possibilities.\n\n#SunsetLover #NatureMoments #GoldenHour",
      caption: "Let AI craft the perfect words for your content"
    },
    style: {
      before: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      after: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      caption: "Transform your photos with AI style transfer"
    },
    audio: {
      preview: "Use AI to generate audio narration or background music for your content. Perfect for adding voiceovers, sound effects, or atmospheric music to your stories.",
      caption: "Create the perfect audio with AI or upload your own",
      background: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    }
  };

  const voices = [
    { id: 'alloy', name: 'Alloy (Neutral)' },
    { id: 'echo', name: 'Echo (Male)' },
    { id: 'fable', name: 'Fable (Male)' },
    { id: 'onyx', name: 'Onyx (Male)' },
    { id: 'nova', name: 'Nova (Female)' },
    { id: 'shimmer', name: 'Shimmer (Female)' },
  ];

  const generateAudio = async () => {
    try {
      setIsGeneratingAudio(true);
      const response = await fetch('/functions/v1/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: audioText, voice: selectedVoice }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const { audioContent } = await response.json();
      const audioBlob = new Blob(
        [Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))],
        { type: 'audio/mp3' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      setGeneratedAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 px-4">
      <div className="max-w-6xl mx-auto pt-8 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-3">
            AI Content Studio
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto mb-12">
            Create stunning images, videos, and more for Meta platforms with AI.
            Generate content optimized for maximum engagement across all formats.
          </p>

          <div className="mb-8">
            <span className="inline-block bg-secondary/50 px-4 py-2 rounded-full text-sm font-medium">
              Search: "sunset"
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex flex-row md:flex-col gap-4">
              {activeTab === 'image' && (
                <>
                  <div className="w-16 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-orange-400 to-purple-500 cursor-pointer hover:ring-2 ring-primary">
                    <img 
                      src={sampleContent.image.preview}
                      alt="Sunset option 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-16 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-orange-400 to-purple-500 cursor-pointer">
                    <img 
                      src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
                      alt="Sunset option 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-16 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-orange-400 to-purple-500 cursor-pointer">
                    <img 
                      src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
                      alt="Sunset option 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              )}
              {activeTab === 'video' && (
                <>
                  <div className="w-16 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-orange-400 to-purple-500 cursor-pointer">
                    <img 
                      src={sampleContent.video.preview}
                      alt="Video preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="relative mx-auto w-[280px] h-[572px] bg-black rounded-[45px] border-[14px] border-black shadow-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-40 bg-black rounded-b-3xl z-20"></div>
              <div className="h-full w-full bg-black rounded-[32px] overflow-hidden">
                <div className="flex justify-between items-center px-4 py-2 text-white text-xs">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-1 bg-white rounded-full" />
                    <div className="w-4 h-1 bg-white rounded-full" />
                    <div className="w-4 h-1 bg-white rounded-full" />
                  </div>
                </div>
                <div className="absolute top-8 left-0 right-0 z-10 flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                      <div className="w-full h-full rounded-full bg-black p-[2px]">
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600" />
                      </div>
                    </div>
                    <div className="text-white text-sm flex items-center">
                      <span className="font-semibold">aicontentstudio</span>
                      <span className="mx-1">•</span>
                      <span className="text-white/80">17h</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MoreHorizontal className="w-5 h-5 text-white" />
                    <X className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="h-full relative">
                  {activeTab === 'image' && (
                    <img 
                      src={sampleContent.image.preview}
                      alt="Generated sunset"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {activeTab === 'video' && (
                    <img 
                      src={sampleContent.video.preview}
                      alt="Video preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {activeTab === 'text' && (
                    <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-orange-400 to-purple-500">
                      <p className="text-white text-center whitespace-pre-line">{sampleContent.text.preview}</p>
                    </div>
                  )}
                  {activeTab === 'style' && (
                    <div className="grid grid-cols-2 h-full">
                      <img src={sampleContent.style.before} alt="Before style transfer" className="object-cover" />
                      <img src={sampleContent.style.after} alt="After style transfer" className="object-cover" />
                    </div>
                  )}
                  {activeTab === 'audio' && (
                    <div className="w-full h-full relative">
                      <img 
                        src={sampleContent.audio.background}
                        alt="Sunset background"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8">
                        {generatedAudioUrl ? (
                          <div className="w-full max-w-md space-y-4">
                            <audio 
                              controls 
                              className="w-full" 
                              src={generatedAudioUrl}
                            />
                            <p className="text-white text-center text-sm">{audioText}</p>
                          </div>
                        ) : (
                          <p className="text-white text-center whitespace-pre-line text-lg mb-4">
                            {sampleContent.audio.preview}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-24 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-sm">
                      {activeTab === 'image' && sampleContent.image.caption}
                      {activeTab === 'video' && sampleContent.video.caption}
                      {activeTab === 'text' && sampleContent.text.caption}
                      {activeTab === 'style' && sampleContent.style.caption}
                      {activeTab === 'audio' && sampleContent.audio.caption}
                    </p>
                  </div>

                  <div className="absolute bottom-32 right-4 flex flex-col items-center gap-6">
                    <button className="text-white flex flex-col items-center gap-1">
                      <Heart className="w-7 h-7" />
                    </button>
                    <button className="text-white flex flex-col items-center gap-1">
                      <MessageCircle className="w-7 h-7" />
                    </button>
                    <button className="text-white flex flex-col items-center gap-1">
                      <Send className="w-7 h-7" />
                    </button>
                    <button className="text-white flex flex-col items-center gap-1">
                      <Bookmark className="w-7 h-7" />
                    </button>
                  </div>

                  <div className="absolute bottom-6 left-0 right-0 px-4 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Send message..."
                      className="w-full bg-transparent border border-white/20 rounded-full px-4 py-2 text-white text-sm placeholder-white/60"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="image" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-4 bg-transparent h-auto p-0">
            <TabsTrigger 
              value="image" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-8 py-3"
            >
              <Image className="mr-2 h-4 w-4" />
              Image
            </TabsTrigger>
            <TabsTrigger 
              value="video" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-8 py-3"
            >
              <Video className="mr-2 h-4 w-4" />
              Video
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

              <TabsContent value="video" className="m-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Generate Video Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Describe the video you want to generate..."
                        className="min-h-[120px] text-lg"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Button className="py-6 text-lg">Full Video</Button>
                        <Button className="py-6 text-lg">Video Hook</Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center min-h-[300px] bg-secondary/50 rounded-lg border-2 border-dashed">
                      <Upload className="h-12 w-12 text-primary/40 mb-4" />
                      <p className="text-primary/60">Generated video will appear here</p>
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
                  <h2 className="text-2xl font-semibold">Generate Audio Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Enter the text you want to convert to speech..."
                        className="min-h-[120px] text-lg"
                        value={audioText}
                        onChange={(e) => setAudioText(e.target.value)}
                      />
                      <div className="flex gap-4">
                        <select
                          className="flex-1 rounded-md border border-input bg-background px-3 py-2"
                          value={selectedVoice}
                          onChange={(e) => setSelectedVoice(e.target.value)}
                        >
                          {voices.map(voice => (
                            <option key={voice.id} value={voice.id}>
                              {voice.name}
                            </option>
                          ))}
                        </select>
                        <Button 
                          className="flex-1 py-6 text-lg"
                          onClick={generateAudio}
                          disabled={isGeneratingAudio || !audioText.trim()}
                        >
                          {isGeneratingAudio ? "Generating..." : "Generate Audio"}
                        </Button>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="px-4 text-sm text-gray-500">or</span>
                      </div>
                      <div className="flex flex-col items-center justify-center min-h-[100px] bg-secondary/50 rounded-lg border-2 border-dashed cursor-pointer">
                        <Upload className="h-8 w-8 text-primary/40 mb-2" />
                        <p className="text-primary/60 text-sm">Upload your own audio file</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center min-h-[300px] bg-secondary/50 rounded-lg">
                      {generatedAudioUrl ? (
                        <div className="w-full p-6 space-y-4">
                          <audio controls className="w-full" src={generatedAudioUrl} />
                          <p className="text-center text-sm text-primary/60">
                            Generated audio preview
                          </p>
                        </div>
                      ) : (
                        <div className="text-center p-6">
                          <Music className="h-12 w-12 text-primary/40 mx-auto mb-4" />
                          <p className="text-primary/60">Generated audio will appear here</p>
                        </div>
                      )}
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
