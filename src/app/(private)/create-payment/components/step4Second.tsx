import { AlignLeft, DollarSign, Edit, Mail, MapPin } from "lucide-react";
import { DataType } from "../page";
interface Props {
  data: DataType;
  setData: (value: DataType) => void;
}

export function Step4Second({ data, setData }: Props) {
  return (
    <div className="flex h-full flex-1 flex-col justify-between">
      <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
        <label className="col-span-8 flex flex-col gap-1">
          <span className="text-zinc-600">Fornecedor</span>
          <button className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <div className="flex h-full w-6">
              <MapPin size={16} className="text-primary" />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="flex-1 text-lg">
                {data.supplier.name || "Selecione"}
              </span>
              <span className="text-zinc-400">{data.supplier.cnpj || ""}</span>
            </div>
            <div className="flex h-full w-6 justify-end">
              <Edit size={16} className="text-primary" />
            </div>
          </button>
        </label>

        <label className="col-span-4 flex flex-col gap-1">
          <span className="text-zinc-600">Aprovação</span>

          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
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
        </label>

        <div className="col-span-12 flex flex-col gap-1">
          <span className="text-zinc-600">Email de Fatura:</span>
          <button className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <div className="flex h-full w-6">
              <Mail size={16} className="text-primary" />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="flex-1 text-lg">
                {data.supplier.name || "Selecione"}
              </span>
              <span className="text-zinc-400">{data.supplier.cnpj || ""}</span>
            </div>
            <div className="flex h-full w-6 justify-end">
              <Edit size={16} className="text-primary" />
            </div>
          </button>
        </div>
      </div>
      <div className="mt-auto flex w-full flex-col">
        <div className="col-span-2 my-4 mt-auto h-px bg-zinc-200/60" />
        <div className="col-span-2 flex flex-col gap-1">
          <span className="text-zinc-600">Descrição</span>
          <div className="flex min-h-[96px] items-start gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <AlignLeft className="text-primary mt-1" size={16} />
            <textarea
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              placeholder="Digite sua observação"
              className="w-full resize-none border-none bg-transparent text-sm text-zinc-600 outline-none"
            />
            <Edit className="text-primary mt-1" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
