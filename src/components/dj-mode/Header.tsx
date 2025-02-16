
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";

type HeaderProps = {
  hasActiveFilters: boolean;
  selectedKey: string;
  onFilterClick: () => void;
  onAvatarClick: () => void;
};

export function Header({ hasActiveFilters, selectedKey, onFilterClick, onAvatarClick }: HeaderProps) {
  const { showBpmKey } = useSettings();
  
  return (
    <header className="sticky top-0 bg-gradient-to-b from-neutral-900/90 to-black/90 backdrop-blur-md p-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="text-white">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-4">
          {showBpmKey && (
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant={hasActiveFilters ? "default" : "outline"}
                  className={cn(
                    "px-3",
                    hasActiveFilters 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                      : "bg-neutral-800/50 hover:bg-neutral-700/50 border-none"
                  )}
                >
                  <Filter className={cn(
                    "h-5 w-5 mr-2",
                    hasActiveFilters && "text-white"
                  )} />
                  Filter{selectedKey ? ` (${selectedKey})` : ""}
                </Button>
              </DialogTrigger>
            </Dialog>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            className="p-0 hover:bg-transparent"
            onClick={onAvatarClick}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/lovable-uploads/f75af7f8-0b9b-47bf-89de-ab905456d08b.png" alt="DJ" />
              <AvatarFallback>DJ</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
