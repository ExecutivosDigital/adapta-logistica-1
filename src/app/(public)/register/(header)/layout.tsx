"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ChevronsUpDown, PlusSquare } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const routes = [
    { id: "1", name: "Filiais Cadastradas", route: "/register/branches-list" },
    { id: "2", name: "Informações da Matriz", route: "/register/new-branch" },
    {
      id: "3",
      name: "Planejamento Orçamentário",
      route: "/register/budget",
    },
    { id: "4", name: "Centro de Resultados", route: "/register/result-center" },
    { id: "5", name: "Usuários", route: "/register/user" },
  ];
  const pathname = usePathname();

  return (
    // Contêiner principal que ocupa a tela inteira
    <div className="bg-primary h-full min-h-screen w-full p-8">
      {/* Contêiner branco com bordas arredondadas que será nosso layout principal */}
      <div className="relative flex h-full min-h-[calc(100vh-64px)] w-full flex-col rounded-t-2xl bg-white">
        {/* Cabeçalho com itens posicionados absolutamente */}
        <div className="relative p-8 pb-0">
          <button
            onClick={() => router.back()}
            className="text-primary absolute top-5 left-5 flex cursor-pointer items-center gap-2"
          >
            <ArrowLeft />
            <span>Voltar</span>
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
              <span className="text-2xl font-bold">
                Lista de Filiais Cadastradas
              </span>
              <span className="w-2/3 text-center text-xl">
                Texto referente a explicar que aqui conseguimos acessar as
                listadas, cadastrar e também acessar as Unidades de Negócios.
              </span>
            </div>
          </div>

          {/* Seção das abas e conteúdo - ESTE É O CONTAINER QUE VAI CRESCER */}
          <div className="mt-16 flex flex-1 flex-col overflow-hidden">
            {/* Controles: Dropdown e Botão "Adicionar" */}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-8">
                <span className="text-xl font-semibold">
                  Filiais do Negócio
                </span>
                <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 p-1">
                  <span className="font-semibold">43.795.283/0001-18</span>
                  <ChevronsUpDown className="text-zinc-400" />
                </div>
              </div>
              <button
                onClick={() => router.push("/register/new-branch")}
                className="border-primary text-primary flex cursor-pointer items-center gap-2 rounded-lg border p-1"
              >
                <PlusSquare />
                <span>Adicionar mais uma filial</span>
              </button>
            </div>

            {/* Abas de Navegação */}
            <div className="relative flex w-full gap-8 border-b border-b-zinc-200">
              {routes.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => router.push(tab.route)}
                  className={`flex h-12 cursor-pointer items-center justify-center border-b px-2 transition-all duration-300 ${
                    pathname === tab.route
                      ? "text-primary border-b-primary"
                      : "border-b-transparent"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* AQUI ESTÁ A MÁGICA: A ScrollArea ocupa o espaço restante */}
            <div className="flex max-h-[80vh] w-full flex-1 py-4">
              <ScrollArea className="w-full">{children}</ScrollArea>
            </div>
          </div>

          {/* Rodapé - Ficará fixo na parte inferior */}
          <div className="flex flex-col bg-white py-4">
            <span>Há alguma necessidade de conversar com o time Adapta?</span>
            <span className="text-primary cursor-pointer font-semibold underline">
              Clique aqui para conversar com o time
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
