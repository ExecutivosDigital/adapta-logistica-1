"use client";
import { SupplierProps } from "@/@types/financial-data";
import { useFinancialDataContext } from "@/context/FinancialDataContext";
import { cn } from "@/utils/cn";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { DataType } from "../page";

interface SupplierModalProps {
  setOpenCreateSupplierSheet: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenSupplierModal: boolean;
  setIsOpenSupplierModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

export function SupplierModal({
  setOpenCreateSupplierSheet,
  isOpenSupplierModal,
  setIsOpenSupplierModal,
  data,
  setData,
}: SupplierModalProps) {
  const { suppliers } = useFinancialDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSuppliers, setFilteredSuppliers] = useState("");
  const [selectedSupplier, setSelectedSupplier] =
    useState<SupplierProps | null>(null);

  return (
    <>
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z-[990] flex w-full cursor-pointer items-center justify-center bg-white/50 p-4 text-center backdrop-blur-[4px] transition-opacity duration-300 ease-in-out"
        style={{ opacity: isOpenSupplierModal ? 1 : 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpenSupplierModal(false);
          }
        }}
      >
        <div
          className={cn(
            "relative z-20 flex h-max w-[90vw] flex-col items-center justify-start gap-4 overflow-hidden rounded-xl border bg-white shadow-md xl:w-[50vw]",
          )}
        >
          <div className="flex h-full w-full flex-col justify-between rounded-xl shadow-xl">
            <div className="bg-primary flex h-16 items-center justify-between px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Lista de Fornecedores no Sistema
              </h2>
              <button
                onClick={() => setOpenCreateSupplierSheet(true)}
                className="text-primary flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl"
              >
                <Plus />
              </button>
            </div>

            <div className="scrollbar-hide h-[calc(100%-8rem)] w-full overflow-scroll">
              <div className="flex flex-col items-center gap-0 px-6 py-4 xl:flex-row xl:gap-2">
                <label className="mb-2 block text-[#6C7386]">
                  Selecione o Fornecedor:
                </label>
                <div className="bg-primary/20 border-primary relative flex w-2/3 flex-1 items-center rounded-md border px-2 py-1 xl:px-4 xl:py-2">
                  <input
                    type="text"
                    value={filteredSuppliers}
                    onChange={(e) => setFilteredSuppliers(e.target.value)}
                    placeholder="Digite o CNPJ, CPF ou clique"
                    className="w-full flex-1 px-2 text-sm outline-none focus:outline-none"
                  />
                  <span className="text-primary">
                    <Search />
                  </span>
                </div>
              </div>

              <ul className="space-y-2 px-2 xl:space-y-4 xl:px-6">
                {suppliers.filter(
                  (fornecedor) =>
                    fornecedor.cnpj.includes(filteredSuppliers) ||
                    fornecedor.name
                      .toLowerCase()
                      .includes(filteredSuppliers.toLowerCase()),
                ).length === 0 && (
                  <li className="flex cursor-pointer items-center justify-between border-b border-zinc-200 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary h-4 w-4 rounded-full" />
                      <div className="flex flex-col text-sm">
                        <span className="text-zinc-800">
                          Nenhum Fornecedor Encontrado
                        </span>
                      </div>
                    </div>
                  </li>
                )}
                {suppliers
                  .filter(
                    (fornecedor) =>
                      fornecedor.cnpj.includes(filteredSuppliers) ||
                      fornecedor.name
                        .toLowerCase()
                        .includes(filteredSuppliers.toLowerCase()),
                  )
                  .map((fornecedor, index) => (
                    <li
                      onClick={() => setSelectedSupplier(fornecedor)}
                      key={index}
                      className={`hover:bg-primary/20 flex cursor-pointer flex-col items-start justify-between rounded-lg border-b border-zinc-200 p-1 transition duration-200 xl:flex-row xl:items-center xl:p-2 ${
                        selectedSupplier?.cnpj === fornecedor.cnpj
                          ? "bg-primary/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col text-sm">
                          <span className="text-zinc-800">
                            {fornecedor.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col text-sm">
                          <span className="font-semibold text-zinc-900">
                            {fornecedor.cnpj}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>

              {/* Paginação */}
              <div className="my-6 flex items-center justify-center gap-2 text-sm">
                {[1, 2, 3, 4, 5, 6].map((page) => (
                  <button
                    key={page}
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      page === currentPage
                        ? "bg-primary text-white"
                        : "text-primary"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
            {/* Botões de ação */}
            <div className="flex justify-between border-t border-zinc-200 px-6 py-4">
              <button className="text-primary cursor-pointer rounded-md border border-zinc-200 px-2 py-1 font-bold xl:px-6 xl:py-2">
                Cancelar
              </button>
              <button
                onClick={() => {
                  setData({
                    ...data,
                    supplierId: selectedSupplier?.id as string,
                  });
                  setIsOpenSupplierModal(false);
                }}
                className="text-primary hover:bg-primary hover:border-primary flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 px-2 py-1 font-bold transition duration-200 hover:text-white xl:px-6 xl:py-2"
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
