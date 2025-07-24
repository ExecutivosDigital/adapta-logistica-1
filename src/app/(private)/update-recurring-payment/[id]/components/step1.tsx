import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  CircleDollarSign,
  DollarSign,
  Edit,
  MapPin,
  Plus,
} from "lucide-react";
import moment from "moment";
import { DataType } from "../page";

import { Calendar } from "@/components/ui/calendar";
import "moment/locale/pt-BR";
moment.locale("pt-BR");
interface Props {
  setIsOpenSupplierModal: (value: boolean) => void;
  data: DataType;
  setData: (value: DataType) => void;
}

export function Step1({ setIsOpenSupplierModal, data, setData }: Props) {
  return (
    <>
      <div className="flex-1">
        <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
          <div className="border-primary text-primary col-span-12 flex flex-col items-center justify-center rounded-lg border border-dashed p-2 text-center">
            <div className="border-primary flex h-10 w-10 items-center justify-center rounded-full border">
              <Plus />
            </div>
            <span className="font-semibold">Upload de Documento</span>
            <span className="text-sm font-light">
              Arraste e solte o arquivo aqui ou adicione do seu dispositivo{" "}
              <br /> XML ou PDF
            </span>
          </div>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="col-span-12 grid grid-cols-12">
              <div className="col-span-12 grid grid-cols-11 gap-4">
                <label className="col-span-5 flex flex-col gap-1">
                  <span className="text-zinc-600">
                    Número no Documento - {index + 1}º
                  </span>
                  <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                    <div className="flex h-full w-6">
                      <DollarSign size={16} className="text-primary" />
                    </div>
                    <div className="flex h-full flex-1 items-center justify-center text-center">
                      <input
                        placeholder="R$ 0,00"
                        className="flex-1 items-center bg-transparent text-center text-lg text-zinc-700 outline-none"
                      />
                    </div>
                    <div className="flex h-full w-6"></div>
                  </div>
                </label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <label className="col-span-3 flex flex-col gap-1">
                      <span className="text-zinc-600">Data Vencimento</span>
                      <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
                        <div className="flex h-full w-6">
                          <CalendarIcon className="text-primary" size={16} />
                        </div>
                        <div className="flex-1 text-lg text-zinc-700">
                          {data.dueDate
                            ? moment(data.dueDate).format("DD/MM/YYYY")
                            : moment().format("DD/MM/YYYY")}
                        </div>
                        <div className="flex h-full w-6 justify-end">
                          <Edit className="text-primary" size={16} />
                        </div>
                      </div>
                    </label>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    sideOffset={0}
                    align="start"
                    className="z-[999] w-72 border-zinc-200"
                  >
                    <Calendar
                      mode="single"
                      selected={moment(data.dueDate).toDate()}
                      onSelect={(date) => {
                        if (date) {
                          setData({ ...data, dueDate: moment(date).format() });
                        }
                      }}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <label className="col-span-3 flex flex-col gap-1">
                      <span className="text-zinc-600">Valor</span>
                      <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
                        <div className="flex h-full w-6">
                          <CircleDollarSign
                            className="text-primary"
                            size={16}
                          />
                        </div>
                        <div className="flex-1 text-lg text-zinc-700">
                          R$ 1.000,00
                        </div>
                        <div className="flex h-full w-6 justify-end">
                          <Edit className="text-primary" size={16} />
                        </div>
                      </div>
                    </label>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </div>
              <label className="col-span-12 flex flex-col gap-1">
                <span className="text-zinc-600">
                  {data.entryType === "DESPESAS"
                    ? "Fornecedor"
                    : data.entryType === "IMPOSTOS"
                      ? "Sefaz"
                      : "Parceiro"}
                </span>
                <button
                  onClick={() => setIsOpenSupplierModal(true)}
                  className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2"
                >
                  <div className="flex h-full w-6">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="flex-1 text-lg">
                      {data.supplier.name || "Selecione"}
                    </span>
                    <span className="text-zinc-400">
                      {data.supplier.cnpj || ""}
                    </span>
                  </div>
                  <div className="flex h-full w-6 justify-end">
                    <Edit size={16} className="text-primary" />
                  </div>
                </button>
              </label>
              <div className="col-span-12 my-4 h-px bg-zinc-200" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
