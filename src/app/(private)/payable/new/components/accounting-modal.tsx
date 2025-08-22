"use client";
import { cn } from "@/utils/cn";
import { Search, X } from "lucide-react";
import { DataType } from "../page";
import { AccontsType } from "./acconts";

interface AccountingModalProps {
  setIsOpenContabilAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
  filteredContabilAccounts: string;
  setFilteredContabilAccounts: React.Dispatch<React.SetStateAction<string>>;
  paginatedAccounts: AccontsType[];
  selectedAccount: AccontsType;
  pages: number[];
  pageCount: number;
  setSelectedAccount: React.Dispatch<React.SetStateAction<AccontsType>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isOpenAccountingModal: boolean;
  setIsOpenAccountingModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

export function AccountingModal({
  setIsOpenContabilAccountModal,
  filteredContabilAccounts,
  setFilteredContabilAccounts,
  paginatedAccounts,
  selectedAccount,
  setSelectedAccount,
  pages,
  pageCount,
  currentPage,
  setCurrentPage,
  isOpenAccountingModal,
  setIsOpenAccountingModal,
  data,
  setData,
}: AccountingModalProps) {
  return (
    <>
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z-[990] flex w-full cursor-pointer items-center justify-center bg-white/50 p-4 text-center backdrop-blur-[4px] transition-opacity duration-300 ease-in-out"
        style={{ opacity: isOpenAccountingModal ? 1 : 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpenAccountingModal(false);
          }
        }}
      >
        <div
          className={cn(
            "relative z-20 flex h-max w-[90vw] flex-col items-center justify-start gap-4 overflow-hidden rounded-xl border bg-white shadow-md xl:w-[50vw]",
          )}
        >
          <div className="flex h-full w-full flex-col justify-between rounded-xl shadow-xl">
            {/* Cabeçalho */}
            <div className="bg-primary flex h-16 items-center justify-between px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Lista de Contas
              </h2>
              <button
                onClick={() => setIsOpenContabilAccountModal(false)}
                className="text-primary flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl"
              >
                <X />
              </button>
            </div>
            <div className="scrollbar-hide h-[calc(100%-8rem)] w-full overflow-scroll">
              <div className="flex flex-col items-center gap-0 px-6 py-4 xl:flex-row xl:gap-2">
                <label className="mb-2 block text-xl text-[#6C7386]">
                  Selecione a Conta Contábil:
                </label>
                <div className="bg-primary/20 border-primary relative flex w-2/3 flex-1 items-center rounded-md border px-4 py-2">
                  <input
                    type="text"
                    value={filteredContabilAccounts}
                    onChange={(e) =>
                      setFilteredContabilAccounts(e.target.value)
                    }
                    placeholder="Digite o código ou descrição"
                    className="w-full flex-1 px-2 text-sm outline-none"
                  />
                  <span className="text-primary">
                    <Search size={18} />
                  </span>
                </div>
              </div>

              <ul className="space-y-2 px-2 xl:space-y-4 xl:px-6">
                {paginatedAccounts.length === 0 && (
                  <li className="flex justify-center py-10 text-zinc-500">
                    Nenhuma conta encontrada
                  </li>
                )}

                {paginatedAccounts.map((acc, i) => (
                  <li
                    key={`${acc.contaContabil}-${i}`}
                    onClick={() => setSelectedAccount(acc)}
                    className={`hover:bg-primary/10 flex cursor-pointer flex-col items-center gap-2 rounded-lg border-b border-zinc-200 p-2 transition-colors xl:flex-row xl:gap-8 ${
                      selectedAccount?.contaContabil === acc.contaContabil
                        ? "bg-primary/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary h-4 w-4 rounded-full" />
                      <div className="flex flex-col text-sm">
                        <span className="font-medium text-zinc-800">
                          {acc.contaContabil}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center gap-3">
                      <div className="flex flex-col text-sm">
                        <span className="-mt-1 text-xs text-zinc-500">
                          {acc.descricao}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <span className="rounded-md border border-emerald-500 bg-emerald-600/20 px-3 py-1 font-semibold text-emerald-600">
                        {acc.tipoCusto}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="my-6 flex items-center justify-center gap-2 text-sm">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${currentPage === 1 ? "text-zinc-300" : "text-primary"}`}
                >
                  ←
                </button>

                {pages.map((page: number) => (
                  <button
                    key={page}
                    className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                      page === currentPage
                        ? "bg-primary text-white"
                        : "text-primary"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === pageCount}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(pageCount, p + 1))
                  }
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${currentPage === pageCount ? "text-zinc-300" : "text-primary"}`}
                >
                  →
                </button>
              </div>
            </div>
            <div className="flex justify-between border-t border-zinc-200 px-6 py-4">
              <button
                onClick={() => setIsOpenContabilAccountModal(false)}
                className="text-primary rounded-md border border-zinc-200 px-2 py-1 font-bold xl:px-6 xl:py-2"
              >
                Cancelar
              </button>
              <button
                disabled={!selectedAccount}
                onClick={() => {
                  if (selectedAccount) {
                    setData({
                      ...data,
                      accountingAccount: {
                        code: selectedAccount.contaContabil,
                        description: selectedAccount.descricao,
                      },
                    });
                    setIsOpenContabilAccountModal(false);
                  }
                }}
                className="bg-primary rounded-md px-2 py-1 font-bold text-white disabled:opacity-50 xl:px-6 xl:py-2"
              >
                Selecionar →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
