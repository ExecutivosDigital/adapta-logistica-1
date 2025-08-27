"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLoadingContext } from "@/context/LoadingContext";
import { cn } from "@/utils/cn";
import { Ban, ChevronRight, EllipsisVertical } from "lucide-react";
import { useEffect } from "react";

export default function UnitDetails() {
  const { handleNavigation } = useLoadingContext();
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

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return (
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
            onClick={() => handleNavigation("/branch/branch-overview")}
            className="hover:bg-primary/20 h-10 max-h-10 cursor-pointer text-center transition duration-300"
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
  );
}
