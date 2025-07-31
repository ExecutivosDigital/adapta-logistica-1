"use client";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { Modal } from "@/components/ui/Modal";
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
    <Modal
      show={show}
      onHide={onHide}
      className="max-w-[800px] rounded-xl border-none p-0"
    >
      <div className="bg-primary flex w-full items-center justify-between rounded-t-xl px-8 py-4">
        <span className="text-lg font-bold text-white">
          Cadastro de Conta à Receber
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-zinc-400">
          <Plus />
        </div>
      </div>
      <div className="flex flex-col gap-4 border-b border-b-zinc-200 px-8 py-4">
        <div className="flex items-center gap-4">
          <span className="text-zinc-600">Selecione o Cliente Pagador:</span>
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
        {clientList.map((client) => (
          <div
            key={client.id}
            className={cn(
              "hover:bg-primary/20 flex w-full cursor-pointer items-center justify-between border-b border-b-zinc-200 py-2 transition duration-200",
              selected === Number(client.id) && "bg-primary/20",
            )}
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
        <CustomPagination currentPage={1} setCurrentPage={() => {}} pages={1} />
      </div>
      <div className="flex w-full items-center justify-between px-8 py-4">
        <button className="text-primary hover:bg-primary hover:border-primary cursor-pointer rounded-md border border-zinc-200 bg-transparent px-4 py-1 font-semibold transition duration-200 hover:text-white">
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
    </Modal>
  );
}
