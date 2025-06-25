"use client";
import { OrangeButton } from "@/components/OrangeButton";
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
      <div className="grid h-full w-full grid-cols-3 gap-8">
        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            className="group border-primary hover:border-primary-dark relative w-full cursor-pointer overflow-hidden rounded-xl border-2 bg-white shadow-lg transition transition-all duration-300 hover:scale-[1.005]"
          >
            <div className="flex h-full w-full flex-col justify-between">
              <div className="bg-primary group-hover:bg-primary-dark flex w-full items-center p-4 transition duration-300">
                <span className="text-2xl font-bold text-white">
                  NOME DA UNID. DE NEGÓCIO
                </span>
              </div>
              <div className="flex w-full flex-row justify-between p-4">
                <div className="flex flex-col gap-4">
                  <span className="text-[#00A181]">Previsão Receita</span>
                  <span className="text-lg font-semibold">R$6.000.000,00</span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[#EF4444]">Previsão Despesa</span>
                  <span className="text-lg font-semibold">R$6.000.000,00</span>
                </div>
              </div>

              <div className="flex w-full items-center justify-center">
                <div className="flex w-[90%] items-center justify-center border-t border-t-zinc-500/40 p-4">
                  <button className="text-primary border-primary hover:bg-primary flex cursor-pointer items-center gap-2 rounded-xl border bg-white p-2 transition duration-300 hover:text-white">
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
