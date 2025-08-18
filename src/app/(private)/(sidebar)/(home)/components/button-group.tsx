"use client";
import { useBranch } from "@/context/BranchContext";
import { useScreenWidth } from "@/lib/useScreenWidth";
import { BusinessUnit } from "@/mock/business-unit";
import { cn } from "@/utils/cn";
import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";

export function HomeButtonGroup() {
  const { selectedBranch } = useBranch();
  const { width } = useScreenWidth();
  const filteredBusinessUnits = BusinessUnit.filter(
    (businessUnit) => businessUnit.code === Number(selectedBranch?.id),
  );
  const [selectedBusinessUnit, setSelectedBusinessUnit] =
    useState<BusinessUnit | null>(filteredBusinessUnits[0]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setSelectedBusinessUnit(filteredBusinessUnits[0]);
    setShowAll(false); // Reset showAll when branch changes
  }, [selectedBranch]);
  return (
    <div className="flex w-full flex-wrap items-center gap-1">
      {selectedBranch?.parentCompany && (
        <button
          onClick={() => {
            setSelectedBusinessUnit(null);
          }}
          className={cn(
            "hover:bg-primary flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 transition duration-300 hover:font-semibold hover:text-white",
            selectedBusinessUnit === null
              ? "bg-primary border-primary font-semibold text-white"
              : "text-zinc-600",
          )}
        >
          <Building2 className="h-4 w-4" />
          Todos
        </button>
      )}
      {width > 768 ? (
        filteredBusinessUnits.map((b, index) => (
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
            {b.businessUnit}
          </button>
        ))
      ) : (
        <>
          {(showAll
            ? filteredBusinessUnits
            : filteredBusinessUnits.slice(0, 2)
          ).map((b, index) => (
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
              {b.businessUnit}
            </button>
          ))}
          {filteredBusinessUnits.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className={cn(
                "hover:bg-primary flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 transition duration-300 hover:font-semibold hover:text-white",
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
