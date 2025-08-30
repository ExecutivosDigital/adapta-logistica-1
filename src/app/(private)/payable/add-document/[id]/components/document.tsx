/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFinancialDataContext } from "@/context/FinancialDataContext";
import { useScreenWidth } from "@/lib/useScreenWidth";
import {
  CalendarIcon,
  CircleDollarSign,
  Edit,
  File,
  MapPin,
  MessageCircle,
  Trash2,
} from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { Document as DocumentType } from "./step1";
import { SupplierModal } from "./supplier-modal";

interface DocumentProps {
  document: any;
  index: number;
  isDeletable: boolean;
  removeDocument: (id: string) => void;
  updateDocument: (
    document: any,
    field: keyof DocumentType,
    value: string,
  ) => void;
  type: string;
  supplierId: string;
}

export function Document({
  document,
  index,
  isDeletable,
  removeDocument,
  updateDocument,
  type,
  supplierId,
}: DocumentProps) {
  const { suppliers } = useFinancialDataContext();
  const { width } = useScreenWidth();
  const [isOpenSupplierModal, setIsOpenSupplierModal] = useState(false);

  return (
    <>
      <div key={document.id} className="col-span-12 grid grid-cols-12">
        <div className="col-span-12 grid grid-cols-12 gap-4">
          <label className="col-span-5 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-zinc-600">
                Número no Documento - {index + 1}º
              </span>
              {isDeletable && (
                <Trash2
                  onClick={() => removeDocument(document.id)}
                  size={16}
                  className="cursor-pointer text-red-500 transition-colors hover:text-red-700"
                />
              )}
            </div>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <File
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 items-center justify-center text-center">
                <input
                  placeholder="0000"
                  value={document.documentNumber}
                  onChange={(e) =>
                    updateDocument(
                      document.id,
                      "documentNumber",
                      e.target.value,
                    )
                  }
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
                <div className="relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
                  <CalendarIcon
                    size={16}
                    className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                  />
                  <div className="flex-1 text-zinc-700 2xl:text-lg">
                    {moment(document.dueDate).format("DD/MM/YYYY")}
                  </div>
                  <Edit
                    size={16}
                    className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={width > 768 ? "right" : "bottom"}
                sideOffset={0}
                align={width > 768 ? "start" : "end"}
                className="z-[999] w-72 border-zinc-200"
              >
                <Calendar
                  mode="single"
                  selected={moment(document.dueDate).toDate()}
                  onSelect={(date) => {
                    if (date) {
                      updateDocument(
                        document.id,
                        "dueDate",
                        moment(date).format(),
                      );
                    }
                  }}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </label>

          <label className="col-span-4 flex flex-col gap-1">
            <span className="text-zinc-600">Valor</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
              <CircleDollarSign
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                size={16}
              />
              <div className="flex-1 text-zinc-700 2xl:text-lg">
                <input
                  placeholder="R$ 0,00"
                  value={document.value.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  onChange={(e) =>
                    updateDocument(document.id, "value", e.target.value)
                  }
                  className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
                />
              </div>
              <Edit
                className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                size={16}
              />
            </div>
          </label>
        </div>
        <label className="col-span-12 flex flex-col gap-1">
          <span className="text-zinc-600">
            {type === "EXPENSES"
              ? "Fornecedor"
              : type === "TAX"
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
                {suppliers.find((s) => s.id === supplierId)?.name ||
                  "Selecione"}
              </span>
              <span className="text-zinc-400">
                {suppliers.find((s) => s.id === supplierId)?.cnpj || ""}
              </span>
            </div>
            <Edit
              size={16}
              className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
            />
          </button>
        </label>
        <label className="col-span-12 flex flex-col gap-1">
          <span className="text-zinc-600">Comentários</span>
          <div className="relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
            <MessageCircle
              size={16}
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
            />
            <input
              placeholder="Comentários"
              value={document.comments}
              onChange={(e) =>
                updateDocument(document.id, "comments", e.target.value)
              }
              className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
            />
            <Edit
              size={16}
              className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
            />
          </div>
        </label>
        <div className="col-span-12 my-4 h-px bg-zinc-200" />
      </div>
      {isOpenSupplierModal && (
        <SupplierModal
          isOpenSupplierModal={isOpenSupplierModal}
          setIsOpenSupplierModal={setIsOpenSupplierModal}
          setSelectedSupplierId={(selectedSupplierId) => {
            updateDocument(document.id, "supplierId", selectedSupplierId);
            setIsOpenSupplierModal(false);
          }}
        />
      )}
    </>
  );
}
