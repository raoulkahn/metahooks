
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { ContentSettings } from "./ContentSettings";
import { useState } from "react";

export function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [currentView, setCurrentView] = useState<"main" | "content">("main");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="fixed w-screen h-screen p-0 bg-neutral-900 text-white overflow-y-auto inset-0 max-w-none rounded-none border-none m-0">
        {currentView === "main" ? (
          <div className="h-full">
            <div className="p-6 flex items-center gap-4">
              <img 
                src="/lovable-uploads/f75af7f8-0b9b-47bf-89de-ab905456d08b.png"
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-[17px] font-semibold">DJ User</h2>
                <p className="text-sm text-neutral-400">View Profile</p>
              </div>
            </div>

            <div className="space-y-0.5">
              <button className="w-full px-6 py-3.5 text-left text-[15px] text-neutral-400 cursor-not-allowed hover:bg-white/5">
                Account
              </button>
              <button className="w-full px-6 py-3.5 text-left text-[15px] text-neutral-400 cursor-not-allowed hover:bg-white/5">
                Data Saver
              </button>
              <button className="w-full px-6 py-3.5 text-left text-[15px] text-neutral-400 cursor-not-allowed hover:bg-white/5">
                Playback
              </button>
              <button
                className="w-full px-6 py-3.5 flex items-center justify-between hover:bg-white/5 text-[15px]"
                onClick={() => setCurrentView("content")}
              >
                <span>Content and display</span>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
              <button className="w-full px-6 py-3.5 text-left text-[15px] text-neutral-400 cursor-not-allowed hover:bg-white/5">
                Privacy and social
              </button>
              <button className="w-full px-6 py-3.5 text-left text-[15px] text-neutral-400 cursor-not-allowed hover:bg-white/5">
                Audio Quality
              </button>
              <button className="w-full px-6 py-3.5 text-left text-[15px] text-neutral-400 cursor-not-allowed hover:bg-white/5">
                Video Quality
              </button>
              <button className="w-full px-6 py-3.5 text-left text-[15px] text-neutral-400 cursor-not-allowed hover:bg-white/5">
                Storage
              </button>
              <button className="w-full px-6 py-3.5 text-left text-[15px] text-neutral-400 cursor-not-allowed hover:bg-white/5">
                Notifications
              </button>
              <button className="w-full px-6 py-3.5 text-left text-[15px] text-neutral-400 cursor-not-allowed hover:bg-white/5">
                Apps and devices
              </button>
              <button className="w-full px-6 py-3.5 text-left text-[15px] text-neutral-400 cursor-not-allowed hover:bg-white/5">
                About
              </button>
            </div>
          </div>
        ) : (
          <ContentSettings onBack={() => setCurrentView("main")} />
        )}
      </DialogContent>
    </Dialog>
  );
}
