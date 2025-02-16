
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Facebook, Instagram } from "lucide-react";

interface PlatformButtonProps {
  platform: 'instagram' | 'facebook';
  isSelected: boolean;
  onClick: () => void;
}

const PlatformButton = ({ platform, isSelected, onClick }: PlatformButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "relative flex items-center gap-2 px-6 py-6 transition-all duration-300",
        "hover:bg-primary/5 hover:text-primary",
        isSelected && "bg-primary/10 text-primary",
        "button-transition"
      )}
      onClick={onClick}
    >
      {platform === 'instagram' ? (
        <Instagram className="w-5 h-5" />
      ) : (
        <Facebook className="w-5 h-5" />
      )}
      <span className="font-medium">
        {platform === 'instagram' ? 'Instagram' : 'Facebook'} Reels/Stories
      </span>
    </Button>
  );
};

export default PlatformButton;
