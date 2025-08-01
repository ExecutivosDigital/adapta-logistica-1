"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { CustomPagination } from "@/components/ui/custom-pagination";
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
import { toReceive, TransactionProps } from "@/const/transactions";
import { cn } from "@/utils/cn";

import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  EllipsisVertical,
  Files,
} from "lucide-react";
import moment from "moment";
import { Fragment, useEffect, useMemo, useState } from "react";

type SortDirection = "asc" | "desc" | null;
type SortableColumn =
  | "date"
  | "origin"
  | "value"
  | "category"
  | "cc"
  | "status";
interface Props {
  filterType?: string;
}
export function ReceivableTransactions({ filterType }: Props) {
  /* ----------------------------- State & Consts ---------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const [query] = useState("");

  const tableTypes = [{ id: "1", name: "Pagamentos" }] as const;
  const [selectedTableType, setSelectedTableType] = useState<{
    id: "1" | "2" | "3";
    name: string;
  }>(tableTypes[0]);

  /* ------------------------------ Tab & Rows ------------------------------- */

  const rawRows: TransactionProps[] = (() => {
    if (filterType === "overdue") {
      return toReceive.filter((r) => r.status === "atrasado");
    }
    if (filterType === "consolidated") {
      return toReceive.filter((r) => r.status === "recebido");
    }
    if (filterType === "this-month") {
      return toReceive.filter(
        (r) =>
          moment(r.date).isSame(new Date(), "month") &&
          r.status === "a_receber",
      );
    }
    return toReceive;
  })();

  /* ------------------------------ Utilities -------------------------------- */
  const parseDate = (raw: string): Date => {
    if (raw.includes("/")) {
      // dd/mm/yyyy
      const [d, m, y] = raw.split("/");
      return new Date(Number(y), Number(m) - 1, Number(d));
    }
    if (raw.includes("-")) {
      // yyyy-mm-dd (ISO)
      const [y, m, d] = raw.split("-");
      return new Date(Number(y), Number(m) - 1, Number(d));
    }
    // fallback p/ qualquer outra string reconhecida pelo JS
    return new Date(raw);
  };

  const formatDate = (raw: string): string => {
    const d = parseDate(raw);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const parseValue = (value: string): number =>
    Number(value.replace(/[^0-9,-]+/g, "").replace(/,/g, "."));
  /* -------------------------------- Sorting -------------------------------- */
  const handleSort = (column: SortableColumn) => {
    // same column ➜ cycle direction
    if (sortColumn === column) {
      const next =
        sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
            ? null
            : "asc";
      setSortDirection(next);
      if (!next) setSortColumn(null);
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    // sempre volta para página 1 ao ordenar
    setCurrentPage(1);
  };

  const sortedRows = useMemo(() => {
    if (!sortColumn || !sortDirection) return rawRows;

    const rowsCopy = [...rawRows];
    rowsCopy.sort((a, b) => {
      let aValue: number | Date | string;
      let bValue: number | Date | string;

      switch (sortColumn) {
        case "date":
          aValue = parseDate(a.date);
          bValue = parseDate(b.date);
          break;
        case "origin":
          aValue = a.origin.toLowerCase();
          bValue = b.origin.toLowerCase();
          break;
        case "value":
          aValue = parseValue(a.value);
          bValue = parseValue(b.value);
          break;
        case "category":
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case "cc":
          aValue = a.cc.toLowerCase();
          bValue = b.cc.toLowerCase();
          break;
        case "status":
          aValue = String(a.status).toLowerCase();
          bValue = String(b.status).toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return rowsCopy;
  }, [rawRows, sortColumn, sortDirection]);

  /* ------------------------------ Filtering -------------------------------- */
  const filteredRows = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return sortedRows;

    return sortedRows.filter((tx) =>
      [
        formatDate(tx.date),
        tx.origin,
        tx.value,
        tx.type,
        tx.category,
        tx.cc,
        String(tx.status),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [sortedRows, query]);

  /* ----------------------------- Pagination -------------------------------- */
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredRows.length / rowsPerPage)),
    [filteredRows.length, rowsPerPage],
  );

  useEffect(() => {
    // caso filtro/ordenacao reduza o total, garante que currentPage é válido
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredRows.slice(start, start + rowsPerPage);
  }, [filteredRows, currentPage, rowsPerPage]);

  /* -------------------------- Column Definitions --------------------------- */
  const columns = [
    { key: "date" as const, label: "Data Pag.", sortable: true },
    { key: "origin" as const, label: "Clientes", sortable: true },
    { key: "value" as const, label: "Valor Título", sortable: true },
    { key: "category" as const, label: "Lançamentos", sortable: true },
    { key: "cc" as const, label: "Documentos", sortable: true },
    { key: "status" as const, label: "Status", sortable: true },
  ] satisfies { key: SortableColumn; label: string; sortable: boolean }[];

  const getSortIcon = (column: SortableColumn) => {
    if (sortColumn !== column)
      return <ChevronUp className="h-4 w-4 text-gray-300" />;
    if (sortDirection === "asc")
      return <ChevronUp className="h-4 w-4 text-gray-600" />;
    if (sortDirection === "desc")
      return <ChevronDown className="h-4 w-4 text-gray-600" />;
    return <ChevronUp className="h-4 w-4 text-gray-300" />;
  };

  /* --------------------------------- JSX ---------------------------------- */
  return (
    <div className="flex flex-col">
      {/* --------------------------- Header --------------------------- */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Fluxo de Recebimentos</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <OrangeButton
              className="border-primary bg-primary hover:border-primary-dark hover:bg-primary-dark flex items-center gap-2 px-2 py-1 text-white shadow-sm transition"
              aria-label="Criar Lançamento"
            >
              <span className="text-sm">Criar Lançamento</span>
              <ChevronRight />
            </OrangeButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom">
            {[
              "Lançar Despesa",
              "Pagamento de Colaboradores",
              "Desp. Recorrentes",
            ].map((item) => (
              <DropdownMenuItem
                key={item}
                className="hover:bg-primary/20 cursor-pointer transition"
              >
                <div className="flex w-full items-center justify-between gap-2 border-b p-1">
                  {item}
                  <div className="border-primary h-4 w-4 rounded-md border" />
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* --------------------------- Tabs ---------------------------- */}
      <div className="relative flex w-full gap-8 border-b border-b-zinc-200">
        {tableTypes.map((tab) => {
          const isActive = tab.id === selectedTableType.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTableType(tab);
                setCurrentPage(1); // reset page when changing tab
              }}
              className={cn(
                "flex h-12 items-center gap-2 border-b px-2 text-sm transition",
                isActive
                  ? "border-b-primary text-primary"
                  : "hover:text-primary border-b-transparent",
              )}
            >
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "bg-zinc-400/20 text-zinc-400",
                )}
              >
                {isActive ? <ChevronDown /> : <ChevronRight />}
              </div>
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* --------------------------- Table --------------------------- */}
      <Table className="border-collapse">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className="h-12 cursor-pointer text-sm text-zinc-500"
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div
                  className={cn("flex items-center gap-2", {
                    "justify-center": column.label === "Status",
                  })}
                >
                  {column.label}
                  {column.sortable && getSortIcon(column.key)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedRows.map((row) => (
            <Fragment key={row.id}>
              <TableRow className="hover:bg-primary/20 h-14 cursor-pointer transition">
                {/* Data */}
                <TableCell className="py-0.5 text-sm whitespace-nowrap">
                  {moment(row.date).format("DD/MM/YYYY")}
                </TableCell>

                {/* Fornecedor */}
                <TableCell className="py-0.5 text-sm whitespace-nowrap">
                  {row.origin}
                </TableCell>

                {/* Valor */}
                <TableCell
                  className={cn(
                    "py-0.5 text-sm whitespace-nowrap",
                    row.type === "toReceive"
                      ? "text-emerald-600"
                      : "text-red-500",
                  )}
                >
                  {row.value}
                </TableCell>

                {/* Lançamentos */}
                <TableCell className="py-0.5 text-sm whitespace-nowrap">
                  {row.category}
                </TableCell>

                {/* Documentos */}
                <TableCell className="py-0.5 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2 font-bold underline">
                    Ver Documentos
                    <Files />
                  </div>
                </TableCell>

                {/* Status + Ações */}
                <TableCell className="py-0.5 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    {/* Badge */}
                    <div
                      className={cn(
                        "flex-1 rounded-md border px-2 py-1 text-center text-xs font-medium uppercase",
                        {
                          "border-red-500 bg-red-500/20 text-red-500":
                            row.status === "a_pagar" ||
                            row.status === "a_receber",
                          "border-black bg-black/20 text-black":
                            row.status === "negado",
                          "border-emerald-600 bg-emerald-600/20 text-emerald-600":
                            row.status === "recebido" || row.status === "pago",
                          "border-yellow-600 bg-yellow-600/20 text-yellow-600":
                            row.status === "pendente",
                          "border-zinc-400 bg-zinc-400/20 text-zinc-600":
                            row.status === "incompleto",
                          "border-orange-500 bg-orange-500/20 text-orange-500":
                            row.status === "atrasado",
                        },
                      )}
                    >
                      {row.status === "a_pagar"
                        ? "À PAGAR"
                        : row.status === "negado"
                          ? "NEGADO"
                          : row.status === "a_receber"
                            ? "À RECEBER"
                            : row.status === "recebido"
                              ? "RECEBIDO"
                              : row.status === "pendente"
                                ? "PENDENTE"
                                : row.status === "incompleto"
                                  ? "INCOMPLETO"
                                  : row.status === "pago"
                                    ? "PAGO"
                                    : "ATRASADO"}
                    </div>

                    {/* Menu */}
                    <button className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-400">
                      <EllipsisVertical />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
          {paginatedRows.length < 10 &&
            [...Array(10 - paginatedRows.length)].map((_, i) => (
              <TableRow key={i} className="h-14">
                <TableCell colSpan={6} className="h-full" />
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* ----------------------- Pagination Footer --------------------- */}
      <div className="border-t border-t-zinc-200 p-2">
        <CustomPagination
          currentPage={currentPage}
          pages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
