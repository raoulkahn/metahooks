
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

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
          
          <div className="h-[calc(100%-2rem)] bg-black text-white">
            <button 
              onClick={() => navigate('/')}
              className="absolute top-14 left-6 text-white hover:text-white/80"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="p-6 flex items-center gap-4 mt-8">
              <img 
                src="/lovable-uploads/f75af7f8-0b9b-47bf-89de-ab905456d08b.png"
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">Raoul</h2>
                <p className="text-[15px] text-neutral-500">View Profile</p>
              </div>
            </div>

            <div className="space-y-1">
              <button className="w-full px-6 py-4 text-left text-[17px] text-neutral-500 bg-transparent hover:bg-white/5">
                Account
              </button>
              <button className="w-full px-6 py-4 text-left text-[17px] text-neutral-500 bg-transparent hover:bg-white/5">
                Data Saver
              </button>
              <button className="w-full px-6 py-4 text-left text-[17px] text-neutral-500 bg-transparent hover:bg-white/5">
                Playback
              </button>
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-white bg-transparent hover:bg-white/5"
                onClick={() => navigate("/settings/content-and-display")}
              >
                <span>Content and display</span>
                <ChevronRight className="h-5 w-5 text-neutral-500" />
              </button>
              <button className="w-full px-6 py-4 text-left text-[17px] text-neutral-500 bg-transparent hover:bg-white/5">
                Privacy and social
              </button>
              <button className="w-full px-6 py-4 text-left text-[17px] text-neutral-500 bg-transparent hover:bg-white/5">
                Audio Quality
              </button>
              <button className="w-full px-6 py-4 text-left text-[17px] text-neutral-500 bg-transparent hover:bg-white/5">
                Video Quality
              </button>
              <button className="w-full px-6 py-4 text-left text-[17px] text-neutral-500 bg-transparent hover:bg-white/5">
                Storage
              </button>
              <button className="w-full px-6 py-4 text-left text-[17px] text-neutral-500 bg-transparent hover:bg-white/5">
                Notifications
              </button>
              <button className="w-full px-6 py-4 text-left text-[17px] text-neutral-500 bg-transparent hover:bg-white/5">
                Apps and devices
              </button>
              <button className="w-full px-6 py-4 text-left text-[17px] text-neutral-500 bg-transparent hover:bg-white/5">
                About
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
