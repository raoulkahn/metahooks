
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">DJ View</h1>
          <p className="text-neutral-400 text-lg">
            Enhanced playlist management with BPM and key information for DJs
          </p>
        </div>
        
        <Link to="/dj-mode" className="block">
          <Button 
            variant="default" 
            size="lg"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            View Demo Playlist
          </Button>
        </Link>
      </div>
    </div>
  );
}
