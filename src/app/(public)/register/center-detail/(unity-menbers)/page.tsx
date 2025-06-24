"use client";
import { OrangeButton } from "@/components/OrangeButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";
import { ChevronRight, EllipsisVertical, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CenterDetails() {
  const router = useRouter();
  const columns = [
    { key: "actions", label: "Ações" },
    { key: "name", label: "Razão Social" },
    { key: "CNPJ", label: "CNPJ" },
    { key: "place", label: "Cidade e Estado" },
    { key: "goal", label: "Meta" },
    { key: "budget", label: "Orçamento" },
    { key: "unit", label: "Acesso à Filial" },
  ];

  const rows = [
    {
      id: "1",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
      parentCompany: true,
    },
    {
      id: "2",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "3",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "4",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "5",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "6",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "7",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "8",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "9",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "10",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "11",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "12",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "13",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "14",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "15",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
    {
      id: "16",
      name: "Razão Social da Filial",
      CNPJ: "43.795.283/0001-18",
      goal: "R$ 1.000.000,00",
      budget: "R$ 1.000.000,00",
      place: "Curitiba - Paraná",
    },
  ];
  const [value, setValue] = useState("");
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex-ro flex w-full items-center justify-between">
        <div className="border-primary text-primary flex flex-row items-center gap-2 rounded-lg border p-1">
          <Search />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            className="bg-transparent outline-none focus:outline-none"
          />
        </div>
        <OrangeButton iconPosition="right" icon={<Plus />} className="gap-8">
          Atrela
        </OrangeButton>
      </div>
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="gap-1">
            {/* se usar gap-0, elimina o gap-[1px] */}
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  column.key === "actions"
                    ? "h-10 w-10 max-w-10 min-w-10 flex-shrink-0 flex-grow-0 px-0 text-center"
                    : column.key === "name"
                      ? "pl-8"
                      : "text-center",
                  "text-primary h-12 text-sm font-semibold uppercase",
                )}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => router.push("/register/branch-details")}
              className="hover:bg-primary/10 h-14 cursor-pointer py-8 text-center transition duration-200"
            >
              {/* AÇÕES – 28 px, sem padding */}
              <TableCell className="mr-8 h-10 max-h-10 w-10 max-w-10 min-w-10 flex-shrink-0 flex-grow-0 p-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-400">
                  <EllipsisVertical size={14} />
                </div>
              </TableCell>

              {/* RAZÃO SOCIAL – sem margem extra do lado esquerdo */}
              <TableCell className="py-0.5 pr-4 pl-8 text-sm font-medium whitespace-nowrap">
                <div className="flex items-center gap-4 text-center">
                  <span className="bg-primary h-5 w-5 rounded-full" />
                  {row.name}
                  {/* {row.parentCompany && (
                    <span className="flex items-center justify-center rounded-lg bg-[#EEEFF2] p-2 font-bold text-[#6C7386]">
                      Matriz
                    </span>
                  )} */}
                </div>
              </TableCell>

              {/* demais colunas... */}
              <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                {row.CNPJ}
              </TableCell>

              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/city.png"
                    alt=""
                    width={96}
                    height={96}
                    className="h-5 w-5 object-contain"
                  />
                  {row.place}
                </div>
              </TableCell>
              <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                {row.goal}
              </TableCell>
              <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                {row.budget}
              </TableCell>

              <TableCell className="text-primary flex items-end justify-end gap-1 py-2 text-end text-sm font-medium whitespace-nowrap underline">
                Acesso à Filial
                <ChevronRight size={16} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
