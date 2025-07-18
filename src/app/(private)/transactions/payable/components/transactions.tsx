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
import debounce from "lodash.debounce";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  EllipsisVertical,
  Search,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Home2NewReleaseSheet } from "./new-release-sheet";

interface TransactionProps {
  id: string;
  date: string;
  origin: string;
  value: string;
  category: string;
  cc: string;
  status: string;
  documents: {
    id: string;
    name: string;
    file: string;
  }[];
}

interface TransactionsProps {
  transactions: TransactionProps[];
}

type SortDirection = "asc" | "desc" | null;
type SortableColumn =
  | "date"
  | "origin"
  | "value"
  | "category"
  | "cc"
  | "status";

export function Home2Transactions() {
  const [transactionPages] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isNewReleaseSheetOpen, setIsNewReleaseSheetOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [query, setQuery] = useState("");

  const columns = [
    { key: "date" as SortableColumn, label: "Data", sortable: true },
    { key: "origin" as SortableColumn, label: "Cliente", sortable: true },
    { key: "value" as SortableColumn, label: "Valor Título", sortable: true },
    { key: "category" as SortableColumn, label: "Categoria", sortable: true },
    { key: "cc" as SortableColumn, label: "Centro de Custos", sortable: true },
    { key: "status" as SortableColumn, label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const rawRows: TransactionsProps[] = [
    {
      transactions: [
        {
          id: "1",
          date: "01/01/2025",
          origin: "Cliente 1",
          value: "R$ 1.000,00",
          category: "Categoria 1",
          cc: "Centro de Custos 1",
          status: "Pago",
          documents: [
            { id: "1", name: "Documento 1", file: "file.pdf" },
            { id: "2", name: "Documento 2", file: "file.pdf" },
          ],
        },
      ],
    },
    {
      transactions: [
        {
          id: "2",
          date: "02/01/2025",
          origin: "Cliente 2",
          value: "R$ 1.000,00",
          category: "Categoria 2",
          cc: "Centro de Custos 2",
          status: "Pendente",
          documents: [],
        },
      ],
    },
    {
      transactions: [
        {
          id: "3",
          date: "03/01/2025",
          origin: "Cliente 3",
          value: "R$ 1.000,00",
          category: "Categoria 3",
          cc: "Centro de Custos 3",
          status: "Pago",
          documents: [],
        },
      ],
    },
    {
      transactions: [
        {
          id: "1",
          date: "01/01/2025",
          origin: "Cliente 4",
          value: "R$ 1.000,00",
          category: "Categoria 4",
          cc: "Centro de Custos 4",
          status: "Pago",
          documents: [
            { id: "1", name: "Documento 1", file: "file.pdf" },
            { id: "2", name: "Documento 2", file: "file.pdf" },
          ],
        },
        {
          id: "2",
          date: "02/01/2025",
          origin: "Cliente 4",
          value: "R$ 1.000,00",
          category: "Categoria 4",
          cc: "Centro de Custos 4",
          status: "Pago",
          documents: [
            { id: "1", name: "Documento 1", file: "file.pdf" },
            { id: "2", name: "Documento 2", file: "file.pdf" },
          ],
        },
        {
          id: "3",
          date: "03/01/2025",
          origin: "Cliente 4",
          value: "R$ 1.000,00",
          category: "Categoria 4",
          cc: "Centro de Custos 4",
          status: "Pendente",
          documents: [
            { id: "1", name: "Documento 1", file: "file.pdf" },
            { id: "2", name: "Documento 2", file: "file.pdf" },
          ],
        },
        {
          id: "4",
          date: "04/01/2025",
          origin: "Cliente 4",
          value: "R$ 1.000,00",
          category: "Categoria 4",
          cc: "Centro de Custos 4",
          status: "Negado",
          documents: [
            { id: "1", name: "Documento 1", file: "file.pdf" },
            { id: "2", name: "Documento 2", file: "file.pdf" },
          ],
        },
      ],
    },
  ];

  const toggleRow = (rowIndex: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowIndex)) {
      newExpandedRows.delete(rowIndex);
    } else {
      newExpandedRows.add(rowIndex);
    }
    setExpandedRows(newExpandedRows);
  };

  const renderTransactionRow = (
    transaction: TransactionProps,
    isSubRow = false,
  ) => (
    <TableRow
      key={transaction.id}
      className={cn(
        "hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300",
        isSubRow && "bg-gray-50",
      )}
    >
      <TableCell className="py-0.5 pl-12 text-start text-sm font-medium whitespace-nowrap">
        {transaction.date}
      </TableCell>
      <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
        <div className="flex items-center gap-4 text-center">
          {transaction.origin}
        </div>
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap text-[#00A181]">
        {transaction.value}
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        {transaction.category}
      </TableCell>
      <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
        {transaction.cc}
      </TableCell>
      <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
        <div
          className={cn(
            transaction.status === "Pago"
              ? "rounded-md border border-[#00A181] bg-[#00A181]/20 px-2 py-1 text-[#00A181]"
              : transaction.status === "Negado"
                ? "rounded-md border border-[#EF4444] bg-[#EF4444]/20 px-2 py-1 text-[#EF4444]"
                : transaction.status === "Pendente"
                  ? "rounded-md border border-[#D4A300] bg-[#D4A300]/20 px-2 py-1 text-[#D4A300]"
                  : "rounded-md border border-[#1877F2] bg-[#1877F2]/20 px-2 py-1 text-[#1877F2]",
          )}
        >
          {transaction.status}
        </div>
      </TableCell>
      <TableCell className="py-2 text-end text-sm font-medium whitespace-nowrap text-zinc-400 underline">
        <EllipsisVertical />
      </TableCell>
    </TableRow>
  );

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

  const parseValue = (value: string): number => {
    return parseFloat(value.replace(/[R$\s.]/g, "").replace(",", "."));
  };

  const parseDate = (date: string): Date => {
    const [day, month, year] = date.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
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
      // Get the first transaction from each row for comparison
      const aTransaction = a.transactions[0];
      const bTransaction = b.transactions[0];

      let aValue: number | Date | string;
      let bValue: number | Date | string;

      switch (sortColumn) {
        case "date":
          aValue = parseDate(aTransaction.date);
          bValue = parseDate(bTransaction.date);
          break;
        case "origin":
          aValue = aTransaction.origin.toLowerCase();
          bValue = bTransaction.origin.toLowerCase();
          break;
        case "value":
          aValue = parseValue(aTransaction.value);
          bValue = parseValue(bTransaction.value);
          break;
        case "category":
          aValue = aTransaction.category.toLowerCase();
          bValue = bTransaction.category.toLowerCase();
          break;
        case "cc":
          aValue = aTransaction.cc.toLowerCase();
          bValue = bTransaction.cc.toLowerCase();
          break;
        case "status":
          aValue = aTransaction.status.toLowerCase();
          bValue = bTransaction.status.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [rawRows, sortColumn, sortDirection]);

  const filteredRows = useMemo(() => {
    if (!query.trim()) return sortedRows;

    const searchTerm = query.toLowerCase().trim();

    return sortedRows.filter((row) => {
      // Check if any transaction in the row matches the search
      return row.transactions.some((transaction) => {
        return (
          transaction.date.toLowerCase().includes(searchTerm) ||
          transaction.origin.toLowerCase().includes(searchTerm) ||
          transaction.value.toLowerCase().includes(searchTerm) ||
          transaction.category.toLowerCase().includes(searchTerm) ||
          transaction.cc.toLowerCase().includes(searchTerm) ||
          transaction.status.toLowerCase().includes(searchTerm)
        );
      });
    });
  }, [sortedRows, query]);

  const handleStopTypingPositive = (value: string) => {
    setQuery(value);
  };

  const debouncedHandleStopTyping = useCallback(
    debounce(handleStopTypingPositive, 500),
    [],
  );

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Fluxo de Pagamentos</span>
            <div className="text-primary flex items-center gap-2 text-sm font-semibold">
              <span>Ver todas</span>
              <ChevronRight />
            </div>
          </div>
          <button
            onClick={() => setIsNewReleaseSheetOpen(true)}
            className="bg-primary hover:bg-primary-dark hover:border-primary-dark border-primary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-white shadow-sm transition duration-300"
          >
            <span className="text-sm">Criar Lançamento</span>
            <ChevronRight />
          </button>
        </div>
        <label
          htmlFor="search"
          className="border-primary text-primary flex max-w-80 flex-row items-center gap-2 rounded-lg border p-1"
        >
          <Search />
          <input
            id="search"
            type="text"
            placeholder="Pesquisar"
            className="bg-transparent outline-none focus:outline-none"
            onChange={(e) => debouncedHandleStopTyping(e.target.value)}
          />
        </label>
        <Table className="border-collapse">
          <TableHeader>
            <TableRow className="gap-1">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn("h-12 cursor-pointer text-sm text-zinc-500")}
                  onClick={() =>
                    column.sortable && handleSort(column.key as SortableColumn)
                  }
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable &&
                      getSortIcon(column.key as SortableColumn)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRows.map((row, rowIndex) => {
              const hasMultipleTransactions = row.transactions.length > 1;
              const isExpanded = expandedRows.has(rowIndex);
              const firstTransaction = row.transactions[0];

              return (
                <>
                  {/* Main row */}
                  <TableRow
                    key={`row-${rowIndex}`}
                    className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
                    onClick={() =>
                      hasMultipleTransactions && toggleRow(rowIndex)
                    }
                  >
                    <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          className={cn(
                            "p-1",
                            hasMultipleTransactions
                              ? "opacity-00"
                              : "opacity-0",
                          )}
                        >
                          <ChevronRight
                            size={16}
                            className={cn(
                              "transition duration-300",
                              isExpanded ? "rotate-90" : "rotate-0",
                            )}
                          />
                        </button>
                        {firstTransaction.date}
                        {hasMultipleTransactions && (
                          <span className="text-xs text-gray-500">
                            (+{row.transactions.length - 1})
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center gap-4 text-center">
                        {firstTransaction.origin}
                      </div>
                    </TableCell>
                    <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap text-[#00A181]">
                      {firstTransaction.value}
                    </TableCell>
                    <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                      {firstTransaction.category}
                    </TableCell>
                    <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                      {firstTransaction.cc}
                    </TableCell>
                    <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                      <div
                        className={cn(
                          firstTransaction.status === "Pago"
                            ? "rounded-md border border-[#00A181] bg-[#00A181]/20 px-2 py-1 text-[#00A181]"
                            : firstTransaction.status === "Negado"
                              ? "rounded-md border border-[#EF4444] bg-[#EF4444]/20 px-2 py-1 text-[#EF4444]"
                              : firstTransaction.status === "Pendente"
                                ? "rounded-md border border-[#D4A300] bg-[#D4A300]/20 px-2 py-1 text-[#D4A300]"
                                : "rounded-md border border-[#1877F2] bg-[#1877F2]/20 px-2 py-1 text-[#1877F2]",
                        )}
                      >
                        {firstTransaction.status}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 text-end text-sm font-medium whitespace-nowrap text-zinc-400 underline">
                      <EllipsisVertical />
                    </TableCell>
                  </TableRow>

                  {/* Expanded rows */}
                  {hasMultipleTransactions &&
                    isExpanded &&
                    row.transactions
                      .slice(1)
                      .map((transaction) =>
                        renderTransactionRow(transaction, true),
                      )}
                </>
              );
            })}
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
