"use client";
import { OrangeButton } from "@/components/OrangeButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  ChevronRight,
  EllipsisVertical,
  Info,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";

export default function BranchesList() {
  const columns = [
    { key: "actions", label: "Ações" },
    { key: "name", label: "Colaboradores" },
    { key: "access", label: "Nível de Acesso" },
    { key: "role", label: "Cargo" },
    { key: "unit", label: "Unidades de Negócio" },
  ];

  const rows = [
    {
      id: "1",
      name: "Alex Marin",
      access: "Master",
      role: "Administrativo",
      unit: "Unidades de Negócio Vinculadas",
      isResponsible: true,
    },
    {
      id: "2",
      name: "João Stel",
      access: "Admin",
      role: "Financeiro",
      unit: "Unidades de Negócio Vinculadas",
    },
    {
      id: "3",
      name: "João Souza",
      access: "Executivo",
      role: "Compliance",
      unit: "Unidades de Negócio Vinculadas",
    },
    {
      id: "4",
      name: "Marin",
      access: "Operacional",
      role: "Tecnologia da Informação",
      unit: "Unidades de Negócio Vinculadas",
    },
    {
      id: "5",
      name: "Pedro Oliveira",
      access: "Operacional",
      role: "Comercial",
      unit: "Unidades de Negócio Vinculadas",
    },
    {
      id: "6",
      name: "Paulo Amaro",
      access: "Operacional",
      role: "Produto",
      unit: "Unidades de Negócio Vinculadas",
    },
    {
      id: "7",
      name: "Bruna Adélia",
      access: "Operacional",
      role: "Logística",
      unit: "Unidades de Negócio Vinculadas",
    },
    {
      id: "8",
      name: "Carlos Alberto de Paula",
      access: "Operacional",
      role: "CEO",
      unit: "Unidades de Negócio Vinculadas",
    },
  ];
  const [value, setValue] = useState("");
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex-ro flex w-full items-center justify-between">
        <label
          htmlFor="search"
          className="border-primary text-primary flex flex-row items-center gap-2 rounded-lg border p-1"
        >
          <Search />
          <input
            id="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            className="bg-transparent outline-none focus:outline-none"
          />
        </label>
        <OrangeButton iconPosition="left" icon={<Plus />} className="gap-2">
          Adicionar Usuário
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
                      : "text-center last:text-end",
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
              className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
            >
              {/* AÇÕES – 28 px, sem padding */}
              <TableCell className="mr-8 h-10 max-h-10 w-10 max-w-10 min-w-10 flex-shrink-0 flex-grow-0 p-1">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="hover:bg-primary flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-400 transition duration-300 hover:border-white hover:text-white">
                      <EllipsisVertical size={14} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right">
                    <DropdownMenuArrow />
                    <DropdownMenuItem className="hover:bg-primary/20 flex cursor-pointer items-center gap-2 transition duration-300">
                      <Info className="h-4 text-zinc-600" />
                      Lorem ipsum
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-primary/20 flex cursor-pointer items-center gap-2 transition duration-300">
                      <Info className="h-4 text-zinc-600" />
                      Lorem ipsum
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-primary/20 flex cursor-pointer items-center gap-2 transition duration-300">
                      <Info className="h-4 text-zinc-600" />
                      Lorem ipsum
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

              {/* RAZÃO SOCIAL – sem margem extra do lado esquerdo */}
              <TableCell className="py-0.5 pr-4 pl-8 text-sm font-medium whitespace-nowrap">
                <div className="flex items-center gap-4 text-center">
                  <span className="bg-primary h-5 w-5 rounded-full" />
                  {row.name}
                  {row.isResponsible && (
                    <span className="flex items-center justify-center rounded-lg bg-[#EEEFF2] p-2 font-bold text-[#6C7386]">
                      Responsável Filial
                    </span>
                  )}
                </div>
              </TableCell>

              {/* demais colunas... */}
              <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                {row.access}
              </TableCell>

              <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                {row.role}
              </TableCell>

              <TableCell className="text-primary hover:text-primary-dark flex items-end justify-end gap-1 py-2 text-end text-sm font-medium whitespace-nowrap underline transition duration-300">
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
