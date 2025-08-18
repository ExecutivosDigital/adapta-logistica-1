"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScreenWidth } from "@/lib/useScreenWidth";
import { cn } from "@/utils/cn";
import {
  ChevronDown,
  DollarSign,
  Edit,
  GripVertical,
  Plus,
  Search,
} from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { DataType } from "../page";
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
    { id: "", number: 0, type: "", date: "" },
  ]);

  /* ------------------------------ helpers ---------------------------- */
  const addTechField = () =>
    setInvoices((prev) => [...prev, { id: "", number: 0, type: "", date: "" }]);

  const buttonBase =
    "relative flex w-full items-center gap-2 rounded-lg border  px-3 py-3 text-sm transition";

  const paymentForms = [
    "PIX",
    "Boleto",
    "Cartão de Crédito",
    "Depósito",
    "Transferência Bancária",
    "Dinheiro em Mãos",
    "Fatura",
  ];

  const [filterPaymentForm, setFilterPaymentForm] = useState("");
  const [valor, setValor] = useState(invoices[0].number); // centavos!
  const [amount, setAmount] = useState(data.amount);

  const { width } = useScreenWidth();

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
      <div className="grid grid-cols-12 gap-2 text-sm text-zinc-700 xl:gap-4">
        <label className="col-span-7 flex flex-col gap-1">
          <span className="text-zinc-600">Valor no Documento</span>
          <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
            <DollarSign
              size={16}
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
            />
            <div className="flex h-full flex-1 items-center text-center">
              <span className="font-semi-bold flex-1 text-xl">
                <input
                  value={formatBRL(amount)}
                  onChange={handleChangeAmount}
                  placeholder="R$ 0,00"
                  className="w-full flex-1 bg-transparent text-center text-lg text-zinc-700 outline-none"
                />
              </span>
            </div>
          </div>
        </label>

        <label className="col-span-5 flex flex-col gap-1">
          <span className="text-zinc-600">Tipo de Lançamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
                <div className="flex h-full w-6">
                  <DollarSign className="text-primary" size={16} />
                </div>
                <div className="flex-1 text-lg text-zinc-700">
                  {data.paymentForm || "Selecione"}
                </div>
                <div className="flex h-full w-6 justify-end">
                  <Edit className="text-primary" size={16} />
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={width > 768 ? "right" : "bottom"}
              align={width > 768 ? "start" : "end"}
              className="z-[999] w-72 border-zinc-200"
            >
              <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                <input
                  value={filterPaymentForm}
                  onChange={(e) => setFilterPaymentForm(e.target.value)}
                  placeholder="Pesquisar Forma de Pagamento"
                  className="flex-1 focus:outline-none"
                />
                <Search size={14} />
              </div>
              {paymentForms
                .filter((f) =>
                  f.toLowerCase().includes(filterPaymentForm.toLowerCase()),
                )
                .map((form) => (
                  <DropdownMenuItem
                    key={form}
                    onClick={() => setData({ ...data, paymentForm: form })}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {form}
                      {data.paymentForm === form && (
                        <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              {paymentForms.filter((f) =>
                f.toLowerCase().includes(filterPaymentForm.toLowerCase()),
              ).length === 0 && (
                <div className="p-2 text-center text-sm text-zinc-600">
                  Nenhum item encontrado
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>
        <div className="col-span-2 my-4 h-px bg-zinc-200/60" />
      </div>
      <div>
        <h3 className="mb-4 text-base font-semibold">Detalhes do Pagamento</h3>

        {invoices.map((field, idx) => (
          <div
            key={field.id}
            className="mb-4 grid grid-cols-12 items-center gap-2 xl:gap-4"
          >
            <div className="col-span-6 flex items-center gap-2">
              <GripVertical className="mt-5" />
              <div className="flex w-full flex-col font-medium text-zinc-600">
                <span className="">{idx + 1} - Pagamento</span>
                <input
                  value={formatBRL(valor)}
                  onChange={handleChange}
                  placeholder="R$ 0,00"
                  className={`h-12 w-full rounded-2xl border px-2 py-1 text-sm placeholder:text-zinc-500 xl:h-16 xl:px-3 xl:py-2 ${field.number ? "border-primary" : "border-zinc-200"}`}
                />
              </div>
            </div>
            <div className="col-span-3 flex flex-col font-medium text-zinc-600">
              <span className="">Forma</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      buttonBase,
                      "h-12 justify-between rounded-2xl px-2 py-1 xl:h-16 xl:px-3 xl:py-2",
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
            <div className="col-span-3 flex flex-col font-medium text-zinc-600">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <span className="">Data</span>

                    <div
                      className={`relative flex h-12 items-center rounded-2xl border px-2 py-1 text-sm placeholder:text-zinc-500 xl:h-16 xl:px-3 xl:py-2 ${field.date ? "border-primary" : "border-zinc-200"}`}
                    >
                      {field.date
                        ? moment(field.date).format("DD/MM/YYYY")
                        : moment().format("DD/MM/YYYY")}
                      <ChevronDown className="absolute top-1/2 right-0 h-4 -translate-y-1/2" />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side={width > 768 ? "right" : "top"}
                  sideOffset={0}
                  align={width > 768 ? "start" : "end"}
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
