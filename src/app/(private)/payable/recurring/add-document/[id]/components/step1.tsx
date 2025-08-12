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
import "moment/locale/pt-br";
moment.locale("pt-br");
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
                  <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
                    <DollarSign
                      size={16}
                      className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                    />
                    <div className="flex h-full flex-1 items-center justify-center text-center">
                      <input
                        placeholder="R$ 0,00"
                        className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
                      />
                    </div>
                    <div className="flex h-full w-6"></div>
                  </div>
                </label>

                <label className="col-span-3 flex flex-col gap-1">
                  <span className="text-zinc-600">Vencimento</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
                        <CalendarIcon
                          className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                          size={16}
                        />
                        <div className="flex-1 text-zinc-700 2xl:text-lg">
                          {data.dueDate
                            ? moment(data.dueDate).format("DD/MM/YYYY")
                            : moment().format("DD/MM/YYYY")}
                        </div>
                        <Edit
                          className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                          size={16}
                        />
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
                        selected={moment(data.dueDate).toDate()}
                        onSelect={(date) => {
                          if (date) {
                            setData({
                              ...data,
                              dueDate: moment(date).format(),
                            });
                          }
                        }}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </label>

                <label className="col-span-3 flex flex-col gap-1">
                  <span className="text-zinc-600">Valor</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
                        <CircleDollarSign className="text-primary" size={16} />
                        <div className="flex-1 text-zinc-700 2xl:text-lg">
                          R$ 1.000,00
                        </div>
                        <Edit
                          className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                          size={16}
                        />
                      </div>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </label>
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
                  className="relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2"
                >
                  <MapPin
                    size={16}
                    className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="flex-1 2xl:text-lg">
                      {data.supplier.name || "Selecione"}
                    </span>
                    <span className="text-zinc-400">
                      {data.supplier.cnpj || ""}
                    </span>
                  </div>
                  <Edit
                    size={16}
                    className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                  />
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
