"use client";

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
  return (
    <>
      <Preloader />
      <TopProgressBar />
      <EntryAnnouncementModal />
    </>
  );
}
