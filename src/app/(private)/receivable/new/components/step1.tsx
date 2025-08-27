import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScreenWidth } from "@/lib/useScreenWidth";
import { DollarSign, Edit, Mail, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { DataType } from "../page";

interface Props {
  data: DataType;
  setData: (value: DataType) => void;
  setIsOpenCteModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Step1({ data, setData, setIsOpenCteModal }: Props) {
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

  const { width } = useScreenWidth();

  const [filteredResponsible, setFilteredResponsible] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    const amountNumber = Number(onlyDigits) / 100;

    setData({ ...data, [value]: amountNumber });
  };

  return (
    <>
      <div className="flex-1">
        <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
          <label className="col-span-7 flex flex-col gap-1">
            <span className="text-zinc-600">Cliente Pagador</span>
            <button className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
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
            </button>
          </label>

          <label className="col-span-5 flex flex-col gap-1">
            <span className="text-zinc-600">Aprovação</span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
                  <DollarSign
                    size={16}
                    className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                  />
                  <div className="flex h-full flex-1 items-center">
                    <span className="flex-1 2xl:text-lg">
                      {data.approval ? data.approval : "Selecione"}
                    </span>
                  </div>
                  <Edit
                    size={16}
                    className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={width > 768 ? "right" : "bottom"}
                align={width > 768 ? "start" : "end"}
                sideOffset={0}
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
                      c
                        .toLowerCase()
                        .includes(filteredResponsible.toLowerCase()),
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
                  onChange={(e) => handleChange(e, "value")}
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
                  onChange={(e) => handleChange(e, "fees")}
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
            <span className="text-zinc-600">Documentos</span>
            <div
              onClick={() => setIsOpenCteModal(true)}
              className="relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2"
            >
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
            <button className="relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
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
              <Edit
                size={16}
                className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
