"use client";
import { useBranch } from "@/context/BranchContext";
import { BusinessUnit } from "@/mock/business-unit";
import { ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NewBusinessButton } from "./components/NewBusinessButton";

export default function BranchDetails() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { selectedBranch } = useBranch();
  const filteredBusinessUnits = BusinessUnit.filter(
    (businessUnit) => businessUnit.code === Number(selectedBranch?.id),
  );
  return (
    <div className="grid h-full w-full grid-cols-3 gap-8 p-4">
      <div className="col-span-3 flex w-full flex-row items-center justify-between">
        <label
          htmlFor="search"
          className="border-primary text-primary flex w-1/2 flex-row items-center gap-2 rounded-lg border p-1"
        >
          <Search />
          <input
            id="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            className="w-full bg-transparent outline-none focus:outline-none"
          />
        </label>
      </div>
      <NewBusinessButton />

      {filteredBusinessUnits
        .filter((item) =>
          value.trim().length > 0
            ? item.corporateName
                .toLowerCase()
                .includes(value.trim().toLowerCase())
            : true,
        )
        .map((unit: BusinessUnit, index) => (
          <div
            key={index}
            onClick={() => router.push("/register/unit-details")}
            className="border-primary relative w-full cursor-pointer rounded-xl border-2 bg-white p-4 shadow-lg transition duration-300 hover:scale-[1.005]"
          >
            <div className="flex h-full w-full flex-col justify-between gap-4">
              {/* Header: Nome e Sigla */}
              <div className="flex flex-row items-start justify-between">
                <span className="text-xl font-bold text-gray-800">
                  {unit.businessUnit}
                </span>
                <div className="bg-primary rounded-md px-3 py-1 text-sm font-semibold text-white">
                  {unit.acronym}
                </div>
              </div>

              {/* Informações detalhadas */}
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div>
                  <span className="font-semibold">Status da Unidade:</span>{" "}
                  {unit.businessUnitStatus}
                </div>
              </div>

              {/* Botão */}
              <div className="flex justify-end">
                <button className="border-primary bg-primary/20 text-primary hover:bg-primary flex items-center gap-2 rounded-xl border px-3 py-1 text-sm transition duration-300 hover:text-white">
                  <span>Acessar Unidade</span>
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
