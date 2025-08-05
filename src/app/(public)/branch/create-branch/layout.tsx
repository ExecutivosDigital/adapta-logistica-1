"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Contêiner principal que ocupa a tela inteira */}
      <div className="bg-primary h-full min-h-screen w-full p-8">
        {/* Contêiner branco com bordas arredondadas que será nosso layout principal */}
        <div className="relative flex h-full min-h-[calc(100vh-64px)] w-full flex-col rounded-t-2xl bg-white">
          {/* Cabeçalho com itens posicionados absolutamente */}
          <div className="relative p-8 pb-0">
            <button
              onClick={() => window.history.back()}
              className="text-primary hover:text-primary-dark absolute top-5 left-5 flex cursor-pointer items-center gap-2 transition duration-300"
            >
              <ArrowLeft />
              <span>Acesso à Central</span>
            </button>
            <Image
              src="/logo/icon.png"
              alt=""
              width={500}
              height={750}
              className="absolute top-5 right-5 h-28 w-max object-contain"
            />
          </div>

          {/* Contêiner principal do conteúdo - USANDO FLEXBOX PARA O LAYOUT */}
          <div className="flex flex-1 flex-col px-8 pt-4 pb-0">
            {/* Seção de Títulos e Texto */}
            <div className="flex w-full flex-col">
              <div className="mx-auto flex w-max flex-col items-center gap-4">
                <span className="text-2xl font-bold">Processo de Cadastro</span>
                <span className="w-2/3 text-center text-xl">
                  Texto referente a explicar que aqui conseguimos acessar as
                  listadas, cadastrar e também acessar as Unidades de Negócios.
                </span>
              </div>
            </div>

            {/* Seção das abas e conteúdo - ESTE É O CONTAINER QUE VAI CRESCER */}
            <div className="mt-16 flex flex-1 flex-col overflow-hidden">
              {/* AQUI ESTÁ A MÁGICA: A ScrollArea ocupa o espaço restante */}
              <div className="flex w-full flex-1 py-4">
                <ScrollArea className="w-full">{children}</ScrollArea>
              </div>
            </div>

            {/* Rodapé - Ficará fixo na parte inferior */}
            <div className="flex flex-col bg-white py-4">
              <span>Há alguma necessidade de conversar com o time Adapta?</span>
              <span className="text-primary hover:text-primary-dark cursor-pointer font-semibold underline transition duration-300">
                Clique aqui para conversar com o time
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
