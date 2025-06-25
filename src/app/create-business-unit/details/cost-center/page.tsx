"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/utils/cn";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";
import { useState } from "react";

import { ChevronDown } from "lucide-react";
interface TechField {
  id: string;
  topic: string;
  type: string;
  value: string;
}
export default function BranchesList() {
  const [techFields, setTechFields] = useState<TechField[]>([
    { id: crypto.randomUUID(), topic: "", type: "", value: "" },
  ]);
  const addTechField = () =>
    setTechFields((prev) => [
      ...prev,
      { id: crypto.randomUUID(), topic: "", type: "", value: "" },
    ]);
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <div className="flex w-full flex-col rounded-t-lg border-b border-zinc-200 shadow-lg">
        <div>
          <h3 className="text-base font-semibold">
            Dados Técnicos da Unidade de Negócio
          </h3>
          <p className="text-sm text-zinc-500">
            Os dados servirão como apoio para a Unidade de Negócio
          </p>

          {/* cabeçalhos grid */}
          <div className="mt-4 mb-1 grid grid-cols-[repeat(3,1fr)_auto] gap-4 text-[13px] font-medium text-zinc-600">
            <span>Tópico</span>
            <span>Tipo</span>
            <span>Valor</span>
            <span className="sr-only" />
          </div>

          {techFields.map((field, idx) => (
            <div
              key={field.id}
              className="mb-4 grid grid-cols-[repeat(3,1fr)_auto] items-center gap-4"
            >
              {/* tópico */}
              <input
                value={field.topic}
                onChange={(e) =>
                  setTechFields((prev) =>
                    prev.map((f, i) =>
                      i === idx ? { ...f, topic: e.target.value } : f,
                    ),
                  )
                }
                placeholder="Nome do Tópico"
                className={`rounded-lg border px-3 py-2 text-sm placeholder:text-zinc-500 ${field.topic ? "border-primary" : "border-zinc-200"}`}
              />

              {/* tipo (Dropdown) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "relative flex w-full items-center gap-2 rounded-lg border px-3 py-3 text-sm transition",
                      "h-10 justify-between px-3 py-2",
                      field.type
                        ? "border-primary text-zinc-700"
                        : "border-zinc-200 text-zinc-500",
                    )}
                  >
                    {field.type || "Tipo"}
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuArrow />
                  {["Texto", "Número", "Percentual"].map((opt) => (
                    <DropdownMenuItem
                      key={opt}
                      className={`hover:bg-primary/20 w-full cursor-pointer rounded px-4 py-2 text-sm transition duration-300`}
                      onSelect={(e) => {
                        e.preventDefault();
                        setTechFields((prev) =>
                          prev.map((f, i) =>
                            i === idx ? { ...f, type: opt } : f,
                          ),
                        );
                      }}
                    >
                      {opt}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* valor */}
              <input
                value={field.value}
                onChange={(e) =>
                  setTechFields((prev) =>
                    prev.map((f, i) =>
                      i === idx ? { ...f, value: e.target.value } : f,
                    ),
                  )
                }
                placeholder="Ex.: 100L"
                className={`rounded-lg border px-3 py-2 text-sm placeholder:text-zinc-500 ${field.value ? "border-primary" : "border-zinc-200"}`}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addTechField}
            className="flex h-5 items-center gap-1 rounded-lg border border-zinc-300 p-4 px-3 text-[11px] font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            <Plus size={14} /> Adicionar novo campo
          </button>

          <div className="mt-6 h-px bg-zinc-200/60" />
        </div>
      </div>
      <div />
    </div>
  );
}
