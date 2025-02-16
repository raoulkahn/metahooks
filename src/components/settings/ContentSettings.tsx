
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

      <div className="px-4 pt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
