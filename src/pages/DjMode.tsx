
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/dj-mode/Header";
import BottomBar from "@/components/dj-mode/BottomBar";
import TrackList from "@/components/dj-mode/TrackList";
import PlaylistGrid from "@/components/dj-mode/PlaylistGrid";

export default function DjMode() {
  const [view, setView] = useState<"list" | "grid">("list");
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <Header />
      
      <div className="flex-1 relative">
        {view === "list" ? <TrackList /> : <PlaylistGrid />}
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:text-white/80"
          onClick={() => navigate("/settings")}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      <BottomBar view={view} onViewChange={setView} />
    </div>
  );
}
