"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { Check, ChevronDown, CreditCard, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/* types */

interface TechField {
  id: string;
  topic: string;
  type: string;
  value: string;
}

export default function Home2() {
  /* ------------------------------ state ------------------------------ */
  const [unitName, setUnitName] = useState("");
  const [city, setCity] = useState("");

  const [techFields, setTechFields] = useState<TechField[]>([
    { id: crypto.randomUUID(), topic: "", type: "", value: "" },
  ]);

  /* ------------------------------ helpers ---------------------------- */

  /* ------------------------------ dropdown util ---------------------- */
  const buttonBase =
    "relative flex w-full items-center gap-2 rounded-lg border  px-3 py-3 text-sm transition";

  const dropdownItem =
    "cursor-pointer rounded px-4 py-2 w-full text-sm transition duration-300 hover:bg-primary/20";

  const banks = [
    { code: "001", name: "Banco do Brasil" },
    { code: "237", name: "Bradesco" },
    { code: "341", name: "Itaú" },
    { code: "033", name: "Santander" },
    // ...adicione outros conforme necessidade
  ];

  const currencies = [
    "BRL - Real",
    "USD - Dólar Americano",
    "EUR - Euro",
    // ...adicione outros conforme necessidade
  ];
  // =============================================
  const addTechField = () =>
    setTechFields((prev) => [
      ...prev,
      { id: crypto.randomUUID(), topic: "", type: "", value: "" },
    ]);
  const [formState, setFormState] = useState({
    bankName: "",
    accountType: "",
    bankCode: "",
    currency: "",
    accountNumber: "",
    branchNumber: "",
  });
  return (
    <div className="border-primary flex h-full w-full flex-col gap-2 overflow-hidden rounded-2xl border lg:gap-4">
      <div className="grid w-full flex-1 grid-cols-12 gap-8">
        <div className="col-span-7 flex w-full flex-col gap-8 p-4">
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
                <CreditCard color="#D96927" />
                <input
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  placeholder="Conta Corrente"
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
                    <Image
                      src="/icons/city.png"
                      alt=""
                      width={96}
                      height={96}
                      className="h-5 w-5 object-contain"
                    />
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

            <div className="space-y-6">
              <h3 className="text-base font-semibold">Dados Bancários:</h3>

              <div className="grid grid-cols-2 gap-6">
                {/* Nome do Banco */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700">
                    Nome do Banco
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          buttonBase,
                          "h-10 w-full justify-between px-3 py-2",
                          formState.bankName
                            ? "border-primary text-zinc-700"
                            : "border-zinc-200 text-zinc-500",
                        )}
                      >
                        {formState.bankName || "Selecione o banco"}
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuArrow />
                      {banks.map((b) => (
                        <DropdownMenuItem
                          key={b.code}
                          className={dropdownItem}
                          onSelect={(e) => {
                            e.preventDefault();
                            setFormState((s) => ({ ...s, bankName: b.name }));
                          }}
                        >
                          {b.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Tipo da Conta */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700">
                    Tipo da Conta
                  </label>
                  <input
                    type="text"
                    value={formState.accountType}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        accountType: e.target.value,
                      }))
                    }
                    placeholder="BRL - Real"
                    className={cn(
                      "w-full rounded-lg border px-3 py-2 text-sm placeholder:text-zinc-500",
                      formState.accountType
                        ? "border-primary"
                        : "border-zinc-200",
                    )}
                  />
                </div>

                {/* Código Bancário (COMPE) */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700">
                    Código Bancário (COMPE)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formState.bankCode}
                      onChange={(e) =>
                        setFormState((s) => ({
                          ...s,
                          bankCode: e.target.value,
                        }))
                      }
                      placeholder="Código"
                      className={cn(
                        "w-full rounded-lg border px-3 py-2 pr-10 text-sm placeholder:text-zinc-500",
                        formState.bankCode
                          ? "border-primary"
                          : "border-zinc-200",
                      )}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500"
                      onClick={() => {
                        /* implementar busca de código se precisar */
                      }}
                    >
                      <Search size={18} />
                    </button>
                  </div>
                </div>

                {/* Moeda */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700">
                    Moeda
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          buttonBase,
                          "h-10 w-full justify-between px-3 py-2",
                          formState.currency
                            ? "border-primary text-zinc-700"
                            : "border-zinc-200 text-zinc-500",
                        )}
                      >
                        {formState.currency || "Selecione a moeda"}
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuArrow />
                      {currencies.map((cur) => (
                        <DropdownMenuItem
                          key={cur}
                          className={dropdownItem}
                          onSelect={(e) => {
                            e.preventDefault();
                            setFormState((s) => ({ ...s, currency: cur }));
                          }}
                        >
                          {cur}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Número da Conta */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700">
                    Número da Conta
                  </label>
                  <input
                    type="text"
                    value={formState.accountNumber}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        accountNumber: e.target.value,
                      }))
                    }
                    placeholder="Número da Conta"
                    className={cn(
                      "w-full rounded-lg border px-3 py-2 text-sm placeholder:text-zinc-500",
                      formState.accountNumber
                        ? "border-primary"
                        : "border-zinc-200",
                    )}
                  />
                </div>

                {/* Número da Agência */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700">
                    Número da Agência
                  </label>
                  <input
                    type="text"
                    value={formState.branchNumber}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        branchNumber: e.target.value,
                      }))
                    }
                    placeholder="Número da Agência"
                    className={cn(
                      "w-full rounded-lg border px-3 py-2 text-sm placeholder:text-zinc-500",
                      formState.branchNumber
                        ? "border-primary"
                        : "border-zinc-200",
                    )}
                  />
                </div>
              </div>
            </div>
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
                <span>Usuátio</span>
                <span>Permissões</span>
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
                    placeholder="Selecione o Usuário"
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
                        {field.type || "Selecione"}
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuArrow />
                      {["ADM", "Comum", "Desenvolvedor"].map((opt) => (
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
                  <button
                    className={`bg-primary flex h-8 w-8 items-center justify-center rounded-lg p-1 text-white`}
                  >
                    <Check />
                  </button>
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
        </div>
        <div className="bg-primary col-span-5 flex h-full w-full flex-col items-center justify-center gap-8">
          <div className="relative flex">
            <Image
              src="/card.png"
              alt="bank"
              width={500}
              height={500}
              className="h-auto w-80 object-contain"
            />
          </div>
          <div className="flex flex-col rounded-lg bg-white">
            <div className="flex w-80 flex-row items-center justify-between gap-2 border-b border-zinc-400 p-4">
              <div className="flex-1">Saldo Atual</div>
              <div className="flex w-40 items-center gap-2 self-end rounded-2xl border border-zinc-400 p-2">
                <span className="text-sm">R$</span>
                <input placeholder="Inserir"></input>
              </div>
            </div>
            <div className="flex w-80 flex-row items-center justify-between gap-2 border-zinc-400 p-4">
              <div className="flex-1">Investimentos</div>
              <div className="flex w-40 items-center gap-2 self-end rounded-2xl border border-zinc-400 p-2">
                <span className="text-sm">R$</span>
                <input placeholder="Inserir"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
