import { PayableTransactionProps } from "@/components/calendar";
import { Plus } from "lucide-react";
import moment from "moment";
import "moment/locale/pt-br";
import React, { useEffect } from "react";
import { Document } from "./document";
moment.locale("pt-br");

export interface Document {
  documentNumber: string;
  documentUrl?: string | null;
  dueDate: string;
  id: string;
  supplierId: string;
  value: number;
  comments?: string | null;
}

interface Props {
  selectedPayable: PayableTransactionProps;
  allDocuments: Document[];
  setAllDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

export function Step1({
  selectedPayable,
  allDocuments,
  setAllDocuments,
}: Props) {
  const addNewDocument = () => {
    console.log("entrou");
    const newDocument: Document = {
      id: Date.now().toString(),
      documentNumber: "",
      dueDate: moment().format(),
      supplierId: selectedPayable.payable.supplier.id,
      value: 0,
      comments: "",
    };
    setAllDocuments([...allDocuments, newDocument]);
  };

  const removeDocument = (documentId: string) => {
    setAllDocuments(allDocuments.filter((doc) => doc.id !== documentId));
  };

  const updateDocument = (
    documentId: string,
    field: keyof Document,
    value: string,
  ) => {
    setAllDocuments(
      allDocuments.map((doc) => {
        if (doc.id === documentId) {
          return {
            ...doc,
            [field]: value,
          };
        }
        return doc;
      }),
    );
  };

  useEffect(() => {
    setAllDocuments([
      ...selectedPayable.documents,
      ...(selectedPayable.newDocuments || []),
    ]);
  }, [selectedPayable]);

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
            {allDocuments.map((document, index) => (
              <Document
                document={document}
                index={index}
                key={document.id}
                removeDocument={removeDocument}
                updateDocument={updateDocument}
                type={selectedPayable.payable.type}
                isDeletable={allDocuments.length > 1}
                supplierId={document.supplierId}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
