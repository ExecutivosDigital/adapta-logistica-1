import { CalendarIcon, CreditCard, DollarSign, Upload } from "lucide-react";
import moment from "moment";

export function Step2() {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
        <label className="col-span-7 flex flex-col gap-1">
          <span className="text-zinc-600">Conta de Faturamento</span>
          <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
            <CreditCard
              size={16}
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
            />
            <div className="flex h-full w-full flex-1 items-center text-center">
              <span className="font-semi-bold w-full flex-1 text-xl">
                <input
                  value="Conta Tal"
                  readOnly
                  className="w-full flex-1 pl-4 text-center text-lg text-zinc-700 outline-none"
                />
              </span>
            </div>
            <div className="flex h-full w-6"></div>
          </div>
        </label>

        <label className="col-span-5 flex flex-col gap-1">
          <span className="text-zinc-600">Forma de Cobrança</span>
          <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
            <DollarSign
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              size={16}
            />
            <div className="flex-1 text-lg text-zinc-700">Boleto</div>
          </div>
        </label>

        <label className="col-span-6 flex flex-col gap-1">
          <span className="text-zinc-600">Tipo de Serviço</span>
          <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
            <CreditCard
              size={16}
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
            />
            <div className="flex h-full flex-1 items-center text-center">
              <span className="font-semi-bold flex-1 text-xl">
                <input
                  value="Tipo de Serviço Tal"
                  readOnly
                  className="w-full flex-1 bg-transparent pl-4 text-center text-lg text-zinc-700 outline-none"
                />
              </span>
            </div>
            <div className="flex h-full w-6"></div>
          </div>
        </label>

        <label className="col-span-6 flex flex-col gap-1">
          <span className="text-zinc-600">Data de Recebimento</span>
          <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
            <CalendarIcon
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              size={16}
            />
            <div className="flex-1 text-lg text-zinc-700">
              {moment().format("DD/MM/YYYY")}
            </div>
          </div>
        </label>

        <div className="col-span-12 my-4 h-px bg-zinc-200/60" />
      </div>

      <div className="border-primary text-primary col-span-12 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-2 text-center">
        <div className="border-primary flex h-10 w-10 items-center justify-center rounded-full border">
          <Upload />
        </div>
        <span className="font-semibold">Comprovante de Recebimento</span>
        <span className="text-sm font-light">
          Clique para ter acesso ao comprovante de recebimento anexado
        </span>
      </div>
    </div>
  );
}
