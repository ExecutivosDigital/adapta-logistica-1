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
import { ActiveClients } from "@/mock/active-clients";
import { InactiveClients } from "@/mock/inactive-clients";
import { cn } from "@/utils/cn";
import { EllipsisVertical, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
type ClientWithActive = ActiveClients & { active: boolean };
export function ClientsTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const [tableType, setTableType] = useState<"all" | "active" | "inactive">(
    "all",
  );

  /** Cabeçalhos da tabela */
  const columns = [
    { key: "name", label: "NOME DO CLIENTE" },
    { key: "cpfCnpj", label: "CPF/CNPJ" },
    { key: "phone", label: "TELEFONE" },
    { key: "category", label: "CATEGORIA" },
    { key: "status", label: "STATUS" },
    { key: "actions", label: "AÇÕES" },
  ] as const;

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
  const [filter, setFilter] = useState("");
  const [rowsPerPage] = useState<number>(10);
  const clients =
    tableType === "all"
      ? [...ActiveClients, ...InactiveClients].map((client) => ({
          ...client,
          active: client["Cliente Pagador"] === "Sim",
        }))
      : tableType === "active"
        ? ActiveClients.map((client) => ({
            ...client,
            active: true,
          }))
        : InactiveClients.map((client) => ({
            ...client,
            active: false,
          }));
  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client["Cliente Pagador"]
        .toString()
        .toLowerCase()
        .includes(filter.toLowerCase()),
    );
  }, [filter, clients, tableType]);

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredClients.slice(startIndex, endIndex);
  }, [filteredClients, currentPage, rowsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredClients.length / rowsPerPage);
  }, [filteredClients, rowsPerPage]);

  return (
    <div
      className={`relative -mt-10 flex flex-col border border-t-0 border-zinc-500 bg-white pt-8 transition-all duration-300 ${animate ? "opacity-100" : "opacity-0"}`}
    >
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-4 px-4">
        <h2 className="text-primary text-lg font-semibold">Clientes</h2>

        <div className="border-primary bg-primary/10 flex w-full max-w-md items-center overflow-hidden rounded-lg border">
          <input
            className="flex-1 px-3 py-2 text-sm outline-none"
            placeholder="Escreva o Nome do Cliente"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className="bg-primary flex h-10 w-10 items-center justify-center text-white">
            <Search size={18} />
          </button>
        </div>

        <div className="bg-primary/20 relative flex items-center rounded-md p-1">
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
          {paginatedClients.map((row: ClientWithActive, index) => (
            <TableRow
              onClick={() =>
                router.push(`/suppliers-and-customers/${row["CNPJ Pagador"]}`)
              }
              key={index}
              className="hover:bg-primary/10 h-14 cursor-pointer border-b border-zinc-200"
            >
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row["Cliente Pagador"]}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row["CNPJ Pagador"]}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row.NRTELEFONE}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row.DSCATEGCLIENTE}
              </TableCell>
              {/* <TableCell className="px-4 text-sm font-medium whitespace-nowrap"> 
                25/03/2025
              </TableCell> */}
              <TableCell className="flex px-4 whitespace-nowrap">
                <span
                  className={
                    row.active
                      ? "w-28 rounded-md border border-[#00A181] bg-[#00A181]/10 px-4 py-1 text-center text-xs font-bold text-[#00A181]"
                      : "w-28 rounded-md border border-[#EF4444] bg-[#EF4444]/10 px-4 py-1 text-center text-xs font-bold text-[#EF4444]"
                  }
                >
                  {row.active ? "ATIVO" : "DESATIVADO"}
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
          pages={totalPages} // exemplo fixo
        />
      </div>
    </div>
  );
}
