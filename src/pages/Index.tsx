
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Index() {
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to DJ Mode</h1>
      <div className="grid gap-4">
        <Link to="/dj-mode">
          <Button variant="default" className="w-full">
            Enter DJ Mode
          </Button>
        </Link>
      </div>
    </div>
  );
}
