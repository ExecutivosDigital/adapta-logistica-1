"use client";
import { CalendarDays, Check, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface NewPurchaseBudgetModalProps {
  show: boolean;
  onHide: () => void;
}

export function NewPurchaseBudgetModal({
  show,
  onHide,
}: NewPurchaseBudgetModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                "relative z-20 flex w-full max-w-[40vw] flex-col items-center justify-start overflow-hidden rounded-md border bg-white px-2 shadow-md",
                "scrollbar-hide w-[40vw] overflow-y-scroll rounded-2xl border-none px-0",
              )}
            >
              <div className="border-b-primary relative flex h-20 w-full items-center border-b p-4">
                <Image
                  src="/logo/logoFull.png"
                  alt=""
                  width={1000}
                  height={250}
                  className="absolute top-1/2 left-1/2 h-16 w-max -translate-1/2 -translate-x-1/2 object-contain"
                />
                <button
                  onClick={onHide}
                  className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2"
                >
                  <span>Sair</span>
                  <X className="text-zinc-400" />
                </button>
              </div>
              <div className="flex h-full w-full flex-col shadow-[0_-1px_10px_0_rgba(0,0,0,0.2)]">
                <div className="flex w-full items-center justify-between border-b border-b-zinc-200 px-6 py-4 text-black">
                  <span className="font-semibold">Orçamento</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-400">12/06/2025</span>
                    <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
                  </div>
                </div>
                <div className="flex w-full flex-col gap-4 p-6">
                  <div className="flex items-center gap-4">
                    <div className="border-primary text-primary bg-primary/20 flex h-12 w-12 items-center justify-center rounded-full border">
                      <Plus />
                    </div>
                    <div className="flex flex-col justify-start">
                      <span className="text-lg font-semibold">
                        Upload de Orçamento
                      </span>
                      <span className="w-max text-sm font-normal text-zinc-600 italic">
                        Mínimo 03 orçamentos
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <label className="text-zinc-600">Orçamento Vencedor</label>
                    <input
                      className="h-12 w-full resize-none rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                      placeholder="Selecione"
                    />
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <div className="flex w-full flex-col items-start">
                      <label className="text-zinc-600">Valor Total</label>
                      <input
                        className="h-12 w-full rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                        placeholder="Selecione"
                      />
                    </div>
                    <div className="flex w-full flex-col items-start">
                      <label className="text-zinc-600">Prazo de Entrega</label>
                      <input
                        className="h-12 w-full rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                        placeholder="12/06/2025"
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-start">
                    <label className="text-zinc-600">
                      Condições de Pagamento
                    </label>
                    <textarea
                      className="h-24 w-full resize-none rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                      placeholder="Digite..."
                    />
                  </div>
                  <div className="flex w-full flex-col items-start">
                    <label className="text-zinc-600">Observação</label>
                    <textarea
                      className="h-24 w-full resize-none rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black focus:outline-none"
                      placeholder="Digite..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex h-20 w-full items-center justify-between border-t border-t-zinc-200 p-4">
                <button
                  onClick={onHide}
                  className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-200 px-2"
                >
                  <X className="text-red-500" />
                  Salvar e Sair
                </button>
                <button
                  onClick={onHide}
                  className="bg-primary flex h-10 items-center overflow-hidden rounded-lg font-semibold text-white shadow-sm"
                >
                  <span className="mr-4 ml-4">Enviar Solicitação</span>
                  <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Check className="text-green-500" />
                  </div>
                </button>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 z-10 h-full max-w-[40vw] blur-sm" />
          </div>
        </div>
      )}
    </>
  );
}
