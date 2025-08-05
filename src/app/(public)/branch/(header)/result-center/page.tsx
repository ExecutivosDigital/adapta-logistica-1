"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { CostCenter, CostCenterProps } from "@/mock/cost-center";
import { ChevronRight, Plus, Search } from "lucide-react";
import { useState } from "react";
export default function BranchDetails() {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex-ro flex w-full items-center justify-between">
        <label
          htmlFor="search"
          className="border-primary text-primary flex flex-row items-center gap-2 rounded-lg border p-1"
        >
          <Search />
          <input
            id="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            className="bg-transparent outline-none focus:outline-none"
          />
        </label>
        <OrangeButton iconPosition="left" icon={<Plus />} className="gap-2">
          Ações
        </OrangeButton>
      </div>
      <div className="grid h-full w-full grid-cols-1 gap-6 px-2 md:grid-cols-2 lg:grid-cols-3">
        {CostCenter.flat()
          .filter((item) =>
            value.trim().length > 0
              ? item.Ds.toLowerCase().includes(value.trim().toLowerCase())
              : true,
          )
          .map((item: CostCenterProps, index) => (
            <div
              key={index}
              className="group border-primary hover:border-primary-dark relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 bg-white shadow-md transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex h-full w-full flex-col justify-between">
                {/* Cabeçalho */}
                <div className="bg-primary group-hover:bg-primary-dark flex w-full items-center p-4 transition duration-300">
                  <span className="text-xl font-bold text-white">
                    {item.ResultCenter}
                  </span>
                </div>

                {/* Detalhes do centro de custo */}
                <div className="flex flex-col gap-2 px-4 py-4 text-sm text-gray-800">
                  <div className="text-base font-medium text-zinc-700">
                    {item.Ds}
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-600">Ativo: </span>
                    <span
                      className={
                        item.Ativo === "A" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {item.Ativo === "A" ? "Sim" : "Não"}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-600">
                      Data de Manutenção:{" "}
                    </span>
                    {item.MaintenanceDate}
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-600">
                      Responsável:{" "}
                    </span>
                    {item.user}
                  </div>
                </div>

                {/* Rodapé com botão e avatares */}
                <div className="flex flex-col gap-2 border-t border-t-zinc-200 px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button className="text-primary border-primary hover:bg-primary flex items-center gap-2 rounded-lg border bg-white px-3 py-1 text-sm transition duration-300 hover:text-white">
                      <span>Orçamento por Unidade de Negócio</span>
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
