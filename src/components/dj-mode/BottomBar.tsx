
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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/90 border-t border-neutral-800">
      {currentlyPlaying && (
        <div className="flex items-center gap-3 p-3 bg-[#132029] rounded-lg mx-3 mb-3">
          <img
            src={currentlyPlaying.albumArt}
            alt={currentlyPlaying.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{currentlyPlaying.title}</div>
            <div className="text-xs text-neutral-400 truncate">{currentlyPlaying.artist}</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-4 w-4 rounded-full bg-[#1DB954] flex items-center justify-center">
                <div className="text-[8px] text-black font-medium">♪</div>
              </div>
              <span className="text-[#1DB954] text-xs">Mac Studio</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white/80"
            >
              <Laptop2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white hover:bg-white/90 text-black"
            >
              <Play className="h-4 w-4 fill-current" />
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-around px-6 py-2">
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
