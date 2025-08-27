/* app/(dashboard)/create-business-unit/page.tsx */
"use client";

import { OrangeButton } from "@/components/OrangeButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoadingContext } from "@/context/LoadingContext";
import { cn } from "@/utils/cn";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/* types */

interface TechField {
  id: string;
  topic: string;
  type: string;
  value: string;
}

interface MemberField {
  id: string;
  name: string;
  access: string;
  confirmed: boolean;
}

/* ------------------------------------------------------------------ */
/* component */

export default function CreateBusinessUnitPage() {
  const { handleNavigation } = useLoadingContext();
  const router = useRouter();

  /* ------------------------------ state ------------------------------ */
  const [unitName, setUnitName] = useState("");
  const [city, setCity] = useState("");

  const [techFields, setTechFields] = useState<TechField[]>([
    { id: "", topic: "", type: "", value: "" },
  ]);

  const [members, setMembers] = useState<MemberField[]>([
    { id: "", name: "", access: "", confirmed: false },
  ]);

  /* ------------------------------ helpers ---------------------------- */
  const addTechField = () =>
    setTechFields((prev) => [
      ...prev,
      { id: "", topic: "", type: "", value: "" },
    ]);

  const addMember = () =>
    setMembers((prev) => [
      ...prev,
      { id: "", name: "", access: "", confirmed: false },
    ]);

  /* ------------------------------ dropdown util ---------------------- */
  const buttonBase =
    "relative flex w-full items-center gap-2 rounded-lg border  px-3 py-3 text-sm transition";

  const dropdownItem =
    "cursor-pointer rounded px-4 py-2 w-full text-sm transition duration-300 hover:bg-primary/20";

  /* ------------------------------------------------------------------ */
  /* render */

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* HEADER -------------------------------------------------------- */}
      <header className="relative flex items-center justify-center border-b border-orange-200 px-8 py-4">
        <Image
          src="/logo/logoFull.png"
          alt="Adapta"
          width={140}
          height={24}
          className="h-16 w-auto"
          priority
        />

        <button
          onClick={() => router.back()}
          className="absolute top-4 right-8 flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Encerrar
          <X size={16} />
        </button>
      </header>

      {/* BODY ---------------------------------------------------------- */}
      <main className="flex flex-1 overflow-y-auto">
        {/* COLUNA ESQUERDA -------------------------------------------- */}
        <section className="flex-1 px-12 py-10">
          <h2 className="mb-6 text-xl font-semibold">
            Criação da Unidade de Negócio
          </h2>

          {/* rótulos Nome / Empresa */}
          <div className="grid grid-cols-2 gap-4 text-[13px] font-medium text-zinc-600">
            <span>Nome da Unidade de Negócio</span>
            <span>Empresa a ser criada</span>
          </div>

          {/* inputs Nome + Cidade */}
          <div className="mt-1 grid grid-cols-2 gap-4">
            {/* Nome */}
            <label className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-3">
              <Image
                src="/icons/fingerPrint.svg"
                alt=""
                width={18}
                height={18}
              />
              <input
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="Mecânica"
                className="w-full flex-1 text-sm outline-none placeholder:text-zinc-500"
              />
            </label>

            {/* Cidade (Dropdown) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={clsx(buttonBase, "text-zinc-700")}
                >
                  {city ? city : "Cidade • Estado"}
                  <ChevronDown size={16} className="ml-auto opacity-60" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48">
                <DropdownMenuArrow />
                {["Sinop - MT", "Curitiba - PR"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    className={dropdownItem}
                    onSelect={(e) => {
                      e.preventDefault();
                      setCity(option);
                    }}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* linha divisória */}
          <div className="my-6 h-px bg-zinc-200/60" />

          {/* DADOS TÉCNICOS ------------------------------------------ */}
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
                        buttonBase,
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
                        className={dropdownItem}
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
        </section>

        {/* DIVISOR vertical */}
        <div className="w-px bg-orange-200" />

        {/* COLUNA DIREITA ------------------------------------------- */}
        <section className="flex-1 px-12 py-10">
          <h2 className="text-xl font-semibold">
            Adicione os Participantes da Unidade de Negócio
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Os dados servirão como apoio para a Unidade de Negócio
          </p>

          <div className="my-4 h-px bg-zinc-200/60" />

          <div className="mb-1 grid grid-cols-[1fr_1fr_auto] gap-4 text-[13px] font-medium text-zinc-600">
            <span>Participante</span>
            <span>Nível de Acesso</span>
            <span className="sr-only" />
          </div>

          {members.map((m, idx) => (
            <div
              key={m.id}
              className="mb-4 grid grid-cols-[1fr_1fr_auto] items-center gap-4"
            >
              {/* participante */}
              <input
                value={m.name}
                onChange={(e) =>
                  setMembers((prev) =>
                    prev.map((p, i) =>
                      i === idx ? { ...p, name: e.target.value } : p,
                    ),
                  )
                }
                placeholder="Escreva o nome do Membro"
                className={`rounded-lg border px-3 py-2 text-sm placeholder:text-zinc-500 ${m.name ? "border-primary" : "border-zinc-200"}`}
              />

              {/* nível de acesso (Dropdown) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={clsx(
                      buttonBase,
                      "h-10 justify-between px-3 py-2",
                      m.access ? "border-primary" : "border-zinc-200",
                      m.access ? "text-zinc-700" : "text-zinc-500",
                    )}
                  >
                    {m.access || "Selecione"}
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex w-full flex-col">
                  <DropdownMenuArrow />
                  {["Visualizar", "Editar", "Administrador"].map((opt) => (
                    <DropdownMenuItem
                      key={opt}
                      className={`hover:bg-primary/20 w-full cursor-pointer rounded px-4 py-2 text-sm transition duration-300`}
                      onSelect={(e) => {
                        e.preventDefault();
                        setMembers((prev) =>
                          prev.map((p, i) =>
                            i === idx ? { ...p, access: opt } : p,
                          ),
                        );
                      }}
                    >
                      {opt}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* confirmar */}
              <button
                type="button"
                onClick={() =>
                  setMembers((prev) =>
                    prev.map((p, i) =>
                      i === idx ? { ...p, confirmed: !p.confirmed } : p,
                    ),
                  )
                }
                className={clsx(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition",
                  m.confirmed
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-orange-500 text-white hover:bg-orange-600",
                )}
              >
                <Check size={18} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            className="flex h-5 items-center gap-1 rounded-lg border border-zinc-300 p-4 px-3 text-[11px] font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            <Plus size={14} /> Adicionar novo membro
          </button>

          <div className="mt-6 h-px bg-zinc-200/60" />
        </section>
      </main>

      {/* FOOTER -------------------------------------------------------- */}
      <footer className="flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
        <button
          onClick={() => router.back()}
          className="h-9 w-max rounded-lg border border-zinc-300 px-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Salvar rascunho
        </button>

        <OrangeButton
          className="h-9 w-[132px]"
          onClick={() => handleNavigation("/create-business-unit/details")}
          icon={<ChevronDown size={16} className="-rotate-90" />}
          iconPosition="right"
        >
          Continuar
        </OrangeButton>
      </footer>
    </div>
  );
}
