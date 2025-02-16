
import { useState } from "react";
import { Track, Playlist } from "@/types/music";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Header } from "@/components/dj-mode/Header";
import { TrackList } from "@/components/dj-mode/TrackList";
import { PlaylistGrid } from "@/components/dj-mode/PlaylistGrid";
import { BottomBar } from "@/components/dj-mode/BottomBar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Play, ChevronLeft } from "lucide-react";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { useSettings } from "@/contexts/SettingsContext";

const demoTracks: Track[] = [
  {
    id: "1",
    title: "Adams Hill",
    artist: "Tensnake",
    bpm: 124,
    key: "8A",
    duration: "6:45",
    energy: 7,
    albumArt: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  },
  {
    id: "2",
    title: "Cielo - Fulltone Remix",
    artist: "Double Touch, Bross (RO), Fulltone",
    bpm: 126,
    key: "3A",
    duration: "7:15",
    energy: 8,
    albumArt: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
  },
  {
    id: "3",
    title: "Without - Tim Green Remix",
    artist: "BAILE, Tim Green, Felicia Douglass",
    bpm: 128,
    key: "11B",
    duration: "6:30",
    energy: 9,
    albumArt: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  },
  {
    id: "4",
    title: "Dreamcatcher",
    artist: "Lane 8",
    bpm: 122,
    key: "6A",
    duration: "7:20",
    energy: 8,
    albumArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17",
  },
  {
    id: "5",
    title: "Bloom",
    artist: "Ben Böhmer",
    bpm: 124,
    key: "11A",
    duration: "6:55",
    energy: 7,
    albumArt: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1",
  },
  {
    id: "6",
    title: "Atlas",
    artist: "Massane",
    bpm: 120,
    key: "2B",
    duration: "5:45",
    energy: 6,
    albumArt: "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7",
  },
  {
    id: "7",
    title: "Sirens of Jupiter",
    artist: "Stephan Bodzin",
    bpm: 126,
    key: "4A",
    duration: "7:30",
    energy: 9,
    albumArt: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
  },
  {
    id: "8",
    title: "Breathe",
    artist: "CamelPhat",
    bpm: 125,
    key: "7B",
    duration: "6:15",
    energy: 8,
    albumArt: "https://images.unsplash.com/photo-1544175832-6d40b32d6d05",
  },
  {
    id: "9",
    title: "Dawn",
    artist: "Yotto",
    bpm: 123,
    key: "9A",
    duration: "6:40",
    energy: 7,
    albumArt: "https://images.unsplash.com/photo-1588974269162-4c0d5a23418d",
  },
  {
    id: "10",
    title: "Cycles",
    artist: "Joris Voorn",
    bpm: 128,
    key: "1B",
    duration: "7:10",
    energy: 8,
    albumArt: "https://images.unsplash.com/photo-1608734265656-f035d3e7bcbf",
  }
];

const demoPLaylists: Playlist[] = [
  {
    id: "running",
    name: "Running",
    tracks: new Set(demoTracks.map(track => track.id)),
    createdAt: new Date()
  },
  {
    id: "1",
    name: "Liked Songs",
    tracks: new Set(["1", "2", "3"]),
    createdAt: new Date()
  },
  {
    id: "2",
    name: "Discover Weekly",
    tracks: new Set(["4", "5", "6"]),
    createdAt: new Date()
  },
  {
    id: "3",
    name: "U2",
    tracks: new Set(["7", "8", "9"]),
    createdAt: new Date()
  },
  {
    id: "4",
    name: "The Cure",
    tracks: new Set(["1", "4", "7"]),
    createdAt: new Date()
  },
  {
    id: "5",
    name: "Retro 80s",
    tracks: new Set(["2", "5", "8"]),
    createdAt: new Date()
  },
  {
    id: "6",
    name: "Release Radar",
    tracks: new Set(["3", "6", "9"]),
    createdAt: new Date()
  }
];

export default function DjMode() {
  const { showBpmKey } = useSettings();
  const [showSettings, setShowSettings] = useState(false);
  const [bpmRange, setBpmRange] = useState<[number, number]>([90, 140]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track | null>(demoTracks[0]);
  const [isSelectingTracks, setIsSelectingTracks] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [hasUsedFilters, setHasUsedFilters] = useState(false);
  const [showPlaylistNameDialog, setShowPlaylistNameDialog] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>(demoPLaylists);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(demoPLaylists[0]);
  const [tempBpmRange, setTempBpmRange] = useState<[number, number]>([90, 140]);
  const [tempKey, setTempKey] = useState(selectedKey);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const hasActiveFilters = selectedKey !== "" || bpmRange[0] !== 90 || bpmRange[1] !== 140;

  const filteredTracks = selectedPlaylist 
    ? demoTracks.filter(track => selectedPlaylist.tracks.has(track.id))
    : demoTracks.filter((track) => {
        const matchesBpm = track.bpm >= bpmRange[0] && track.bpm <= bpmRange[1];
        const matchesKey = !selectedKey || track.key === selectedKey;
        return matchesBpm && matchesKey;
      });

  const handlePlaylistClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setShowPlaylists(false);
  };

  const handleBackToLibrary = () => {
    setShowPlaylists(true);
    setSelectedPlaylist(null);
    setHasUsedFilters(false);
    setBpmRange([90, 140]);
    setSelectedKey("");
    setTempBpmRange([90, 140]);
    setTempKey("");
  };

  const handleResetFilters = () => {
    setTempBpmRange([90, 140]);
    setTempKey("");
    setBpmRange([90, 140]);
    setSelectedKey("");
    setHasUsedFilters(false);
    setIsSelectingTracks(false);
    setSelectedTracks(new Set());
    setShowPlaylistNameDialog(false);
  };

  const handleApplyFilters = () => {
    setBpmRange(tempBpmRange);
    setSelectedKey(tempKey);
    setHasUsedFilters(true);
    
    const willHaveActiveFilters = tempKey !== "" || tempBpmRange[0] !== 90 || tempBpmRange[1] !== 140;
    if (!willHaveActiveFilters) {
      setIsSelectingTracks(false);
      setSelectedTracks(new Set());
      setShowPlaylistNameDialog(false);
    }
  };

  const handleTrackSelection = (trackId: string) => {
    setSelectedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  };

  const handleCreatePlaylist = () => {
    if (!playlistName.trim()) {
      toast.error("Please enter a playlist name");
      return;
    }
    
    const newPlaylist: Playlist = {
      id: crypto.randomUUID(),
      name: playlistName,
      tracks: selectedTracks,
      createdAt: new Date()
    };
    
    setPlaylists(prev => [newPlaylist, ...prev]);
    toast.success(`Created new playlist "${playlistName}" with ${selectedTracks.size} tracks`);
    setShowPlaylistNameDialog(false);
    setPlaylistName("");
    setIsSelectingTracks(false);
    setSelectedTracks(new Set());
    setHasUsedFilters(false);
    setBpmRange([90, 140]);
    setSelectedKey("");
    setTempBpmRange([90, 140]);
    setTempKey("");
  };

  return (
    <div className="h-screen bg-neutral-900 text-white">
      <Header 
        hasActiveFilters={!showPlaylists && hasActiveFilters && showBpmKey}
        selectedKey={selectedKey}
        onFilterClick={() => {}}
        onAvatarClick={() => setSettingsOpen(true)}
      />

      <div className="px-4 pb-32">
        {!showPlaylists && (
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-400 hover:text-white -ml-2 mb-4"
              onClick={handleBackToLibrary}
            >
              <ChevronLeft className="mr-1 h-5 w-5" />
              Back to Library
            </Button>
          </div>
        )}

        {!showPlaylists && hasUsedFilters && filteredTracks.length > 0 && !isSelectingTracks && showBpmKey && (
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium">
                {hasActiveFilters 
                  ? `Found ${filteredTracks.length} matching tracks`
                  : "All tracks match your criteria"
                }
              </h3>
              <p className="text-sm text-neutral-400">Create a new playlist with these tracks?</p>
            </div>
            <Button 
              onClick={() => {
                setSelectedTracks(new Set(filteredTracks.map(track => track.id)));
                setIsSelectingTracks(true);
                setHasUsedFilters(false);
              }}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Create Playlist
            </Button>
          </div>
        )}

        {showPlaylists ? (
          <PlaylistGrid 
            playlists={playlists} 
            onPlaylistClick={handlePlaylistClick}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold">{selectedPlaylist?.name}</h1>
                <div className="flex items-center gap-2 text-neutral-400 text-sm mt-1">
                  <span>{filteredTracks.length} tracks</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {showBpmKey && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                    className={cn(
                      "text-sm rounded-full px-4",
                      showTechnicalDetails 
                        ? "bg-neutral-800/50 text-white border-none" 
                        : "bg-neutral-800/50 text-neutral-400 border-none"
                    )}
                  >
                    BPM-Key
                  </Button>
                )}
                <Button 
                  size="icon" 
                  className="rounded-full bg-green-500 hover:bg-green-400 h-14 w-14"
                >
                  <Play className="h-8 w-8 fill-current" />
                </Button>
              </div>
            </div>

            <TrackList
              tracks={filteredTracks}
              currentlyPlaying={currentlyPlaying}
              showTechnicalDetails={showTechnicalDetails && showBpmKey}
              isSelectingTracks={isSelectingTracks}
              selectedTracks={selectedTracks}
              onTrackSelect={handleTrackSelection}
              onTrackPlay={setCurrentlyPlaying}
            />
          </>
        )}
      </div>

      <BottomBar
        currentlyPlaying={currentlyPlaying}
        showPlaylists={showPlaylists}
        onLibraryClick={() => {
          setShowPlaylists(!showPlaylists);
          setSelectedPlaylist(null);
        }}
      />

      <SettingsDialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />

      <Dialog open={showPlaylistNameDialog} onOpenChange={setShowPlaylistNameDialog}>
        <DialogContent className="sm:max-w-[425px] bg-neutral-900 text-white">
          <DialogHeader>
            <DialogTitle>Name your playlist</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Input
                id="playlist-name"
                placeholder="Enter playlist name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="bg-neutral-800 border-neutral-700 text-white"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setShowPlaylistNameDialog(false);
                setPlaylistName("");
                setHasUsedFilters(false);
              }}
              className="bg-neutral-800 hover:bg-neutral-700 border-neutral-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePlaylist}
              disabled={!playlistName.trim()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Create Playlist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
