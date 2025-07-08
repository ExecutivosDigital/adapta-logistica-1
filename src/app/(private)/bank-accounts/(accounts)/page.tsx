"use client";
import { Modal } from "flowbite-react";
import { Edit2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Home2ButtonGroup } from "./components/button-group";
import { Home2ResultsGraph } from "./components/results-graph";
import { BankAccount } from "./components/transactions";

export default function Home2() {
  const [open, setOpen] = useState(false);
  const data = {
    balance: "R$ 33.333.333,00",
    incoming: "R$ 2.220.890,00",
    outgoing: "-R$ 822.890,00",
    branch: "0123",
    account: "12345-6",
    type: "Corrente",
    currency: "BRL - Real",
    onEdit: () => {
      /* abre edição */
    },
  };
  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <span className="text-lg font-semibold lg:text-xl">Contas Bancárias</span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <Home2ButtonGroup />
        </div>

        <div className="col-span-12 rounded-xl border border-zinc-200 p-2 shadow-sm lg:p-4">
          <Home2ResultsGraph />
        </div>

        <div className="col-span-12">
          <BankAccount open={open} setOpen={setOpen} />
        </div>
      </div>
      {open && (
        <Modal
          size="sm"
          show={open}
          dismissible
          onClose={() => setOpen(false)}
          className="bg-white/10 backdrop-blur-md"
        >
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="space-y-6 p-6">
              {/* Saldo Atual */}
              <div>
                <p className="text-sm text-zinc-500">Saldo Atual</p>
                <p className="mt-1 text-2xl font-semibold text-zinc-900">
                  {data.balance}
                </p>
              </div>

              {/* Entradas / Saídas */}
              <div className="flex items-start space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="block h-5 w-0.5 rounded bg-emerald-500"></span>
                  <span className="font-medium text-emerald-600">
                    {data.incoming}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="block h-5 w-0.5 rounded bg-red-500"></span>
                  <span className="font-medium text-red-600">
                    {data.outgoing}
                  </span>
                </div>
              </div>

              {/* Divisor */}
              <div className="h-px bg-zinc-200" />

              {/* Cartão */}
              <div className="flex justify-center">
                <Image
                  src="/card.png"
                  alt="bank card"
                  width={500}
                  height={500}
                  className="h-auto w-80 object-contain"
                />
              </div>

              {/* Detalhes da Conta */}
              <div className="space-y-2 text-sm text-zinc-700">
                <div className="flex justify-between">
                  <span>Número da Agência</span>
                  <span className="font-medium">{data.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span>Número da Conta</span>
                  <span className="font-medium">{data.account}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tipo de Conta</span>
                  <span className="font-medium">{data.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Moeda</span>
                  <span className="font-medium">{data.currency}</span>
                </div>
              </div>

              {/* Botão Editar */}
              <button
                onClick={data.onEdit}
                className="mt-4 flex w-full items-center justify-center gap-2 self-center rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-50"
              >
                <Edit2 size={16} />
                Editar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
