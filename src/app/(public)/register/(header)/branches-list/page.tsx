"use client";
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
import { useLoadingContext } from "@/context/LoadingContext";
import { branches } from "@/mock/branches";
import { cn } from "@/utils/cn";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { ChevronRight, EllipsisVertical, Info } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function BranchesList() {
  const { handleNavigation } = useLoadingContext();
  const columns = [
    { key: "actions", label: "Ações" },
    { key: "name", label: "Razão Social" },
    { key: "CNPJ", label: "CNPJ" },
    { key: "place", label: "Cidade e Estado" },
    { key: "unit", label: "Acesso à Filial" },
  ];

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
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
          {branches.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => handleNavigation("/branch")}
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
                  {row.parentCompany && (
                    <span className="flex items-center justify-center rounded-lg bg-[#EEEFF2] p-2 font-bold text-[#6C7386]">
                      Matriz
                    </span>
                  )}
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
