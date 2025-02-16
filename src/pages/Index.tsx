import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Image, Type, Music, Video, Heart, MessageCircle, Bookmark, Send, MoreHorizontal, X, UploadCloud } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { searchPixabayMedia } from '@/services/pixabay';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [query, setQuery] = useState('');
  const [selectedFormats, setSelectedFormats] = useState({
    image: true,
    video: false,
    text: false,
    audio: false
  });
  const [mainDescription, setMainDescription] = useState('');
  const [formatDetails, setFormatDetails] = useState({
    image: '',
    video: '',
    text: '',
    audio: ''
  });
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'video' | 'audio'>('text');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState('');
  const [audioText, setAudioText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const { data: mediaResults, isLoading: isLoadingMedia } = useQuery({
    queryKey: ['pixabay', query, activeTab],
    queryFn: () => searchPixabayMedia(query, activeTab === 'video' ? 'video' : 'image'),
    enabled: query.length > 0 && (activeTab === 'image' || activeTab === 'video'),
  });

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
      preview: "Chasing sunsets and dreams 🌅\nNature's daily masterpiece painted across the sky.\nWhere golden hours meet infinite possibilities.\n\n#SunsetLover #NatureMoments #GoldenHour",
      caption: "Let AI craft the perfect words for your content"
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

  const handleFormatChange = (format: keyof typeof selectedFormats) => {
    setSelectedFormats(prev => ({
      ...prev,
      [format]: !prev[format]
    }));
  };

  const handleDetailChange = (format: keyof typeof formatDetails, value: string) => {
    setFormatDetails(prev => ({
      ...prev,
      [format]: value
    }));
  };

  const generateContent = () => {
    console.log('Generating content for:', selectedFormats);
    console.log('Main description:', mainDescription);
    console.log('Format details:', formatDetails);
  };

  const generateAudio = async () => {
    setIsGeneratingAudio(true);
    setIsGeneratingAudio(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto pt-8 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-3">
            AI Content Studio
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto mb-12">
            Create stunning images, videos, and more for Meta platforms with AI.
            Generate content optimized for maximum engagement across all formats.
          </p>

          <Card className="max-w-2xl mx-auto mb-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">What would you like to create?</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="image" 
                        checked={selectedFormats.image}
                        onCheckedChange={() => handleFormatChange('image')}
                      />
                      <Label htmlFor="image" className="flex items-center">
                        <Image className="w-4 h-4 mr-2" />
                        Image
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="video" 
                        checked={selectedFormats.video}
                        onCheckedChange={() => handleFormatChange('video')}
                      />
                      <Label htmlFor="video" className="flex items-center">
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="text" 
                        checked={selectedFormats.text}
                        onCheckedChange={() => handleFormatChange('text')}
                      />
                      <Label htmlFor="text" className="flex items-center">
                        <Type className="w-4 h-4 mr-2" />
                        Text
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="audio" 
                        checked={selectedFormats.audio}
                        onCheckedChange={() => handleFormatChange('audio')}
                      />
                      <Label htmlFor="audio" className="flex items-center">
                        <Music className="w-4 h-4 mr-2" />
                        Audio
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="main-description">Main Description</Label>
                  <Textarea
                    id="main-description"
                    placeholder="Describe what you want to create. Be specific about the scene, mood, and style..."
                    className="min-h-[100px]"
                    value={mainDescription}
                    onChange={(e) => setMainDescription(e.target.value)}
                  />
                </div>

                {Object.entries(selectedFormats).map(([format, isSelected]) => (
                  isSelected && (
                    <div key={format} className="space-y-2">
                      <Label htmlFor={`${format}-details`}>Additional {format} details (optional)</Label>
                      <Textarea
                        id={`${format}-details`}
                        placeholder={`Add specific details for ${format} generation...`}
                        value={formatDetails[format as keyof typeof formatDetails]}
                        onChange={(e) => handleDetailChange(format as keyof typeof formatDetails, e.target.value)}
                      />
                    </div>
                  )
                ))}

                <Button 
                  className="w-full py-6 text-lg"
                  onClick={generateContent}
                  disabled={!Object.values(selectedFormats).some(Boolean) || !mainDescription.trim()}
                >
                  Generate Content
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-16 flex flex-row md:flex-col gap-4 invisible">
              {activeTab === 'image' && mediaResults && mediaResults.slice(1, 4).map((media) => (
                <div key={media.pixabay_id} className="w-16 h-24 rounded-lg overflow-hidden gradient-purple cursor-pointer hover:ring-2 ring-primary">
                  <img 
                    src={media.preview_url || media.thumbnail_url}
                    alt={media.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {activeTab === 'video' && mediaResults && mediaResults.slice(1, 2).map((media) => (
                <div key={media.pixabay_id} className="w-16 h-24 rounded-lg overflow-hidden gradient-purple cursor-pointer">
                  <img 
                    src={media.preview_url || media.thumbnail_url}
                    alt={media.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex-1 w-full max-w-2xl">
              <div className="content-card">
                <div className="aspect-video gradient-purple">
                  {activeTab === 'image' && mediaResults && mediaResults[0] && (
                    <img 
                      src={mediaResults[0].url}
                      alt={mediaResults[0].title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {activeTab === 'video' && mediaResults && mediaResults[0] && (
                    <video
                      controls
                      className="w-full h-full object-cover"
                      poster={mediaResults[0].preview_url || mediaResults[0].thumbnail_url}
                    >
                      <source src={mediaResults[0].url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {isLoadingMedia && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile-frame mt-8">
                <div className="mobile-notch"></div>
                <div className="mobile-screen">
                  <div className="mobile-status-bar">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-1 bg-white rounded-full" />
                      <div className="w-4 h-1 bg-white rounded-full" />
                      <div className="w-4 h-1 bg-white rounded-full" />
                    </div>
                  </div>
                  
                  <div className="absolute top-8 left-0 right-0 z-10 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full gradient-purple p-[2px]">
                        <div className="w-full h-full rounded-full bg-black p-[2px]">
                          <div className="w-full h-full rounded-full gradient-purple" />
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

                  <div className="mobile-content">
                    {activeTab === 'text' && (
                      <div className="text-content">
                        <p className="text-white text-center text-sm leading-relaxed">
                          {sampleContent.text.preview}
                        </p>
                      </div>
                    )}
                    {activeTab === 'image' && (
                      <img 
                        src={sampleContent.image.preview}
                        alt="Generated content"
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
                    {activeTab === 'audio' && (
                      <>
                        <img 
                          src={sampleContent.audio.background}
                          alt="Audio background"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="gradient-overlay" />
                        <div className="relative z-10 w-full max-w-md space-y-4">
                          {generatedAudioUrl ? (
                            <>
                              <audio controls className="w-full">
                                <source src={generatedAudioUrl} type="audio/mpeg" />
                              </audio>
                              <p className="text-white text-center text-sm">{audioText}</p>
                            </>
                          ) : (
                            <p className="text-white text-center text-lg">
                              {sampleContent.audio.preview}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="social-buttons">
                    <button className="social-button">
                      <Heart className="w-7 h-7" />
                    </button>
                    <button className="social-button">
                      <MessageCircle className="w-7 h-7" />
                    </button>
                    <button className="social-button">
                      <Send className="w-7 h-7" />
                    </button>
                    <button className="social-button">
                      <Bookmark className="w-7 h-7" />
                    </button>
                  </div>

                  <div className="message-input">
                    <input
                      type="text"
                      placeholder="Send message..."
                      className="message-input-field"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-16 invisible">
              <div className="w-16 h-24" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="image" className="space-y-8" onValueChange={(value) => setActiveTab(value as 'image' | 'video' | 'text' | 'audio')}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-transparent h-auto p-0">
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
                  <h2 className="text-2xl font-semibold">Generated Images</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="aspect-square bg-secondary/50 rounded-lg border-2 border-dashed flex flex-col items-center justify-center">
                      <UploadCloud className="h-8 w-8 text-primary/40 mb-2" />
                      <p className="text-primary/60 text-sm text-center">Generated images will appear here</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="video" className="m-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Generated Videos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="aspect-video bg-secondary/50 rounded-lg border-2 border-dashed flex flex-col items-center justify-center">
                      <UploadCloud className="h-8 w-8 text-primary/40 mb-2" />
                      <p className="text-primary/60 text-sm text-center">Generated videos will appear here</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text" className="m-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Generated Text</h2>
                  <div className="bg-secondary/50 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                    <p className="text-primary/60">Generated text will appear here</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="audio" className="m-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Generated Audio</h2>
                  <div className="flex flex-col items-center justify-center min-h-[200px] bg-secondary/50 rounded-lg">
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
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </main>
  );
};

export default Index;
