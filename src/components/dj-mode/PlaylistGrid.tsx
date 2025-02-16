
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
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Made For You
          </h2>
          <p className="text-sm text-neutral-400">
            Your personal playlists
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => onPlaylistClick(playlist)}
              className="group relative bg-neutral-800/40 rounded-md p-4 hover:bg-neutral-800/60 transition-all cursor-pointer space-y-4"
            >
              <div className="aspect-square w-full bg-neutral-900/90 rounded-md flex items-center justify-center">
                <Library className="h-12 w-12 text-neutral-400" />
              </div>
              <div>
                <h3 className="font-medium truncate">{playlist.name}</h3>
                <p className="text-sm text-neutral-400">
                  {playlist.tracks.size} tracks
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
