import { PayableTransactionProps } from "@/components/calendar";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useApiContext } from "@/context/ApiContext";
import { useFinancialDataContext } from "@/context/FinancialDataContext";
import { cn } from "@/utils/cn";
import { CreditCard, DollarSign, Loader2, Plus, Upload, X } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  selectedPayable: PayableTransactionProps;
  setSelectedPayable: React.Dispatch<
    React.SetStateAction<PayableTransactionProps | null>
  >;
}

export function Step2({ selectedPayable, setSelectedPayable }: Props) {
  const { bankAccounts } = useFinancialDataContext();
  const { PostAPI } = useApiContext();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const buttonBase =
    "relative flex w-full items-center gap-2 rounded-lg border  px-3 py-3 text-sm transition";

  const handleUploadFile = async (selectedFile: File) => {
    setIsUploading(true);
    const formData = new FormData();
    const sanitized = selectedFile.name.replace(/\s+/g, "-");
    formData.append("file", selectedFile, sanitized);
    const res = await PostAPI("/file", formData, true);
    if (res.status === 200) {
      setSelectedPayable({
        ...selectedPayable,
        receiptUrl: res.body.url,
      });
      setIsUploaded(true);
      return setIsUploading(false);
    }
    toast.error(res?.body?.message ?? "Falha no upload.");
    return setIsUploading(false);
  };

  useEffect(() => {
    if (selectedPayable.receiptUrl) {
      setIsUploaded(true);
    }
  }, [selectedPayable.receiptUrl]);

  return (
    <div className="flex-1">
      <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
        <div
          onClick={() => {
            if (isUploaded) {
              window.open(selectedPayable.receiptUrl as string, "_blank");
            }
          }}
          className="border-primary text-primary relative col-span-12 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-2 text-center"
        >
          {isUploaded && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (
                      confirm("Voce deseja remover o comprovante de pagamento?")
                    ) {
                      setSelectedPayable({
                        ...selectedPayable,
                        receiptUrl: null,
                      });
                      setIsUploaded(false);
                    }
                  }}
                >
                  <X className="absolute top-2 left-2 z-10 text-red-500" />
                </TooltipTrigger>
                <TooltipContent className="p-0.5">
                  <TooltipArrow />
                  <p className="text-white">Remover Comprovante de Pagamento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <input
            className={cn(
              "absolute top-0 left-0 h-full w-full cursor-pointer opacity-0",
              isUploading && "cursor-wait",
            )}
            type="file"
            onChange={(e) =>
              e.target.files && handleUploadFile(e.target.files[0])
            }
            readOnly
            disabled={isUploading}
          />
          <div className="border-primary flex h-10 w-10 items-center justify-center rounded-full border">
            {isUploading ? (
              <Loader2 className="animate-spin" />
            ) : isUploaded ? (
              <Upload />
            ) : (
              <Plus />
            )}
          </div>
          {isUploaded ? (
            <span className="font-semibold">
              Comprovante de Pagamento Enviado
            </span>
          ) : isUploading ? (
            <>
              <span className="font-semibold">
                Enviando Comprovante de Pagamento...
              </span>
            </>
          ) : (
            <>
              <span className="font-semibold">
                Upload de Comprovante de Pagamento
              </span>
              <span className="text-sm font-light">
                Arraste e solte o arquivo aqui ou adicione do seu dispositivo{" "}
                <br /> XML ou PDF
              </span>
            </>
          )}
        </div>
        <label className="col-span-7 flex flex-col gap-1">
          <span className="text-zinc-600">Pagamento Via</span>
          <div
            className={cn(
              "relative flex h-8 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-12 xl:px-3 xl:py-2",
              "border-primary",
            )}
          >
            <CreditCard
              size={16}
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
            />
            <div className="flex h-full w-full flex-1 items-center text-center">
              <span className="font-semi-bold w-full flex-1 text-xl">
                <input
                  value={
                    bankAccounts.find(
                      (b) => b.id === selectedPayable.bankAccount?.id,
                    )?.name
                  }
                  className="w-full flex-1 pl-4 text-center text-lg text-zinc-700 outline-none"
                  readOnly
                />
              </span>
            </div>
          </div>
        </label>

        <label className="col-span-5 flex flex-col gap-1">
          <span className="text-zinc-600">Forma de Pagamento</span>
          <div
            className={cn(
              "relative flex h-8 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-12 xl:px-3 xl:py-2",
              "border-primary",
            )}
          >
            <DollarSign
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              size={16}
            />
            <div className="flex-1 text-lg text-zinc-700">
              {selectedPayable.paymentType}
            </div>
          </div>
        </label>

        <div className="col-span-12 my-4 h-px bg-zinc-200/60" />
      </div>
      <div>
        <h3 className="mb-4 text-base font-semibold">Detalhes do Pagamento</h3>
        <div className="mb-4 grid grid-cols-12 items-center gap-4">
          <div className="col-span-6 flex items-center gap-2">
            <div className="flex w-full flex-col text-[13px] font-medium text-zinc-600">
              <span className="">Pagamento</span>
              <input
                value={selectedPayable.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                readOnly
                placeholder="R$ 0,00"
                className="border-primary h-12 w-full rounded-2xl border px-2 py-1 text-sm placeholder:text-zinc-500 focus:outline-none xl:h-12 xl:px-3 xl:py-2"
              />
            </div>
          </div>
          <div className="col-span-3 flex flex-col text-[13px] font-medium text-zinc-600">
            <span className="">Forma</span>
            <div
              className={cn(
                buttonBase,
                "flex h-8 items-center justify-center rounded-2xl px-2 py-1 text-center xl:h-12 xl:px-3 xl:py-2",
                "border-primary text-zinc-700",
              )}
            >
              {selectedPayable.paymentType}
            </div>
          </div>
          <div className="col-span-3 flex flex-col text-[13px] font-medium text-zinc-600">
            <div>
              <span className="">Data</span>
              <div className="border-primary relative flex h-8 items-center justify-center rounded-2xl border px-2 py-1 text-sm placeholder:text-zinc-500 xl:h-12 xl:px-3 xl:py-2">
                {moment(selectedPayable.dueDate).format("DD/MM/YYYY")}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 h-px bg-zinc-200/60" />
        <div className="flex h-80 w-full flex-col overflow-y-scroll">
          <h3 className="mb-4 text-base font-semibold">
            Números dos Documentos
          </h3>
          {selectedPayable.documents.map((field, idx) => (
            <div
              key={idx}
              className="mb-4 grid grid-cols-12 items-center gap-4"
            >
              <div className="col-span-12 flex items-center gap-2">
                <div className="flex w-full flex-col text-[13px] font-medium text-zinc-600">
                  <span className="">{idx + 1} - Documento</span>
                  <input
                    value={field.documentNumber}
                    readOnly
                    className="border-primary h-8 w-full rounded-2xl border px-2 py-1 text-sm placeholder:text-zinc-500 focus:outline-none xl:h-12 xl:px-3 xl:py-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
