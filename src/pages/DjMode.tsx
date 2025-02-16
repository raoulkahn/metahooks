
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search } from "lucide-react";
import { useState } from "react";
import { Track } from "@/types/music";

// Static demo data
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
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
        {demoTracks.map((track) => (
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
