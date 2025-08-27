"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { CustomPagination } from "@/components/ui/custom-pagination";
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
import { CreditCard, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import Card from "../../../../../../../public/icons/cart";
import { Home2NewReleaseSheet } from "./new-release-sheet";

export function BankAccount() {
  const [transactionPages] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isNewReleaseSheetOpen, setIsNewReleaseSheetOpen] = useState(false);
  const { handleNavigation } = useLoadingContext();

  const columns = [
    { key: "bankAccount", label: "Conta Bancária" },
    { key: "initialBalance", label: "Saldo Inicial" },
    { key: "currentBalance", label: "Saldo Atual" },
    { key: "type", label: "Tipo" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Ações" },
  ];

  const rows = [
    {
      id: "1",
      bankAccount: "Conta 1",
      color: "#FFC107",
      initialBalance: 1000,
      currentBalance: 500,
      type: "Entrada",
      status: "ATIVO",
      actions: "ATIVO",
    },
    {
      id: "2",
      bankAccount: "Conta 2",
      color: "#8BC34A",
      initialBalance: 2000,
      currentBalance: 250,
      type: "Saída",
      status: "DESATIVADO",
      actions: "DESATIVADO",
    },
    {
      id: "3",
      bankAccount: "Conta 3",
      color: "#4CAF50",
      initialBalance: 3000,
      currentBalance: -1250,
      type: "Entrada",
      status: "PAUSADA",
      actions: "PAUSADA",
    },
    {
      id: "4",
      bankAccount: "Conta 4",
      color: "#03A9F4",
      initialBalance: 4000,
      currentBalance: 310.99,
      type: "Saída",
      status: "ATIVO",
      actions: "ATIVO",
    },
    {
      id: "5",
      bankAccount: "Conta 5",
      color: "#E91E63",
      initialBalance: 5000,
      currentBalance: -310.99,
      type: "Entrada",
      status: "DESATIVADO",
      actions: "DESATIVADO",
    },
    {
      id: "6",
      bankAccount: "Conta 6",
      color: "#9C27B0",
      initialBalance: 6000,
      currentBalance: 310.99,
      type: "Saída",
      status: "PAUSADA",
      actions: "PAUSADA",
    },
    {
      id: "7",
      bankAccount: "Conta 7",
      color: "#2196F3",
      initialBalance: 7000,
      currentBalance: -310.99,
      type: "Entrada",
      status: "ATIVO",
      actions: "ATIVO",
    },
    {
      id: "8",
      bankAccount: "Conta 8",
      color: "#4DD0E1",
      initialBalance: 8000,
      currentBalance: 500,
      type: "Saída",
      status: "DESATIVADO",
      actions: "DESATIVADO",
    },
    {
      id: "9",
      bankAccount: "Conta 9",
      color: "#FF9800",
      initialBalance: 9000,
      currentBalance: 250,
      type: "Entrada",
      status: "PAUSADA",
      actions: "PAUSADA",
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex h-14 w-full items-center justify-between gap-2 border-b border-zinc-400">
            <span className="border-b-primary text-primary flex h-full items-center justify-center border-b font-semibold">
              Contas
            </span>
            <OrangeButton
              onClick={() => handleNavigation("/bank-accounts/create")}
            >
              <CreditCard />
              <span className="text-sm"> Banco</span>
            </OrangeButton>
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
                className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
              >
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  <div className="flex w-full flex-row items-center gap-2">
                    <Card color={row.color} />

                    {row.bankAccount}
                  </div>
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  <div className="flex items-center gap-4 text-center">
                    <span className="bg-primary h-5 w-5 rounded-full" />
                    {row.initialBalance}
                  </div>
                </TableCell>

                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  <div className="flex items-center gap-4 text-center">
                    <span className="bg-primary h-5 w-5 rounded-full" />
                    {row.currentBalance}
                  </div>
                </TableCell>
                <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                  {row.type}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  <div
                    className={cn(
                      row.status.toLocaleLowerCase() === "ativo"
                        ? "rounded-md border border-[#00A181] bg-[#00A181]/20 px-2 py-1 text-[#00A181]"
                        : row.status.toLocaleLowerCase() === "desativado"
                          ? "rounded-md border border-[#EF4444] bg-[#EF4444]/20 px-2 py-1 text-[#EF4444]"
                          : row.status.toLocaleLowerCase() === "pausada"
                            ? "rounded-md border border-[#D4A300] bg-[#D4A300]/20 px-2 py-1 text-[#D4A300]"
                            : row.status === "EM ANÁLISE"
                              ? "rounded-md border border-[#1877F2] bg-[#1877F2]/20 px-2 py-1 text-[#1877F2]"
                              : "",
                    )}
                  >
                    {row.status}
                  </div>
                </TableCell>
                <TableCell className="items-end justify-end py-2 text-end text-sm font-medium whitespace-nowrap text-zinc-400 underline">
                  <div className="0 flex w-full justify-end">
                    <EllipsisVertical />
                  </div>
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
        <Home2NewReleaseSheet
          open={isNewReleaseSheetOpen}
          onOpenChange={() => setIsNewReleaseSheetOpen(false)}
        />
      )}
    </>
  );
}
