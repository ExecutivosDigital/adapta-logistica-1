"use client";
import { ChevronRight } from "lucide-react";

export default function BranchDetails() {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-8 p-4">
      {Array.from({ length: 11 }).map((_, index) => (
        <div
          key={index}
          className="border-primary relative w-full cursor-pointer overflow-hidden rounded-xl border-2 bg-white shadow-lg transition-all duration-300 hover:scale-[1.05]"
        >
          <div className="flex h-full w-full flex-col justify-between">
            <div className="bg-primary flex w-full items-center p-4">
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
                <button className="text-primary flex items-center gap-2 rounded-xl border border-zinc-500/40 bg-white p-2">
                  <span>Orçamento por Unidade de Negócio</span>
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
