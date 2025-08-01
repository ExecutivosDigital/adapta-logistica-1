"use client";
import { Modal } from "@/components/ui/Modal";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import launchTypesRaw from "../data.json";

/* --------------------------------------------------------------
 * Types ---------------------------------------------------------*/
export interface LaunchType {
  tipoLancamento: string;
  descNivel4: string;
  conta: string;
  centroResultado: string;
}
interface LaunchTypeRaw {
  "Tipo Lançamento": string;
  "Centros de Resultado": string;
  Conta: string;
  "Nivel 4 Desc": string;
  // Add other properties as needed
}
export interface LaunchTypeModalProps {
  show: boolean;
  showingTaxes?: boolean;
  onClose: () => void;

  onSelect: (launch: LaunchType) => void;
  selectCostCenter?: (launch: LaunchType) => void;
  itemsPerPage?: number;
}

/* --------------------------------------------------------------
 * Pré-processa o JSON apenas uma vez ---------------------------*/

/* --------------------------------------------------------------
 * Componente ----------------------------------------------------*/
export default function LaunchTypeModal({
  show,
  onClose,
  onSelect,
  itemsPerPage = 6,
  selectCostCenter,
  showingTaxes,
}: LaunchTypeModalProps) {
  /* ---------------------- state -----------------------------*/
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<LaunchType | null>(null);
  console.log("showingTaxes", showingTaxes);
  const parsedLaunchTypes = useMemo(() => {
    return launchTypesRaw
      .filter((item) => {
        const tipo = item["Tipo Lançamento"]?.toLowerCase() || "";
        if (showingTaxes) {
          return tipo.includes("imposto");
        } else {
          return !tipo.includes("imposto");
        }
      })
      .map((item: LaunchTypeRaw) => ({
        tipoLancamento: item["Tipo Lançamento"],
        descNivel4:
          item["Nivel 4 Desc"]?.split(" - ").slice(1).join(" - ").trim() || "",
        conta: item["Conta"],
        centroResultado: item["Centros de Resultado"],
      }));
  }, [showingTaxes]);
  /* ---------------------- memo ------------------------------*/
  const filtered = useMemo(() => {
    if (!filter.trim()) return parsedLaunchTypes;
    const t = filter.toLowerCase();
    return parsedLaunchTypes.filter(
      (l) =>
        l.tipoLancamento.toLowerCase().includes(t) ||
        l.descNivel4.toLowerCase().includes(t) ||
        l.conta.toLowerCase().includes(t),
    );
  }, [filter, parsedLaunchTypes]);
  console.log("onselect", selected);
  const pageCount = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const pages = useMemo(() => {
    const maxButtons = 5;
    if (pageCount <= maxButtons)
      return [...Array(pageCount)].map((_, i) => i + 1);
    const half = Math.floor(maxButtons / 2);
    let from = Math.max(1, page - half);
    const to = Math.min(pageCount, from + maxButtons - 1);
    if (to - from < maxButtons - 1) from = Math.max(1, to - maxButtons + 1);
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  }, [pageCount, page]);

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page, itemsPerPage]);

  /* ---------------------- effects ---------------------------*/
  useEffect(() => setPage(1), [filter]);

  /* ---------------------- handlers --------------------------*/
  function handleConfirm() {
    if (!selected) return;
    if (selectCostCenter) {
      selectCostCenter(selected);
    }
    onSelect(selected);
  }

  /* ---------------------- UI --------------------------------*/
  return (
    <Modal
      show={show}
      onHide={onClose}
      className="w-[720px] border-none bg-transparent shadow-none"
    >
      <div className="scrollbar-hide w-[720px] overflow-scroll rounded-xl bg-white shadow-xl">
        {/* Cabeçalho */}
        <div className="bg-primary flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Tipo de lançamento
          </h2>
          <button
            onClick={onClose}
            className="text-primary flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl"
          >
            <X />
          </button>
        </div>

        {/* Campo de busca */}
        <div className="flex flex-row items-center gap-2 px-6 py-4">
          <label className="mb-2 block text-xl text-[#6C7386]">
            Selecione o Tipo:
          </label>
          <div className="bg-primary/20 border-primary relative flex flex-1 items-center rounded-md border px-4 py-2">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Digite o código ou descrição"
              className="w-full flex-1 px-2 text-sm outline-none"
            />
            <span className="text-primary">
              <Search size={18} />
            </span>
          </div>
        </div>

        {/* Lista */}
        <ul className="min-h-[300px] space-y-4 px-6">
          {paginated.length === 0 && (
            <li className="flex justify-center py-10 text-zinc-500">
              Nenhum resultado encontrado
            </li>
          )}
          {paginated.map((item, i) => (
            <li
              key={`${item.conta}-${i}`}
              onClick={() => setSelected(item)}
              className={`hover:bg-primary/10 flex cursor-pointer items-center gap-8 rounded-lg border-b border-zinc-200 p-2 transition-colors ${
                selected?.conta === item.conta ? "bg-primary/20" : ""
              }`}
            >
              <div className="flex-1 text-sm">
                <span className="block text-start font-medium text-zinc-800">
                  {item.descNivel4}
                </span>
              </div>
              <div className="flex-1 text-start text-xs text-zinc-500">
                {item.tipoLancamento}
              </div>
              <div className="border-primary bg-primary/20 text-primary rounded-md border px-3 py-1 text-sm font-semibold">
                {item.conta}
              </div>
            </li>
          ))}
        </ul>

        {/* Paginação */}
        <div className="my-6 flex items-center justify-center gap-2 text-sm select-none">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`flex h-6 w-6 items-center justify-center rounded-full ${page === 1 ? "text-zinc-300" : "text-primary"}`}
          >
            ←
          </button>
          {pages.map((p) => (
            <button
              key={p}
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${p === page ? "bg-primary text-white" : "text-primary"}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            disabled={page === pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className={`flex h-6 w-6 items-center justify-center rounded-full ${page === pageCount ? "text-zinc-300" : "text-primary"}`}
          >
            →
          </button>
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-4 border-t border-zinc-200 px-6 py-4">
          <button
            onClick={onClose}
            className="text-primary rounded-md border border-zinc-200 px-6 py-2 font-bold"
          >
            Cancelar
          </button>
          <button
            disabled={!selected}
            onClick={handleConfirm}
            className="bg-primary rounded-md px-6 py-2 font-bold text-white disabled:opacity-50"
          >
            Selecionar →
          </button>
        </div>
      </div>
    </Modal>
  );
}
