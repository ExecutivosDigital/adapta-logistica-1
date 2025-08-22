import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  CircleDollarSign,
  Edit,
  File,
  MapPin,
  MessageCircle,
  Plus,
  Trash2,
} from "lucide-react";
import moment from "moment";
import { DataType } from "../page";

import { Calendar } from "@/components/ui/calendar";
import { useScreenWidth } from "@/lib/useScreenWidth";
import "moment/locale/pt-br";
import { useState } from "react";
moment.locale("pt-br");

interface Document {
  id: string;
  documentNumber: string;
  dueDate: string;
  value: string;
  comments: string;
}

interface Props {
  setIsOpenSupplierModal: (value: boolean) => void;
  data: DataType;
}

export function Step1({ setIsOpenSupplierModal, data }: Props) {
  const { width } = useScreenWidth();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      documentNumber: "",
      dueDate: moment().format(),
      value: "",
      comments: "",
    },
    {
      id: "2",
      documentNumber: "",
      dueDate: moment().format(),
      value: "",
      comments: "",
    },
  ]);

  const addNewDocument = () => {
    const newDocument: Document = {
      id: Date.now().toString(),
      documentNumber: "",
      dueDate: moment().format(),
      value: "",
      comments: "",
    };
    setDocuments([...documents, newDocument]);
  };

  const removeDocument = (documentId: string) => {
    if (documents.length > 1) {
      setDocuments(documents.filter((doc) => doc.id !== documentId));
    }
  };

  const updateDocument = (
    documentId: string,
    field: keyof Document,
    value: string,
  ) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === documentId ? { ...doc, [field]: value } : doc,
      ),
    );
  };

  return (
    <>
      <div className="flex w-full flex-1 flex-col">
        <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
          <button
            onClick={addNewDocument}
            className="border-primary bg-primary hover:bg-primary/90 col-span-12 flex gap-4 rounded-lg border p-2 text-white transition-colors xl:col-span-5 xl:col-start-2"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white">
              <Plus />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Adicionar Lançamento</span>
              <span className="text-sm font-light">
                Sem documentos? Clique aqui
              </span>
            </div>
          </button>
          <div className="border-primary text-primary col-span-12 flex gap-4 rounded-lg border border-dashed p-2 xl:col-span-5">
            <div className="border-primary flex h-6 w-6 items-center justify-center rounded-full border">
              <Plus />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Upload de Documento</span>
              <span className="text-sm font-light">
                Clique ou arraste o documento aqui
              </span>
            </div>
          </div>
          <div className="col-span-12 flex h-[500px] w-full flex-col overflow-x-hidden overflow-y-scroll">
            {documents.map((document, index) => (
              <div key={document.id} className="col-span-12 grid grid-cols-12">
                <div className="col-span-12 grid grid-cols-12 gap-4">
                  <label className="col-span-5 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600">
                        Número no Documento - {index + 1}º
                      </span>
                      {documents.length > 1 && (
                        <button
                          onClick={() => removeDocument(document.id)}
                          className="p-1 text-red-500 transition-colors hover:text-red-700"
                          title="Remover documento"
                        >
                          <Trash2 size={16} />
                        </button>
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
                          value={document.value}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
