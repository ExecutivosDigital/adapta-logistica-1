import { PayableTransactionProps } from "@/components/calendar";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFinancialDataContext } from "@/context/FinancialDataContext";
import { useScreenWidth } from "@/lib/useScreenWidth";
import { cn } from "@/utils/cn";
import {
  ChevronDown,
  CreditCard,
  DollarSign,
  Edit,
  Search,
  Upload,
} from "lucide-react";
import moment from "moment";
import { useState } from "react";

interface Props {
  selectedPayable: PayableTransactionProps;
  setSelectedPayable: React.Dispatch<
    React.SetStateAction<PayableTransactionProps | null>
  >;
}

export function Step2({ selectedPayable, setSelectedPayable }: Props) {
  const { width } = useScreenWidth();
  const { bankAccounts } = useFinancialDataContext();
  const [filterPaymentType, setFilterPaymentType] = useState("");

  const paymentTypes = [
    "PIX",
    "Boleto",
    "Cartão de Crédito",
    "Depósito",
    "Transferência Bancária",
    "Dinheiro em Mãos",
    "Fatura",
  ];

  const buttonBase =
    "relative flex w-full items-center gap-2 rounded-lg border  px-3 py-3 text-sm transition";

  return (
    <div className="flex-1">
      <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
        <div
          onClick={() => {
            if (!selectedPayable.payable.mainDocumentUrl) return;
            window.open(selectedPayable.payable.mainDocumentUrl, "_blank");
          }}
          className={cn(
            "border-primary text-primary col-span-12 flex flex-col items-center justify-center rounded-lg border border-dashed p-2 text-center",
            selectedPayable.payable.mainDocumentUrl && "cursor-pointer",
          )}
        >
          <div className="border-primary flex h-10 w-10 items-center justify-center rounded-full border">
            <Upload />
          </div>
          <span className="font-semibold">Documento Gerador</span>
          <span className="text-sm font-light">
            {selectedPayable.payable.mainDocumentUrl
              ? "Clique para ter acesso ao documento gerador anexado"
              : "Documento gerador não encontrado"}
          </span>
        </div>
        <label className="col-span-7 flex flex-col gap-1">
          <span className="text-zinc-600">Pagamento Via</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  "relative flex h-8 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-12 xl:px-3 xl:py-2",
                  selectedPayable.bankAccountId && "border-primary",
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
                          (b) => b.id === selectedPayable.bankAccountId,
                        )?.name || "Selecione"
                      }
                      placeholder="Pagamento Via"
                      className="w-full flex-1 pl-4 text-center text-lg text-zinc-700 outline-none"
                      readOnly
                    />
                  </span>
                </div>
                <Edit
                  className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                  size={16}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
              {bankAccounts.map((b) => (
                <DropdownMenuItem
                  key={b.id}
                  onSelect={() =>
                    setSelectedPayable({
                      ...selectedPayable,
                      bankAccountId: b.id,
                    })
                  }
                >
                  {b.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        <label className="col-span-5 flex flex-col gap-1">
          <span className="text-zinc-600">Forma de Pagamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div
                className={cn(
                  "relative flex h-8 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-12 xl:px-3 xl:py-2",
                  selectedPayable.paymentType && "border-primary",
                )}
              >
                <DollarSign
                  className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                  size={16}
                />
                <div className="flex-1 text-lg text-zinc-700">
                  {selectedPayable.paymentType || "Selecione"}
                </div>
                <Edit
                  className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                  size={16}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={width > 768 ? "right" : "bottom"}
              align={width > 768 ? "start" : "end"}
              className="z-[999] w-72 border-zinc-200"
            >
              <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                <input
                  value={filterPaymentType}
                  onChange={(e) => setFilterPaymentType(e.target.value)}
                  placeholder="Pesquisar Forma de Pagamento"
                  className="flex-1 focus:outline-none"
                />
                <Search size={14} />
              </div>
              {paymentTypes
                .filter((f) =>
                  f.toLowerCase().includes(filterPaymentType.toLowerCase()),
                )
                .map((form) => (
                  <DropdownMenuItem
                    key={form}
                    onClick={() => {
                      setSelectedPayable({
                        ...selectedPayable,
                        paymentType: form,
                      });
                    }}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {form}
                      {selectedPayable.paymentType === form && (
                        <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              {paymentTypes.filter((f) =>
                f.toLowerCase().includes(filterPaymentType.toLowerCase()),
              ).length === 0 && (
                <div className="p-2 text-center text-sm text-zinc-600">
                  Nenhum item encontrado
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        <div className="col-span-12 my-4 h-px bg-zinc-200/60" />
      </div>
      <div>
        <h3 className="mb-4 text-base font-semibold">Detalhes do Pagamento</h3>
        <div className="mb-4 grid grid-cols-12 items-center gap-4">
          <div className="col-span-6 flex items-center gap-2">
            <div className="flex w-full flex-col text-[13px] font-medium text-zinc-600">
              <span className=""> Pagamento</span>
              <input
                value={selectedPayable.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                readOnly
                placeholder="R$ 0,00"
                className="border-primary h-12 w-full cursor-auto rounded-2xl border px-2 py-1 text-sm placeholder:text-zinc-500 focus:outline-none xl:h-12 xl:px-3 xl:py-2"
              />
            </div>
          </div>
          <div className="col-span-3 flex flex-col text-[13px] font-medium text-zinc-600">
            <span className="">Forma</span>

            <div
              className={cn(
                buttonBase,
                "flex h-8 items-center justify-center rounded-2xl px-2 py-1 text-center xl:h-12 xl:px-3 xl:py-2",
                selectedPayable.paymentType
                  ? "border-primary text-zinc-700"
                  : "border-zinc-200 text-zinc-500",
              )}
            >
              {selectedPayable.paymentType || "Selecione"}
            </div>
          </div>
          <div className="col-span-3 flex flex-col text-[13px] font-medium text-zinc-600">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <span className="">Data</span>

                  <div
                    className={cn(
                      "relative flex h-8 items-center justify-center rounded-2xl border px-2 py-1 text-sm placeholder:text-zinc-500 xl:h-12 xl:px-3 xl:py-2",
                      selectedPayable.dueDate && "border-primary",
                    )}
                  >
                    {selectedPayable.dueDate
                      ? moment(selectedPayable.dueDate).format("DD/MM/YYYY")
                      : moment().format("DD/MM/YYYY")}
                    <ChevronDown className="absolute top-1/2 right-0 -translate-y-1/2" />
                  </div>
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
                  selected={moment(selectedPayable.dueDate).toDate()}
                  onSelect={(e) =>
                    setSelectedPayable({
                      ...selectedPayable,
                      dueDate: moment(e).format("YYYY-MM-DD"),
                    })
                  }
                  initialFocus
                />
              </DropdownMenuContent>
            </DropdownMenu>
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
