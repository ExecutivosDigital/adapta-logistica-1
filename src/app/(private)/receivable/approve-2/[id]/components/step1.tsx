import { DollarSign, Mail, MapPin } from "lucide-react";
import { DataType } from "../page";

interface Props {
  data: DataType;
}

export function Step1({ data }: Props) {
  return (
    <>
      <div className="flex-1">
        <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
          <label className="col-span-7 flex flex-col gap-1">
            <span className="text-zinc-600">Cliente Pagador</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
              <MapPin
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex flex-1 flex-col">
                <span className="flex-1 2xl:text-lg">Cliente Tal</span>
                <span className="text-xs text-zinc-400">
                  00.000.000/0000-00
                </span>
                <span className="text-xs text-zinc-400">Rua Tal, 123</span>
              </div>
            </div>
          </label>

          <label className="col-span-5 flex flex-col gap-1">
            <span className="text-zinc-600">Aprovação</span>
            <div className="relative flex h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
              <DollarSign
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 items-center">
                <span className="flex-1 2xl:text-lg">Usuário Tal</span>
              </div>
            </div>
          </label>

          <label className="col-span-4 flex flex-col gap-1">
            <span className="text-zinc-600">Valor Total dos Documentos</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <DollarSign
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 flex-col items-center justify-center text-center">
                <input
                  value={data.value.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  readOnly
                  placeholder="R$ 0,00"
                  className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
                />
                <span className="text-xs text-zinc-400">
                  Soma dos Documentos
                </span>
              </div>
            </div>
          </label>

          <label className="col-span-4 flex flex-col gap-1">
            <span className="text-zinc-600">Acréscimos</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <DollarSign
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 flex-col items-center justify-center text-center">
                <input
                  value={data.fees.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  readOnly
                  placeholder="R$ 0,00"
                  className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
                />
                <span className="text-xs text-zinc-400">
                  Soma dos Acréscimos
                </span>
              </div>
            </div>
          </label>

          <label className="col-span-4 flex flex-col gap-1">
            <span className="text-zinc-600">Documentos</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <DollarSign
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 flex-col items-center justify-center text-center">
                <input
                  value="223 Documentos"
                  readOnly
                  placeholder="R$ 0,00"
                  className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
                />
                <span className="text-xs text-zinc-400">1223, 3334, 3...</span>
              </div>
            </div>
          </label>

          <div className="col-span-12 flex flex-col gap-1">
            <span className="text-zinc-600">Email de Fatura:</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
              <Mail
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex flex-1 flex-col">
                <span className="flex-1 2xl:text-lg">Financeiro</span>
                <span className="text-zinc-400">
                  financeiro@integrabrasil.com.br
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
