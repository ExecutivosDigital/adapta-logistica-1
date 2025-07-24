"use client";
import {
  CalendarDays,
  CircleDollarSign,
  EditIcon,
  Info,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface NewPurchaseApprovalModalProps {
  show: boolean;
  onHide: () => void;
}

export function NewPurchaseApprovalModal({
  show,
  onHide,
}: NewPurchaseApprovalModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const purchases = [
    {
      id: "1",
      date: "25/04/2025",
      who: "José Carlos",
      value: 1856.89,
    },
    {
      id: "2",
      date: "25/04/2025",
      who: "José Carlos",
      value: 1856.89,
    },
    {
      id: "3",
      date: "25/04/2025",
      who: "José Carlos",
      value: 1856.89,
    },
    {
      id: "4",
      date: "25/04/2025",
      who: "José Carlos",
      value: 1856.89,
    },
    {
      id: "5",
      date: "25/04/2025",
      who: "José Carlos",
      value: 1856.89,
    },
    {
      id: "6",
      date: "25/04/2025",
      who: "José Carlos",
      value: 1856.89,
    },
    {
      id: "7",
      date: "25/04/2025",
      who: "José Carlos",
      value: 1856.89,
    },
    {
      id: "8",
      date: "25/04/2025",
      who: "José Carlos",
      value: 1856.89,
    },
  ];

  useEffect(() => {
    if (show) {
      setIsModalOpen(true);
    } else {
      setTimeout(() => setIsModalOpen(false), 300);
    }
  }, [show]);

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-[1002] flex w-full items-center justify-center p-4 text-center transition-opacity duration-300 ease-in-out"
          style={{ opacity: show ? 1 : 0 }}
        >
          <button
            onClick={onHide}
            className="absolute z-40 h-full w-full bg-black/20 backdrop-blur"
          />
          <div className="relative z-50 flex max-h-[85vh] w-max flex-col items-center justify-center">
            <div
              className={twMerge(
                "relative z-20 flex w-full max-w-[55vw] flex-col items-center justify-start overflow-hidden rounded-md border bg-white shadow-md",
                "scrollbar-hide h-[85vh] w-[55vw] overflow-y-scroll rounded-2xl border-none",
              )}
            >
              <div className="flex w-full flex-col">
                <div className="border-b-primary relative flex h-20 w-full items-center border-b p-4 px-8">
                  <Image
                    src="/logo/logoFull.png"
                    alt=""
                    width={1000}
                    height={250}
                    className="absolute top-1/2 left-1/2 h-16 w-max -translate-1/2 -translate-x-1/2 object-contain"
                  />
                  <button
                    onClick={onHide}
                    className="absolute top-1/2 right-8 flex -translate-y-1/2 items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2"
                  >
                    <span>Sair</span>
                    <X className="text-zinc-400" />
                  </button>
                </div>
                <div className="w-full px-8">
                  <div className="flex h-full w-full justify-between bg-[#FCF0EA]">
                    <div className="flex h-full w-[45%] flex-col items-start justify-start bg-white">
                      <div className="flex h-full w-full flex-col gap-4 px-6 pt-2 pb-6 text-zinc-400">
                        <div className="flex w-full flex-col">
                          <div className="flex w-full items-center justify-between text-black">
                            <span className="font-semibold">
                              Nome da Unidade de Negócio
                            </span>
                            <div className="flex items-center gap-1 rounded-md border border-zinc-200 px-2 py-1 text-sm font-semibold">
                              <span>Ajustar</span>
                              <EditIcon className="h-4 w-4" />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
                            <span className="text-sm">12/06/2025</span>
                          </div>
                        </div>
                        <div className="h-px w-full bg-zinc-200" />
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col items-start">
                            <label className="font-semibold">
                              Item/Serviço
                            </label>
                            <textarea
                              className="h-24 w-full resize-none rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                              placeholder="Descreva o que precisa"
                            />
                          </div>
                          <div className="flex w-full items-center gap-4">
                            <div className="flex w-full flex-col items-start">
                              <label className="font-semibold">
                                Valor Estimado
                              </label>
                              <input
                                className="h-12 w-full rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                                placeholder="R$ 0,00"
                                type="number"
                              />
                            </div>
                            <div className="flex flex-col items-start">
                              <label className="font-semibold">
                                Quantidade
                              </label>
                              <input
                                className="h-12 w-24 rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                                placeholder="x1"
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-start">
                            <label className="font-semibold">
                              Justificativa
                            </label>
                            <textarea
                              className="h-24 w-full resize-none rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                              placeholder="Descrição da Necessidade de Compras"
                            />
                          </div>
                          <div className="flex w-full flex-col items-start">
                            <label className="">Categoria</label>
                            <input
                              className="h-12 w-full rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                              placeholder="Categoria no Plano de Contas"
                            />
                          </div>
                        </div>
                        <div className="h-px w-full bg-zinc-200" />
                        <input
                          className="mt-auto h-12 w-full rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                          placeholder="Faça um comentário"
                        />
                      </div>
                    </div>
                    <div className="flex h-full w-1/2 flex-col items-start justify-start bg-white">
                      <div className="flex h-full w-full flex-col gap-4 px-6 pt-2 pb-6 text-zinc-400">
                        <div className="flex w-full items-center justify-between text-black">
                          <span className="font-semibold">
                            Aprovação de Compra
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-400">
                              12/06/2025
                            </span>
                            <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
                          </div>
                        </div>

                        <div className="h-px w-full bg-zinc-200" />
                        <div className="flex flex-col gap-2">
                          <span className="text-zinc-600">
                            Últimas Compras da Categoria
                          </span>
                          <div className="grid w-full grid-cols-3 items-center justify-between">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
                              <span className="text-sm">Data</span>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <CircleDollarSign className="fill-primary h-6 w-6 text-white" />
                              <span className="text-sm">Solicitador</span>
                            </div>
                            <div className="flex items-center justify-end gap-1">
                              <CircleDollarSign className="fill-primary h-6 w-6 text-white" />
                              <span className="text-sm">Valor Pago</span>
                            </div>
                          </div>
                          <div className="scrollbar-hide h-80 w-full overflow-y-scroll">
                            {purchases.map((p) => (
                              <div
                                key={p.id}
                                className="flex w-full items-center justify-between border-b border-b-zinc-200 py-2"
                              >
                                <div className="flex items-center gap-1">
                                  <span className="text-sm">{p.date}</span>
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                  <span className="text-sm font-semibold">
                                    {p.who}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm">
                                    {p.value.toLocaleString("pt-BR", {
                                      style: "currency",
                                      currency: "BRL",
                                    })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-auto flex flex-col gap-2">
                          <label className="flex items-center gap-2 text-sm font-semibold text-red-500">
                            Justificativa
                            <Info className="h-5 w-5 fill-red-500 text-white" />
                          </label>
                          <textarea
                            className="h-24 w-full rounded-2xl border border-zinc-200 p-4 text-base text-red-500 placeholder:text-red-500 focus:outline-none"
                            placeholder="Descrição da Necessidade de Compras"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex h-20 w-full items-center justify-between border-t border-t-zinc-200 p-4 px-8 shadow-[0_-1px_10px_0_rgba(0,0,0,0.1)]">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-green-600 italic">
                      <CircleDollarSign className="h-5 w-5 fill-green-600/50" />
                      <span className="font-semibold">
                        Plano de Contas: {""}{" "}
                        <span className="font-normal">
                          R$ 2.000,00 Disponível
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-red-600 italic">
                      <Info className="h-5 w-5 fill-red-600 text-white" />
                      <span>
                        Ajuste o Valor para encaixar no plano de contas: {""}
                        <span className="font-semibold">R$ 2.000,00</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={onHide}
                      className="rounded-lg border border-zinc-200 bg-white px-4 py-2 font-semibold text-black"
                    >
                      Rejeitar
                    </button>
                    <button
                      onClick={onHide}
                      className="bg-primary rounded-lg border border-transparent px-4 py-2 font-semibold text-white"
                    >
                      Aprovar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 z-10 h-full max-w-[50vw] blur-sm" />
          </div>
        </div>
      )}
    </>
  );
}
