"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
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
  CircleCheck,
  ClipboardList,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Stepper from "./components/steper";

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

export default function UpdateReceivable() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [transactionPages] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(
    new Set(["1", "2"]),
  );
  const [selectedSwitch, setSelectedSwitch] = useState<string>("1");
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set([
      "select",
      "ctrc",
      "document",
      "status",
      "operation",
      "paying",
      "receiving",
      "value",
      "type",
    ]),
  );

  const steps = [
    { label: "Selecionar Pagador", value: "solicitacao" },
    { label: "Seleção de Documentos", value: "gestor" },
    { label: "Aprovação de Financeiro", value: "financeiro" },
    { label: "Confirmação da Compra", value: "confirmacao" },
    { label: "Pagamento Efetuado", value: "pagamento" },
    { label: "Todos", value: "all" },
  ];

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

  const handleRowSelect = (rowId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === sortedRows.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sortedRows.map((row) => row.id)));
    }
  };

  const handleColumnToggle = (columnKey: string) => {
    const newVisibleColumns = new Set(visibleColumns);
    if (newVisibleColumns.has(columnKey)) {
      if (columnKey !== "select") {
        newVisibleColumns.delete(columnKey);
      }
    } else {
      newVisibleColumns.add(columnKey);
    }
    setVisibleColumns(newVisibleColumns);
  };

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

  const isAllSelected =
    selectedRows.size === sortedRows.length && sortedRows.length > 0;
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < sortedRows.length;

  const visibleColumnsArray = columns.filter((column) =>
    visibleColumns.has(column.key),
  );

  return (
    <div className="flex h-full w-full flex-col gap-2 xl:gap-4">
      <div className="flex w-full flex-col items-start justify-between xl:flex-row xl:items-center">
        <span className="text-lg font-semibold xl:text-xl">
          Editar Conta Á Receber
        </span>
        <div className="flex flex-col items-start gap-0 xl:flex-row xl:items-center xl:gap-4">
          {selectedRows.size > 0 && (
            <span className="text-sm text-gray-600">
              {selectedRows.size} linha(s) selecionada(s)
            </span>
          )}
          <OrangeButton className="flex items-center gap-2">
            <ClipboardList />
            CNPJ - Cliente Pagador
          </OrangeButton>
        </div>
      </div>

      <Stepper
        steps={steps}
        current={1}
        onStepClick={() => {}}
        className="mb-4"
      />

      <div className="mt-10 flex w-full flex-col items-center justify-between gap-2 border-b border-b-zinc-200 pb-2 xl:h-12 xl:flex-row">
        <div className="flex h-full items-center gap-4">
          <div
            className={cn(
              "flex h-full cursor-pointer items-center gap-8 border-b border-b-transparent transition duration-200",
              selectedSwitch === "1" && "border-b-primary",
            )}
            onClick={() => setSelectedSwitch("1")}
          >
            <span
              className={cn(
                "text-sm transition duration-200",
                selectedSwitch === "1" && "text-primary font-semibold",
              )}
            >
              Documentos
            </span>
            <div className="bg-primary/20 text-primary flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm font-semibold">
              4
            </div>
          </div>
          <div className="flex h-full cursor-pointer items-center gap-8 border-b border-b-transparent transition duration-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span
                  className={cn(
                    "text-sm transition duration-200",
                    selectedSwitch === "2" && "text-primary font-semibold",
                  )}
                >
                  Selecionar Colunas
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="scrollbar-hide h-60 overflow-y-scroll">
                <>
                  <div className="mb-2 text-sm font-medium text-zinc-700">
                    Colunas Visíveis
                  </div>
                  {columns.map((column) => (
                    <label
                      key={column.key}
                      className={cn(
                        "flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-zinc-50",
                        (column.key === "select" || column.key === "ctrc") &&
                          "cursor-not-allowed opacity-50",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.has(column.key)}
                        onChange={() => handleColumnToggle(column.key)}
                        disabled={
                          column.key === "select" || column.key === "ctrc"
                        }
                        className="accent-primary h-4 w-4 rounded border border-zinc-200"
                      />
                      <span>{column.label || "Seleção"}</span>
                    </label>
                  ))}
                </>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <OrangeButton
          className="h-8"
          onClick={() => {
            if (selectedRows.size !== 0) {
              router.push(`/receivable/update-2/${id}`);
            } else {
              toast.error("Selecione ao menos uma linha");
            }
          }}
        >
          Continuar
          <ChevronRight />
        </OrangeButton>
      </div>
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="gap-1">
            {visibleColumnsArray.map((column) => (
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
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
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
                selectedRows.has(row.id) && "bg-primary/20",
              )}
            >
              <TableCell className="w-12 py-0.5">
                <input
                  type="checkbox"
                  checked={selectedRows.has(row.id)}
                  onChange={() => handleRowSelect(row.id)}
                  className="accent-primary h-4 w-4 rounded border border-zinc-200"
                />
              </TableCell>

              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                <div className="flex items-center gap-2">{row.ctrc}</div>
              </TableCell>

              {visibleColumns.has("document") && (
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
              )}

              {visibleColumns.has("status") && (
                <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                  <span className="mx-auto w-max rounded-md bg-amber-700/10 px-2 py-1 text-amber-700">
                    {row.status}
                  </span>
                </TableCell>
              )}

              {visibleColumns.has("operation") && (
                <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
                  <span className="mx-auto w-max rounded-md bg-green-500/10 px-2 py-1 text-green-500">
                    {row.operation}
                  </span>
                </TableCell>
              )}

              {visibleColumns.has("paying") && (
                <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                  <div className="flex flex-col">
                    {row.paying.cnpj}
                    <div className="flex items-center text-xs">
                      {row.paying.city} - {row.paying.state}
                    </div>
                  </div>
                </TableCell>
              )}

              {visibleColumns.has("receiving") && (
                <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                  <div className="flex flex-col">
                    {row.receiving.cnpj}
                    <div className="flex items-center text-xs">
                      {row.receiving.city} - {row.receiving.state}
                    </div>
                  </div>
                </TableCell>
              )}

              {visibleColumns.has("value") && (
                <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                  <div className="flex flex-col">
                    <span>{row.value}</span>
                    <span className="text-xs">{row.tax}</span>
                  </div>
                </TableCell>
              )}

              {visibleColumns.has("type") && (
                <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                  <div className="flex w-max flex-col text-start">
                    <span>{row.typeCode}</span>
                    <span className="text-xs">{row.type}</span>
                  </div>
                </TableCell>
              )}
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
