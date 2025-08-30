"use client";
import {
  AiFileReader,
  PaymentDocumentProps,
} from "@/components/ai-file-reader";
import { PayableTransactionProps } from "@/components/calendar";
import { OrangeButton } from "@/components/OrangeButton";
import { useApiContext } from "@/context/ApiContext";
import { useLoadingContext } from "@/context/LoadingContext";
import { cn } from "@/utils/cn";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  DollarSign,
  Loader2,
  X,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Document, Step1 } from "./components/step1";

export default function PayableAddDocument() {
  const { handleNavigation } = useLoadingContext();
  const { GetAPI, PutAPI } = useApiContext();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [selectedPayable, setSelectedPayable] =
    useState<PayableTransactionProps | null>(null);
  const [steps, setSteps] = useState(1);
  const [allDocuments, setAllDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function GetIndividualPayable(id: string) {
    const payable = await GetAPI(`/payable-transaction/${id}`, true);
    if (payable.status === 200) {
      setSelectedPayable(payable.body.payableTransaction);
      window.dispatchEvent(new CustomEvent("navigationComplete"));
    }
  }

  const handleData = (
    summaryData: PaymentDocumentProps,
    documentUrl: string,
  ) => {
    return setAllDocuments((prev) => [
      ...prev,
      {
        documentUrl,
        documentNumber: "",
        dueDate: moment().format(),
        supplierId: selectedPayable?.payable.supplier.id as string,
        value: 0,
        comments: "",
        id: Date.now().toString(),
      },
    ]);
  };

  async function AddDocument() {
    setIsLoading(true);
    const deletedDocuments = selectedPayable?.documents
      .filter((doc) => !allDocuments?.find((newDoc) => newDoc.id === doc.id))
      .map((doc) => doc.id);
    const editedDocuments = allDocuments?.filter((doc) =>
      selectedPayable?.documents?.find((newDoc) => newDoc.id === doc.id),
    );
    const newDocuments = allDocuments?.filter(
      (doc) =>
        !selectedPayable?.documents?.find((newDoc) => newDoc.id === doc.id),
    );

    const response = await PutAPI(
      `/payable-transaction/${id}`,
      {
        ...selectedPayable,
        documents: editedDocuments,
        newDocuments,
        deletedDocuments,
        value: allDocuments
          .map((doc) => doc.value)
          .reduce((a, b) => a + b, 0)
          .toFixed(2),
      },
      true,
    );

    if (response.status === 200) {
      toast.success("Documento(s) adicionado(s) com sucesso!");
      handleNavigation("/calendar");
      return setIsLoading(false);
    }
    toast.error("Erro ao adicionar documento(s), tente novamente");
    return setIsLoading(false);
  }

  useEffect(() => {
    GetIndividualPayable(id);
  }, []);

  if (!selectedPayable) return null;

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-hidden pb-20 xl:pb-0">
        <header className="relative flex items-center justify-center border-b border-orange-200 border-b-zinc-400 px-2 py-2 xl:px-8 xl:py-4">
          <Image
            src="/logo/logoFull.png"
            alt="Adapta"
            width={140}
            height={24}
            className="h-16 w-auto"
            priority
          />

          <button
            onClick={() => setSteps((s) => s - 1)}
            className={cn(
              "absolute top-4 left-8 flex cursor-pointer items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50",
              steps === 1 && "hidden",
            )}
          >
            <ChevronLeft size={16} />
            Voltar
          </button>
          <button
            onClick={() => router.back()}
            className="absolute top-4 right-8 flex cursor-pointer items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Encerrar
            <X size={16} />
          </button>
        </header>

        <main className="flex flex-1 flex-col-reverse overflow-y-auto xl:flex-row">
          <section className="flex flex-1 flex-col px-3 py-2 pb-4 xl:px-12 xl:pt-10">
            <div className="flex w-full justify-between">
              <div className="flex gap-2">
                <ChevronLeft
                  onClick={() => setSteps((s) => s - 1)}
                  className={cn("cursor-pointer", steps === 1 && "hidden")}
                />
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">
                    Inserir Documentos À Pagar
                  </h2>
                  <span className="flex items-center gap-1 text-sm text-zinc-600">
                    <Calendar size={16} />
                    22/03/2025
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="flex flex-row items-center gap-1 text-xl font-semibold">
                  <span className="flex flex-row items-center gap-1 text-xs">
                    <div className="bg-primary/20 text-primary flex h-4 w-4 items-center justify-center rounded-full">
                      <DollarSign size={14} />
                    </div>
                    R$
                  </span>
                  {allDocuments
                    .map((doc) => doc.value)
                    .reduce((a, b) => a + b, 0)
                    .toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </h2>
                <span className="flex items-center gap-1 text-sm text-zinc-600">
                  Valor Total do Pagamento
                </span>
              </div>
            </div>
            <div className="my-4 h-px bg-zinc-200/60" />
            <Step1
              selectedPayable={selectedPayable}
              allDocuments={allDocuments}
              setAllDocuments={setAllDocuments}
            />
            <footer className="mt-4 flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
              <OrangeButton
                className="h-9 w-[132px]"
                onClick={AddDocument}
                icon={<ChevronDown size={16} className="-rotate-90" />}
                iconPosition="right"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  "Salvar"
                )}
              </OrangeButton>
            </footer>
          </section>
          <div className="w-px bg-orange-200" />
          <section className="bg-primary/10 flex flex-1 items-center justify-center p-4">
            <AiFileReader handleData={handleData} />
          </section>
        </main>
      </div>
    </>
  );
}
