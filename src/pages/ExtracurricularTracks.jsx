import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TrackContent from "@/components/tracks/TrackContent";
import { tracks } from "@/lib/trackData";

export default function ExtracurricularTracks() {
  return (
    <div>
      <PageHeader
        title="Extracurricular Tracks"
        subtitle="Six career-field tracks. Each one includes a free national competition, a $0 portfolio project blueprint, and a virtual experience/shadowing playbook — all using free resources."
        icon={Users}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Tabs defaultValue={tracks[0].key} className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-slate-100 p-1.5 rounded-xl mb-8">
            {tracks.map((track) => (
              <TabsTrigger
                key={track.key}
                value={track.key}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600"
              >
                <track.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{track.name}</span>
                <span className="sm:hidden">{track.name.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tracks.map((track) => (
            <TabsContent key={track.key} value={track.key} className="mt-0">
              <TrackContent track={track} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}