"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Image as ImageIcon } from "lucide-react";

const MEDIA_ANNOUNCEMENTS = [
  {
    date: "June 12, 2026",
    title: "NCIE National Incubation Cohort 2026 Applications Open",
    category: "Cohort",
    desc: "Collegiate tech start-ups and university-nominated research groups can now submit application dossiers for seed alignment.",
  },
  {
    date: "June 08, 2026",
    title: "NCIE Regional College Chapters Policy Document Released",
    category: "Policy",
    desc: "Official framework outlining standard operating protocols, patent split models, and laboratory access schemas for accredited institutions.",
  },
  {
    date: "May 29, 2026",
    title: "India-Centenary Fellowship Scheme Phase 1 Results",
    category: "Fellowship",
    desc: "Cataloging the initial 50 research scholars selected to receive PG prototyping allowances for core infrastructure development.",
  },
];

const PRESS_RELEASES = [
  {
    date: "May 15, 2026",
    title: "National Council for Innovation and Entrepreneurship Announces Viksit Bharat Chapter Rollout",
    source: "Delhi Bureau Desk",
    desc: "A collective initiative aimed at establishing 1,000+ technical college chapters by the end of 2027 to align raw student projects with angel mentorship.",
  },
  {
    date: "April 20, 2026",
    title: "NCIE and Leading Technology Parks Sign Incubation Liaison Treaty",
    source: "Bangalore Press",
    desc: "Strategic integration allowing accredited NCIE student founders direct, hassle-free physical entry and lab access inside tech parks across five key cities.",
  },
];

const GALLERY_PHOTOS = [
  {
    title: "Regional Ideation Summit, Bengaluru",
    date: "April 2026",
    ratio: "aspect-video",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "NCIE Founders Roundtable, New Delhi",
    date: "May 2026",
    ratio: "aspect-square",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Makerspace Showcase, Mumbai Chapter",
    date: "March 2026",
    ratio: "aspect-square",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "IP Strategy Workshop, Hyderabad",
    date: "June 2026",
    ratio: "aspect-video",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
];

export default function MediaPage() {
  return (
    <div className="flex-1 bg-white relative py-16 md:py-24">
      <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 text-center">
        <Badge variant="gold" className="mb-4">Media Center</Badge>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 font-sans mb-4">
          Announcements & Gallery
        </h1>
        <p className="text-base md:text-lg text-zinc-500 max-w-3xl mx-auto leading-relaxed">
          Stay updated with official bulletins, ecosystem press coverage, and photo archives of regional summits.
        </p>
      </div>

      {/* Main Tabs Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Tabs defaultValue="announcements" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="press">Press Releases</TabsTrigger>
              <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
            </TabsList>
          </div>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            {MEDIA_ANNOUNCEMENTS.map((item) => (
              <Card key={item.title} className="border-zinc-150 shadow-sm hover:border-primary/20 transition-all duration-200">
                <CardHeader className="p-6 pb-2 flex flex-row items-center justify-between">
                  <span className="text-xs text-zinc-400 font-semibold font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <Badge variant="mint">{item.category}</Badge>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <h3 className="text-lg font-bold text-zinc-900 hover:text-primary transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Press Releases Tab */}
          <TabsContent value="press" className="space-y-6">
            {PRESS_RELEASES.map((item) => (
              <Card key={item.title} className="border-zinc-150 shadow-sm hover:border-primary/20 transition-all duration-200">
                <CardHeader className="p-6 pb-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-semibold">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{item.source}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                    <span>{item.date}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <h3 className="text-lg font-bold text-zinc-900 hover:text-primary transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.title}
                className="bg-zinc-50 rounded-2xl border border-zinc-150 overflow-hidden shadow-sm group hover:border-primary/25 transition-all duration-300"
              >
                {/* Clean geometric visual representation of image placeholder */}
                <div className={`relative w-full ${photo.ratio} bg-gradient-to-br ${photo.gradient} flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-40" />
                  <ImageIcon className="w-10 h-10 text-primary/30 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-5 bg-white border-t border-zinc-100 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">{photo.title}</h4>
                    <span className="text-xs text-zinc-400 font-medium mt-1 block">{photo.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
