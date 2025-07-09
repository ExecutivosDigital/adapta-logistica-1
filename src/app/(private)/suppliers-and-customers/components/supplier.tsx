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
import { EllipsisVertical, Search } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

/**
 * Tabela de fornecedor replicando o layout mostrado na imagem de referência.
 * - Colunas: Nome, CPF/CNPJ, Telefone, Categoria, Última Compra, Status, Ações
 * - Filtros: Todos | Ativos | Inativos
 * - Paginação: exemplo de 8 páginas apenas para fins ilustrativos
 */
export function SupplierTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tableType, setTableType] = useState<"all" | "active" | "inactive">(
    "all",
  );

  /** Cabeçalhos da tabela */
  const columns = [
    { key: "name", label: "NOME DO FORNECEDOR" },
    { key: "cpfCnpj", label: "CPF/CNPJ" },
    { key: "phone", label: "TELEFONE" },
    { key: "category", label: "CATEGORIA" },
    { key: "lastPurchase", label: "ÚLTIMA COMPRA" },
    { key: "status", label: "STATUS" },
    { key: "actions", label: "AÇÕES" },
  ] as const;

  /** Dados mockados para demonstração */
  const rows = useMemo(
    () => [
      {
        id: "1",
        name: "Nome do Fornecedor",
        cpfCnpj: "000.000.000-00",
        phone: "(00) 9 0000-0000",
        category: "Combustível",
        lastPurchase: moment("2024-03-25").format("DD/MM/YYYY"),
        status: "ATIVO",
      },
      {
        id: "2",
        name: "Nome do Fornecedor",
        cpfCnpj: "000.000.000-00",
        phone: "(00) 9 0000-0000",
        category: "Pneu",
        lastPurchase: moment("2024-03-25").format("DD/MM/YYYY"),
        status: "ATIVO",
      },
      {
        id: "3",
        name: "Nome do Fornecedor",
        cpfCnpj: "000.000.000-00",
        phone: "(00) 9 0000-0000",
        category: "Mat. Eletrônicos",
        lastPurchase: moment("2024-03-25").format("DD/MM/YYYY"),
        status: "ATIVO",
      },
      {
        id: "4",
        name: "Nome do Fornecedor",
        cpfCnpj: "00.000.000/0001-00",
        phone: "(00) 9 0000-0000",
        category: "Peças",
        lastPurchase: moment("2024-03-25").format("DD/MM/YYYY"),
        status: "ATIVO",
      },
      {
        id: "5",
        name: "Nome do Fornecedor",
        cpfCnpj: "00.000.000/0001-00",
        phone: "(00) 9 0000-0000",
        category: "Combustível",
        lastPurchase: moment("2024-03-25").format("DD/MM/YYYY"),
        status: "ATIVO",
      },
      {
        id: "6",
        name: "Nome do Fornecedor",
        cpfCnpj: "00.000.000/0001-00",
        phone: "(00) 9 0000-0000",
        category: "Pneu",
        lastPurchase: moment("2024-03-25").format("DD/MM/YYYY"),
        status: "DESATIVADO",
      },
      {
        id: "7",
        name: "Nome do Fornecedor",
        cpfCnpj: "000.000.000-00",
        phone: "(00) 9 0000-0000",
        category: "Pneu",
        lastPurchase: moment("2024-03-25").format("DD/MM/YYYY"),
        status: "DESATIVADO",
      },
      // ... rest of the rows ...
    ],
    [],
  );

  /** Filtra as linhas de acordo com o tipo selecionado */
  const filteredRows = useMemo(() => {
    if (tableType === "active") return rows.filter((r) => r.status === "ATIVO");
    if (tableType === "inactive")
      return rows.filter((r) => r.status === "DESATIVADO");
    return rows;
  }, [rows, tableType]);

  /** Estilização de status de acordo com o valor */
  const statusClasses: Record<string, string> = {
    ATIVO:
      "rounded-md border border-[#00A181] bg-[#00A181]/10 px-4 py-1 text-xs font-bold text-[#00A181]",
    DESATIVADO:
      "rounded-md border border-[#EF4444] bg-[#EF4444]/10 px-4 py-1 text-xs font-bold text-[#EF4444]",
  };

  /** Animação do seletor no controle de filtro */
  const getSelectorPosition = () => {
    switch (tableType) {
      case "all":
        return "translate-x-[5%]";
      case "active":
        return "translate-x-[110%]";
      case "inactive":
        return "translate-x-[215%]";
      default:
        return "translate-x-0";
    }
  };

  const baseBtnClass =
    "flex cursor-pointer items-center gap-2 rounded-md z-10 px-4 py-1 text-sm font-semibold transition-colors duration-300";
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (animate) return;
    setAnimate(true);
  }, [animate]);
  return (
    <div
      className={`-mt-10 flex flex-col border border-t-0 border-zinc-500 bg-white pt-8 transition-all duration-300 ${animate ? "opacity-100" : "opacity-0"}`}
    >
      {/* Cabeçalho */}
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-4 px-4">
        <h2 className="text-primary text-lg font-semibold">Fornecedor</h2>

        {/* Campo de busca */}
        <div className="border-primary bg-primary/10 flex w-full max-w-md items-center overflow-hidden rounded-lg border">
          <input
            className="flex-1 px-3 py-2 text-sm outline-none"
            placeholder="Escreva o Nome do Cliente"
          />
          <button className="bg-primary flex h-10 w-10 items-center justify-center text-white">
            <Search size={18} />
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-primary/20 relative flex items-center rounded-md p-1">
          {/* barra animada */}
          <span
            className={cn(
              "bg-primary absolute top-1 left-0 h-[80%] w-[30%] rounded-md transition-transform duration-300 ease-in-out",
              getSelectorPosition(),
            )}
          />
          <button
            onClick={() => setTableType("all")}
            className={cn(baseBtnClass, {
              "text-white": tableType === "all",
              "text-white/80": tableType !== "all",
            })}
          >
            TODOS
          </button>
          <button
            onClick={() => setTableType("active")}
            className={cn(baseBtnClass, {
              "text-white": tableType === "active",
              "text-white/80": tableType !== "active",
            })}
          >
            ATIVOS
          </button>
          <button
            onClick={() => setTableType("inactive")}
            className={cn(baseBtnClass, {
              "text-white": tableType === "inactive",
              "text-white/80": tableType !== "inactive",
            })}
          >
            INATIVOS
          </button>
        </div>
      </div>

      {/* Tabela */}
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="bg-[#D8672F]">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className="px-4 py-3 text-xs font-bold tracking-wide whitespace-nowrap text-white uppercase"
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow
              key={row.id}
              className="hover:bg-primary/10 h-14 cursor-pointer border-b border-zinc-200"
            >
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row.name}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row.cpfCnpj}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row.phone}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row.category}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row.lastPurchase}
              </TableCell>
              <TableCell className="px-4 whitespace-nowrap">
                <span className={statusClasses[row.status] || ""}>
                  {row.status}
                </span>
              </TableCell>
              <TableCell className="px-4 text-end whitespace-nowrap text-zinc-400">
                <EllipsisVertical size={18} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginação */}
      <div className="border-t border-zinc-200 p-2">
        <CustomPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={8} // exemplo fixo
        />
      </div>
    </div>
  );
}
