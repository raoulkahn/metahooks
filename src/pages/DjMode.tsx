
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Track } from "@/types/music";

// Static demo data
const demoTracks: Track[] = [
  {
    id: "1",
    title: "Deep House Voyage",
    artist: "Luna Spirit",
    bpm: 124,
    key: "8A",
    duration: "6:45",
    energy: 7,
    albumArt: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Midnight Groove",
    artist: "Tech Masters",
    bpm: 126,
    key: "3A",
    duration: "7:15",
    energy: 8,
    albumArt: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Bass Culture",
    artist: "Underground Collective",
    bpm: 128,
    key: "11B",
    duration: "6:30",
    energy: 9,
    albumArt: "/placeholder.svg",
  },
];

const DjMode = () => {
  const isMobile = useIsMobile();
  const [bpmRange, setBpmRange] = useState({ min: 120, max: 130 });
  const [selectedKey, setSelectedKey] = useState<string>("");

  return (
    <div className="container mx-auto p-4 animate-fade-up">
      <h1 className="text-3xl font-bold mb-6">DJ Mode</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>BPM Range</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <div>
              <Label htmlFor="minBpm">Min</Label>
              <Input
                id="minBpm"
                type="number"
                value={bpmRange.min}
                onChange={(e) =>
                  setBpmRange({ ...bpmRange, min: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <Label htmlFor="maxBpm">Max</Label>
              <Input
                id="maxBpm"
                type="number"
                value={bpmRange.max}
                onChange={(e) =>
                  setBpmRange({ ...bpmRange, max: parseInt(e.target.value) })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="e.g. 8A"
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Set Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <Input type="number" placeholder="Set duration in hours" />
          </CardContent>
        </Card>
      </div>

      {/* Tracks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Track</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>BPM</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Energy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoTracks.map((track) => (
                <TableRow key={track.id} className="cursor-pointer hover:bg-accent">
                  <TableCell className="font-medium">{track.title}</TableCell>
                  <TableCell>{track.artist}</TableCell>
                  <TableCell>{track.bpm}</TableCell>
                  <TableCell>{track.key}</TableCell>
                  <TableCell>{track.duration}</TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${(track.energy / 10) * 100}%` }}
                      ></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Set Planning Timeline */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Set Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 border rounded-md p-4 flex items-center justify-center text-muted-foreground">
            Drag and drop tracks here to build your set
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DjMode;
