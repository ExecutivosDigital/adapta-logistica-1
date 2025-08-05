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
import { Carrier } from "@/mock/carriers";
import { EllipsisVertical, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import carriersData from "../../../../../../public/files/carriers.json";
/**
 * Componente de tabela para Transportadoras.
 * Colunas: Fornecedor, CNPJ, Telefone, Transportador Tipo, RNTRV, Ações
 */
export function CarrierTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  const Carriers: Carrier[] = carriersData as Carrier[];

  const columns = [
    { key: "Fornecedor", label: "FORNECEDOR" },
    { key: "CNPJ Fornecedor", label: "CNPJ" },
    { key: "Fornecedor Telefone", label: "TELEFONE" },
    { key: "Transportador Tipo", label: "TIPO" },
    { key: "RNTRV", label: "RNTRV" },
    { key: "actions", label: "AÇÕES" },
  ] as const;

  const filteredRows = useMemo(() => {
    return Carriers.filter((carrier: Carrier) =>
      carrier.Fornecedor.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, Carriers]);

  useEffect(() => {
    if (!animate) setAnimate(true);
  }, [animate]);

  const pageSize = 10;
  const pagedRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const formatCNPJ = (cnpj: number | string) =>
    cnpj
      .toString()
      .padStart(14, "0")
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

  const formatPhone = (phone: number) => {
    const s = phone.toString();
    return s.length === 10
      ? s.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
      : s.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  return (
    <div
      className={`-mt-10 flex flex-col border border-t-0 border-zinc-500 bg-white pt-8 transition-all duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Cabeçalho e busca */}
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-4 px-4">
        <h2 className="text-primary text-lg font-semibold">Transportadoras</h2>
        <div className="border-primary bg-primary/10 flex w-full max-w-md items-center overflow-hidden rounded-lg border">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 px-3 py-2 text-sm outline-none"
            placeholder="Filtrar por fornecedor"
          />
          <button className="bg-primary flex h-10 w-10 items-center justify-center text-white">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Tabela */}
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="bg-[#D8672F]">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className="px-4 py-3 text-xs font-bold tracking-wide whitespace-nowrap text-white uppercase"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedRows.map((row, idx) => (
            <TableRow
              key={idx}
              className="hover:bg-primary/10 h-14 cursor-pointer border-b border-zinc-200"
            >
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row.Fornecedor}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {formatCNPJ(row["CNPJ Fornecedor"])}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row["Fornecedor Telefone"]
                  ? formatPhone(row["Fornecedor Telefone"])
                  : "-"}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row["Transportador Tipo"]}
              </TableCell>
              <TableCell className="px-4 text-sm font-medium whitespace-nowrap">
                {row.RNTRV}
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
          pages={Math.ceil(filteredRows.length / pageSize)}
        />
      </div>
    </div>
  );
}
