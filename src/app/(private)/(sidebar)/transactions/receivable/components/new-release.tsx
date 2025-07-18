"use client";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Home2NewReleaseSheet } from "./new-release-sheet";

export function Home2NewRelease() {
  const [isNewReleaseSheetOpen, setIsNewReleaseSheetOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsNewReleaseSheetOpen(true)}
        className="bg-primary hover:bg-primary-dark hover:border-primary-dark border-primary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-white shadow-sm transition duration-300"
      >
        <span className="text-sm"> Criar Lançamento</span>
        <ChevronRight />
      </button>
      {isNewReleaseSheetOpen && (
        <Home2NewReleaseSheet
          open={isNewReleaseSheetOpen}
          onOpenChange={() => setIsNewReleaseSheetOpen(false)}
        />
      )}
    </>
  );
}
