
import React from 'react';
import { Facebook, Instagram } from "lucide-react";

interface PlatformButtonProps {
  platform: 'instagram' | 'facebook';
}

const PlatformButton = ({ platform }: PlatformButtonProps) => {
  return (
    <div
      className={`
        relative flex items-center justify-center gap-3 px-6 py-8
        bg-primary/5 rounded-lg border border-primary/10
        transition-all duration-300
      `}
    >
      {platform === 'instagram' ? (
        <Instagram className="w-8 h-8 text-primary" />
      ) : (
        <Facebook className="w-8 h-8 text-primary" />
      )}
      <span className="text-xl font-medium text-primary">
        {platform === 'instagram' ? 'Instagram' : 'Facebook'} Reels/Stories
      </span>
    </div>
  );
};

export default PlatformButton;
