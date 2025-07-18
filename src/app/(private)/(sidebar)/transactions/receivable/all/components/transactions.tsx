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
import { ChevronRight, EllipsisVertical, File } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { AllReceivableNewReleaseSheet } from "./new-release-sheet";

export function AllReceivableTransactions() {
  const [transactionPages] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isNewReleaseSheetOpen, setIsNewReleaseSheetOpen] = useState(false);

  const columns = [
    { key: "date", label: "Data" },
    { key: "origin", label: "Cliente" },
    { key: "value", label: "Valor Título" },
    { key: "approvedBy", label: "Serviço" },
    { key: "reason", label: "Documentos" },
    { key: "status", label: "" },
    { key: "actions", label: "" },
  ];

  const rows = [
    {
      id: "1",
      date: moment().format("DD/MM/YYYY"),
      origin: "Cliente",
      value: 500,
      approvedBy: "Nome do Serviço",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "2",
      date: moment().format("DD/MM/YYYY"),
      origin: "Cliente",
      value: 250,
      approvedBy: "Nome do Serviço",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "3",
      date: moment().format("DD/MM/YYYY"),
      origin: "Cliente",
      value: 1250,
      approvedBy: "Nome do Serviço",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "4",
      date: moment().format("DD/MM/YYYY"),
      origin: "Cliente",
      value: 310.99,
      approvedBy: "Nome do Serviço",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "5",
      date: moment().format("DD/MM/YYYY"),
      origin: "Cliente",
      value: 310.99,
      approvedBy: "Nome do Serviço",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "6",
      date: moment().format("DD/MM/YYYY"),
      origin: "Cliente",
      value: 310.99,
      approvedBy: "Nome do Serviço",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "7",
      date: moment().format("DD/MM/YYYY"),
      origin: "Cliente",
      value: 310.99,
      approvedBy: "Nome do Serviço",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "8",
      date: moment().format("DD/MM/YYYY"),
      origin: "Cliente",
      value: 500,
      approvedBy: "Nome do Serviço",
      reason: "Serviço",
      status: "PROCESSADO",
    },
    {
      id: "9",
      date: moment().format("DD/MM/YYYY"),
      origin: "Cliente",
      value: 250,
      approvedBy: "Nome do Serviço",
      reason: "Serviço",
      status: "PROCESSADO",
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Transações</span>
            <div className="text-primary flex items-center gap-2 text-sm font-semibold">
              <span>Ver todas</span>
              <ChevronRight />
            </div>
          </div>
          <button
            onClick={() => setIsNewReleaseSheetOpen(true)}
            className="bg-primary hover:bg-primary-dark hover:border-primary-dark border-primary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-white shadow-sm transition duration-300"
          >
            <span className="text-sm"> Criar Lançamento</span>
            <ChevronRight />
          </button>
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
                className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
              >
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
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
                    {row.approvedBy}
                  </div>
                </TableCell>
                <TableCell className="h-full py-0.5 text-sm font-medium whitespace-nowrap">
                  {/* {row.reason} */}
                  <div className="flex flex-row items-center gap-2">
                    <span className="font-bold text-black underline">
                      Ver Documentos
                    </span>
                    <File size={16} />
                  </div>
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
                    {/* {row.status} */}Á Receber
                  </div>
                </TableCell>
                <TableCell className="py-2 text-end text-sm font-medium whitespace-nowrap text-zinc-400 underline">
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
      {isNewReleaseSheetOpen && (
        <AllReceivableNewReleaseSheet
          open={isNewReleaseSheetOpen}
          onOpenChange={() => setIsNewReleaseSheetOpen(false)}
        />
      )}
    </>
  );
}
