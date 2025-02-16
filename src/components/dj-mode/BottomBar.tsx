
import { Track } from "@/types/music";
import { Button } from "@/components/ui/button";
import { Library, FilePlus, Play, Home, Search } from "lucide-react";

type BottomBarProps = {
  currentlyPlaying: Track | null;
  showPlaylists: boolean;
  onLibraryClick: () => void;
};

export function BottomBar({ currentlyPlaying, showPlaylists, onLibraryClick }: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/90 border-t border-neutral-800">
      {currentlyPlaying && (
        <div className="flex items-center gap-4 px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
          <img
            src={currentlyPlaying.albumArt}
            alt={currentlyPlaying.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{currentlyPlaying.title}</div>
            <div className="text-xs text-neutral-400 truncate">{currentlyPlaying.artist}</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-8 w-8 flex items-center justify-center bg-neutral-800 rounded-full hover:bg-neutral-700">
              <Play className="h-4 w-4 fill-current" />
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-around p-4">
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
