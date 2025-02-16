
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Index() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">DJ View</h1>
      <p className="text-neutral-600 mb-8">
        Enhanced playlist view with BPM and Key information for DJs
      </p>
      <div className="grid gap-4">
        <Link to="/dj-mode">
          <Button variant="default" className="w-full">
            View Demo Playlist
          </Button>
        </Link>
      </div>
    </div>
  );
}
