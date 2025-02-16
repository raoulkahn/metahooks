
import { useState } from "react";
import { Header } from "@/components/dj-mode/Header";
import { BottomBar } from "@/components/dj-mode/BottomBar";
import { TrackList } from "@/components/dj-mode/TrackList";
import { PlaylistGrid } from "@/components/dj-mode/PlaylistGrid";
import { Track, Playlist } from "@/types/music";

export default function DjMode() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedKey, setSelectedKey] = useState("");
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());
  const [isSelectingTracks, setIsSelectingTracks] = useState(false);

  const tracks: Track[] = [
    {
      id: "1",
      title: "Running Up That Hill",
      artist: "Kate Bush",
      albumArt: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=300",
      bpm: 128,
      key: "1A",
      duration: "3:00",
      energy: 7
    },
    {
      id: "2",
      title: "Run the World (Girls)",
      artist: "Beyoncé",
      albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      bpm: 130,
      key: "2A",
      duration: "3:30",
      energy: 8
    },
    {
      id: "3",
      title: "Run",
      artist: "Foo Fighters",
      albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      bpm: 132,
      key: "3A",
      duration: "4:00",
      energy: 9
    },
    {
      id: "4",
      title: "Born to Run",
      artist: "Bruce Springsteen",
      albumArt: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=300",
      bpm: 125,
      key: "4A",
      duration: "3:45",
      energy: 8
    },
    {
      id: "5",
      title: "Run to You",
      artist: "Bryan Adams",
      albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      bpm: 126,
      key: "5A",
      duration: "3:15",
      energy: 7
    },
    {
      id: "6",
      title: "Running to Stand Still",
      artist: "U2",
      albumArt: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=300",
      bpm: 124,
      key: "6A",
      duration: "3:50",
      energy: 6
    },
    {
      id: "7",
      title: "I Ran",
      artist: "A Flock of Seagulls",
      albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      bpm: 128,
      key: "7A",
      duration: "3:20",
      energy: 8
    },
    {
      id: "8",
      title: "Run Away With Me",
      artist: "Carly Rae Jepsen",
      albumArt: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=300",
      bpm: 127,
      key: "8A",
      duration: "3:40",
      energy: 9
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
    console.log("Avatar clicked");
    // Add your avatar click logic here
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
