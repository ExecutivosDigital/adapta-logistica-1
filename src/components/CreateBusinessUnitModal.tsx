// components/CreateBusinessUnitModal.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateBusinessUnit } from "@/context/CreateBusinessUnitContext";
import { useLoadingContext } from "@/context/LoadingContext";
import * as Dialog from "@radix-ui/react-dialog";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { ArrowRight, Check, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { OrangeButton } from "./OrangeButton";

export function CreateBusinessUnitModal() {
  const { handleNavigation } = useLoadingContext();
  const { isOpenCreateBusinessUnitModal, closeCreateBusinessUnitModal } =
    useCreateBusinessUnit();

  // estado local – Radix RadioGroup ficaria melhor, mas mantive simples
  const [unitType, setUnitType] = useState<"receita" | "despesa" | "ambos">(
    "receita",
  );

  const [confirmedName, setConfirmedName] = useState("");
  const [name, setName] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Dialog.Root
      open={isOpenCreateBusinessUnitModal}
      onOpenChange={(open) => !open && closeCreateBusinessUnitModal()}
    >
      <Dialog.Portal>
        {/* overlay escurecendo o fundo */}
        <Dialog.Overlay className="data-[state=open]:animate-fade-in fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />

        {/* conteúdo da modal */}
        <Dialog.Content className="data-[state=open]:animate-scale-in fixed top-1/2 left-1/2 z-50 w-[560px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="sr-only">
            Criação da Unidade de Negócio
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-zinc-400 transition hover:text-zinc-600">
              <X size={18} />
            </button>
          </Dialog.Close>

          {/* cabeçalho */}
          <header className="mb-6 space-y-1">
            <h2 className="text-base font-semibold">
              Criação da Unidade de Negócio
            </h2>
            <p className="text-sm text-zinc-500">
              Em criação da Unidade de Negócios desta filial
            </p>
          </header>

          {/* FORM ---------------------------------------------------- */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              /* chamar API / next step */
            }}
            className="flex flex-col gap-4"
          >
            {/* Tipo da unidade ------------------------------------- */}
            <fieldset>
              <legend className="mb-2 text-lg font-medium">
                Tipo da Unidade de Negócio
              </legend>
              <div className="flex gap-8">
                {[
                  { label: "Receita", value: "receita" },
                  { label: "Despesa", value: "despesa" },
                  { label: "Ambos", value: "ambos" },
                ].map(({ label, value }) => (
                  <label
                    key={value}
                    className={clsx(
                      "relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border px-2 py-3 font-medium transition",
                      unitType === value
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50",
                    )}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${unitType !== value ? "border-zinc-600" : "bg-primary bg-primary"}`}
                    >
                      {unitType === value && <Check color="white" />}
                    </div>
                    <input
                      type="radio"
                      name="unitType"
                      value={value}
                      className="sr-only"
                      checked={unitType === value}
                      onChange={() =>
                        setUnitType(value as "receita" | "despesa" | "ambos")
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex w-full items-end justify-between gap-4">
              <fieldset className="flex-1 space-y-2">
                <legend className="text-lg font-medium">
                  Nome da Unidade de Negócio
                </legend>
                <label
                  className="flex items-center gap-1 rounded-md border border-zinc-200 px-1"
                  htmlFor="name"
                >
                  <Image
                    src="/icons/fingerPrint.svg"
                    alt=""
                    width={250}
                    height={250}
                    className="h-5 w-4 object-contain"
                  />
                  <input
                    id="name"
                    ref={inputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Insira o nome"
                    className="w-full flex-1 px-3 py-2 outline-none placeholder:text-zinc-600 focus:border-orange-500"
                  />

                  {name && confirmedName !== name && (
                    <OrangeButton
                      type="button"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setConfirmedName(name);
                        inputRef.current?.blur();
                      }}
                      className="px-1 py-0 text-xs"
                    >
                      Salvar
                    </OrangeButton>
                  )}
                </label>
              </fieldset>

              {/* Cidade + Estado -------------------------------------- */}
              <label
                className="flex w-48 items-center gap-1 rounded-md border border-zinc-200 px-1"
                htmlFor="city"
              >
                <Image
                  src="/icons/city.png"
                  alt=""
                  width={250}
                  height={250}
                  className="h-5 w-5 object-contain"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      id="city"
                      className="flex-1 px-3 py-2 outline-none placeholder:text-zinc-600 focus:border-orange-500"
                    >
                      Cidade . Estado
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuArrow />
                    <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                      Sinop - MT
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                      Curitiba - PR
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </label>
            </div>
            <p className="-mt-2 text-xs text-zinc-400">
              Exemplo: Comercial, Logística, Estoque e etc
            </p>

            {/* FOOTER ---------------------------------------------- */}
            <div className="flex items-center justify-end gap-6 border-t border-t-zinc-400/50 pt-6">
              <button
                type="button"
                onClick={() => closeCreateBusinessUnitModal()}
                className="rounded-md border border-zinc-200 px-4 py-2 font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Salvar rascunho
              </button>

              <OrangeButton
                type="submit"
                onClick={() => handleNavigation("/create-business-unit")}
                disabled={confirmedName === "" || confirmedName !== name}
                iconPosition="right"
                icon={<ArrowRight size={16} />}
              >
                Continuar
              </OrangeButton>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
