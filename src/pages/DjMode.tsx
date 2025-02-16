
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/dj-mode/Header";
import { BottomBar } from "@/components/dj-mode/BottomBar";
import { TrackList } from "@/components/dj-mode/TrackList";
import { PlaylistGrid } from "@/components/dj-mode/PlaylistGrid";
import { Track } from "@/types/music";

export default function DjMode() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedKey, setSelectedKey] = useState("");
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());
  const [isSelectingTracks, setIsSelectingTracks] = useState(false);
  const navigate = useNavigate();

  // Sample data - in a real app this would come from your backend
  const tracks: Track[] = [
    {
      id: "1",
      title: "Sample Track 1",
      artist: "Artist 1",
      albumArt: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=300",
      bpm: 128,
      key: "C",
      duration: 180
    },
    {
      id: "2",
      title: "Sample Track 2",
      artist: "Artist 2",
      albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      bpm: 130,
      key: "G",
      duration: 210
    }
  ];

  const playlists = [
    { id: "1", name: "House Vibes", tracks: new Set(["1", "2"]) },
    { id: "2", name: "Deep House", tracks: new Set(["1"]) },
    { id: "3", name: "Techno", tracks: new Set(["2"]) },
    { id: "4", name: "Melodic House", tracks: new Set(["1", "2"]) },
    { id: "5", name: "Progressive", tracks: new Set(["1"]) }
  ];

  const handleTrackPlay = (track: Track) => {
    setCurrentlyPlaying(track);
  };

  const handleTrackSelect = (trackId: string) => {
    const newSelectedTracks = new Set(selectedTracks);
    if (selectedTracks.has(trackId)) {
      newSelectedTracks.delete(trackId);
    } else {
      newSelectedTracks.add(trackId);
    }
    setSelectedTracks(newSelectedTracks);
  };

  const handlePlaylistClick = (playlist: typeof playlists[0]) => {
    // Handle playlist click
    console.log("Playlist clicked:", playlist.name);
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <Header
        hasActiveFilters={hasActiveFilters}
        selectedKey={selectedKey}
        onFilterClick={() => setHasActiveFilters(!hasActiveFilters)}
        onAvatarClick={() => console.log("Avatar clicked")}
      />
      
      <div className="flex-1 relative">
        {view === "list" ? (
          <TrackList
            tracks={tracks}
            currentlyPlaying={currentlyPlaying}
            showTechnicalDetails={true}
            isSelectingTracks={isSelectingTracks}
            selectedTracks={selectedTracks}
            onTrackSelect={handleTrackSelect}
            onTrackPlay={handleTrackPlay}
          />
        ) : (
          <PlaylistGrid
            playlists={playlists}
            onPlaylistClick={handlePlaylistClick}
          />
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:text-white/80"
          onClick={() => navigate("/settings")}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      <BottomBar
        currentlyPlaying={currentlyPlaying}
        showPlaylists={view === "grid"}
        onLibraryClick={() => setView(view === "list" ? "grid" : "list")}
      />
    </div>
  );
}
