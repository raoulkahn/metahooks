import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

type HeaderProps = {
  hasActiveFilters: boolean;
  selectedKey: string;
  onFilterClick: () => void;
  onAvatarClick: () => void;
  onApplyFilters: (bpmRange: [number, number], key: string, keyType: "major" | "minor") => void;
  title?: string;
  view?: "list" | "grid";
};

const FLAT_KEYS = ["Db", "Eb", "Gb", "Ab", "Bb"];
const NATURAL_KEYS = ["C", "D", "E", "F", "G", "A", "B"];

export function Header({ 
  hasActiveFilters, 
  selectedKey, 
  onFilterClick, 
  onAvatarClick,
  onApplyFilters,
  title = "Library",
  view = "grid"
}: HeaderProps) {
  const { showBpmKey } = useSettings();
  const navigate = useNavigate();
  const [bpmRange, setBpmRange] = useState([90, 140]);
  const [selectedMusicKey, setSelectedMusicKey] = useState<string>("");
  const [keyType, setKeyType] = useState<"major" | "minor">("major");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-gradient-to-b from-black/95 via-black/95 to-black/0 z-10">
      {/* First row: Title and Avatar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800/50">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-neutral-800/50 -ml-3"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <span className="text-white text-lg font-medium">{title}</span>
        </div>
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

      {/* Second row: BPM KEY and Filter buttons */}
      {view === "list" && (
        <div className="flex items-center justify-end gap-3 px-4 py-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-black/50 hover:bg-black/70 border-none text-white font-medium px-4 rounded-3xl text-sm"
          >
            BPM KEY
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 px-4 font-medium rounded-3xl text-sm",
                  hasActiveFilters 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none" 
                    : "bg-black/50 hover:bg-black/70 border-none text-white"
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
            <DialogContent className="bg-neutral-900 text-white border-neutral-800 max-w-md w-full">
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-6">Filter Tracks</h2>
                  
                  {/* BPM Range Filter */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-sm font-medium text-neutral-200">BPM Range</h3>
                    <div className="flex items-center gap-4">
                      <div className="bg-black/50 rounded-md px-3 py-1 text-sm text-white">
                        {bpmRange[0]}
                      </div>
                      <Slider
                        defaultValue={bpmRange}
                        max={140}
                        min={80}
                        step={1}
                        onValueChange={setBpmRange}
                        className="flex-1"
                      />
                      <div className="bg-black/50 rounded-md px-3 py-1 text-sm text-white">
                        {bpmRange[1]}
                      </div>
                    </div>
                  </div>

                  {/* Musical Key Filter */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-neutral-200">Key</h3>
                    
                    {/* Flat Keys */}
                    <div className="grid grid-cols-5 gap-2">
                      {FLAT_KEYS.map((key) => (
                        <Button
                          key={key}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "h-8 text-sm rounded-md",
                            selectedMusicKey === key
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                              : "bg-black/50 hover:bg-black/70 border-none text-white"
                          )}
                          onClick={() => setSelectedMusicKey(key === selectedMusicKey ? "" : key)}
                        >
                          {key}
                        </Button>
                      ))}
                    </div>

                    {/* Natural Keys */}
                    <div className="grid grid-cols-7 gap-2">
                      {NATURAL_KEYS.map((key) => (
                        <Button
                          key={key}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "h-8 text-sm rounded-md",
                            selectedMusicKey === key
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                              : "bg-black/50 hover:bg-black/70 border-none text-white"
                          )}
                          onClick={() => setSelectedMusicKey(key === selectedMusicKey ? "" : key)}
                        >
                          {key}
                        </Button>
                      ))}
                    </div>

                    {/* Major/Minor Toggle */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "h-8 text-sm rounded-md",
                          keyType === "major"
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                            : "bg-black/50 hover:bg-black/70 border-none text-white"
                        )}
                        onClick={() => setKeyType("major")}
                      >
                        Major
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "h-8 text-sm rounded-md",
                          keyType === "minor"
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                            : "bg-black/50 hover:bg-black/70 border-none text-white"
                        )}
                        onClick={() => setKeyType("minor")}
                      >
                        Minor
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Apply and Reset Buttons */}
                <div className="space-y-2">
                  <Button
                    size="sm"
                    className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-md"
                    onClick={() => {
                      onApplyFilters(bpmRange as [number, number], selectedMusicKey, keyType);
                      setOpen(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-10 bg-black/50 hover:bg-black/70 border-none text-white rounded-md"
                    onClick={() => {
                      setBpmRange([90, 140]);
                      setSelectedMusicKey("");
                      setKeyType("major");
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </header>
  );
}
