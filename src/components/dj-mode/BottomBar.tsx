
import { Track } from "@/types/music";
import { Button } from "@/components/ui/button";
import { Library, FilePlus, Play, Laptop2, Home, Search } from "lucide-react";

type BottomBarProps = {
  currentlyPlaying: Track | null;
  showPlaylists: boolean;
  onLibraryClick: () => void;
};

export function BottomBar({ currentlyPlaying, showPlaylists, onLibraryClick }: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black p-2">
      <div className="flex items-center justify-around px-6 py-2">
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white hover:bg-transparent">
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white hover:bg-transparent">
          <Search className="h-6 w-6" />
          <span className="text-xs">Search</span>
        </Button>
        <Button 
          variant="ghost" 
          className={`flex flex-col items-center gap-1 hover:bg-transparent ${showPlaylists ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
          onClick={onLibraryClick}
        >
          <Library className="h-6 w-6" />
          <span className="text-xs">Your Library</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white hover:bg-transparent">
          <FilePlus className="h-6 w-6" />
          <span className="text-xs">Create</span>
        </Button>
      </div>
    </div>
  );
}
