
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/contexts/SettingsContext";

export default function ContentAndDisplay() {
  const navigate = useNavigate();
  const { showBpmKey, setShowBpmKey } = useSettings();

  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
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
          
          <div className="h-[calc(100%-2rem)] bg-[#121212] text-white overflow-y-auto">
            <button
              onClick={() => navigate("/settings")}
              className="flex items-center gap-2 p-4 text-neutral-400"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-[17px]">Content and display</span>
            </button>

            <div className="px-4 pt-2 pb-8">
              <h2 className="text-2xl font-semibold mb-8 text-white">Content preferences</h2>

              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-[17px] font-semibold text-white">Canvas</h3>
                  <div className="flex items-center justify-between">
                    <div className="pr-6">
                      <p className="text-[15px] text-neutral-400 leading-5">Displays short, looping visuals in the Now Playing View.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#1ed760]" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="pr-6">
                      <h3 className="text-[17px] font-semibold text-white mb-1">Allow explicit content</h3>
                      <p className="text-[15px] text-neutral-400 leading-5">
                        Explicit content (labeled with the E tag) is playable.
                      </p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#1ed760]" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="pr-6">
                      <h3 className="text-[17px] font-semibold text-white mb-1">Show unplayable songs</h3>
                      <p className="text-[15px] text-neutral-400 leading-5">
                        Songs that aren't available (e.g., due to artist removal or region) are still visible.
                      </p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#1ed760]" />
                  </div>
                </div>

                <div className="pt-4">
                  <h2 className="text-2xl font-semibold mb-6 text-white">Display preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="pr-6">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[17px] font-semibold text-white">Show BPM and Key</h3>
                          <Badge className="bg-[#6F3CE7] text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase">New</Badge>
                        </div>
                        <p className="text-[15px] text-neutral-400 mt-1 leading-5">
                          Filter playlist tracks by BPM and/or Key and also create new playlists.
                        </p>
                      </div>
                      <Switch
                        checked={showBpmKey}
                        onCheckedChange={setShowBpmKey}
                        className="data-[state=checked]:bg-[#1ed760]"
                      />
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-between mt-8 group">
                    <div>
                      <h3 className="text-[17px] font-semibold text-white">App language</h3>
                      <p className="text-[15px] text-neutral-400 mt-1 leading-5">
                        Set your default language for the Spotify app, plus notifications and emails.
                      </p>
                    </div>
                    <ChevronLeft className="h-5 w-5 rotate-180 text-neutral-400 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
