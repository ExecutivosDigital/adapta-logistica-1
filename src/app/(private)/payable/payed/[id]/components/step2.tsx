import { cn } from "@/utils/cn";
import { CreditCard, DollarSign, Upload } from "lucide-react";
import moment from "moment";
import { useState } from "react";

interface TechField {
  id: string;
  number: number;
  type: string;
  date: string;
}

export function Step2() {
  const [docNumbers] = useState<string[]>(["123", "456", "789"]);
  const [invoices] = useState<TechField[]>([
    { id: "", number: 0, type: "", date: "" },
  ]);
  const [valor] = useState(invoices[0].number);

  const buttonBase =
    "relative flex w-full items-center gap-2 rounded-lg border  px-3 py-3 text-sm transition";

  const formatBRL = (valueInCents: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valueInCents / 100);

  return (
    <div className="flex-1">
      <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
        <div className="border-primary text-primary col-span-12 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-2 text-center">
          <div className="border-primary flex h-10 w-10 items-center justify-center rounded-full border">
            <Upload />
          </div>
          <span className="font-semibold">Comprovante de Pagamento</span>
          <span className="text-sm font-light">
            Clique para ter acesso ao comprovante de pagamento anexado
          </span>
        </div>
        <label className="col-span-7 flex flex-col gap-1">
          <span className="text-zinc-600">Pagamento Via</span>
          <div className="r relative flex h-8 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-12 xl:px-3 xl:py-2">
            <CreditCard
              size={16}
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
            />
            <div className="flex h-full w-full flex-1 items-center text-center">
              <span className="font-semi-bold w-full flex-1 text-xl">
                <input
                  value="Pagamento Via Tal"
                  className="w-full flex-1 pl-4 text-center text-lg text-zinc-700 outline-none"
                  readOnly
                />
              </span>
            </div>
          </div>
        </label>

        <label className="col-span-5 flex flex-col gap-1">
          <span className="text-zinc-600">Forma de Pagamento</span>
          <div className="relative flex h-8 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-12 xl:px-3 xl:py-2">
            <DollarSign
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              size={16}
            />
            <div className="flex-1 text-center text-lg text-zinc-700">
              Forma de Pagamento Tal
            </div>
          </div>
        </label>

        <div className="col-span-12 my-4 h-px bg-zinc-200/60" />
      </div>
      <div>
        <h3 className="mb-4 text-base font-semibold">Detalhes do Pagamento</h3>
        {invoices.map((field, idx) => (
          <div
            key={field.id}
            className="mb-4 grid grid-cols-12 items-center gap-4"
          >
            <div className="col-span-6 flex items-center gap-2">
              <div className="flex w-full flex-col text-[13px] font-medium text-zinc-600">
                <span className="">{idx + 1} - Pagamento</span>
                <input
                  value={formatBRL(valor)}
                  readOnly
                  placeholder="R$ 0,00"
                  className="border-primary h-12 w-full rounded-2xl border px-2 py-1 text-sm placeholder:text-zinc-500 focus:outline-none xl:h-12 xl:px-3 xl:py-2"
                />
              </div>
            </div>
            <div className="col-span-3 flex flex-col text-[13px] font-medium text-zinc-600">
              <span className="">Forma</span>
              <div
                className={cn(
                  buttonBase,
                  "flex h-8 items-center justify-center rounded-2xl px-2 py-1 text-center xl:h-12 xl:px-3 xl:py-2",
                  "border-primary text-zinc-700",
                )}
              >
                Forma Tal
              </div>
            </div>
            <div className="col-span-3 flex flex-col text-[13px] font-medium text-zinc-600">
              <div>
                <span className="">Data</span>
                <div className="border-primary relative flex h-8 items-center justify-center rounded-2xl border px-2 py-1 text-sm placeholder:text-zinc-500 xl:h-12 xl:px-3 xl:py-2">
                  {field.date
                    ? moment(field.date).format("DD/MM/YYYY")
                    : moment().format("DD/MM/YYYY")}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 h-px bg-zinc-200/60" />
        <h3 className="mb-4 text-base font-semibold">Números dos Documentos</h3>
        {docNumbers.map((field, idx) => (
          <div key={idx} className="mb-4 grid grid-cols-12 items-center gap-4">
            <div className="col-span-12 flex items-center gap-2">
              <div className="flex w-full flex-col text-[13px] font-medium text-zinc-600">
                <span className="">{idx + 1} - Documento</span>
                <input
                  value={field}
                  readOnly
                  className="border-primary h-8 w-full rounded-2xl border px-2 py-1 text-sm placeholder:text-zinc-500 focus:outline-none xl:h-12 xl:px-3 xl:py-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
