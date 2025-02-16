import { useIsMobile } from "@/hooks/use-mobile";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { ArrowUpDown, Search, Filter } from "lucide-react";
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
    albumArt: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Cielo - Fulltone Remix",
    artist: "Double Touch, Bross (RO), Fulltone",
    bpm: 126,
    key: "3A",
    duration: "7:15",
    energy: 8,
    albumArt: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Without - Tim Green Remix",
    artist: "BAILE, Tim Green, Felicia Douglass",
    bpm: 128,
    key: "11B",
    duration: "6:30",
    energy: 9,
    albumArt: "/placeholder.svg",
  },
];

const DjMode = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [bpmRange, setBpmRange] = useState([90, 140]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTracks = demoTracks.filter((track) => {
    const matchesBpm = track.bpm >= bpmRange[0] && track.bpm <= bpmRange[1];
    const matchesKey = !selectedKey || track.key === selectedKey;
    return matchesBpm && matchesKey;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with search and filters */}
      <header className="sticky top-0 bg-gradient-to-b from-neutral-900 to-black p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="p-2">
            <Search className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <Input
              className="bg-neutral-800 border-none text-white placeholder:text-neutral-400"
              placeholder="Find on this page"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="px-3 bg-neutral-800 hover:bg-neutral-700 border-neutral-700"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filter
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-3">
                Sort
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Sort by Title</DropdownMenuItem>
              <DropdownMenuItem>Sort by Artist</DropdownMenuItem>
              <DropdownMenuItem>Sort by BPM</DropdownMenuItem>
              <DropdownMenuItem>Sort by Key</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Track List */}
      <div className="px-4">
        {filteredTracks.map((track) => (
          <div
            key={track.id}
            className="flex items-center gap-3 p-2 hover:bg-neutral-800 rounded-md cursor-pointer group"
          >
            <img
              src={track.albumArt}
              alt={track.title}
              className="w-12 h-12 rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="text-base font-normal truncate">{track.title}</div>
              <div className="text-sm text-neutral-400 flex items-center gap-2">
                <span>{track.artist}</span>
                <span className="text-emerald-500">• {track.bpm} BPM</span>
                <span className="text-emerald-500">• {track.key}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              className="opacity-0 group-hover:opacity-100"
              size="icon"
            >
              •••
            </Button>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-neutral-800 p-4">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center">
            <span>Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center">
            <span>Search</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center">
            <span>Your Library</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center">
            <span>Create</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DjMode;
