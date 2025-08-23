"use client";
import { useBranch } from "@/context/BranchContext";
import { useScreenWidth } from "@/lib/useScreenWidth";
import { cn } from "@/utils/cn";
import { Building2 } from "lucide-react";
import { useState } from "react";

export function HomeButtonGroup() {
  const { businessUnits, selectedBusinessUnit, setSelectedBusinessUnit } =
    useBranch();
  const { width } = useScreenWidth();
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="flex w-full flex-wrap items-center gap-1">
      {width > 768 ? (
        businessUnits.map((b, index) => (
          <button
            onClick={() => {
              setSelectedBusinessUnit(b);
            }}
            key={index}
            className={cn(
              "hover:bg-primary flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 transition duration-300 hover:font-semibold hover:text-white",
              b === selectedBusinessUnit
                ? "bg-primary border-primary font-semibold text-white"
                : "text-zinc-600",
            )}
          >
            <Building2 className="h-4 w-4" />
            {b.name}
          </button>
        ))
      ) : (
        <>
          {(showAll ? businessUnits : businessUnits.slice(0, 2)).map(
            (b, index) => (
              <button
                onClick={() => {
                  setSelectedBusinessUnit(b);
                }}
                key={index}
                className={cn(
                  "hover:bg-primary flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 transition duration-300 hover:font-semibold hover:text-white",
                  b === selectedBusinessUnit
                    ? "bg-primary border-primary font-semibold text-white"
                    : "text-zinc-600",
                )}
              >
                <Building2 className="h-4 w-4" />
                {b.name}
              </button>
            ),
          )}
          {businessUnits.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className={cn(
                "hover:bg-primary flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 transition duration-300 hover:font-semibold hover:text-white md:hidden",
                "text-zinc-600",
              )}
            >
              <Building2 className="h-4 w-4" />
              {showAll ? "Fechar" : "Ver todos"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
