"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";
import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { DataType } from "../page";

interface CteModalProps {
  show: boolean;
  onHide: () => void;
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

interface TransactionProps {
  id: string;
  ctrc: string;
  document: {
    id: string;
    type: string;
    name: string;
    file: boolean;
  };
  status: string;
  operation: string;
  paying: {
    cnpj: string;
    city: string;
    state: string;
  };
  receiving: {
    cnpj: string;
    city: string;
    state: string;
  };
  value: string;
  tax: string;
  typeCode: string;
  type: string;
}

type SortDirection = "asc" | "desc" | null;

type SortableColumn = "ctrc" | "document" | "status" | "operation" | null;

type ColumnKey =
  | "select"
  | "ctrc"
  | "document"
  | "status"
  | "operation"
  | "paying"
  | "receiving"
  | "value"
  | "type";

export function CteModal({ show, onHide }: CteModalProps) {
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const columns: Array<{ key: ColumnKey; label: string; sortable: boolean }> = [
    { key: "select", label: "", sortable: false },
    { key: "ctrc", label: "CTRC", sortable: true },
    { key: "document", label: "Documento", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "operation", label: "Operação", sortable: true },
    { key: "paying", label: "CNPJ Pagador", sortable: false },
    { key: "receiving", label: "CNPJ Recebedor", sortable: false },
    { key: "value", label: "Valor Documento", sortable: false },
    { key: "type", label: "Tipo de Frota", sortable: false },
  ];

  const rawRows: TransactionProps[] = [
    {
      id: "1",
      ctrc: "123456",
      document: {
        id: "1",
        type: "CT-E",
        name: "2000019150",
        file: false,
      },
      status: "Liquidado",
      operation: "01 - Normal",
      paying: {
        cnpj: "12.667.763-0002/50",
        city: "Cariacica",
        state: "ES",
      },
      receiving: {
        cnpj: "12.667.763-0002/50",
        city: "Cariacica",
        state: "ES",
      },
      value: "R$ 231,66",
      tax: "R$ 27,80 - Alíquota 12",
      typeCode: "(90)",
      type: "- Fracionado",
    },
    {
      id: "2",
      ctrc: "123456",
      document: {
        id: "1",
        type: "CT-E",
        name: "2000019150",
        file: true,
      },
      status: "Liquidado",
      operation: "01 - Normal",
      paying: {
        cnpj: "12.667.763-0002/50",
        city: "Cariacica",
        state: "ES",
      },
      receiving: {
        cnpj: "12.667.763-0002/50",
        city: "Cariacica",
        state: "ES",
      },
      value: "R$ 231,66",
      tax: "R$ 27,80 - Alíquota 12",
      typeCode: "(90)",
      type: "- Fracionado",
    },
    {
      id: "3",
      ctrc: "123456",
      document: {
        id: "1",
        type: "CT-E",
        name: "2000019150",
        file: true,
      },
      status: "Liquidado",
      operation: "01 - Normal",
      paying: {
        cnpj: "12.667.763-0002/50",
        city: "Cariacica",
        state: "ES",
      },
      receiving: {
        cnpj: "12.667.763-0002/50",
        city: "Cariacica",
        state: "ES",
      },
      value: "R$ 231,66",
      tax: "R$ 27,80 - Alíquota 12",
      typeCode: "(90)",
      type: "- Fracionado",
    },
    {
      id: "4",
      ctrc: "123456",
      document: {
        id: "1",
        type: "CT-E",
        name: "2000019150",
        file: true,
      },
      status: "Liquidado",
      operation: "01 - Normal",
      paying: {
        cnpj: "12.667.763-0002/50",
        city: "Cariacica",
        state: "ES",
      },
      receiving: {
        cnpj: "12.667.763-0002/50",
        city: "Cariacica",
        state: "ES",
      },
      value: "R$ 231,66",
      tax: "R$ 27,80 - Alíquota 12",
      typeCode: "(90)",
      type: "- Fracionado",
    },
  ];

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
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

  const sortedRows = useMemo(() => {
    if (!sortColumn || !sortDirection) return rawRows;

    return [...rawRows].sort((a, b) => {
      let aValue: number | Date | string;
      let bValue: number | Date | string;

      switch (sortColumn) {
        case "ctrc":
          aValue = parseInt(a.ctrc);
          bValue = parseInt(b.ctrc);
          break;
        case "document":
          aValue = a.document.name;
          bValue = b.document.name;
          break;
        case "status":
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        case "operation":
          aValue = a.operation;
          bValue = b.operation;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [rawRows, sortColumn, sortDirection]);

  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-[990] flex w-full cursor-pointer items-center justify-center bg-white/50 p-4 text-center backdrop-blur-[4px] transition-opacity duration-300 ease-in-out"
      style={{ opacity: show ? 1 : 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onHide();
        }
      }}
    >
      <div
        className={cn(
          "relative z-20 flex h-max w-[90vw] flex-col items-center justify-start gap-4 overflow-hidden rounded-xl border bg-white shadow-md xl:w-[50vw]",
        )}
      >
        <div className="flex h-full w-full flex-col justify-between rounded-xl shadow-xl">
          <div className="bg-primary flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Lista de Clientes no Sistema
            </h2>
            <button className="text-primary flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl">
              ⋮
            </button>
          </div>

          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="gap-1">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn(
                      "h-12 text-sm text-zinc-500",
                      column.key === "select" ? "w-12" : "cursor-pointer",
                    )}
                    onClick={() => {
                      if (
                        column.sortable &&
                        (column.key === "ctrc" ||
                          column.key === "document" ||
                          column.key === "status" ||
                          column.key === "operation")
                      ) {
                        handleSort(column.key);
                      }
                    }}
                  >
                    {column.key === "select" ? (
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly
                        className="accent-primary h-4 w-4 rounded border border-zinc-200"
                      />
                    ) : column.key === "paying" ? (
                      <div className="flex flex-col">
                        <span className="font-semibold">CNPJ Pagador</span>
                        <span className="text-xs font-normal">
                          Cidade - Pagador
                        </span>
                      </div>
                    ) : column.key === "receiving" ? (
                      <div className="flex flex-col">
                        <span className="font-semibold">CNPJ Recebedor</span>
                        <span className="text-xs font-normal">
                          Cidade - Recebedor
                        </span>
                      </div>
                    ) : column.key === "value" ? (
                      <div className="flex flex-col">
                        <span className="font-semibold">Valor Documento</span>
                        <span className="text-xs font-normal">
                          Impostos e Tributos
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {column.label}
                        {column.sortable &&
                          getSortIcon(column.key as SortableColumn)}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRows.map((row, rowIndex) => (
                <TableRow
                  key={`row-${rowIndex}`}
                  className={cn(
                    "hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300",
                    "bg-primary/20",
                  )}
                >
                  <TableCell className="w-12 py-0.5">
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly
                      className="accent-primary h-4 w-4 rounded border border-zinc-200"
                    />
                  </TableCell>

                  <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-2">{row.ctrc}</div>
                  </TableCell>

                  <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-4 text-center">
                      <div className="border-primary flex h-8 w-8 items-center justify-center rounded-full border p-0.5">
                        {row.document.file ? (
                          <CircleCheck className="fill-green-500 text-white" />
                        ) : (
                          <Image
                            src="/icons/no-image.png"
                            alt=""
                            width={200}
                            height={200}
                            className="h-max w-5 object-contain"
                          />
                        )}
                      </div>
                      <div className="flex flex-col">
                        {row.document.type}
                        {row.document.name}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                    <span className="mx-auto w-max rounded-md bg-amber-700/10 px-2 py-1 text-amber-700">
                      {row.status}
                    </span>
                  </TableCell>

                  <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                    <span className="mx-auto w-max rounded-md bg-green-500/10 px-2 py-1 text-green-500">
                      {row.operation}
                    </span>
                  </TableCell>

                  <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                    <div className="flex flex-col">
                      {row.paying.cnpj}
                      <div className="flex items-center text-xs">
                        {row.paying.city} - {row.paying.state}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                    <div className="flex flex-col">
                      {row.receiving.cnpj}
                      <div className="flex items-center text-xs">
                        {row.receiving.city} - {row.receiving.state}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>{row.value}</span>
                      <span className="text-xs">{row.tax}</span>
                    </div>
                  </TableCell>

                  <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                    <div className="flex w-max flex-col text-start">
                      <span>{row.typeCode}</span>
                      <span className="text-xs">{row.type}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between border-t border-zinc-200 px-6 py-4">
            <button
              onClick={() => onHide()}
              className="text-primary hover:bg-primary hover:border-primary ml-auto flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 px-6 py-2 font-bold transition duration-200 hover:text-white"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
