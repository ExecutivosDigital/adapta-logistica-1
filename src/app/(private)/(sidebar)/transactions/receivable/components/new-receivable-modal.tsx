"use client";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";
import { ArrowRight, CircleDollarSign, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NewReceivableModalProps {
  show: boolean;
  onHide: () => void;
}

export function NewReceivableModal({ show, onHide }: NewReceivableModalProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  const clientList = [
    {
      id: "1",
      name: "Razão Social Cliente 1",
      cnpj: "43.795.283/0001-18",
      date: "25/04/2025",
      status: "ATIVO",
    },
    {
      id: "2",
      name: "Razão Social Cliente 2",
      cnpj: "43.795.283/0001-18",
      date: "25/04/2025",
      status: "ATIVO",
    },
    {
      id: "3",
      name: "Razão Social Cliente 3",
      cnpj: "43.795.283/0001-18",
      date: "25/04/2025",
      status: "ATIVO",
    },
    {
      id: "4",
      name: "Razão Social Cliente 4",
      cnpj: "43.795.283/0001-18",
      date: "25/04/2025",
      status: "ATIVO",
    },
  ];

  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-[990] flex w-full cursor-pointer items-center justify-center bg-white/50 p-4 text-center backdrop-blur-[4px] transition-opacity duration-300 ease-in-out"
      style={{ opacity: show ? 1 : 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onHide();
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
            <span className="text-lg font-bold text-white">
              Cadastro de Conta à Receber
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-zinc-400">
              <Plus />
            </div>
          </div>

          <div className="scrollbar-hide h-[calc(100%-8rem)] w-full overflow-scroll">
            <div className="flex flex-col items-center gap-0 px-6 py-4 xl:flex-row xl:gap-2">
              <span className="text-zinc-600">
                Selecione o Cliente Pagador:
              </span>
              <label
                htmlFor="search"
                className="outline-primary bg-primary/20 flex w-[400px] items-center justify-between rounded-md px-4 py-1 outline placeholder:text-zinc-400"
              >
                <input
                  className="flex-1 bg-transparent outline-none focus:outline-none"
                  type="text"
                  placeholder="Digite o CNPJ, CPF ou clique"
                />
                <Search className="text-primary" />
              </label>
            </div>

            <div className="space-y-2 px-2 xl:space-y-4 xl:px-6">
              {clientList.map((client) => (
                <div
                  key={client.id}
                  className={`hover:bg-primary/20 flex cursor-pointer flex-col items-center justify-between rounded-lg border-b border-zinc-200 p-1 transition duration-200 xl:flex-row xl:p-2 ${
                    selected === Number(client.id) ? "bg-primary/20" : ""
                  }`}
                  onClick={() => setSelected(Number(client.id))}
                >
                  <span>{client.name}</span>
                  <span className="font-semibold">{client.cnpj}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-2">
                          <CircleDollarSign className="fill-primary text-white" />
                          {client.date}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        className="text-primary flex max-w-48 items-center gap-2 rounded-md border-none bg-white font-bold"
                      >
                        <CircleDollarSign className="fill-primary min-w-6 text-white" />
                        Data do Último Pagamento
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="rounded-md border border-[#00A181] bg-[#00A181]/10 px-4 py-1 text-[#00A181]">
                    {client.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="my-6 flex items-center justify-center gap-2 text-sm">
              <CustomPagination
                currentPage={1}
                setCurrentPage={() => {}}
                pages={1}
              />
            </div>
          </div>

          <div className="flex h-16 justify-between border-t border-zinc-200 px-6 py-4">
            <button
              onClick={onHide}
              className="text-primary hover:bg-primary hover:border-primary cursor-pointer rounded-md border border-zinc-200 bg-transparent px-4 py-1 font-semibold transition duration-200 hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={() => router.push("/transactions/receivable/new")}
              className="text-primary hover:bg-primary hover:border-primary flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 bg-transparent px-4 py-1 font-semibold transition duration-200 hover:text-white"
            >
              Avançar
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
