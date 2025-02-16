import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowUpDown, Filter, ChevronLeft, Shuffle, SkipBack, Play, SkipForward, Repeat, AudioWaveform, Library, FilePlus } from "lucide-react";
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
  {
    id: "4",
    title: "Dreamcatcher",
    artist: "Lane 8",
    bpm: 122,
    key: "6A",
    duration: "7:20",
    energy: 8,
    albumArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17",
  },
  {
    id: "5",
    title: "Bloom",
    artist: "Ben Böhmer",
    bpm: 124,
    key: "11A",
    duration: "6:55",
    energy: 7,
    albumArt: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1",
  },
  {
    id: "6",
    title: "Atlas",
    artist: "Massane",
    bpm: 120,
    key: "2B",
    duration: "5:45",
    energy: 6,
    albumArt: "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7",
  },
  {
    id: "7",
    title: "Sirens of Jupiter",
    artist: "Stephan Bodzin",
    bpm: 126,
    key: "4A",
    duration: "7:30",
    energy: 9,
    albumArt: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
  },
  {
    id: "8",
    title: "Breathe",
    artist: "CamelPhat",
    bpm: 125,
    key: "7B",
    duration: "6:15",
    energy: 8,
    albumArt: "https://images.unsplash.com/photo-1544175832-6d40b32d6d05",
  },
  {
    id: "9",
    title: "Dawn",
    artist: "Yotto",
    bpm: 123,
    key: "9A",
    duration: "6:40",
    energy: 7,
    albumArt: "https://images.unsplash.com/photo-1588974269162-4c0d5a23418d",
  },
  {
    id: "10",
    title: "Cycles",
    artist: "Joris Voorn",
    bpm: 128,
    key: "1B",
    duration: "7:10",
    energy: 8,
    albumArt: "https://images.unsplash.com/photo-1608734265656-f035d3e7bcbf",
  }
];

const DjMode = () => {
  const isMobile = useIsMobile();
  const [bpmRange, setBpmRange] = useState([90, 140]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track | null>(demoTracks[0]);
  
  const [tempBpmRange, setTempBpmRange] = useState(bpmRange);
  const [tempKey, setTempKey] = useState(selectedKey);

  const hasActiveFilters = selectedKey !== "" || bpmRange[0] !== 90 || bpmRange[1] !== 140;

  const handleApplyFilters = () => {
    setBpmRange(tempBpmRange);
    setSelectedKey(tempKey);
  };

  const handleResetFilters = () => {
    setTempBpmRange([90, 140]);
    setTempKey("");
    setBpmRange([90, 140]);
    setSelectedKey("");
  };

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
                  Filter{selectedKey ? ` (${selectedKey})` : ""}
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
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={tempBpmRange[0]}
                        onChange={(e) => setTempBpmRange([Number(e.target.value), tempBpmRange[1]])}
                        className="w-16 bg-neutral-800 border-none text-white text-center rounded-md"
                      />
                      <div className="flex-1 px-2">
                        <Slider
                          defaultValue={tempBpmRange}
                          max={200}
                          min={60}
                          step={1}
                          value={tempBpmRange}
                          onValueChange={setTempBpmRange}
                          className="flex-1"
                        />
                      </div>
                      <input 
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={tempBpmRange[1]}
                        onChange={(e) => setTempBpmRange([tempBpmRange[0], Number(e.target.value)])}
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
                            variant={tempKey.startsWith(note) ? "default" : "outline"}
                            onClick={() => setTempKey(tempKey === note ? "" : note)}
                            size="sm"
                            className={cn(
                              "h-8 flex-1 bg-neutral-800 hover:bg-neutral-700 border-neutral-700",
                              tempKey.startsWith(note) && "bg-blue-500 hover:bg-blue-600 border-none"
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
                            variant={tempKey.startsWith(note) ? "default" : "outline"}
                            onClick={() => setTempKey(tempKey === note ? "" : note)}
                            size="sm"
                            className={cn(
                              "h-8 flex-1 bg-neutral-800 hover:bg-neutral-700 border-neutral-700",
                              tempKey.startsWith(note) && "bg-blue-500 hover:bg-blue-600 border-none"
                            )}
                          >
                            {note}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        <Button
                          variant={!tempKey.includes("m") && tempKey ? "default" : "outline"}
                          onClick={() => setTempKey(prev => prev.replace("m", ""))}
                          className={cn(
                            "flex-1 h-8 bg-neutral-800 hover:bg-neutral-700 border-neutral-700",
                            !tempKey.includes("m") && tempKey && "bg-blue-500 hover:bg-blue-600 border-none"
                          )}
                        >
                          Major
                        </Button>
                        <Button
                          variant={tempKey.includes("m") ? "default" : "outline"}
                          onClick={() => setTempKey(prev => prev ? prev + "m" : "")}
                          className={cn(
                            "flex-1 h-8 bg-neutral-800 hover:bg-neutral-700 border-neutral-700",
                            tempKey.includes("m") && "bg-blue-500 hover:bg-blue-600 border-none"
                          )}
                        >
                          Minor
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter className="flex justify-between sm:justify-between border-t border-neutral-800 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleResetFilters}
                    className="bg-neutral-800 hover:bg-neutral-700 border-neutral-700"
                  >
                    Reset
                  </Button>
                  <DialogClose asChild>
                    <Button
                      onClick={handleApplyFilters}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Apply Filters
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/lovable-uploads/f75af7f8-0b9b-47bf-89de-ab905456d08b.png" alt="DJ" />
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
                <AvatarImage src="/lovable-uploads/f75af7f8-0b9b-47bf-89de-ab905456d08b.png" alt="DJ" />
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
                className="text-neutral-400"
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
            <Button 
              size="icon" 
              variant="ghost"
              className="h-8 w-8 text-white hover:text-white/90"
            >
              <Play className="h-5 w-5 fill-current" />
            </Button>
          </div>
        )}
        <div className="flex justify-around p-4">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
              <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z" fill="currentColor"/>
            </svg>
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
              <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z" fill="currentColor"/>
            </svg>
            <span className="text-xs">Search</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white">
            <Library className="h-6 w-6" />
            <span className="text-xs">Your Library</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white">
            <FilePlus className="h-6 w-6" />
            <span className="text-xs">Create</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DjMode;
