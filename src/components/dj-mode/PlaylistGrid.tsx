
import { Playlist } from "@/types/music";
import { Button } from "@/components/ui/button";
import { Library } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "@/components/ui/image";

type PlaylistGridProps = {
  playlists: Playlist[];
  onPlaylistClick: (playlist: Playlist) => void;
};

export function PlaylistGrid({ playlists, onPlaylistClick }: PlaylistGridProps) {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/lovable-uploads/f75af7f8-0b9b-47bf-89de-ab905456d08b.png" alt="DJ" />
            <AvatarFallback>DJ</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Your Library</h1>
            <p className="text-sm text-neutral-400">{playlists.length} playlists</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <Button 
          variant="default" 
          size="sm" 
          className="bg-green-500 hover:bg-green-600 rounded-full px-6"
        >
          Playlists
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-neutral-800/50 border-none rounded-full px-6"
        >
          By you
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-neutral-800/50 border-none rounded-full px-6"
        >
          By Spotify
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-neutral-800/50 border-none rounded-full px-6"
        >
          Downloaded
        </Button>
      </div>

      <div className="space-y-2">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="group flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => onPlaylistClick(playlist)}
          >
            <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
              <AspectRatio ratio={1}>
                <img 
                  src={`https://images.unsplash.com/photo-${playlist.id === "1" ? "1582562124811-c09040d0a901" : 
                    playlist.id === "2" ? "1501286353178-1ec881214838" :
                    playlist.id === "3" ? "1485833077593-4278bba3f11f" :
                    playlist.id === "4" ? "1438565434616-3ef039228b15" :
                    playlist.id === "5" ? "1472396961693-142e6e269027" :
                    "1582562124811-c09040d0a901"}`}
                  alt={playlist.name}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
            <div className="min-w-0">
              <h3 className="font-medium truncate">{playlist.name}</h3>
              <div className="flex items-center gap-1 text-sm text-neutral-400">
                <span>Playlist</span>
                <span>•</span>
                <span>{playlist.tracks.size} songs</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
