
import { useState, useEffect } from "react";
import { Header } from "@/components/dj-mode/Header";
import { BottomBar } from "@/components/dj-mode/BottomBar";
import { TrackList } from "@/components/dj-mode/TrackList";
import { Track, Playlist } from "@/types/music";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DjMode() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<"list">("list");
  const [selectedKey, setSelectedKey] = useState("");
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());
  const [isSelectingTracks, setIsSelectingTracks] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [filterBpmRange, setFilterBpmRange] = useState<[number, number]>([90, 140]);
  const [filterKey, setFilterKey] = useState("");
  const [filterKeyType, setFilterKeyType] = useState<"major" | "minor">("major");
  const navigate = useNavigate();

  const tracks: Track[] = [
    {
      id: "1",
      title: "Adams Hill",
      artist: "Tensnake",
      albumArt: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      bpm: 128,
      key: "1A",
      duration: "3:00",
      energy: 7
    },
    {
      id: "2",
      title: "Cielo - Fulltone Remix",
      artist: "Double Touch, Bross (RO), Fulltone",
      albumArt: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      bpm: 130,
      key: "2A",
      duration: "3:30",
      energy: 8
    },
    {
      id: "3",
      title: "Without - Tim Green Remix",
      artist: "BAILE, Tim Green, Felicia Douglass",
      albumArt: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      bpm: 132,
      key: "3A",
      duration: "4:00",
      energy: 9
    },
    {
      id: "4",
      title: "Liberator - Extended Mix",
      artist: "Marsh",
      albumArt: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      bpm: 125,
      key: "4A",
      duration: "3:45",
      energy: 8
    },
    {
      id: "5",
      title: "Le Saint Graal - Original Mix",
      artist: "Volen Sentir",
      albumArt: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      bpm: 126,
      key: "5A",
      duration: "3:15",
      energy: 7
    },
    {
      id: "6",
      title: "Reborn - Volen Sentir Sunset Mix",
      artist: "Armen Miran, Volen Sentir",
      albumArt: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      bpm: 124,
      key: "6A",
      duration: "3:50",
      energy: 6
    },
    {
      id: "7",
      title: "Alas",
      artist: "Matias Fittipaldi",
      albumArt: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      bpm: 124,
      key: "6A",
      duration: "3:50",
      energy: 6
    },
    {
      id: "8",
      title: "Moss",
      artist: "Tim Green",
      albumArt: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      bpm: 124,
      key: "6A",
      duration: "3:50",
      energy: 6
    },
    {
      id: "9",
      title: "Adam - Kamilo Sanclemente Remix",
      artist: "Jiminy Hop, Kamilo Sanclemente",
      albumArt: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
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

  useEffect(() => {
    const playlistParam = searchParams.get('playlist');
    if (playlistParam === 'running') {
      const runningPlaylist = playlists.find(p => p.name.toLowerCase() === 'running');
      if (runningPlaylist) {
        setSelectedPlaylist(runningPlaylist);
      }
    }
  }, [searchParams]);

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

  const handleAvatarClick = () => {
    navigate('/settings');
  };

  const handleApplyFilters = (bpmRange: [number, number], key: string, keyType: "major" | "minor") => {
    setFilterBpmRange(bpmRange);
    setFilterKey(key);
    setFilterKeyType(keyType);
    setHasActiveFilters(true);
    
    // Filter tracks based on criteria
    const filteredTracks = tracks.filter(track => {
      const bpmInRange = track.bpm >= bpmRange[0] && track.bpm <= bpmRange[1];
      const keyMatches = key ? track.key === key : true;
      return bpmInRange && keyMatches;
    });

    // Auto-select filtered tracks
    setSelectedTracks(new Set(filteredTracks.map(track => track.id)));
    setIsSelectingTracks(true);

    // Show toast with number of matches
    toast.success(`${filteredTracks.length} tracks match your criteria`);
  };

  const handleCreatePlaylist = () => {
    // Create new playlist logic here
    toast.success("New playlist created with selected tracks");
    setIsSelectingTracks(false);
    setSelectedTracks(new Set());
    setHasActiveFilters(false);
  };

  const handleCancelSelection = () => {
    setIsSelectingTracks(false);
    setSelectedTracks(new Set());
    setHasActiveFilters(false);
  };

  const displayedTracks = selectedPlaylist
    ? tracks.filter(track => selectedPlaylist.tracks.has(track.id))
    : tracks;

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <Header
        hasActiveFilters={hasActiveFilters}
        selectedKey={selectedKey}
        onFilterClick={() => setHasActiveFilters(!hasActiveFilters)}
        onAvatarClick={handleAvatarClick}
        title={selectedPlaylist?.name || "Library"}
        view={view}
        onApplyFilters={handleApplyFilters}
      />
      
      <div className="flex-1 relative overflow-auto p-4 pb-32">
        {isSelectingTracks && (
          <div className="fixed bottom-24 left-0 right-0 bg-neutral-900 p-4 border-t border-neutral-800 z-10">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              <div>
                <h3 className="text-base font-medium">Select tracks for your new playlist</h3>
                <p className="text-sm text-neutral-400">{selectedTracks.size} tracks selected</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-neutral-800 text-white border-none hover:bg-neutral-700"
                  onClick={handleCancelSelection}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                  onClick={handleCreatePlaylist}
                >
                  Create Playlist
                </Button>
              </div>
            </div>
          </div>
        )}

        <TrackList
          tracks={displayedTracks}
          currentlyPlaying={currentlyPlaying}
          showTechnicalDetails={true}
          isSelectingTracks={isSelectingTracks}
          selectedTracks={selectedTracks}
          onTrackSelect={handleTrackSelect}
          onTrackPlay={handleTrackPlay}
        />
      </div>

      <BottomBar
        currentlyPlaying={currentlyPlaying}
        showPlaylists={false}
        onLibraryClick={() => {}}
      />
    </div>
  );
}
