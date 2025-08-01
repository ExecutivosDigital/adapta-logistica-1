"use client";
import { Modal } from "@/components/ui/Modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import launchTypesRaw from "@/const/data.json";
import { cn } from "@/utils/cn";
import { Check, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Tipos                                                                     */
/* -------------------------------------------------------------------------- */
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
}

export interface Category extends LaunchType {
  id: string;
  type: "green" | "red";
  paid: number;
  received: number;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
export function parseLaunchTypes(): LaunchType[] {
  return launchTypesRaw.map((item: LaunchTypeRaw) => ({
    tipoLancamento: item["Tipo Lançamento"],
    descNivel4: item["Nivel 4 Desc"].split(" - ").slice(1).join(" - ").trim(),
    conta: item["Conta"],
    centroResultado: item["Centros de Resultado"],
  }));
}
export function randomCurrency(): number {
  return Math.round(Math.random() * 10_000_000 * 100) / 100;
}
export function useRandomisedCategories(): Category[] {
  return useMemo(() => {
    const launches = parseLaunchTypes();
    return launches.map((l, i) => ({
      ...l,
      id: `${l.conta}-${i}`,
      type: Math.random() < 0.5 ? "green" : "red",
      paid: randomCurrency(),
      received: randomCurrency(),
    }));
  }, []);
}

/* -------------------------------------------------------------------------- */
/*  Modal de seleção múltipla                                                 */
/* -------------------------------------------------------------------------- */
interface LaunchTypeModalProps {
  show: boolean;
  onClose: () => void;
  /**
   * Após o usuário confirmar, devolve a lista completa de lançamentos
   * selecionados (mantendo a mesma ordem de parseLaunchTypes).
   */
  onConfirm: (selected: LaunchType[]) => void;
  /** Seleções prévias vindas do componente pai */
  initiallySelected: LaunchType[];
}

export function LaunchTypeModal({
  show,
  onClose,
  onConfirm,
  initiallySelected,
}: LaunchTypeModalProps) {
  /* ----------------------------- estados ------------------------------ */
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // coleção total (imutável) ------------------------------------------------
  const launchTypes = useMemo(() => parseLaunchTypes(), []);

  // seleção local (controlada por props) ------------------------------------
  const [selected, setSelected] = useState<Set<string>>(
    new Set(initiallySelected.map((l) => l.conta)),
  );
  useEffect(() => {
    // sincroniza sempre que o componente pai atualizar
    setSelected(new Set(initiallySelected.map((l) => l.conta)));
  }, [initiallySelected]);

  const toggle = (item: LaunchType) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(item.conta)) {
        next.delete(item.conta);
      } else {
        next.add(item.conta);
      }
      return next;
    });
  };

  /* ----------------------------- filtros ------------------------------ */
  const filtered = useMemo(() => {
    if (!filter.trim()) return launchTypes;
    const t = filter.toLowerCase();
    return launchTypes.filter(
      (l) =>
        l.tipoLancamento.toLowerCase().includes(t) ||
        l.descNivel4.toLowerCase().includes(t) ||
        l.conta.toLowerCase().includes(t),
    );
  }, [filter, launchTypes]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);
  useEffect(() => setPage(1), [filter]);

  /* ----------------------------- actions ------------------------------ */
  const handleConfirm = () => {
    onConfirm(launchTypes.filter((l) => selected.has(l.conta)));
    onClose();
  };
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [show]);
  return (
    <Modal
      show={show}
      onHide={onClose}
      className="max-h-[90vh] max-w-[60vw] rounded-xl border-none bg-white p-0 shadow-none"
    >
      <div className="max-h-[90vh] max-w-[60vw] overflow-auto rounded-xl shadow-xl">
        {/* Header */}
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
        <div className="flex flex-row items-center gap-2 px-6 py-2">
          <label className="mb-2 block text-[#6C7386]">Selecione o Tipo:</label>
          <div className="bg-primary/20 border-primary relative flex flex-1 items-center rounded-md border px-2 py-1">
            <input
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

        {/* Chips de selecionados */}
        {selected.size > 0 && (
          <div className="flex max-h-20 flex-wrap gap-2 overflow-y-auto border-b border-zinc-200 p-2">
            {[...selected].map((conta) => {
              const launch = launchTypes.find((l) => l.conta === conta)!;
              return (
                <TooltipProvider key={launch.conta}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        key={conta}
                        onClick={() => toggle(launch)}
                        className="bg-primary/10 text-primary flex items-center gap-1 rounded-md px-1 py-1 text-sm"
                      >
                        <span className="line-clamp-1 max-w-40">
                          {launch.descNivel4}
                        </span>
                        <X size={14} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="text-primary border-primary flex items-center gap-2 rounded-md border bg-white font-bold"
                    >
                      {launch.descNivel4}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        )}

        {/* Lista paginada */}
        <ul className="min-h-[300px] space-y-2 px-6 py-2">
          {paginated.length === 0 && (
            <li className="flex justify-center py-10 text-zinc-500">
              Nenhum resultado encontrado
            </li>
          )}
          {paginated.map((item) => {
            const active = selected.has(item.conta);
            return (
              <li
                key={item.conta}
                onClick={() => toggle(item)}
                className={cn(
                  "hover:bg-primary/10 flex cursor-pointer items-center gap-8 rounded-lg border-b border-zinc-200 p-2 text-start transition-colors",
                  active && "bg-primary/20",
                )}
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-md border border-zinc-400">
                  {active && <Check size={16} />}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="line-clamp-2 w-60 flex-1 text-sm font-medium text-zinc-800">
                        {item.descNivel4}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="text-primary border-primary flex items-center gap-2 rounded-md border bg-white font-bold"
                    >
                      {item.descNivel4}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="line-clamp-2 w-60 flex-1 text-xs text-zinc-500">
                        {item.tipoLancamento}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="text-primary border-primary flex items-center gap-2 rounded-md border bg-white font-bold"
                    >
                      {item.tipoLancamento}
                    </TooltipContent>
                  </Tooltip>
                  <div className="border-primary bg-primary/20 text-primary w-28 rounded-md border px-3 py-1 text-sm font-semibold">
                    {item.conta}
                  </div>
                </TooltipProvider>
              </li>
            );
          })}
        </ul>

        {/* Paginação simples */}
        <div className="my-2 flex items-center justify-center gap-2 select-none">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              page === 1 ? "text-zinc-300" : "text-primary",
            )}
          >
            ←
          </button>
          <span className="text-sm">
            {page}/{pageCount}
          </span>
          <button
            disabled={page === pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              page === pageCount ? "text-zinc-300" : "text-primary",
            )}
          >
            →
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 border-t border-zinc-200 px-6 py-2">
          <button
            onClick={onClose}
            className="text-primary rounded-md border border-zinc-200 px-6 py-2 font-bold"
          >
            Cancelar
          </button>
          <button
            disabled={selected.size === 0}
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
