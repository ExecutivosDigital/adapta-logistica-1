"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";
import { ArrowLeft, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UnitDetails() {
  const router = useRouter();
  const columns = [
    { key: "name", label: "Nome do Participante" },
    { key: "access", label: "Nível de Acesso" },
    { key: "email", label: "Email" },
  ];

  const rows = [
    {
      id: "1",
      name: "Alex Marin",
      access: "Master",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "2",
      name: "Alex Marin",
      access: "Gestão",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "3",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "4",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "5",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "6",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "7",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "8",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "9",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "10",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "11",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "12",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "13",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "14",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "15",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "16",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "17",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "18",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "19",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
    {
      id: "20",
      name: "Alex Marin",
      access: "Operacional",
      email: "gabriel.antonio@email.com",
    },
  ];

  return (
    <div className="bg-primary h-screen w-full p-8 pb-0">
      <div className="relative flex h-[calc(100vh-32px)] max-h-[calc(100vh-32px)] w-full flex-col rounded-t-2xl bg-white p-8">
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
          className="absolute top-5 right-5 h-40 w-max object-contain"
        />
        <div className="flex h-full w-full flex-col">
          <div className="mx-auto flex w-max flex-col items-center gap-4">
            <span className="text-2xl font-bold">
              Detalhes da Unidade de Negócio
            </span>
            <span className="w-2/3 text-center text-xl">
              Texto referente a explicar que aqui conseguimos acessas listadas,
              cadastrar e também acessar as Unidades de Negócios.
            </span>
          </div>
          <div className="mt-16 flex h-[calc(100%-150px)] w-full flex-col gap-4">
            <div className="flex items-center gap-8">
              <span className="text-xl font-semibold">Nome da Unidade</span>
              <div className="text-primary border-primary flex cursor-pointer items-center gap-2 rounded-lg border p-1">
                <span className="font-semibold">Alterar Unidade</span>
                <ChevronsUpDown />
              </div>
            </div>
            <div className="flex h-[calc(100%-36px)] w-full">
              <div className="flex h-[calc(100%-150px)] w-1/2 flex-col">
                <div className="relative flex w-full border-b border-b-zinc-200">
                  <div className="text-primary border-b-primary flex h-12 w-60 cursor-pointer items-center justify-center border-b">
                    Membros da Unidade
                  </div>
                  <div className="flex h-12 w-60 cursor-pointer items-center justify-center border-b border-b-transparent">
                    Níveis de Acesso
                  </div>
                </div>
                <ScrollArea className="h-full w-full">
                  <Table>
                    <TableHeader>
                      <TableRow className="gap-[1px]">
                        {columns.map((column) => (
                          <TableHead
                            key={column.key}
                            className="text-primary h-12 flex-row text-end text-sm font-semibold uppercase last:text-start"
                          >
                            <p
                              className={cn(
                                "text-center",
                                column.key === "name" && "text-start",
                                column.key === "email" && "text-end",
                              )}
                            >
                              {column.label}
                            </p>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.id}
                          onClick={() =>
                            router.push("/register/branch-details")
                          }
                          className="hover:bg-primary/10 h-10 max-h-10 cursor-pointer text-center transition duration-200"
                        >
                          <TableCell className="text-sm font-medium whitespace-nowrap">
                            <div className="mr-auto flex w-max items-center gap-2">
                              <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
                                <Image
                                  src="/logo/icon-white.png"
                                  alt=""
                                  width={100}
                                  height={100}
                                  className="h-6 w-6 object-contain"
                                />
                              </div>
                              {row.name}
                              <div
                                className={cn(
                                  "rounded-md bg-zinc-200 px-1 py-0.5 text-zinc-600",
                                  row.access !== "Master" && "hidden",
                                )}
                              >
                                Criador da Unidade
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                            {row.access}
                          </TableCell>
                          <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                            {row.email}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              <div className="flex h-full w-1/2 flex-col items-center justify-center">
                <div className="flex h-full w-2/3 flex-col rounded-t-2xl border border-b-0 border-zinc-200 shadow-sm">
                  <div className="flex w-full flex-col border-b border-b-zinc-200 px-16 py-8">
                    <span className="font-semibold">
                      Dados da Unidade de Negócios
                    </span>
                    <span>Responsável pela Unidade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-5 flex flex-col">
          <span>Há alguma necessidade de conversar com o time Adapta?</span>
          <span className="text-primary cursor-pointer font-semibold underline">
            Clique aqui para conversar com o time
          </span>
        </div>
      </div>
    </div>
  );
}
