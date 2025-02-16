
import React from 'react';
import { Facebook, Instagram } from "lucide-react";

interface PlatformButtonProps {
  platform: 'instagram' | 'facebook';
}

const PlatformButton = ({ platform }: PlatformButtonProps) => {
  return (
    <div
      className={`
        relative flex items-center justify-center gap-2 px-4 py-4
        bg-primary/5 rounded-lg border border-primary/10
        transition-all duration-300 hover:bg-primary/10
      `}
    >
      {platform === 'instagram' ? (
        <Instagram className="w-6 h-6 text-primary" />
      ) : (
        <Facebook className="w-6 h-6 text-primary" />
      )}
      <span className="text-base font-medium text-primary">
        {platform === 'instagram' ? 'Instagram' : 'Facebook'} Reels/Stories
      </span>
    </div>
  );
};

export default PlatformButton;
