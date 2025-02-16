
import React from 'react';
import { Facebook, Instagram } from "lucide-react";

interface PlatformButtonProps {
  platform: 'instagram' | 'facebook';
}

const PlatformButton = ({ platform }: PlatformButtonProps) => {
  return (
    <div
      className={`
        relative flex items-center justify-center gap-3 px-5 py-5
        bg-primary/5 rounded-lg border border-primary/10
        transition-all duration-300 hover:bg-primary/10
      `}
    >
      {platform === 'instagram' ? (
        <Instagram className="w-7 h-7 text-primary" />
      ) : (
        <Facebook className="w-7 h-7 text-primary" />
      )}
      <span className="text-lg font-medium text-primary">
        {platform === 'instagram' ? 'Instagram' : 'Facebook'} Reels/Stories
      </span>
    </div>
  );
};

export default PlatformButton;
