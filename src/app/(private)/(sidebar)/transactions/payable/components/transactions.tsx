"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { Calendar } from "@/components/ui/calendar";
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
import { useLoadingContext } from "@/context/LoadingContext";
import {
  PayableTransactionProps,
  usePayableContext,
} from "@/context/PayableContext";
import { useValueContext } from "@/context/ValueContext";
import { cn } from "@/utils/cn";
import debounce from "lodash.debounce";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  EllipsisVertical,
  Search,
} from "lucide-react";
import moment from "moment";
import { Fragment, useCallback, useMemo, useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import { PayableDocumentsModal } from "./payable-documents-modal";

type SortDirection = "asc" | "desc" | null;
type SortableColumn =
  | "date"
  | "origin"
  | "value"
  | "ledgerAccount"
  | "cc"
  | "status";

interface Props {
  selectedStatus?: string;
}

export function PayableTransactions({ selectedStatus }: Props) {
  const { viewAllValues } = useValueContext();
  const { handleNavigation } = useLoadingContext();
  const {
    payableList,
    payablePages,
    selectedPayablePage,
    setSelectedPayablePage,
    isGettingPayables,
    payableQuery,
    setPayableQuery,
    payableTransactionList,
    payableTransactionPages,
    selectedPayableTransactionPage,
    setSelectedPayableTransactionPage,
  } = usePayableContext();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [accessLevel, setAccessLevel] = useState("common");
  const [isOpenPayableDocumentsModal, setIsOpenPayableDocumentsModal] =
    useState(false);
  const [selectedPayable, setSelectedPayable] =
    useState<PayableTransactionProps | null>(null);
  const [tableType, setTableType] = useState<"payable" | "transaction">(
    "payable",
  );

  const PayableColumns = [
    { key: "date" as SortableColumn, label: "Data", sortable: true },
    { key: "origin" as SortableColumn, label: "Fornecedor", sortable: true },
    { key: "value" as SortableColumn, label: "Valor", sortable: true },
    {
      key: "ledgerAccount" as SortableColumn,
      label: "Conta Contábil",
      sortable: true,
    },
    { key: "cc" as SortableColumn, label: "Centro de Custos", sortable: true },
    { key: "status" as SortableColumn, label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const PayableTransactionColumns = [
    { key: "date" as SortableColumn, label: "Data", sortable: true },
    {
      key: "bankAccount" as SortableColumn,
      label: "Conta Bancária",
      sortable: true,
    },
    { key: "value" as SortableColumn, label: "Valor", sortable: true },
    {
      key: "paymentType" as SortableColumn,
      label: "Tipo de pagamento",
      sortable: true,
    },
    {
      key: "documents" as SortableColumn,
      label: "Documentos",
      sortable: false,
    },
    { key: "status" as SortableColumn, label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const TransactionColumns = [
    { key: "date" as SortableColumn, label: "Data", sortable: true },
    { key: "supplier" as SortableColumn, label: "Fornecedor", sortable: true },
    {
      key: "ledgerAccount" as SortableColumn,
      label: "Conta Contábil",
      sortable: true,
    },
    {
      key: "bankAccount" as SortableColumn,
      label: "Conta Bancária",
      sortable: true,
    },
    { key: "value" as SortableColumn, label: "Valor", sortable: true },
    {
      key: "paymentType" as SortableColumn,
      label: "Tipo de pagamento",
      sortable: true,
    },
    {
      key: "documents" as SortableColumn,
      label: "Documentos",
      sortable: false,
    },
    { key: "status" as SortableColumn, label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
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

  const HandleRedirect = (transaction: PayableTransactionProps) => {
    if (transaction.status === "REJECTED") {
      return;
    } else if (transaction.status === "CLOSED") {
      return handleNavigation(`/payable/payed/${transaction.id}`);
    } else if (transaction.status !== "APPROVED") {
      if (accessLevel === "common") {
        return handleNavigation(`/payable/add-document/${transaction.id}`);
      } else if (accessLevel === "admin") {
        return handleNavigation(`/payable/approve/${transaction.id}`);
      }
    } else if (transaction.status === "APPROVED") {
      return handleNavigation(`/payable/pay/${transaction.id}`);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTransactionRow = (transaction: any, isSubRow = false) => (
    <TableRow
      key={transaction.id}
      className={cn(
        "hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300",
        isSubRow && "bg-gray-50",
      )}
    >
      <TableCell className="py-0.5 pl-20 text-start text-sm font-medium whitespace-nowrap">
        {moment(transaction.dueDate).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
        <div className="flex items-center gap-4 text-center">
          {transaction.bankAccount ? transaction.bankAccount.name : "N/A"}
        </div>
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap text-[#EF4444]">
        {viewAllValues
          ? transaction.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "********"}
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        {transaction.paymentType}
      </TableCell>
      <TableCell
        onClick={() => {
          setSelectedPayable(transaction);
          setIsOpenPayableDocumentsModal(true);
        }}
        className="h-full cursor-pointer py-0.5 text-start text-sm font-medium whitespace-nowrap"
      >
        <div className="flex items-center gap-2">
          Documentos
          <ChevronRight className="h-4" />
        </div>
      </TableCell>
      <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
        <div
          className={cn(
            "w-full text-center",
            transaction.status === "CLOSED" || transaction.status === "Recebido"
              ? "rounded-md border border-[#00A181] bg-[#00A181]/20 px-2 py-1 text-[#00A181]"
              : (transaction.status === "PENDING" &&
                    moment(transaction.dueDate)
                      .endOf("day")
                      .isBefore(moment())) ||
                  transaction.status === "REJECTED"
                ? "rounded-md border border-[#EF4444] bg-[#EF4444]/20 px-2 py-1 text-[#EF4444]"
                : transaction.status === "APPROVED"
                  ? "rounded-md border border-blue-500 bg-blue-500/20 px-2 py-1 text-blue-500"
                  : "rounded-md border border-[#D4A300] bg-[#D4A300]/20 px-2 py-1 text-[#D4A300]",
          )}
        >
          {transaction.status === "PENDING" &&
          moment(transaction.dueDate).endOf("day").isAfter(moment())
            ? "Pendente"
            : transaction.status === "PENDING" &&
                moment(transaction.dueDate).endOf("day").isBefore(moment())
              ? "Atrasado"
              : transaction.status === "APPROVED"
                ? "À Pagar"
                : transaction.status === "REJECTED"
                  ? "Rejeitado"
                  : transaction.status === "CLOSED"
                    ? "Pago"
                    : "Atrasado"}{" "}
        </div>
      </TableCell>
      <TableCell
        className={cn(
          "py-2 text-end text-sm font-medium whitespace-nowrap text-zinc-800 underline",
          transaction.status === "REJECTED" && "hidden",
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => HandleRedirect(transaction)}>
              Detalhes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
    if (!sortColumn || !sortDirection) return payableList;

    return [...payableList].sort((a, b) => {
      // Get the first transaction from each row for comparison
      const aPayable = a;
      const bPayable = b;

      let aValue: number | Date | string;
      let bValue: number | Date | string;

      switch (sortColumn) {
        case "date":
          aValue = new Date(aPayable.dueDate);
          bValue = new Date(bPayable.dueDate);
          break;
        case "origin":
          aValue = aPayable.supplier.name.toLowerCase();
          bValue = bPayable.supplier.name.toLowerCase();
          break;
        case "value":
          aValue = aPayable.value;
          bValue = bPayable.value;
          break;
        case "ledgerAccount":
          aValue = aPayable.ledgerAccount.name.toLowerCase();
          bValue = bPayable.ledgerAccount.name.toLowerCase();
          break;
        case "cc":
          aValue = aPayable.ledgerAccount.resultCenter.name.toLowerCase();
          bValue = bPayable.ledgerAccount.resultCenter.name.toLowerCase();
          break;
        case "status":
          aValue = aPayable.status.toLowerCase();
          bValue = bPayable.status.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [payableList, sortColumn, sortDirection]);

  const filteredRows = useMemo(() => {
    const searchTerm = payableQuery.toLowerCase().trim();

    const queryFiltered = sortedRows.filter((row) => {
      return (
        row.supplier.name.toLowerCase().includes(searchTerm) ||
        row.ledgerAccount.name.toLowerCase().includes(searchTerm) ||
        row.value.toString().includes(searchTerm) ||
        row.ledgerAccount.resultCenter.name
          .toLowerCase()
          .includes(searchTerm) ||
        row.status.toLowerCase().includes(searchTerm)
      );
    });

    const dateFiltered = queryFiltered.filter((p) => {
      if (!selectedDate) return true;
      const sel = moment(selectedDate).startOf("day").valueOf();
      const payableMatches = moment(p.dueDate).startOf("day").valueOf() === sel;
      const transactionMatches =
        Array.isArray(p.transactions) &&
        p.transactions.some(
          (tx) => moment(tx.dueDate).startOf("day").valueOf() === sel,
        );
      return payableMatches || transactionMatches;
    });

    const statusFiltered =
      selectedStatus === "CONSOLIDATED"
        ? dateFiltered.filter((p) => p.status === "CLOSED")
        : selectedStatus === "THIS_MONTH"
          ? dateFiltered.filter((p) =>
              moment(p.dueDate).isSame(new Date(), "month"),
            )
          : selectedStatus === "OVERDUE"
            ? dateFiltered.filter((p) =>
                moment(p.dueDate).startOf("day").isBefore(new Date()),
              )
            : dateFiltered;
    return statusFiltered;
  }, [sortedRows, payableQuery]);

  const sortedTransactionRows = useMemo(() => {
    if (!sortColumn || !sortDirection) return payableTransactionList;

    return [...payableTransactionList].sort((a, b) => {
      // Get the first transaction from each row for comparison
      const aPayable = a;
      const bPayable = b;

      let aValue: number | Date | string;
      let bValue: number | Date | string;

      switch (sortColumn) {
        case "date":
          aValue = new Date(aPayable.dueDate);
          bValue = new Date(bPayable.dueDate);
          break;
        case "origin":
          aValue = aPayable.bankAccount?.name.toLowerCase() || "";
          bValue = bPayable.bankAccount?.name.toLowerCase() || "";
          break;
        case "value":
          aValue = aPayable.value;
          bValue = bPayable.value;
          break;
        case "ledgerAccount":
          aValue = aPayable.paymentType.toLowerCase();
          bValue = bPayable.paymentType.toLowerCase();
          break;
        case "status":
          aValue = aPayable.status.toLowerCase();
          bValue = bPayable.status.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [payableTransactionList, sortColumn, sortDirection]);

  const filteredTransactionRows = useMemo(() => {
    const searchTerm = payableQuery.toLowerCase().trim();

    const queryFiltered = sortedTransactionRows.filter((row) => {
      return (
        row.bankAccount?.name.toLowerCase().includes(searchTerm) ||
        row.value.toString().includes(searchTerm) ||
        row.paymentType.toLowerCase().includes(searchTerm) ||
        row.status.toLowerCase().includes(searchTerm)
      );
    });

    const dateFiltered = queryFiltered.filter((p) => {
      if (!selectedDate) return true;
      const sel = moment(selectedDate).startOf("day").valueOf();
      const transactionMatches =
        moment(p.dueDate).startOf("day").valueOf() === sel;
      return transactionMatches;
    });

    const statusFiltered =
      selectedStatus === "CONSOLIDATED"
        ? dateFiltered.filter((p) => p.status === "CLOSED")
        : selectedStatus === "THIS_MONTH"
          ? dateFiltered.filter((p) =>
              moment(p.dueDate).isSame(new Date(), "month"),
            )
          : selectedStatus === "OVERDUE"
            ? dateFiltered.filter((p) =>
                moment(p.dueDate).startOf("day").isBefore(new Date()),
              )
            : dateFiltered;
    return statusFiltered;
  }, [sortedTransactionRows, payableQuery]);

  const handleSelect: SelectSingleEventHandler = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    } else {
      setSelectedDate(null); // or handle undefined case as needed
    }
  };

  const handleStopTypingPositive = (value: string) => {
    setPayableQuery(value);
  };

  const debouncedHandleStopTyping = useCallback(
    debounce(handleStopTypingPositive, 1000),
    [],
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Fluxo de Pagamentos</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="rounded-md border border-zinc-200 px-4 py-2 font-semibold text-zinc-400">
                  Acesso {accessLevel === "common" ? "Comum" : "Diretor"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-zinc-200">
                <DropdownMenuItem
                  onClick={() => setAccessLevel("common")}
                  className={cn(
                    "hover:bg-primary/20 cursor-pointer transition duration-300",
                    accessLevel === "common" &&
                      "bg-primary/20 text-primary font-semibold",
                  )}
                >
                  Comum
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAccessLevel("admin")}
                  className={cn(
                    "hover:bg-primary/20 cursor-pointer transition duration-300",
                    accessLevel === "admin" &&
                      "bg-primary/20 text-primary font-semibold",
                  )}
                >
                  Diretor
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <OrangeButton
                  disabled
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-white shadow-sm transition duration-300"
                >
                  <span className="text-sm"> Criar Lançamento</span>
                  <ChevronRight />
                </OrangeButton>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="z-[999]">
              <DropdownMenuItem
                onClick={() => handleNavigation("/payable/new")}
                className="hover:bg-primary/20 cursor-pointer transition duration-300"
              >
                <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1 py-2">
                  Lançar Despesa
                  <div className="border-primary h-4 w-4 rounded-md border"></div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1 py-2">
                  Pagamento de Colaboradores
                  <div className="border-primary h-4 w-4 rounded-md border"></div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleNavigation("/payable/recurring/new")}
                className="hover:bg-primary/20 cursor-pointer transition duration-300"
              >
                <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1 py-2">
                  Desp. Recorrentes
                  <div className="border-primary h-4 w-4 rounded-md border"></div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative flex w-full gap-8 border-b border-b-zinc-200">
          <button
            onClick={() => setTableType("payable")}
            className={cn(
              "flex h-12 items-center gap-2 border-b border-b-transparent px-2 text-sm transition duration-200",
              tableType === "payable" && "border-b-primary text-primary",
            )}
          >
            <div
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full",
                tableType === "payable" && "bg-primary/20 text-primary",
              )}
            >
              <ChevronDown />
            </div>
            À Pagar
          </button>
          <button
            onClick={() => setTableType("transaction")}
            className={cn(
              "flex h-12 items-center gap-2 border-b border-b-transparent px-2 text-sm transition duration-200",
              tableType === "transaction" && "border-b-primary text-primary",
            )}
          >
            <div
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full",
                tableType === "transaction" && "bg-primary/20 text-primary",
              )}
            >
              <ChevronDown />
            </div>
            Transações
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-12 items-center gap-2 px-2 text-sm transition">
                {selectedDate
                  ? moment(selectedDate).format("DD/MM/YYYY")
                  : "Filtrar por Dia"}
                <div className="flex h-4 w-4 items-center justify-center rounded-full">
                  <ChevronDown />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Calendar
                initialFocus
                mode="single"
                defaultMonth={moment().toDate()}
                selected={selectedDate ? selectedDate : undefined}
                onSelect={handleSelect}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <label
            htmlFor="search"
            className="relative ml-auto flex h-10 w-full items-center overflow-hidden rounded-md border border-zinc-200 transition duration-200 focus-within:border-zinc-200 xl:w-80"
          >
            <input
              className="absolute top-0 left-0 h-full w-full bg-transparent px-4"
              id="search"
              type="text"
              onChange={(e) => debouncedHandleStopTyping(e.target.value)}
              placeholder="Busca"
            />
            <Search className="text-default-500 absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
          </label>
        </div>
        {tableType === "payable" ? (
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="gap-1">
                {PayableColumns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn("h-12 cursor-pointer text-sm text-zinc-500")}
                    onClick={() =>
                      column.sortable &&
                      handleSort(column.key as SortableColumn)
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
            <TableBody className="relative">
              {isGettingPayables
                ? Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="h-14 animate-pulse bg-zinc-50" />
                      <TableCell className="h-14 animate-pulse bg-zinc-50" />
                      <TableCell className="h-14 animate-pulse bg-zinc-50" />
                      <TableCell className="h-14 animate-pulse bg-zinc-50" />
                      <TableCell className="h-14 animate-pulse bg-zinc-50" />
                      <TableCell className="h-14 animate-pulse bg-zinc-50" />
                      <TableCell className="h-14 animate-pulse bg-zinc-50" />
                      <TableCell className="h-14 animate-pulse bg-zinc-50" />
                      <TableCell className="h-14 animate-pulse bg-zinc-50" />
                    </TableRow>
                  ))
                : !isGettingPayables && filteredRows.length !== 0
                  ? filteredRows.map((row, rowIndex) => {
                      const hasTransactions =
                        row.transactions && row.transactions.length > 0;
                      const isExpanded = expandedRows.has(rowIndex);
                      return (
                        <Fragment key={row.id}>
                          <TableRow
                            className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
                            onClick={() =>
                              hasTransactions && toggleRow(rowIndex)
                            }
                          >
                            <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <button
                                  className={cn(
                                    "p-1",
                                    hasTransactions
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
                                {moment(row.dueDate).format("DD/MM/YYYY")}
                                {hasTransactions && (
                                  <span className="text-xs text-gray-500">
                                    (+{row.transactions.length})
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                              <div className="flex items-center gap-4 text-center">
                                {row.supplier
                                  ? row.supplier.name
                                  : "Sem fornecedor"}
                              </div>
                            </TableCell>
                            <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap text-[#EF4444]">
                              {viewAllValues
                                ? row.value.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })
                                : "********"}
                            </TableCell>
                            <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                              {row.ledgerAccount.name}
                            </TableCell>
                            <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                              {row.ledgerAccount
                                ? row.ledgerAccount.resultCenter.name
                                : "N/A"}
                            </TableCell>
                            <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                              <div
                                className={cn(
                                  row.status === "Pago"
                                    ? "rounded-md border border-[#00A181] bg-[#00A181]/20 px-2 py-1 text-[#00A181]"
                                    : row.status === "Negado"
                                      ? "rounded-md border border-[#EF4444] bg-[#EF4444]/20 px-2 py-1 text-[#EF4444]"
                                      : row.status === "PENDING"
                                        ? "rounded-md border border-[#D4A300] bg-[#D4A300]/20 px-2 py-1 text-[#D4A300]"
                                        : "rounded-md border border-[#1877F2] bg-[#1877F2]/20 px-2 py-1 text-[#1877F2]",
                                )}
                              >
                                {row.status === "PENDING"
                                  ? "PENDENTE"
                                  : row.status}
                              </div>
                            </TableCell>
                            <TableCell className="py-2 text-end text-sm font-medium whitespace-nowrap text-zinc-400 underline">
                              {/* <EllipsisVertical /> */}
                            </TableCell>
                          </TableRow>
                          {hasTransactions && isExpanded && (
                            <>
                              <TableRow className="gap-1 bg-gray-50">
                                {PayableTransactionColumns.map((column) => (
                                  <TableHead
                                    key={column.key}
                                    className={cn(
                                      "h-12 cursor-pointer text-sm text-zinc-500",
                                    )}
                                    onClick={() =>
                                      column.sortable &&
                                      handleSort(column.key as SortableColumn)
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      {column.label}
                                      {column.sortable &&
                                        getSortIcon(
                                          column.key as SortableColumn,
                                        )}
                                    </div>
                                  </TableHead>
                                ))}
                              </TableRow>
                              {row.transactions
                                // .slice(0, 2)
                                .sort((a, b) =>
                                  a.dueDate.localeCompare(b.dueDate),
                                )
                                .map((transaction) =>
                                  renderTransactionRow(transaction, true),
                                )}
                              {/* <TableRow>
                        <TableCell colSpan={7}>
                          <CustomPagination
                            currentPage={selectedPayablePage}
                            setCurrentPage={setSelectedPayablePage}
                            pages={payablePages}
                          />
                        </TableCell>
                      </TableRow> */}
                            </>
                          )}
                        </Fragment>
                      );
                    })
                  : !isGettingPayables &&
                    filteredRows.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={PayableColumns.length}
                          className="h-24"
                        >
                          <div className="flex w-full items-center justify-center">
                            Nenhum À Pagar encontrado.
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
            </TableBody>
          </Table>
        ) : (
          tableType === "transaction" && (
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="gap-1">
                  {TransactionColumns.map((column) => (
                    <TableHead
                      key={column.key}
                      className={cn(
                        "h-12 cursor-pointer text-sm text-zinc-500",
                      )}
                      onClick={() =>
                        column.sortable &&
                        handleSort(column.key as SortableColumn)
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
              <TableBody className="relative">
                {isGettingPayables
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="h-14 animate-pulse bg-zinc-50" />
                        <TableCell className="h-14 animate-pulse bg-zinc-50" />
                        <TableCell className="h-14 animate-pulse bg-zinc-50" />
                        <TableCell className="h-14 animate-pulse bg-zinc-50" />
                        <TableCell className="h-14 animate-pulse bg-zinc-50" />
                        <TableCell className="h-14 animate-pulse bg-zinc-50" />
                        <TableCell className="h-14 animate-pulse bg-zinc-50" />
                        <TableCell className="h-14 animate-pulse bg-zinc-50" />
                        <TableCell className="h-14 animate-pulse bg-zinc-50" />
                      </TableRow>
                    ))
                  : !isGettingPayables && filteredTransactionRows.length !== 0
                    ? filteredTransactionRows.map((transaction) => {
                        return (
                          <TableRow
                            key={transaction.id}
                            className={cn(
                              "hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300",
                            )}
                          >
                            <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                              {moment(transaction.dueDate).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                              {transaction.payable.supplier.name}
                            </TableCell>
                            <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                              {transaction.payable.ledgerAccount.name}
                            </TableCell>
                            <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                              <div className="flex items-center gap-4 text-center">
                                {transaction.bankAccount
                                  ? transaction.bankAccount.name
                                  : "N/A"}
                              </div>
                            </TableCell>
                            <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap text-[#EF4444]">
                              {viewAllValues
                                ? transaction.value.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })
                                : "********"}
                            </TableCell>
                            <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                              {transaction.paymentType}
                            </TableCell>
                            <TableCell
                              onClick={() => {
                                setSelectedPayable(transaction);
                                setIsOpenPayableDocumentsModal(true);
                              }}
                              className="h-full cursor-pointer py-0.5 text-start text-sm font-medium whitespace-nowrap"
                            >
                              <div className="flex items-center gap-2">
                                Documentos
                                <ChevronRight className="h-4" />
                              </div>
                            </TableCell>
                            <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                              <div
                                className={cn(
                                  "w-full text-center",
                                  transaction.status === "CLOSED" ||
                                    transaction.status === "Recebido"
                                    ? "rounded-md border border-[#00A181] bg-[#00A181]/20 px-2 py-1 text-[#00A181]"
                                    : (transaction.status === "PENDING" &&
                                          moment(transaction.dueDate)
                                            .endOf("day")
                                            .isBefore(moment())) ||
                                        transaction.status === "REJECTED"
                                      ? "rounded-md border border-[#EF4444] bg-[#EF4444]/20 px-2 py-1 text-[#EF4444]"
                                      : transaction.status === "APPROVED"
                                        ? "rounded-md border border-blue-500 bg-blue-500/20 px-2 py-1 text-blue-500"
                                        : "rounded-md border border-[#D4A300] bg-[#D4A300]/20 px-2 py-1 text-[#D4A300]",
                                )}
                              >
                                {transaction.status === "PENDING" &&
                                moment(transaction.dueDate)
                                  .endOf("day")
                                  .isAfter(moment())
                                  ? "Pendente"
                                  : transaction.status === "PENDING" &&
                                      moment(transaction.dueDate)
                                        .endOf("day")
                                        .isBefore(moment())
                                    ? "Atrasado"
                                    : transaction.status === "APPROVED"
                                      ? "À Pagar"
                                      : transaction.status === "REJECTED"
                                        ? "Rejeitado"
                                        : transaction.status === "CLOSED"
                                          ? "Pago"
                                          : "Atrasado"}{" "}
                              </div>
                            </TableCell>
                            <TableCell
                              className={cn(
                                "py-2 text-end text-sm font-medium whitespace-nowrap text-zinc-800 underline",
                                transaction.status === "REJECTED" && "hidden",
                              )}
                            >
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <EllipsisVertical />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() => HandleRedirect(transaction)}
                                  >
                                    Detalhes
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : !isGettingPayables &&
                      filteredTransactionRows.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={PayableTransactionColumns.length}
                            className="h-24"
                          >
                            <div className="flex w-full items-center justify-center">
                              Nenhuma transação encontrada.
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
              </TableBody>
            </Table>
          )
        )}
        <div
          className={cn(
            "w-full border-t border-t-zinc-200 p-2",
            tableType === "payable"
              ? filteredRows.length === 0 && "hidden"
              : tableType === "transaction"
                ? filteredTransactionRows.length === 0 && "hidden"
                : "",
          )}
        >
          <CustomPagination
            currentPage={
              tableType === "payable"
                ? selectedPayablePage
                : selectedPayableTransactionPage
            }
            setCurrentPage={
              tableType === "payable"
                ? setSelectedPayablePage
                : setSelectedPayableTransactionPage
            }
            pages={
              tableType === "payable" ? payablePages : payableTransactionPages
            }
          />
        </div>
      </div>
      {isOpenPayableDocumentsModal && selectedPayable && (
        <PayableDocumentsModal
          isOpenPayableDocumentsModal={isOpenPayableDocumentsModal}
          setIsOpenPayableDocumentsModal={() => {
            setIsOpenPayableDocumentsModal(false);
            setSelectedPayable(null);
          }}
          selectedPayable={selectedPayable}
        />
      )}
    </>
  );
}
