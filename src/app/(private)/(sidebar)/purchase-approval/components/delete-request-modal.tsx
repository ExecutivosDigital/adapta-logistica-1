"use client";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DeleteRequestModalProps {
  show: boolean;
  onHide: () => void;
  isEditable?: boolean;
}

export function DeleteRequestModal({ show, onHide }: DeleteRequestModalProps) {
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
                "relative z-20 flex max-w-[60vw] flex-col items-center justify-start gap-4 overflow-hidden rounded-md border bg-white px-2 py-4 shadow-md",
                "scrollbar-hide overflow-y-scroll rounded-2xl border-none px-0",
              )}
            >
              <X
                className="text-primary absolute top-2 right-2 ml-auto cursor-pointer"
                onClick={onHide}
              />
              <div className="border-b-primary flex h-20 w-full items-center border-b p-4">
                <span className="text-primary text-lg font-semibold">
                  Excluir Solicitação de Compras
                </span>
              </div>
              <div className="flex h-full w-full flex-col items-start justify-start">
                <div className="flex w-full flex-col px-6 pb-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <div className="h-2 max-h-2 min-h-2 w-2 max-w-2 min-w-2 rounded-full bg-green-500" />
                      <span className="text-sm">
                        De: {""}
                        <span className="font-semibold">
                          Nome da Unidade de Negócio
                        </span>
                      </span>
                    </div>
                    <div className="ml-1 flex gap-1">
                      <div className="h-8 w-px bg-zinc-400" />
                      <span className="ml-1 text-sm text-zinc-400">
                        12 Junho às 13:56
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <div className="h-2 max-h-2 min-h-2 w-2 max-w-2 min-w-2 rounded-full bg-zinc-400" />
                      <span className="text-sm">
                        Para: {""}
                        <span className="font-semibold">Financeiro</span>
                      </span>
                    </div>
                    <div className="ml-1 flex gap-1">
                      <span className="ml-1 text-sm text-zinc-400">
                        12 Junho às 13:56
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-px w-full bg-zinc-200" />
                <div className="w-full p-4">
                  <div className="flex h-40 w-full flex-col gap-4 rounded-lg border border-zinc-400 px-6 py-2 text-zinc-400">
                    <textarea
                      className="h-full"
                      placeholder="Justificativa da exclusão"
                    />
                  </div>
                </div>
              </div>
              <div className="flex h-20 w-full items-center justify-between border-t border-t-zinc-200 p-4">
                <button
                  onClick={onHide}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-zinc-200"
                >
                  <X className="text-red-500" />
                </button>
                <button
                  onClick={onHide}
                  className="bg-primary flex h-10 items-center overflow-hidden rounded-lg font-semibold text-white shadow-sm"
                >
                  <span className="mr-4 ml-4">Excluir </span>
                  <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Check className="text-green-500" />
                  </div>
                </button>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 z-10 h-full max-w-[30vw] blur-sm" />
          </div>
        </div>
      )}
    </>
  );
}
