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
import { cn } from "@/utils/cn";
import {
  ChevronDown,
  ChevronUp,
  CircleCheck,
  ClipboardList,
  Images,
} from "lucide-react";
import { useMemo, useState } from "react";
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

export default function NewReceivable() {
  const [transactionPages] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const steps = [
    { label: "Selecionar Pagador", value: "solicitacao" },
    { label: "Seleção de Documentos", value: "gestor" },
    { label: "Aprovação de Financeiro", value: "financeiro" },
    { label: "Confirmação da Compra", value: "confirmacao" },
    { label: "Pagamento Efetuado", value: "pagamento" },
    { label: "Todos", value: "all" }, // ⬅️ adicionado
  ];

  const columns = [
    { key: "ctrc" as SortableColumn, label: "CTRC", sortable: true },
    { key: "document" as SortableColumn, label: "Documento", sortable: true },
    { key: "status" as SortableColumn, label: "Status", sortable: true },
    { key: "operation" as SortableColumn, label: "Operação", sortable: true },
    { key: "paying" as SortableColumn, label: "CNPJ Pagador", sortable: false },
    {
      key: "receiving" as SortableColumn,
      label: "CNPJ Recebedor",
      sortable: false,
    },
    {
      key: "value" as SortableColumn,
      label: "Valor Documento",
      sortable: false,
    },
    { key: "type" as SortableColumn, label: "Tipo de Frota", sortable: false },
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
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-lg font-semibold lg:text-xl">
          Cadastro de Conta Á Receber
        </span>
        <OrangeButton className="flex items-center gap-2">
          <ClipboardList />
          CNPJ - Cliente Pagador
        </OrangeButton>
      </div>

      <Stepper
        steps={steps}
        current={1}
        onStepClick={() => {}}
        className="mb-4"
      />
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
                  {column.sortable && getSortIcon(column.key as SortableColumn)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.map((row, rowIndex) => (
            <TableRow
              key={`row-${rowIndex}`}
              className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
            >
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                <div className="flex items-center gap-2">{row.ctrc}</div>
              </TableCell>
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                <div className="flex items-center gap-4 text-center">
                  <div className="border-primary flex h-8 w-8 items-center justify-center rounded-full border p-0.5">
                    {row.document.file ? (
                      <CircleCheck className="text-green-500" />
                    ) : (
                      <Images className="text-red-500" />
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
                    {row.paying.city} - {""}
                    {row.paying.state}
                  </div>
                </div>
              </TableCell>
              <TableCell className="h-full py-0.5 text-start text-sm font-medium whitespace-nowrap">
                <div className="flex flex-col">
                  {row.receiving.cnpj}
                  <div className="flex items-center text-xs">
                    {row.receiving.city} - {""}
                    {row.receiving.state}
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
                <div className="flex flex-col">
                  <span>{row.typeCode}</span>
                  <span className="text-xs">{row.type}</span>
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
  );
}
