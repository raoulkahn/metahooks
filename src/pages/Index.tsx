
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-16 h-16 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-black">
              <path
                fill="currentColor"
                d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Spotify DJ View</h1>
          <p className="text-neutral-400 text-lg">
            Enhanced playlist management with BPM and key information for DJs
          </p>
        </div>
        
        <Link to="/dj-mode" className="block">
          <Button 
            variant="default" 
            size="lg"
            className="w-full bg-[#1DB954] hover:bg-[#1DB954]/90 text-black font-semibold"
          >
            View Demo Playlist
          </Button>
        </Link>
      </div>
    </div>
  );
}
