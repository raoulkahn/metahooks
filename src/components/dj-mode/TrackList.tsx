
import { Track } from "@/types/music";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Play } from "lucide-react";

type TrackListProps = {
  tracks: Track[];
  currentlyPlaying: Track | null;
  showTechnicalDetails: boolean;
  isSelectingTracks: boolean;
  selectedTracks: Set<string>;
  onTrackSelect: (trackId: string) => void;
  onTrackPlay: (track: Track) => void;
};

export function TrackList({
  tracks,
  currentlyPlaying,
  showTechnicalDetails,
  isSelectingTracks,
  selectedTracks,
  onTrackSelect,
  onTrackPlay,
}: TrackListProps) {
  return (
    <div className="space-y-2">
      {tracks.map((track) => (
        <div
          key={track.id}
          className={cn(
            "flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer group",
            currentlyPlaying?.id === track.id && "bg-white/10",
            isSelectingTracks && selectedTracks.has(track.id) && "bg-emerald-500/20 border border-emerald-500/50"
          )}
          onClick={() => isSelectingTracks ? onTrackSelect(track.id) : onTrackPlay(track)}
        >
          <div className="relative">
            <img
              src={track.albumArt}
              alt={track.title}
              className="w-12 h-12 rounded object-cover"
            />
            {isSelectingTracks && selectedTracks.has(track.id) && (
              <div className="absolute inset-0 bg-emerald-500/80 rounded flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className={cn(
              "text-base font-medium truncate",
              currentlyPlaying?.id === track.id && "text-green-500"
            )}>
              {track.title}
            </div>
            <div className="text-sm text-neutral-400 truncate">
              {track.artist}
            </div>
          </div>
          {showTechnicalDetails && (
            <div className="flex items-center gap-4 text-sm ml-auto">
              <span className="text-emerald-500 whitespace-nowrap">{track.bpm} BPM</span>
              <span className="text-emerald-500 whitespace-nowrap">{track.key}</span>
              {!isSelectingTracks && (
                <span className="text-neutral-400">•••</span>
              )}
            </div>
          )}
          {!showTechnicalDetails && !isSelectingTracks && (
            <span className="text-neutral-400 ml-auto">•••</span>
          )}
        </div>
      ))}
    </div>
  );
}
