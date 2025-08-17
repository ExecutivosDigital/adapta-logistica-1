"use client";
import { getLocalTimeZone } from "@internationalized/date";
import { EllipsisVertical, Filter, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DateValue } from "react-aria-components";

import {
  Category,
  LaunchType,
  LaunchTypeModal,
  useRandomisedCategories,
} from "./launch-type-modal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import { useValueContext } from "@/context/ValueContext";
import { cn } from "@/utils/cn";

export default function HomeCategoryList() {
  const randomisedCategories = useRandomisedCategories();
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  // Run once, but only in the browser
  useEffect(() => {
    setAllCategories(randomisedCategories); // ← may call Math.random()
  }, []);
  const [selected, setSelected] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  /* -------------------- sincroniza seleção -------------------*/
  const confirmSelection = (launches: LaunchType[]) => {
    const toAdd = launches
      .filter((l) => !selected.some((c) => c.conta === l.conta))
      .map((l) => allCategories.find((c) => c.conta === l.conta)!)
      .filter(Boolean);
    setSelected((prev) => [...prev, ...toAdd]);
  };
  const remove = (conta: string) =>
    setSelected((prev) => prev.filter((c) => c.conta !== conta));

  /* -------------------- data filter --------------------------*/
  const [date, setDate] = useState<Date | null>(new Date());
  const handleDateChange = (value: DateValue | null) => {
    if (!value) return setDate(null);
    if ("toDate" in value) setDate(value.toDate(getLocalTimeZone()));
    if (value !== null && value instanceof Date) setDate(value);
  };
  const listToDisplay = selected.length > 0 ? selected : allCategories;
  return (
    <>
      <LaunchTypeModal
        show={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmSelection}
        initiallySelected={selected}
      />

      <div className="flex flex-col">
        {/* Header */}
        <div className="flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
          <span className="text-sm font-semibold">Categorias</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 rounded-md border border-zinc-200 px-2 py-1 text-zinc-400"
            >
              <Filter />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-center rounded-md border border-zinc-200 p-1 text-zinc-400">
                  <EllipsisVertical />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end">
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer">
                  Exportar Relatório
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer">
                  Lorem Ipsum
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="rounded-md border border-zinc-200 px-2 py-1 text-zinc-400">
              <SimpleDatePicker
                value={date}
                label="Filtro"
                onChange={handleDateChange}
                view="day"
              />
            </div>
          </div>
        </div>

        {/* Chips */}
        {selected.length > 0 && (
          <div className="flex max-h-20 flex-wrap gap-2 overflow-y-auto border-b border-zinc-200 p-2">
            {selected.map((cat) => (
              <button
                key={cat.conta}
                onClick={() => remove(cat.conta)}
                className="bg-primary/10 text-primary flex items-center gap-1 rounded-full px-3 py-1 text-sm"
              >
                {cat.descNivel4}
                <X size={14} />
              </button>
            ))}
          </div>
        )}

        {/* Lista */}
        <div className="scrollbar-hide h-80 w-full overflow-y-scroll p-2">
          {listToDisplay.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card da categoria (pago / recebido)                                       */
/* -------------------------------------------------------------------------- */
function CategoryCard({ cat }: { cat: Category }) {
  const { viewAllValues } = useValueContext();
  return (
    <div className="relative my-1 flex w-full flex-col items-center justify-between gap-2 rounded-lg border border-zinc-200 p-3 shadow-sm">
      <div className="flex w-full items-center gap-2">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full p-1",
            cat.type === "green" ? "bg-[#00A181]/20" : "bg-[#EF4444]/20",
          )}
        >
          <Image
            src={
              cat.type === "green"
                ? "/icons/category-green.png"
                : "/icons/category-red.png"
            }
            alt=""
            width={100}
            height={100}
            className="h-max w-5 object-contain"
          />
        </div>
        <span className="text-sm font-medium text-zinc-700">
          {cat.descNivel4}
        </span>
      </div>
      <div className="flex w-full items-end justify-between text-xs">
        <span className="font-semibold text-[#00A181]">
          Recebido:{" "}
          {viewAllValues
            ? cat.received.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "********"}
        </span>
        <span className="font-semibold text-[#EF4444]">
          Pago:{" "}
          {viewAllValues
            ? cat.paid.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "********"}
        </span>
      </div>
    </div>
  );
}
