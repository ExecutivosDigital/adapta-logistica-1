"use client";
import { useBranch } from "@/context/BranchContext";
import { BusinessUnit } from "@/mock/business-unit";
import { cn } from "@/utils/cn";
import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";

export function HomeButtonGroup() {
  const { selectedBranch } = useBranch();
  const filteredBusinessUnits = BusinessUnit.filter(
    (businessUnit) => businessUnit.code === Number(selectedBranch?.id),
  );
  const [selectedBusinessUnit, setSelectedBusinessUnit] =
    useState<BusinessUnit | null>(filteredBusinessUnits[0]);
  useEffect(() => {
    setSelectedBusinessUnit(filteredBusinessUnits[0]);
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
      {filteredBusinessUnits.map((b, index) => (
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
          <Building2 className="h-4 w-max" />
          {b.businessUnit}
        </button>
      ))}
    </div>
  );
}
