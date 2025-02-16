
import { Playlist } from "@/types/music";
import { Button } from "@/components/ui/button";
import { Library } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type PlaylistGridProps = {
  playlists: Playlist[];
  onPlaylistClick: (playlist: Playlist) => void;
};

export function PlaylistGrid({ playlists, onPlaylistClick }: PlaylistGridProps) {
  return (
    <div className="px-4">
      <div className="flex items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-left">Your Playlists</h1>
          <div className="flex items-center gap-2 text-neutral-400 text-sm mt-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/lovable-uploads/f75af7f8-0b9b-47bf-89de-ab905456d08b.png" alt="DJ" />
              <AvatarFallback>DJ</AvatarFallback>
            </Avatar>
            <span>{playlists.length} Playlists</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button 
          variant="default" 
          size="sm" 
          className="bg-green-500 hover:bg-green-600 rounded-full px-4"
        >
          All Playlists
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-neutral-800/50 border-none rounded-full px-4"
        >
          Recently Added
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-neutral-800/50 border-none rounded-full px-4 whitespace-nowrap"
        >
          Recently Played
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="group bg-neutral-800/30 hover:bg-neutral-800/50 rounded-lg p-3 transition-colors cursor-pointer"
            onClick={() => onPlaylistClick(playlist)}
          >
            <div className="aspect-square bg-neutral-800 rounded-md mb-4 group-hover:bg-neutral-700/80 transition-colors flex items-center justify-center">
              <Library className="h-10 w-10 text-white/70" />
            </div>
            <div className="space-y-1 text-left">
              <h3 className="font-medium truncate">{playlist.name}</h3>
              <p className="text-sm text-neutral-400">{playlist.tracks.size} tracks</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
