import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Calendar } from "@/components/ui/calendar";
import { useScreenWidth } from "@/lib/useScreenWidth";
import {
  CalendarIcon,
  DollarSign,
  Edit,
  Mail,
  MapPin,
  Search,
} from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { DataType } from "../page";

interface Props {
  setIsOpenClientModal: (value: boolean) => void;
  data: DataType;
  setData: (value: DataType) => void;
}
export function Step1({ setIsOpenClientModal, data, setData }: Props) {
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

  const documents = ["1223", "3334", "3567", "5467", "6859", "7890"];
  const { width } = useScreenWidth();

  const [filteredResponsible, setFilteredResponsible] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // mantém só 0‑9
    const onlyDigits = e.target.value.replace(/\D/g, "");

    // se o usuário digitou “1234”, queremos 12,34
    // => divide por 100 para posicionar a vírgula
    const amountNumber = Number(onlyDigits) / 100;

    setData({ ...data, amount: amountNumber });
  };
  return (
    <>
      <div className="flex-1">
        <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
          <label className="col-span-8 flex flex-col gap-1">
            <span className="text-zinc-600">Cliente Pagador</span>
            <button
              onClick={() => setIsOpenClientModal(true)}
              className="relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2"
            >
              <MapPin
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex flex-1 flex-col">
                <span className="flex-1 2xl:text-lg">
                  {data.client.name || "Selecione"}
                </span>
                <span className="text-xs text-zinc-400">
                  {data.client.cnpj || ""}
                </span>
                <span className="text-xs text-zinc-400">
                  {data.client.place || ""}
                </span>
              </div>
              <Edit
                size={16}
                className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
              />
            </button>
          </label>

          <label className="col-span-4 flex flex-col gap-1">
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

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Preço Final</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <DollarSign
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 flex-col items-center justify-center text-center">
                <input
                  value={data.amount.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  onChange={handleChange}
                  placeholder="R$ 0,00"
                  className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
                />
                <span className="text-xs text-zinc-400">
                  Soma dos Documentos
                </span>
              </div>
            </div>
          </label>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Documentos</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full focus:outline-none">
                <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
                  <DollarSign
                    size={16}
                    className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                  />
                  <div className="flex h-full flex-1 flex-col items-center justify-center text-center">
                    <input
                      value={"223 Documentos"}
                      onChange={handleChange}
                      placeholder="R$ 0,00"
                      className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
                    />
                    <span className="text-xs text-zinc-400">
                      1223, 3334, 3...
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={width > 768 ? "bottom" : "top"}
                align={width > 768 ? "start" : "end"}
                sideOffset={0}
                className="z-[999] w-72 border-zinc-200"
              >
                <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                  <input
                    value={filteredDocuments}
                    onChange={(e) => setFilteredDocuments(e.target.value)}
                    placeholder="Pesquisar Moeda"
                    className="flex-1 focus:outline-none"
                  />
                  <Search size={14} />
                </div>
                {documents.filter((item) =>
                  item.toLowerCase().includes(filteredDocuments.toLowerCase()),
                ).length === 0 && (
                  <div className="p-2 text-center text-sm text-zinc-600">
                    Nenhum item encontrado
                  </div>
                )}
                {documents
                  .filter((item) =>
                    item
                      .toLowerCase()
                      .includes(filteredDocuments.toLowerCase()),
                  )
                  .map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => setData({ ...data, currency: item })}
                      className="hover:bg-primary/20 cursor-pointer transition duration-300"
                    >
                      <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                        {item}
                        {data.currency === item && (
                          <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </label>

          <div className="col-span-8 flex flex-col gap-1">
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

          <label className="col-span-4 flex flex-col gap-1">
            <span className="text-zinc-600">Cobrança</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
                  <CalendarIcon
                    className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                    size={16}
                  />
                  <div className="flex-1 text-zinc-700 2xl:text-lg">
                    {data.issueDate
                      ? moment(data.issueDate).format("DD/MM/YYYY")
                      : moment().format("DD/MM/YYYY")}
                  </div>
                  <Edit
                    className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                    size={16}
                  />
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
                  selected={
                    moment(data.issueDate).toDate() || moment().toDate()
                  }
                  onSelect={(date) => {
                    if (date) {
                      setData({ ...data, issueDate: moment(date).format() });
                    }
                  }}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </label>
        </div>
      </div>
    </>
  );
}
