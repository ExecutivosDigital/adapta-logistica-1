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
import { cn } from "@/utils/cn";

import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  EllipsisVertical,
  Files,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";

type SortDirection = "asc" | "desc" | null;
type SortableColumn =
  | "date"
  | "origin"
  | "value"
  | "category"
  | "cc"
  | "status";

export function PayableTransactions() {
  const router = useRouter();
  const [transactionPages] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [query] = useState("");

  const columns = [
    { key: "date" as SortableColumn, label: "Data Pag.", sortable: true },
    { key: "origin" as SortableColumn, label: "Fornecedor", sortable: true },
    { key: "value" as SortableColumn, label: "Valor Título", sortable: true },
    {
      key: "category" as SortableColumn,
      label: "Lançamentos",
      sortable: true,
    },
    { key: "cc" as SortableColumn, label: "Documentos", sortable: true },
    { key: "status" as SortableColumn, label: "Status", sortable: true },
  ];

  const rawRows = useMemo(() => {
    return [
      {
        transactions: [
          {
            id: "1",
            date: "01/01/2025",
            origin: "Fornecedor 1",
            value: "R$ 1.000,00",
            category: "Nome do Serviço 1",
            cc: "Ver Documentos",
            status: "Á pagar",
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
            origin: "Fornecedor 2",
            value: "R$ 1.000,00",
            category: "Nome do Serviço 2",
            cc: "Ver Documentos",
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
            origin: "Fornecedor 3",
            value: "R$ 1.000,00",
            category: "Nome do Serviço 3",
            cc: "Ver Documentos",
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
            origin: "Fornecedor 4",
            value: "R$ 1.000,00",
            category: "Nome do Serviço 4",
            cc: "Ver Documentos",
            status: "Pago",
            documents: [
              { id: "1", name: "Documento 1", file: "file.pdf" },
              { id: "2", name: "Documento 2", file: "file.pdf" },
            ],
          },
          {
            id: "2",
            date: "02/01/2025",
            origin: "Fornecedor 4",
            value: "R$ 1.000,00",
            category: "Nome do Serviço 4",
            cc: "Ver Documentos",
            status: "Pago",
            documents: [
              { id: "1", name: "Documento 1", file: "file.pdf" },
              { id: "2", name: "Documento 2", file: "file.pdf" },
            ],
          },
          {
            id: "3",
            date: "03/01/2025",
            origin: "Fornecedor 4",
            value: "R$ 1.000,00",
            category: "Nome do Serviço 4",
            cc: "Ver Documentos",
            status: "Pendente",
            documents: [
              { id: "1", name: "Documento 1", file: "file.pdf" },
              { id: "2", name: "Documento 2", file: "file.pdf" },
            ],
          },
          {
            id: "4",
            date: "04/01/2025",
            origin: "Fornecedor 4",
            value: "R$ 1.000,00",
            category: "Nome do Serviço 4",
            cc: "Ver Documentos",
            status: "Negado",
            documents: [
              { id: "1", name: "Documento 1", file: "file.pdf" },
              { id: "2", name: "Documento 2", file: "file.pdf" },
            ],
          },
        ],
      },
    ];
  }, []);

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

  // const handleStopTypingPositive = (value: string) => {
  //   setQuery(value);
  // };

  // const debouncedHandleStopTyping = useCallback(
  //   debounce(handleStopTypingPositive, 500),
  //   [],
  // );
  const tableTypes = [
    {
      id: "1",
      name: "Ver Todos Pagamentos",
    },
    {
      id: "2",
      name: "Solicitação de Compras",
    },
    {
      id: "3",
      name: "Pgtos.Recorrentes",
    },
    {
      id: "4",
      name: "Lançamentos À Pagar",
    },
  ];
  const [selectedTableType, setSelectedTableType] = useState(tableTypes[0]);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Fluxo de Pagamentos</span>
            <div
              onClick={() => router.push("/transactions/payable/all")}
              className="text-primary flex cursor-pointer items-center gap-2 text-sm font-semibold"
            >
              <span>Ver todas</span>
              <ChevronRight />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <OrangeButton className="bg-primary hover:bg-primary-dark hover:border-primary-dark border-primary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-white shadow-sm transition duration-300">
                <span className="text-sm"> Criar Lançamento</span>
                <ChevronRight />
              </OrangeButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom">
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1">
                  Lançar Despesa
                  <div className="border-primary h-4 w-4 rounded-md border"></div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1">
                  Pagamento de Colaboradores
                  <div className="border-primary h-4 w-4 rounded-md border"></div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1">
                  Desp. Recorrentes
                  <div className="border-primary h-4 w-4 rounded-md border"></div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/*   
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
        </label> */}
        <div className="relative flex w-full gap-8 border-b border-b-zinc-200">
          {tableTypes.map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedTableType(tab)}
              className={`hover:text-primary flex h-12 cursor-pointer flex-row items-center justify-center gap-2 border-b px-2 transition-all duration-300 ${
                tab.id === selectedTableType.id
                  ? "text-primary border-b-primary"
                  : "border-b-transparent"
              }`}
            >
              {tab.id === selectedTableType.id ? (
                <div className="bg-primary/20 text-primary flex h-4 w-4 items-center justify-center rounded-full">
                  <ChevronDown />
                </div>
              ) : (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-400/20 text-zinc-400">
                  <ChevronRight />
                </div>
              )}
              {tab.name}
            </button>
          ))}
        </div>
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
                  <div
                    className={`flex items-center gap-2 ${column.label === "Status" && "justify-center"}`}
                  >
                    {column.label}
                    {column.sortable &&
                      getSortIcon(column.key as SortableColumn)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRows.map((row, index) => {
              const firstTransaction = row.transactions[0];

              return (
                <Fragment key={index}>
                  <TableRow className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300">
                    <TableCell className="py-0.5 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {firstTransaction.date}
                      </div>
                    </TableCell>
                    <TableCell className="py-0.5 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-4 text-center">
                        {firstTransaction.origin}
                      </div>
                    </TableCell>
                    <TableCell className="py-0.5 text-start text-sm whitespace-nowrap text-[#EF4444]">
                      {firstTransaction.value}
                    </TableCell>
                    <TableCell className="py-0.5 text-start text-sm whitespace-nowrap">
                      {firstTransaction.category}
                    </TableCell>
                    <TableCell className="h-full py-0.5 text-start text-sm whitespace-nowrap">
                      <div className="flex flex-row items-center gap-2 font-bold underline">
                        {firstTransaction.cc}
                        <Files />
                      </div>
                    </TableCell>
                    <TableCell className="py-0.5 text-sm whitespace-nowrap">
                      <div className="flex w-full flex-row gap-4">
                        <div
                          className={cn(
                            "flex-1 text-center",
                            firstTransaction.status === "Pago"
                              ? "rounded-md border border-[#00A181] bg-[#00A181]/20 px-2 py-1 text-[#00A181]"
                              : firstTransaction.status === "Á pagar"
                                ? "rounded-md border border-[#EF4444] bg-[#EF4444]/20 px-2 py-1 text-[#EF4444]"
                                : firstTransaction.status === "Pendente"
                                  ? "rounded-md border border-[#D4A300] bg-[#D4A300]/20 px-2 py-1 text-[#D4A300]"
                                  : "rounded-md border border-[#1877F2] bg-[#1877F2]/20 px-2 py-1 text-[#1877F2]",
                          )}
                        >
                          {firstTransaction.status}
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-400">
                          <EllipsisVertical />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </Fragment>
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
    </>
  );
}
