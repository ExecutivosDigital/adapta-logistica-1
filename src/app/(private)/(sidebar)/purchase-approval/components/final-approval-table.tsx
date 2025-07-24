"use client";
import { OrangeButton } from "@/components/OrangeButton";
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
  ArrowRight,
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ColumnProps {
  key: string;
  label: string;
  sortable?: boolean;
}

interface RowProps {
  id: string;
  sent: string;
  deadline: string;
  item: string;
  tag: string | null;
  value: number;
  amount: number;
  reason: string;
  who: string;
}
type SortDirection = "asc" | "desc" | null;
type SortableColumn = "item";
interface TableProps {
  openModal: () => void;
  openJustifyModal: () => void;
}

export function FinalApprovalTable({
  openModal,
  openJustifyModal,
}: TableProps) {
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const columns: ColumnProps[] = [
    { key: "sent", label: "Enviado Em", sortable: false },
    { key: "deadline", label: "Deadline", sortable: false },
    { key: "item", label: "Solicitação", sortable: true },
    { key: "value", label: "Valor Estimado", sortable: false },
    { key: "reason", label: "Justificativa", sortable: false },
    { key: "who", label: "Requerido por", sortable: false },
    { key: "action", label: "", sortable: false },
  ];

  const rows: RowProps[] = [
    {
      id: "1",
      sent: "24/Junho",
      deadline: "24/Junho",
      item: "Nome do Item",
      tag: null,
      value: 500,
      amount: 1,
      reason: "Justificativa",
      who: "Nome do Requerente",
    },
    {
      id: "2",
      sent: "24/Junho",
      deadline: "24/Junho",
      item: "Nome do Item",
      tag: "extreme",
      value: 500,
      amount: 1,
      reason: "Justificativa",
      who: "Nome do Requerente",
    },
    {
      id: "3",
      sent: "24/Junho",
      deadline: "24/Junho",
      item: "Nome do Item",
      tag: "high",
      value: 500,
      amount: 1,
      reason: "Justificativa",
      who: "Nome do Requerente",
    },
    {
      id: "4",
      sent: "24/Junho",
      deadline: "24/Junho",
      item: "Nome do Item",
      tag: "medium",
      value: 500,
      amount: 1,
      reason: "Justificativa",
      who: "Nome do Requerente",
    },
    {
      id: "5",
      sent: "24/Junho",
      deadline: "24/Junho",
      item: "Nome do Item",
      tag: "low",
      value: 500,
      amount: 1,
      reason: "Justificativa",
      who: "Nome do Requerente",
    },
  ];

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (column: SortableColumn) => {
    if (sortColumn !== column) {
      return <ChevronUp className="h-4 w-4 text-gray-300" />;
    }

    if (sortDirection === "asc") {
      return <ChevronUp className="h-4 w-4 text-gray-600" />;
    } else if (sortDirection === "desc") {
      return <ChevronDown className="h-4 w-4 text-gray-600" />;
    }

    return <ChevronUp className="h-4 w-4 text-gray-300" />;
  };

  return (
    <div className="flex max-h-[80vh] flex-1 py-4">
      <ScrollArea className="w-full">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "h-12 cursor-pointer text-sm font-normal text-zinc-500",
                  )}
                  onClick={() =>
                    column.sortable && handleSort(column.key as SortableColumn)
                  }
                >
                  <div
                    className={cn(
                      "flex w-max items-center gap-2",
                      column.key === "sent" && "mx-auto",
                    )}
                  >
                    <div className="flex flex-col">
                      {column.label}
                      <span className="text-xs">
                        {column.key === "value" && "Quantidade"}
                      </span>
                    </div>
                    {column.sortable &&
                      getSortIcon(column.key as SortableColumn)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={`row-${row.id}`}
                className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
              >
                <TableCell className="py-0.5 text-sm font-normal whitespace-nowrap">
                  <div className="flex h-full w-full items-center gap-2 text-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-200">
                      <EllipsisVertical className="h-4 w-4 text-zinc-400" />
                    </div>
                    {row.sent}
                  </div>
                </TableCell>
                <TableCell className="py-0.5 text-sm font-normal whitespace-nowrap">
                  <div className="flex h-full w-full items-center gap-2 text-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md border border-red-500">
                      <Image
                        src={"/icons/flag.svg"}
                        alt=""
                        width={40}
                        height={40}
                        className="h-4 w-4 fill-red-500 text-red-500"
                      />
                    </div>
                    {row.deadline}
                  </div>
                </TableCell>
                <TableCell className="py-0.5 text-sm font-normal whitespace-nowrap">
                  <div className="flex items-center gap-4 text-center">
                    {row.item}
                    {row.tag && (
                      <span
                        className={cn(
                          "min-w-44 rounded-md p-1 text-xs font-semibold",
                          row.tag === "extreme"
                            ? "bg-red-500 text-white"
                            : row.tag === "high"
                              ? "bg-yellow-500 text-black"
                              : row.tag === "medium"
                                ? "bg-orange-500 text-white"
                                : row.tag === "low"
                                  ? "bg-blue-500 text-white"
                                  : "",
                        )}
                      >
                        {row.tag === "extreme"
                          ? "Estritamente Urgente !!"
                          : row.tag === "high"
                            ? "Alta Prioridade !!"
                            : row.tag === "medium"
                              ? "Média Prioridade"
                              : row.tag === "low"
                                ? "Baixa Prioridade"
                                : ""}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-0.5 text-start text-sm font-normal whitespace-nowrap">
                  <div className="flex flex-col">
                    {row.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    <span className="text-xs">
                      x {row.amount} unidade{row.amount > 1 && "s"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-0.5 text-start text-sm font-normal whitespace-nowrap">
                  <button
                    onClick={openJustifyModal}
                    className="cursor-pointer font-semibold underline"
                  >
                    Ver Justificativa
                  </button>
                </TableCell>
                <TableCell className="h-full py-0.5 text-start text-sm font-normal whitespace-nowrap">
                  <div className="flex h-full w-full items-center">
                    <span className="mr-auto w-max">{row.who}</span>
                  </div>
                </TableCell>
                <TableCell className="w-40 py-0.5 text-start text-sm font-normal whitespace-nowrap">
                  <OrangeButton onClick={openModal}>
                    Aprovar <ArrowRight />
                  </OrangeButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
