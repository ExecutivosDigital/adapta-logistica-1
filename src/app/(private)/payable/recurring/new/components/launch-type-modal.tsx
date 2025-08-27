"use client";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { useFinancialDataContext } from "@/context/FinancialDataContext";
import { cn } from "@/utils/cn";
import { Search, X } from "lucide-react";
import React from "react";
import { DataType } from "../page";

export interface LaunchType {
  tipoLancamento: string;
  descNivel4: string;
  conta: string;
  centroResultado: string;
}

export interface LaunchTypeModalProps {
  show: boolean;
  onClose: () => void;
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

export default function LaunchTypeModal({
  show,
  onClose,
  data,
  setData,
}: LaunchTypeModalProps) {
  const {
    ledgerAccounts,
    ledgerAccountPages,
    ledgerAccountFilters,
    setLedgerAccountFilters,
  } = useFinancialDataContext();

  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-[990] flex w-full cursor-pointer items-center justify-center bg-white/50 p-4 text-center backdrop-blur-[4px] transition-opacity duration-300 ease-in-out"
      style={{ opacity: show ? 1 : 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={cn(
          "relative z-20 flex h-[85vh] w-[90vw] flex-col items-center justify-start gap-4 overflow-hidden rounded-xl border bg-white shadow-md xl:w-[50vw]",
        )}
      >
        <div className="flex h-full w-full flex-col justify-between rounded-xl shadow-xl">
          <div className="bg-primary flex h-16 items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Tipo de lançamento
            </h2>
            <button
              onClick={onClose}
              className="text-primary flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl"
            >
              <X />
            </button>
          </div>

          <div className="flex flex-col items-center gap-0 px-6 py-4 xl:flex-row xl:gap-2">
            <label className="mb-2 block text-xl text-[#6C7386]">
              Selecione o Tipo:
            </label>
            <div className="bg-primary/20 border-primary relative flex w-2/3 flex-1 items-center rounded-md border px-4 py-2">
              <input
                type="text"
                placeholder="Digite o código ou descrição"
                className="w-full flex-1 px-2 text-sm outline-none"
              />
              <span className="text-primary">
                <Search size={18} />
              </span>
            </div>
          </div>
          <div className="scrollbar-hide h-[calc(100%-12rem)] w-full overflow-scroll">
            <ul className="space-y-2 px-2 xl:space-y-4 xl:px-6">
              {ledgerAccounts.length === 0 && (
                <li className="flex justify-center py-10 text-zinc-500">
                  Nenhum resultado encontrado
                </li>
              )}
              {ledgerAccounts.map((item, i) => (
                <li
                  key={`${item.code}-${i}`}
                  onClick={() => setData({ ...data, ledgerAccountId: item.id })}
                  className={`hover:bg-primary/10 flex cursor-pointer items-center gap-8 rounded-lg border-b border-zinc-200 p-2 transition-colors ${
                    data.ledgerAccountId === item.id ? "bg-primary/20" : ""
                  }`}
                >
                  <div className="flex-1 text-sm">
                    <span className="block text-start font-medium text-zinc-800">
                      {item.code}
                    </span>
                  </div>
                  <div className="flex-1 text-start text-xs text-zinc-500">
                    {item.name}
                  </div>
                  <div className="border-primary bg-primary/20 text-primary rounded-md border px-3 py-1 text-sm font-semibold">
                    item.conta
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center gap-0 px-6 py-4 xl:flex-row xl:gap-2">
            <CustomPagination
              pages={ledgerAccountPages}
              currentPage={ledgerAccountFilters.page}
              setCurrentPage={(page) =>
                setLedgerAccountFilters((prev) => ({
                  ...prev,
                  page: page,
                }))
              }
            />
          </div>

          <div className="flex justify-between border-t border-zinc-200 px-6 py-4">
            <button
              onClick={onClose}
              className="text-primary rounded-md border border-zinc-200 px-2 py-1 font-bold xl:px-6 xl:py-2"
            >
              Cancelar
            </button>
            <button
              disabled={data.ledgerAccountId === ""}
              onClick={onClose}
              className="bg-primary rounded-md px-2 py-1 font-bold text-white disabled:opacity-50 xl:px-6 xl:py-2"
            >
              Selecionar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
