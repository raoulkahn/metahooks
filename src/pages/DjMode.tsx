import { useState } from "react";
import { Header } from "@/components/dj-mode/Header";
import { BottomBar } from "@/components/dj-mode/BottomBar";
import { TrackList } from "@/components/dj-mode/TrackList";
import { PlaylistGrid } from "@/components/dj-mode/PlaylistGrid";
import { Track, Playlist } from "@/types/music";
import { useNavigate } from "react-router-dom";

export default function DjMode() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedKey, setSelectedKey] = useState("");
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());
  const [isSelectingTracks, setIsSelectingTracks] = useState(false);
  const navigate = useNavigate();

  const tracks: Track[] = [
    {
      id: "1",
      title: "Adams Hill",
      artist: "Tensnake",
      albumArt: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      bpm: 128,
      key: "1A",
      duration: "3:00",
      energy: 7
    },
    {
      id: "2",
      title: "Cielo - Fulltone Remix",
      artist: "Double Touch, Bross (RO), Fulltone",
      albumArt: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      bpm: 130,
      key: "2A",
      duration: "3:30",
      energy: 8
    },
    {
      id: "3",
      title: "Without - Tim Green Remix",
      artist: "BAILE, Tim Green, Felicia Douglass",
      albumArt: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
      bpm: 132,
      key: "3A",
      duration: "4:00",
      energy: 9
    },
    {
      id: "4",
      title: "Liberator - Extended Mix",
      artist: "Marsh",
      albumArt: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      bpm: 125,
      key: "4A",
      duration: "3:45",
      energy: 8
    },
    {
      id: "5",
      title: "Le Saint Graal - Original Mix",
      artist: "Volen Sentir",
      albumArt: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      bpm: 126,
      key: "5A",
      duration: "3:15",
      energy: 7
    },
    {
      id: "6",
      title: "Reborn - Volen Sentir Sunset Mix",
      artist: "Volen Sentir",
      albumArt: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
      bpm: 124,
      key: "6A",
      duration: "3:50",
      energy: 6
    }
  ];

  const playlists: Playlist[] = [
    { id: "0", name: "Running", tracks: new Set(tracks.map(track => track.id)), createdAt: new Date() },
    { id: "1", name: "House Vibes", tracks: new Set(["1", "2"]), createdAt: new Date() },
    { id: "2", name: "Deep House", tracks: new Set(["1"]), createdAt: new Date() },
    { id: "3", name: "Techno", tracks: new Set(["2"]), createdAt: new Date() },
    { id: "4", name: "Melodic House", tracks: new Set(["1", "2"]), createdAt: new Date() },
    { id: "5", name: "Progressive", tracks: new Set(["1"]), createdAt: new Date() }
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

  const handlePlaylistClick = (playlist: Playlist) => {
    console.log("Playlist clicked:", playlist.name);
  };

  const handleAvatarClick = () => {
    navigate('/settings');
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <Header
        hasActiveFilters={hasActiveFilters}
        selectedKey={selectedKey}
        onFilterClick={() => setHasActiveFilters(!hasActiveFilters)}
        onAvatarClick={handleAvatarClick}
      />
      
      <div className="flex-1 relative overflow-auto p-4">
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
      </div>

      <BottomBar
        currentlyPlaying={currentlyPlaying}
        showPlaylists={view === "grid"}
        onLibraryClick={() => setView(view === "list" ? "grid" : "list")}
      />
    </div>
  );
}
