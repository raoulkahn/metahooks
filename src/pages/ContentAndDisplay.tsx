
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/contexts/SettingsContext";

export default function ContentAndDisplay() {
  const navigate = useNavigate();
  const { showBpmKey, setShowBpmKey } = useSettings();

  return (
    <div className="mobile-frame">
      <div className="mobile-notch" />
      <div className="mobile-screen">
        <div className="mobile-status-bar">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="h-[calc(100%-2rem)] bg-neutral-900 text-white overflow-y-auto">
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 p-4 text-neutral-400 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Content and display</span>
          </button>

          <div className="px-4 pt-4 pb-8">
            <h2 className="text-2xl font-bold mb-8 text-neutral-400">Content preferences</h2>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl text-neutral-400">Canvas</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[15px] text-neutral-400">Displays short, looping visuals in the Now Playing View.</p>
                  </div>
                  <Switch checked={true} className="data-[state=checked]:bg-green-500" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl mb-1 text-neutral-400">Allow explicit content</h2>
                    <p className="text-[15px] text-neutral-400">
                      Explicit content (labeled with the E tag) is playable.
                    </p>
                  </div>
                  <Switch checked={true} className="data-[state=checked]:bg-green-500" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl mb-1 text-neutral-400">Show unplayable songs</h2>
                    <p className="text-[15px] text-neutral-400">
                      Songs that aren't available (e.g., due to artist removal or region) are still visible.
                    </p>
                  </div>
                  <Switch checked={true} className="data-[state=checked]:bg-green-500" />
                </div>
              </div>

              <div className="pt-4">
                <h2 className="text-2xl font-bold mb-6">Display preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Show BPM and Key</p>
                        <Badge className="bg-purple-500 text-[10px] px-1.5 py-0.5">NEW</Badge>
                      </div>
                      <p className="text-sm text-neutral-400 mt-1">
                        Filter playlist tracks by BPM and/or Key and also create new playlists.
                      </p>
                    </div>
                    <Switch
                      checked={showBpmKey}
                      onCheckedChange={setShowBpmKey}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                </div>

                <button className="w-full flex items-center justify-between mt-6 opacity-50">
                  <div>
                    <h2 className="text-xl">App language</h2>
                    <p className="text-[15px] text-neutral-400">
                      Set your default language for the Spotify app, plus notifications and emails.
                    </p>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
