"use client";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";
import { ChevronRight, EllipsisVertical } from "lucide-react";
import moment from "moment";
import { useState } from "react";

export function HomeTransactions() {
  const [transactionPages] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const columns = [
    { key: "date", label: "Data" },
    { key: "origin", label: "Origem/Destino" },
    { key: "value", label: "Valor Financeiro" },
    { key: "approvedBy", label: "Aprovado por" },
    { key: "reason", label: "Motivo" },
    { key: "status", label: "" },
    { key: "actions", label: "" },
  ];

  const rows = [
    {
      id: "1",
      date: moment().format("DD/MM/YYYY"),
      origin: "Lorem",
      value: 500,
      approvedBy: "Alex Marin",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "2",
      date: moment().format("DD/MM/YYYY"),
      origin: "Lorem",
      value: 250,
      approvedBy: "Alex Marin",
      reason: "Serviço",
      status: "RECUSADO",
    },
    {
      id: "3",
      date: moment().format("DD/MM/YYYY"),
      origin: "Lorem",
      value: -1250,
      approvedBy: "Alex Marin",
      reason: "Serviço",
      status: "À PAGAR",
    },
    {
      id: "4",
      date: moment().format("DD/MM/YYYY"),
      origin: "Lorem",
      value: 310.99,
      approvedBy: "Alex Marin",
      reason: "Serviço",
      status: "EM ANÁLISE",
    },
    {
      id: "5",
      date: moment().format("DD/MM/YYYY"),
      origin: "Lorem",
      value: -310.99,
      approvedBy: "Alex Marin",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "6",
      date: moment().format("DD/MM/YYYY"),
      origin: "Lorem",
      value: 310.99,
      approvedBy: "Alex Marin",
      reason: "Serviço",
      status: "RECUSADO",
    },
    {
      id: "7",
      date: moment().format("DD/MM/YYYY"),
      origin: "Lorem",
      value: -310.99,
      approvedBy: "Alex Marin",
      reason: "Serviço",
      status: "À PAGAR",
    },
    {
      id: "8",
      date: moment().format("DD/MM/YYYY"),
      origin: "Lorem",
      value: 500,
      approvedBy: "Alex Marin",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "9",
      date: moment().format("DD/MM/YYYY"),
      origin: "Lorem",
      value: 250,
      approvedBy: "Alex Marin",
      reason: "Serviço",
      status: "RECUSADO",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <span className="font-semibold">Transações</span>
        <div className="text-primary flex items-center gap-2 text-sm font-semibold">
          <span>Ver todas</span>
          <ChevronRight />
        </div>
      </div>
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="gap-1">
            {/* se usar gap-0, elimina o gap-[1px] */}
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn("h-12 text-sm text-zinc-500")}
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
              className="hover:bg-primary/10 h-14 cursor-pointer py-8 text-center transition duration-200"
            >
              <TableCell className="flex items-start py-0.5 text-sm font-medium whitespace-nowrap">
                {row.date}
              </TableCell>
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                <div className="flex items-center gap-4 text-center">
                  <span className="bg-primary h-5 w-5 rounded-full" />
                  {row.origin}
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  "py-0.5 text-start text-sm font-medium whitespace-nowrap",
                  row.value > 0 ? "text-[#00A181]" : "text-[#EF4444]",
                  row.status === "RECUSADO" && "line-through",
                )}
              >
                {row.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>

              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                <div className="flex items-center gap-4 text-center">
                  <span className="bg-primary h-5 w-5 rounded-full" />
                  {row.approvedBy}
                </div>
              </TableCell>
              <TableCell className="flex items-start py-0.5 text-sm font-medium whitespace-nowrap">
                {row.reason}
              </TableCell>
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                <div
                  className={cn(
                    row.status === "PROCESSADO"
                      ? "rounded-md border border-[#00A181] bg-[#00A181]/20 px-2 py-1 text-[#00A181]"
                      : row.status === "RECUSADO"
                        ? "rounded-md border border-[#EF4444] bg-[#EF4444]/20 px-2 py-1 text-[#EF4444]"
                        : row.status === "À PAGAR"
                          ? "rounded-md border border-[#D4A300] bg-[#D4A300]/20 px-2 py-1 text-[#D4A300]"
                          : row.status === "EM ANÁLISE"
                            ? "rounded-md border border-[#1877F2] bg-[#1877F2]/20 px-2 py-1 text-[#1877F2]"
                            : "",
                  )}
                >
                  {row.status}
                </div>
              </TableCell>
              <TableCell className="flex items-end justify-end gap-1 py-2 text-end text-sm font-medium whitespace-nowrap text-zinc-400 underline">
                <EllipsisVertical />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full border-t border-t-zinc-200 p-2">
        <CustomPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={transactionPages}
        />
      </div>
    </div>
  );
}
