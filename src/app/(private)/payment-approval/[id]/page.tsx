"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { cn } from "@/utils/cn";
import { CalendarDays, CircleCheck, CircleDollarSign, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FinalPaymentApproval() {
  const router = useRouter();
  const [selectedBudget, setSelectedBudget] = useState(0);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* HEADER -------------------------------------------------------- */}
      <header className="relative flex items-center justify-center border-b border-orange-200 border-b-zinc-400 px-8 py-4">
        <Image
          src="/logo/logoFull.png"
          alt="Adapta"
          width={140}
          height={24}
          className="h-16 w-auto"
          priority
        />

        <button
          onClick={() => router.back()}
          className="absolute top-4 right-8 flex cursor-pointer items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Sair
          <X size={16} />
        </button>
      </header>

      <main className="flex flex-1 overflow-y-auto">
        <section className="flex flex-1 flex-col py-4">
          <div className="flex w-full justify-between px-6">
            <h2 className="text-xl font-semibold">Aprovação Final</h2>
            <div className="flex items-center gap-1">
              <span className="text-sm text-zinc-600">12/06/2025</span>
              <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
            </div>
          </div>
          <div className="my-4 h-px w-full bg-zinc-200" />
          <div className="flex h-full w-full flex-col gap-4 px-6">
            <div className="flex w-full items-center justify-center gap-4">
              <div className="bg-primary/20 text-primary border-primary w-60 rounded-lg border p-2 text-center text-sm font-semibold">
                Nome da Unidade de Negócio
              </div>
              <div className="bg-primary/20 text-primary border-primary w-60 rounded-lg border p-2 text-center text-sm font-semibold">
                Qual é o item
              </div>
              <div className="bg-primary/20 text-primary border-primary w-60 rounded-lg border p-2 text-center text-sm font-semibold">
                Categoria
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold">Orçamento Aprovado</span>
              <span className="text-sm text-zinc-600 italic">
                Selecione o orçamento aprovado abaixo
              </span>
            </div>
            <div className="flex items-center justify-evenly gap-4">
              <div
                onClick={() => setSelectedBudget(0)}
                className="flex w-1/6 flex-col gap-2"
              >
                <div className="border-primary relative w-full cursor-pointer overflow-hidden rounded-lg border">
                  <CircleCheck
                    className={cn(
                      "fill-primary absolute top-1 right-1 z-10 text-white transition duration-200",
                      selectedBudget !== 0 && "opacity-0",
                    )}
                  />
                  <Image
                    src="/static/document.png"
                    alt=""
                    width={500}
                    height={500}
                    className={cn(
                      "h-max w-full object-cover transition duration-200",
                      selectedBudget !== 0 && "opacity-20",
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <span>Orçamento X</span>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
                    <span className="text-sm text-zinc-600">R$ 1.234,56</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CircleDollarSign className="text-primary fill-primary/40 h-5 w-5" />
                    <span className="text-primary text-sm">12/06/2025</span>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setSelectedBudget(1)}
                className="flex w-1/6 flex-col gap-2"
              >
                <div className="border-primary relative w-full cursor-pointer overflow-hidden rounded-lg border">
                  <CircleCheck
                    className={cn(
                      "fill-primary absolute top-1 right-1 z-10 text-white transition duration-200",
                      selectedBudget !== 1 && "opacity-0",
                    )}
                  />
                  <Image
                    src="/static/document.png"
                    alt=""
                    width={500}
                    height={500}
                    className={cn(
                      "h-max w-full object-cover transition duration-200",
                      selectedBudget !== 1 && "opacity-20",
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <span>Orçamento X</span>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
                    <span className="text-sm text-zinc-600">R$ 1.234,56</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CircleDollarSign className="text-primary fill-primary/40 h-5 w-5" />
                    <span className="text-primary text-sm">12/06/2025</span>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setSelectedBudget(2)}
                className="flex w-1/6 flex-col gap-2"
              >
                <div className="border-primary relative w-full cursor-pointer overflow-hidden rounded-lg border">
                  <CircleCheck
                    className={cn(
                      "fill-primary absolute top-1 right-1 z-10 text-white transition duration-200",
                      selectedBudget !== 2 && "opacity-0",
                    )}
                  />
                  <Image
                    src="/static/document.png"
                    alt=""
                    width={500}
                    height={500}
                    className={cn(
                      "h-max w-full object-cover transition duration-200",
                      selectedBudget !== 2 && "opacity-20",
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <span>Orçamento X</span>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
                    <span className="text-sm text-zinc-600">R$ 1.234,56</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CircleDollarSign className="text-primary fill-primary/40 h-5 w-5" />
                    <span className="text-primary text-sm">12/06/2025</span>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setSelectedBudget(3)}
                className="flex w-1/6 flex-col gap-2"
              >
                <div className="border-primary relative w-full cursor-pointer overflow-hidden rounded-lg border">
                  <CircleCheck
                    className={cn(
                      "fill-primary absolute top-1 right-1 z-10 text-white transition duration-200",
                      selectedBudget !== 3 && "opacity-0",
                    )}
                  />
                  <Image
                    src="/static/document.png"
                    alt=""
                    width={500}
                    height={500}
                    className={cn(
                      "h-max w-full object-cover transition duration-200",
                      selectedBudget !== 3 && "opacity-20",
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <span>Orçamento X</span>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
                    <span className="text-sm text-zinc-600">R$ 1.234,56</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CircleDollarSign className="text-primary fill-primary/40 h-5 w-5" />
                    <span className="text-primary text-sm">12/06/2025</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <label className="font-semibold">Resumo do Orçamento</label>
              <textarea
                className="h-24 w-full resize-none rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black/60 focus:outline-none"
                placeholder="Descreva"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="font-semibold">Observação de Reprovação</label>
              <textarea
                className="h-24 w-full resize-none rounded-2xl border border-zinc-200 p-4 text-base text-black placeholder:text-black/60 focus:outline-none"
                placeholder="Descreva"
              />
            </div>
          </div>

          <footer className="flex items-center justify-center gap-6 border-t border-zinc-200 bg-white px-8 py-4">
            <button
              onClick={() => router.back()}
              className="h-9 w-[108px] rounded-lg border border-zinc-300 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Rejeitar
            </button>

            <OrangeButton className="h-9 w-[132px]">Aprovar</OrangeButton>
          </footer>
        </section>

        {/* DIVISOR vertical */}
        <div className="w-px bg-orange-200" />

        <section className="bg-primary/10 flex flex-1 items-center justify-center p-4">
          <div
            className="border-primary flex h-[80%] w-[80%] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8"
            style={{ borderWidth: "2px", borderSpacing: "80px" }}
          >
            <div className="border-primary flex h-16 w-16 items-center justify-center rounded-full border">
              <span className="text-primary text-3xl font-light">+</span>
            </div>
            <div className="mt-2 text-center">
              <p className="text-primary font-medium">Upload de Documento</p>
              <p className="text-primary/70 text-sm">
                Arraste e solte o arquivo aqui ou adicione do seu dispositivo
                <br />
                PDF ou PNG
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
