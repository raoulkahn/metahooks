
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowUpDown, Filter, ChevronLeft, Shuffle, SkipBack, Play, SkipForward, Repeat } from "lucide-react";
import { useState } from "react";
import { Track, MusicalKey } from "@/types/music";

const demoTracks: Track[] = [
  {
    id: "1",
    title: "Adams Hill",
    artist: "Tensnake",
    bpm: 124,
    key: "8A",
    duration: "6:45",
    energy: 7,
    albumArt: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  },
  {
    id: "2",
    title: "Cielo - Fulltone Remix",
    artist: "Double Touch, Bross (RO), Fulltone",
    bpm: 126,
    key: "3A",
    duration: "7:15",
    energy: 8,
    albumArt: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
  },
  {
    id: "3",
    title: "Without - Tim Green Remix",
    artist: "BAILE, Tim Green, Felicia Douglass",
    bpm: 128,
    key: "11B",
    duration: "6:30",
    energy: 9,
    albumArt: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  },
];

const DjMode = () => {
  const isMobile = useIsMobile();
  const [bpmRange, setBpmRange] = useState([90, 140]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track | null>(demoTracks[0]);

  const hasActiveFilters = selectedKey !== "" || bpmRange[0] !== 90 || bpmRange[1] !== 140;

  const filteredTracks = demoTracks.filter((track) => {
    const matchesBpm = track.bpm >= bpmRange[0] && track.bpm <= bpmRange[1];
    const matchesKey = !selectedKey || track.key === selectedKey;
    return matchesBpm && matchesKey;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black text-white">
      <header className="sticky top-0 bg-gradient-to-b from-neutral-900/90 to-black/90 backdrop-blur-md p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-white">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant={hasActiveFilters ? "default" : "outline"}
                  className={cn(
                    "px-3",
                    hasActiveFilters 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                      : "bg-neutral-800 hover:bg-neutral-700 border-neutral-700"
                  )}
                >
                  <Filter className={cn(
                    "h-5 w-5 mr-2",
                    hasActiveFilters && "text-white"
                  )} />
                  Filter{hasActiveFilters ? ` (${selectedKey || "BPM"})` : ""}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-neutral-900 text-white">
                <DialogHeader>
                  <DialogTitle>Filter Tracks</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">BPM Range</h4>
                    <div className="flex items-center gap-4">
                      <input 
                        type="number"
                        value={bpmRange[0]}
                        onChange={(e) => setBpmRange([Number(e.target.value), bpmRange[1]])}
                        className="w-16 bg-neutral-800 border-none text-white text-center rounded-md"
                      />
                      <div className="flex-1 px-2">
                        <Slider
                          defaultValue={bpmRange}
                          max={200}
                          min={60}
                          step={1}
                          value={bpmRange}
                          onValueChange={setBpmRange}
                          className="flex-1"
                        />
                      </div>
                      <input 
                        type="number"
                        value={bpmRange[1]}
                        onChange={(e) => setBpmRange([bpmRange[0], Number(e.target.value)])}
                        className="w-16 bg-neutral-800 border-none text-white text-center rounded-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Key</h4>
                    <div className="space-y-2">
                      <div className="flex gap-1.5">
                        {["D♭", "E♭", "G♭", "A♭", "B♭"].map((note) => (
                          <Button
                            key={note}
                            variant={selectedKey.startsWith(note) ? "default" : "outline"}
                            onClick={() => setSelectedKey(selectedKey === note ? "" : note)}
                            size="sm"
                            className={cn(
                              "h-8 flex-1 bg-neutral-800 hover:bg-neutral-700 border-neutral-700",
                              selectedKey.startsWith(note) && "bg-blue-500 hover:bg-blue-600 border-none"
                            )}
                          >
                            {note}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-1.5">
                        {["C", "D", "E", "F", "G", "A", "B"].map((note) => (
                          <Button
                            key={note}
                            variant={selectedKey.startsWith(note) ? "default" : "outline"}
                            onClick={() => setSelectedKey(selectedKey === note ? "" : note)}
                            size="sm"
                            className={cn(
                              "h-8 flex-1 bg-neutral-800 hover:bg-neutral-700 border-neutral-700",
                              selectedKey.startsWith(note) && "bg-blue-500 hover:bg-blue-600 border-none"
                            )}
                          >
                            {note}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        <Button
                          variant={!selectedKey.includes("m") && selectedKey ? "default" : "outline"}
                          onClick={() => setSelectedKey(prev => prev.replace("m", ""))}
                          className={cn(
                            "flex-1 h-8 bg-neutral-800 hover:bg-neutral-700 border-neutral-700",
                            !selectedKey.includes("m") && selectedKey && "bg-blue-500 hover:bg-blue-600 border-none"
                          )}
                        >
                          Major
                        </Button>
                        <Button
                          variant={selectedKey.includes("m") ? "default" : "outline"}
                          onClick={() => setSelectedKey(prev => prev ? prev + "m" : "")}
                          className={cn(
                            "flex-1 h-8 bg-neutral-800 hover:bg-neutral-700 border-neutral-700",
                            selectedKey.includes("m") && "bg-blue-500 hover:bg-blue-600 border-none"
                          )}
                        >
                          Minor
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>DJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="px-4 pb-32">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Running</h1>
            <div className="flex items-center gap-2 text-neutral-400 text-sm mt-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>DJ</AvatarFallback>
              </Avatar>
              <span>DJ Mode • 1h 45m</span>
            </div>
          </div>
          <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-400 h-14 w-14">
            <Play className="h-8 w-8 fill-current" />
          </Button>
        </div>
        {filteredTracks.map((track) => (
          <div
            key={track.id}
            className={cn(
              "flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer group",
              currentlyPlaying?.id === track.id && "bg-white/20"
            )}
            onClick={() => setCurrentlyPlaying(track)}
          >
            <img
              src={track.albumArt}
              alt={track.title}
              className="w-10 h-10 rounded"
            />
            <div className="flex-1 min-w-0 pr-8">
              <div className={cn(
                "text-base font-normal truncate",
                currentlyPlaying?.id === track.id && "text-green-500"
              )}>{track.title}</div>
              <div className="text-sm text-neutral-400 truncate">{track.artist}</div>
            </div>
            <div className="flex items-center gap-4 text-sm ml-auto">
              <span className="text-emerald-500 whitespace-nowrap">{track.bpm} BPM</span>
              <span className="text-emerald-500 whitespace-nowrap">{track.key}</span>
              <Button
                variant="ghost"
                className="opacity-0 group-hover:opacity-100"
                size="icon"
              >
                •••
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/90 border-t border-neutral-800">
        {currentlyPlaying && (
          <div className="flex items-center gap-4 px-4 py-2 border-b border-neutral-800">
            <img
              src={currentlyPlaying.albumArt}
              alt={currentlyPlaying.title}
              className="w-14 h-14 rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{currentlyPlaying.title}</div>
              <div className="text-xs text-neutral-400 truncate">{currentlyPlaying.artist}</div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center gap-4 p-4">
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <Shuffle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button size="icon" className="rounded-full bg-white hover:bg-white/90 text-black h-10 w-10">
            <Play className="h-6 w-6 fill-current" />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <SkipForward className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <Repeat className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex justify-around p-4 pt-0">
          <Button variant="ghost" className="flex flex-col items-center text-neutral-400 hover:text-white">
            <span>Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-neutral-400 hover:text-white">
            <span>Search</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-neutral-400 hover:text-white">
            <span>Your Library</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-neutral-400 hover:text-white">
            <span>Create</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DjMode;
