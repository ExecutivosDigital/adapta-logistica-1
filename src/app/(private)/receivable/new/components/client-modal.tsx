"use client";

import { cn } from "@/utils/cn";
import { Search } from "lucide-react";
import { useState } from "react";
import { ClientsProps, DataType } from "../page";

interface ClientModalProps {
  show: boolean;
  onHide: () => void;
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

export function ClientModal({ show, onHide, data, setData }: ClientModalProps) {
  const [filteredClients, setFilteredClients] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState({
    name: "",
    cnpj: "",
    place: "",
  });

  const clients: ClientsProps[] = [
    {
      name: "Cliente 1",
      cnpj: "11.111.111/0001-11",
      expirationDate: "01/01/2025",
      place: "Curitiba - Paraná",
      status: "ATIVO",
    },
    {
      name: "Cliente 2",
      cnpj: "22.222.222/0002-22",
      expirationDate: "02/02/2025",
      place: "Curitiba - Paraná",
      status: "INATIVO",
    },
    {
      name: "Cliente 3",
      cnpj: "33.333.333/0003-33",
      expirationDate: "03/03/2025",
      place: "Curitiba - Paraná",
      status: "ATIVO",
    },
    {
      name: "Cliente 4",
      cnpj: "44.444.444/0004-44",
      expirationDate: "04/04/2025",
      place: "Curitiba - Paraná",
      status: "INATIVO",
    },
    {
      name: "Cliente 5",
      cnpj: "55.555.555/0005-55",
      expirationDate: "05/05/2025",
      place: "Curitiba - Paraná",
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
          <div className="bg-primary flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Lista de Clientes no Sistema
            </h2>
            <button className="text-primary flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl">
              ⋮
            </button>
          </div>

          {/* Campo de busca */}
          <div className="scrollbar-hide h-[calc(100%-8rem)] w-full overflow-scroll">
            <div className="flex flex-col items-center gap-0 px-6 py-4 xl:flex-row xl:gap-2">
              <label className="mb-2 block text-xl text-[#6C7386]">
                Selecione o Cliente:
              </label>
              <div className="bg-primary/20 border-primary relative flex flex-1 items-center rounded-md border px-4 py-2">
                <input
                  type="text"
                  value={filteredClients}
                  onChange={(e) => setFilteredClients(e.target.value)}
                  placeholder="Digite o CNPJ, CPF ou clique"
                  className="w-full flex-1 px-2 text-sm outline-none focus:outline-none"
                />
                <span className="text-primary">
                  <Search />
                </span>
              </div>
            </div>

            {/* Lista de clientes */}
            <ul className="space-y-2 px-2 xl:space-y-4 xl:px-6">
              {clients.filter(
                (cliente) =>
                  cliente.cnpj.includes(filteredClients) ||
                  cliente.name
                    .toLowerCase()
                    .includes(filteredClients.toLowerCase()),
              ).length === 0 && (
                <li className="flex cursor-pointer items-center justify-between border-b border-zinc-200 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary h-4 w-4 rounded-full" />
                    <div className="flex flex-col text-sm">
                      <span className="text-zinc-800">
                        Nenhum Cliente Encontrado
                      </span>
                    </div>
                  </div>
                </li>
              )}
              {clients
                .filter(
                  (cliente) =>
                    cliente.cnpj.includes(filteredClients) ||
                    cliente.name
                      .toLowerCase()
                      .includes(filteredClients.toLowerCase()),
                )
                .map((cliente, index) => (
                  <li
                    onClick={() => setSelectedClient(cliente)}
                    key={index}
                    className={`hover:bg-primary/20 flex cursor-pointer flex-col items-start justify-between rounded-lg border-b border-zinc-200 p-1 transition duration-200 xl:flex-row xl:items-center xl:p-2 ${
                      selectedClient.cnpj === cliente.cnpj
                        ? "bg-primary/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary h-4 w-4 rounded-full" />
                      <div className="flex flex-col text-sm">
                        <span className="text-zinc-800">{cliente.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-zinc-900">
                          {cliente.cnpj}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-6 text-sm xl:w-auto xl:justify-normal">
                      <div className="text-primary flex items-center gap-1 font-medium">
                        <span>🪙</span>
                        <span>{cliente.expirationDate}</span>
                      </div>
                      <span className="rounded-md border border-emerald-500 bg-emerald-600/20 px-3 py-1 font-semibold text-emerald-600">
                        {cliente.status}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

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

          {/* Botões de ação */}
          <div className="flex justify-between border-t border-zinc-200 px-6 py-4">
            <button
              onClick={onHide}
              className="text-primary cursor-pointer rounded-md border border-zinc-200 px-6 py-2 font-bold"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setData({ ...data, client: selectedClient });
                onHide();
              }}
              className="text-primary hover:bg-primary hover:border-primary flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 px-6 py-2 font-bold transition duration-200 hover:text-white"
            >
              Selecionar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
