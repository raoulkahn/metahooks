
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

export function ContentSettings({ onBack }: { onBack: () => void }) {
  const { showBpmKey, setShowBpmKey } = useSettings();

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 p-4 text-neutral-400 hover:text-white"
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Content and display</span>
      </button>

      <div className="px-4 pt-4 pb-8">
        <h2 className="text-2xl font-bold mb-8">Content preferences</h2>

        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Display preferences</h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show BPM and Key</p>
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

            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="font-medium">Show unplayed episodes</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Show episodes you haven't played yet.
                </p>
              </div>
              <Switch checked={false} className="data-[state=checked]:bg-green-500" />
            </div>

            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="font-medium">Show friend activity</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Let friends see what you're listening to.
                </p>
              </div>
              <Switch checked={false} className="data-[state=checked]:bg-green-500" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Playback</h3>

            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="font-medium">Autoplay</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Keep listening to similar tracks when your music ends.
                </p>
              </div>
              <Switch checked={false} className="data-[state=checked]:bg-green-500" />
            </div>

            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="font-medium">Audio Quality</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Control your streaming audio quality.
                </p>
              </div>
              <Switch checked={false} className="data-[state=checked]:bg-green-500" />
            </div>

            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="font-medium">Crossfade</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Allow smooth transitions between songs.
                </p>
              </div>
              <Switch checked={false} className="data-[state=checked]:bg-green-500" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Languages</h3>

            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="font-medium">Preferred language</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Choose your preferred language for the app.
                </p>
              </div>
              <Switch checked={false} className="data-[state=checked]:bg-green-500" />
            </div>

            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="font-medium">Show music in your language</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Hear more music in languages you prefer.
                </p>
              </div>
              <Switch checked={false} className="data-[state=checked]:bg-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
