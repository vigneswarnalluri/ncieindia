"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const TopProgressBar = dynamic(() => import("@/components/TopProgressBar"), {
  ssr: false,
});
const Preloader = dynamic(() => import("@/components/Preloader"), {
  ssr: false,
});
const EntryAnnouncementModal = dynamic(
  () => import("@/components/EntryAnnouncementModal"),
  { ssr: false }
);

export default function ClientLayoutWrapper() {
  useEffect(() => {
    // Prevent all image dragging across all browsers
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "IMG" ||
          target.tagName === "PICTURE" ||
          target.tagName === "SVG" ||
          target.closest("img") ||
          target.closest("picture"))
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("dragstart", handleDragStart);
    return () => {
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <>
      <Preloader />
      <TopProgressBar />
      <EntryAnnouncementModal />
    </>
  );
}
