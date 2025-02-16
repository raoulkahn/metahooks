
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, Filter, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  hasActiveFilters: boolean;
  selectedKey: string;
  onFilterClick: () => void;
  onAvatarClick: () => void;
  title?: string;
  onPlayClick?: () => void;
  showPlayButton?: boolean;
  view?: "list" | "grid";
};

export function Header({ 
  hasActiveFilters, 
  selectedKey, 
  onFilterClick, 
  onAvatarClick, 
  title = "Library",
  onPlayClick,
  showPlayButton = false,
  view = "grid"
}: HeaderProps) {
  const { showBpmKey } = useSettings();
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 bg-black/90 backdrop-blur-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-neutral-800"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <span className="text-white text-lg font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {view === "list" && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="h-9 bg-neutral-800 hover:bg-neutral-700 border-none text-white font-medium px-4"
              >
                BPM KEY
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-9 px-4 font-medium",
                      hasActiveFilters 
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none" 
                        : "bg-neutral-800 hover:bg-neutral-700 border-none text-white"
                    )}
                    onClick={onFilterClick}
                  >
                    <Filter className={cn(
                      "h-4 w-4 mr-2",
                      hasActiveFilters ? "text-white" : "text-neutral-400"
                    )} />
                    Filter{selectedKey ? ` (${selectedKey})` : ""}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-neutral-900 text-white border-neutral-800">
                  <div className="p-4">
                    <h2 className="text-lg font-medium mb-4">Filter Tracks</h2>
                    {/* Filter content would go here */}
                    <p className="text-neutral-400">Filter options coming soon...</p>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {showPlayButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onPlayClick}
              className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 text-black transition-colors"
            >
              <Play className="h-6 w-6 fill-current" />
            </Button>
          )}

          <button 
            onClick={onAvatarClick}
            className="p-0 hover:bg-transparent"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/lovable-uploads/f75af7f8-0b9b-47bf-89de-ab905456d08b.png" alt="DJ" />
              <AvatarFallback>DJ</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
}
