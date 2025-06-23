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

export default function BranchesList() {
  const router = useRouter();
  const columns = [
    { key: "actions", label: "Ações" },
    { key: "name", label: "Razão Social" },
    { key: "CNPJ", label: "CNPJ" },
    { key: "place", label: "Cidade e Estado" },
    { key: "unit", label: "Unidades de Negócio" },
  ];

  const rows = [
    {
      id: "1",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "2",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "3",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "4",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "5",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "6",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "7",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "8",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "9",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "10",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "11",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "12",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "13",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "14",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "15",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
    },
    {
      id: "16",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      place: "Curitiba - Paraná",
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
              Lista de Filiais Cadastradas
            </span>
            <span className="w-2/3 text-center text-xl">
              Texto referente a explicar que aqui conseguimos acessas listadas,
              cadastrar e também acessar as Unidades de Negócios.
            </span>
          </div>
          <div className="mt-16 flex h-[calc(100%-150px)] w-full flex-col gap-4">
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
            <div className="relative flex w-full border-b border-b-zinc-200">
              <button className="text-primary border-b-primary flex h-12 w-60 cursor-pointer items-center justify-center border-b">
                Filiais Cadastradas
              </button>
              <button
                onClick={() => router.push("/register/new-branch")}
                className="flex h-12 w-60 cursor-pointer items-center justify-center border-b border-b-transparent"
              >
                Informações do CNPJ
              </button>
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
                      onClick={() => router.push("/register/branch-details")}
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
                      <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                        <div className="mx-auto flex w-max items-center gap-2">
                          <div className="bg-primary h-6 w-6 rounded-full" />
                          {row.name}
                        </div>
                      </TableCell>
                      <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                        {row.CNPJ}
                      </TableCell>
                      <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                        <div className="mx-auto flex w-max items-center gap-2">
                          <Image
                            src="/icons/city.png"
                            alt=""
                            width={100}
                            height={100}
                            className="h-6 w-max object-contain"
                          />
                          {row.place}
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
