"use client";
import {
  EquipmentCipsProps,
  EquipmentSetProps,
  EquipmentSubsetsProps,
} from "@/@types/equipments";
import { equipmentSets } from "@/mock/equipments";
import { cn } from "@/utils/cn";
import { Search } from "lucide-react";
import { useState } from "react";

export function EquipmentSets() {
  const [selectedSet, setSelectedSet] = useState<EquipmentSetProps | null>(
    null,
  );
  const [selectedSubset, setSelectedSubset] =
    useState<EquipmentSubsetsProps | null>(null);
  const [selectedCip, setSelectedCip] = useState<EquipmentCipsProps | null>(
    null,
  );

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
        <span className="text-primary text-xl font-bold 2xl:text-2xl">
          Pontos do Equipamento
        </span>
        <label
          htmlFor="search"
          className="group focus-within:border-primary active:border-primary flex h-10 w-[300px] flex-row items-center gap-1 rounded-lg border border-zinc-400 p-0.5 transition duration-200"
        >
          <Search className="group-focus-within:text-primary h-4 w-4 text-zinc-400 transition duration-200" />
          <input
            id="search"
            className="flex-w group-focus-within:placeholder:text-primary/20 group-focus-within:text-primary h-full w-full bg-transparent text-zinc-400 transition duration-200 outline-none placeholder:text-zinc-400"
            placeholder="Procurar"
          />
        </label>
      </div>
      <div className="flex w-full flex-col overflow-x-scroll xl:overflow-x-auto">
        <div className="text-primary bg-primary/20 flex h-12 w-max items-center px-4 font-bold xl:w-full">
          <span className="min-w-80">CONJUNTO</span>
          <span className="min-w-80">SUBCONJUNTO</span>
          <span className="min-w-80">CIP</span>
        </div>
        <div className="flex">
          <div className="flex min-w-80 flex-col">
            {equipmentSets.sets?.map((set) => (
              <div
                key={`set + ${set.id}`}
                className="group flex cursor-pointer items-center gap-2 p-2"
                onClick={() => {
                  if (selectedSet === set) {
                    setSelectedSet(null);
                    setSelectedSubset(null);
                    setSelectedCip(null);
                  } else {
                    setSelectedSet(set);
                    setSelectedSubset(null);
                    setSelectedCip(null);
                  }
                }}
              >
                <div
                  className={cn(
                    "text-primary bg-primary/20 group-hover:bg-primary/30 flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-md text-xs font-bold transition duration-200",
                    selectedSet?.id === set.id &&
                      "bg-primary group-hover:bg-primary text-white",
                  )}
                >
                  <span>1.1</span>
                </div>
                <span className="w-max">{set.name}</span>
              </div>
            ))}
          </div>
          <div
            className={cn(
              "flex min-w-80 flex-col",
              selectedSet === null
                ? "pointer-events-none opacity-0"
                : "pointer-events-auto opacity-100",
            )}
          >
            {equipmentSets?.sets?.find((set) => set.id === selectedSet?.id)
              ?.subsets?.length !== 0 ? (
              equipmentSets?.sets
                ?.find((set) => set.id === selectedSet?.id)
                ?.subsets?.map((subset) => (
                  <div
                    key={`subset + ${subset.id}`}
                    className="group flex cursor-pointer items-center gap-2 p-2"
                    onClick={() => {
                      if (selectedSubset === subset) {
                        setSelectedSubset(null);
                        setSelectedCip(null);
                      } else {
                        setSelectedSubset(subset);
                        setSelectedCip(null);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "text-primary bg-primary/20 group-hover:bg-primary/30 flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-md text-xs font-bold transition duration-200",
                        selectedSubset?.id === subset.id &&
                          "bg-primary group-hover:bg-primary text-white",
                      )}
                    >
                      <span>1.1</span>
                    </div>
                    <span className="w-max">{subset.name}</span>
                  </div>
                ))
            ) : (
              <div className="flex items-center gap-2 p-2 font-semibold">
                Sem Subconjuntos
                <div className="h-10 min-h-10 w-10 min-w-10" />
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex min-w-80 flex-col",
              selectedSet === null
                ? "pointer-events-none opacity-0"
                : "pointer-events-auto opacity-100",
            )}
          >
            {equipmentSets?.sets
              ?.find((set) => set.id === selectedSet?.id)
              ?.subsets?.find((subset) => subset.id === selectedSubset?.id)
              ?.cips?.length !== 0 ? (
              equipmentSets?.sets
                ?.find((set) => set.id === selectedSet?.id)
                ?.subsets?.find((subset) => subset.id === selectedSubset?.id)
                ?.cips?.map((cip) => (
                  <div
                    key={`cip + ${cip.id}`}
                    className="group flex cursor-pointer items-center gap-2 p-2"
                    onClick={() => {
                      if (selectedCip === cip) {
                        setSelectedCip(null);
                      } else {
                        setSelectedCip(cip);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "text-primary bg-primary/20 group-hover:bg-primary/30 flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-md text-xs font-bold transition duration-200",
                        selectedCip?.id === cip.id &&
                          "bg-primary group-hover:bg-primary text-white",
                      )}
                    >
                      <span>1.1</span>
                    </div>
                    <span className="w-max">{cip.name}</span>
                  </div>
                ))
            ) : (
              <div className="flex items-center gap-2 p-2 font-semibold">
                Sem CIPs
                <div className="h-10 min-h-10 w-10 min-w-10" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
