import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignLeft,
  DollarSign,
  Edit,
  Mail,
  MapPin,
  Search,
} from "lucide-react";
import { useState } from "react";
import { DataType } from "./page";
interface Props {
  setIsOpenClientModal: (value: boolean) => void;
  data: DataType;
  setData: (value: DataType) => void;
}

export function Step4Second({ data, setData, setIsOpenClientModal }: Props) {
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

  return (
    <div className="flex h-full flex-1 flex-col justify-between">
      <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700">
        {/* --------------------- PAGAMENTO VIA --------------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Fornecedor</span>
          <button
            onClick={() => setIsOpenClientModal(true)}
            className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2"
          >
            <div className="flex h-full w-6">
              <MapPin size={16} className="text-primary" />
            </div>
            <div className="flex flex-1 flex-col text-left">
              <span className="flex-1">
                {data.supplier.name || "Selecione"}
              </span>
              <span className="text-zinc-400">{data.supplier.cnpj || "-"}</span>
            </div>
            <div className="flex h-full w-6 justify-end">
              <Edit size={16} className="text-primary" />
            </div>
          </button>
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
                  <span className="font-semi-bold flex-1 text-lg">
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
              className="z-[999] mt-4 max-h-[600px] overflow-y-auto"
            >
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center justify-between gap-4 rounded-lg border p-2 text-sm">
                  <input
                    value={filteredResponsible}
                    onChange={(e) => setFilteredResponsible(e.target.value)}
                    placeholder="Pesquisar Conta / Cartão"
                    className="flex-1 bg-transparent outline-none"
                  />
                  <Search size={14} />
                </div>
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
        <div className="col-span-2 flex flex-col gap-1">
          <span className="text-zinc-600">Email de Fatura:</span>
          <div className="flex min-h-16 items-start gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <Mail className="text-primary mt-1" size={16} />
            <input
              value={data.mail}
              onChange={(e) => setData({ ...data, mail: e.target.value })}
              placeholder="Digite o número"
              className="flex-1 bg-transparent text-lg text-zinc-700 outline-none"
            />
            <Edit className="text-primary mt-1" size={16} />
          </div>
        </div>
        {/* --------------------- DESCRIÇÃO --------------------- */}
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
