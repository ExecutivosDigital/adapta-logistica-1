import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";

import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, DollarSign, Edit, Plus, Search } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { DataType } from "./page";
interface TechField {
  id: string;
  number: number;
  type: string;
  date: string;
}
interface Props {
  data: DataType;
  setData: (value: DataType) => void;
}
export function Step3({ data, setData }: Props) {
  const [invoices, setInvoices] = useState<TechField[]>([
    { id: crypto.randomUUID(), number: 0, type: "", date: "" },
  ]);

  /* ------------------------------ helpers ---------------------------- */
  const addTechField = () =>
    setInvoices((prev) => [
      ...prev,
      { id: crypto.randomUUID(), number: 0, type: "", date: "" },
    ]);

  const buttonBase =
    "relative flex w-full items-center gap-2 rounded-lg border  px-3 py-3 text-sm transition";

  const collaborators = [
    "Giovanni",
    "Alex Marin",
    "Paulo Yure",
    "Matheus Arceno",
    "Jair - Só Chamada Urgente*",
    "Nome X",
    "Nome Y",
    "Nome Z",
  ];
  const [filteredResponsible, setFilteredResponsible] = useState("");
  const [valor, setValor] = useState(invoices[0].number); // centavos!
  const [amount, setAmount] = useState(data.amount);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // 1. só dígitos
    const digits = e.target.value.replace(/\D/g, "");
    // 2. se nada digitado, fica 0
    const cents = digits === "" ? 0 : parseInt(digits, 10);
    setValor(cents);
  }
  function handleChangeAmount(e: React.ChangeEvent<HTMLInputElement>) {
    // 1. só dígitos
    const digits = e.target.value.replace(/\D/g, "");
    // 2. se nada digitado, fica 0
    const cents = digits === "" ? 0 : parseInt(digits, 10);
    setAmount(cents);
    setData({ ...data, amount: cents });
  }
  const formatBRL = (valueInCents: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valueInCents / 100);
  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Valor no Documento</span>
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <div className="flex h-full w-6">
              <DollarSign size={16} className="text-primary" />
            </div>
            <div className="flex h-full flex-1 items-center text-center">
              <span className="font-semi-bold flex-1 text-xl">
                <input
                  value={formatBRL(amount)}
                  onChange={handleChangeAmount}
                  placeholder="R$ 0,00"
                  className="flex-1 bg-transparent text-center text-lg text-zinc-700 outline-none"
                />
              </span>
            </div>
            <div className="flex h-full w-6"></div>
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Aprovação</span>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <DollarSign size={16} className="text-primary" />
                </div>
                <div className="flex h-full flex-1 items-center">
                  <span className="flex-1 text-lg">
                    {data.approval ? data.approval : "Selecione"}
                  </span>
                </div>
                <div className="flex h-full w-6 justify-end">
                  <Edit size={16} className="text-primary" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              sideOffset={0}
              align="start"
              className="z-[999] w-72 border-zinc-200"
            >
              <div className="border-primary text-primary mx-auto flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2 text-sm">
                <input
                  value={filteredResponsible}
                  onChange={(e) => setFilteredResponsible(e.target.value)}
                  placeholder="Pesquisar Conta / Cartão"
                  className="flex-1 focus:outline-none"
                />
                <Search size={14} />
              </div>

              <div className="grid grid-cols-1 gap-2">
                {collaborators
                  .filter((c) =>
                    c.toLowerCase().includes(filteredResponsible.toLowerCase()),
                  )
                  .map((c) => (
                    <DropdownMenuItem
                      key={c}
                      onClick={() => setData({ ...data, approval: c })}
                      className="hover:bg-primary/20 cursor-pointer transition duration-300"
                    >
                      <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                        {c}
                        {data.approval + " - " + data.approval === c && (
                          <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                {collaborators.filter((c) =>
                  c.toLowerCase().includes(filteredResponsible.toLowerCase()),
                ).length === 0 && (
                  <div className="p-2 text-center text-sm text-zinc-600">
                    Nenhum item encontrado
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </label>
        <div className="col-span-2 my-4 h-px bg-zinc-200/60" />
      </div>
      <div>
        <h3 className="mb-4 text-base font-semibold">Detalhes do Pagamento</h3>

        {/* cabeçalhos grid */}

        {invoices.map((field, idx) => (
          <div
            key={field.id}
            className="mb-4 grid grid-cols-[repeat(3,1fr)_auto] items-center gap-4"
          >
            <div className="flex flex-col text-[13px] font-medium text-zinc-600">
              <span className="">{idx + 1} - Pagamento</span>
              <input
                value={formatBRL(valor)}
                onChange={handleChange}
                placeholder="R$ 0,00"
                className={`rounded-lg border px-3 py-2 text-sm placeholder:text-zinc-500 ${field.number ? "border-primary" : "border-zinc-200"}`}
              />
            </div>

            {/* tipo (Dropdown) */}
            <div className="flex flex-col text-[13px] font-medium text-zinc-600">
              <span className="">Forma</span>
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
                <DropdownMenuContent
                  side="bottom"
                  sideOffset={0}
                  className="z-[999] w-[var(--radix-dropdown-menu-trigger-width)] border-zinc-200"
                >
                  {["Pix", "Boleto", "Cartão"].map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onSelect={(e) => {
                        e.preventDefault();
                        setInvoices((prev) =>
                          prev.map((f, i) =>
                            i === idx ? { ...f, type: item } : f,
                          ),
                        );
                      }}
                      className="hover:bg-primary/20 cursor-pointer transition duration-300"
                    >
                      <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                        {item}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* valor */}
            <div className="flex flex-col text-[13px] font-medium text-zinc-600">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <span className="">Data</span>

                    <div
                      className={`relative rounded-lg border px-3 py-2 text-sm placeholder:text-zinc-500 ${field.date ? "border-primary" : "border-zinc-200"}`}
                    >
                      {field.date
                        ? moment(field.date).format("DD/MM/YYYY")
                        : moment().format("DD/MM/YYYY")}
                      <ChevronDown className="absolute top-1/2 right-2 h-4 -translate-y-1/2" />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  sideOffset={0}
                  align="start"
                  className="z-[999] w-72 border-zinc-200"
                >
                  <Calendar
                    mode="single"
                    selected={moment(field.date).toDate()}
                    onSelect={(e) =>
                      setInvoices((prev) =>
                        prev.map((f, i) =>
                          i === idx
                            ? { ...f, date: moment(e).format("YYYY-MM-DD") }
                            : f,
                        ),
                      )
                    }
                    initialFocus
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTechField}
          className="flex h-5 items-center gap-1 rounded-lg border border-zinc-300 p-4 px-3 text-[11px] font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          <Plus size={14} /> Adicionar novo Pagamento
        </button>

        <div className="mt-6 h-px bg-zinc-200/60" />
      </div>
    </div>
  );
}
