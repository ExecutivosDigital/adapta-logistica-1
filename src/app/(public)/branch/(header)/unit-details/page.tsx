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
import {
  ArrowLeft,
  Ban,
  ChevronRight,
  ChevronsUpDown,
  EllipsisVertical,
  PlusSquare,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UnitDetails() {
  const router = useRouter();
  const columns = [
    { key: "actions", label: "Ações" },
    { key: "name", label: "Colaboradores" },
    { key: "access", label: "Nível de Acesso" },
    { key: "role", label: "Cargo" },
    { key: "businessUnits", label: "Unidades de Negócio" },
  ];

  const rows = [
    {
      id: "1",
      actions: "",
      name: "Alex Marin",
      access: "Master",
      role: "Administrativo",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "2",
      actions: "",
      name: "João Stel",
      access: "Admin",
      role: "Financeiro",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "3",
      actions: "",
      name: "João Souza",
      access: "Executivo",
      role: "Compliance",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "4",
      actions: "",
      name: "Marin Alex",
      access: "Operacional",
      role: "Tecnologia da Informação",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "5",
      actions: "",
      name: "Pedro Oliveira",
      access: "Operacional",
      role: "Comercial",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "6",
      actions: "",
      name: "Paulo Amaro",
      access: "Operacional",
      role: "Produto",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "7",
      actions: "",
      name: "Bruna Adélia",
      access: "Operacional",
      role: "Logística",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "8",
      actions: "",
      name: "Carlos Alberto de Paula",
      access: "Operacional",
      role: "CEO",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    // ———————— Placeholders adicionais ————————
    {
      id: "9",
      actions: "",
      name: "Usuário Exemplo 9",
      access: "Operacional",
      role: "Departamento 9",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "10",
      actions: "",
      name: "Usuário Exemplo 10",
      access: "Operacional",
      role: "Departamento 10",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "11",
      actions: "",
      name: "Usuário Exemplo 11",
      access: "Operacional",
      role: "Departamento 11",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "12",
      actions: "",
      name: "Usuário Exemplo 12",
      access: "Operacional",
      role: "Departamento 12",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "13",
      actions: "",
      name: "Usuário Exemplo 13",
      access: "Operacional",
      role: "Departamento 13",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "14",
      actions: "",
      name: "Usuário Exemplo 14",
      access: "Operacional",
      role: "Departamento 14",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "15",
      actions: "",
      name: "Usuário Exemplo 15",
      access: "Operacional",
      role: "Departamento 15",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "16",
      actions: "",
      name: "Usuário Exemplo 16",
      access: "Operacional",
      role: "Departamento 16",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "17",
      actions: "",
      name: "Usuário Exemplo 17",
      access: "Operacional",
      role: "Departamento 17",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "18",
      actions: "",
      name: "Usuário Exemplo 18",
      access: "Operacional",
      role: "Departamento 18",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "19",
      actions: "",
      name: "Usuário Exemplo 19",
      access: "Operacional",
      role: "Departamento 19",
      businessUnits: "Ver todas Unidade de Negócios",
    },
    {
      id: "20",
      actions: "",
      name: "Usuário Exemplo 20",
      access: "Operacional",
      role: "Departamento 20",
      businessUnits: "Ver todas Unidade de Negócios",
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
          className="absolute top-5 right-5 h-28 w-max object-contain"
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
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center gap-8">
                  <span className="text-xl font-semibold">
                    Filial de (Cidade)
                  </span>
                  <div className="text-primary border-primary flex cursor-pointer items-center gap-2 rounded-lg border p-1">
                    <span className="font-semibold">Alterar Unidade</span>
                    <ChevronsUpDown />
                  </div>
                </div>
              </div>
              <div className="text-primary border-primary flex cursor-pointer items-center gap-2 rounded-lg border p-1">
                <PlusSquare />
                <span className="font-semibold">Adicionar novo Usuário</span>
              </div>
            </div>

            <div className="flex h-[calc(100%-36px)] w-full">
              <div className="flex w-full flex-col">
                <div className="relative flex w-full border-b border-b-zinc-200">
                  <div className="text-primary border-b-primary flex h-12 w-60 cursor-pointer items-center justify-center border-b">
                    Unid. de Negócios
                  </div>
                  <div className="flex h-12 w-60 cursor-pointer items-center justify-center border-b border-b-transparent">
                    Informações da Filial
                  </div>
                  <div className="flex h-12 w-60 cursor-pointer items-center justify-center border-b border-b-transparent">
                    Usuários da Filial
                  </div>
                </div>

                <ScrollArea className="h-[calc(100%-150px)] w-full">
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
                                column.key === "actions" && "text-start",
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
                            router.push("/register/branch-overview")
                          }
                          className="hover:bg-primary/10 h-10 max-h-10 cursor-pointer text-center transition duration-200"
                        >
                          <TableCell className="flex h-full items-center gap-2 text-sm font-medium whitespace-nowrap">
                            <div className="flex items-center justify-center rounded-md border border-zinc-200 p-1 text-zinc-400">
                              <EllipsisVertical />
                            </div>
                            <div className="flex items-center justify-center rounded-md border border-zinc-200 p-1 text-zinc-400">
                              <Ban />
                            </div>
                          </TableCell>
                          <TableCell className="py-s0.5 text-sm font-medium whitespace-nowrap">
                            <div className="mx-auto flex w-max items-center gap-2">
                              <div className="bg-primary h-6 w-6 rounded-full" />
                              {row.name}
                            </div>
                          </TableCell>
                          <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                            {row.access}
                          </TableCell>
                          <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                            <div className="mx-auto flex w-max items-center gap-2">
                              {row.role}
                            </div>
                          </TableCell>
                          <TableCell className="text-primary m-auto flex h-full w-max items-center gap-1 py-2 text-sm font-medium whitespace-nowrap underline">
                            Acessar Unidade de Negócios
                            <ChevronRight />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
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
