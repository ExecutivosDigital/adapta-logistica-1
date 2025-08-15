import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScreenWidth } from "@/lib/useScreenWidth";
import { cn } from "@/utils/cn";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Edit,
  MapPin,
  Search,
} from "lucide-react";
import { useState } from "react";
import { DataType } from "../page";

interface Props {
  data: DataType;
  hasBrokenIndividualRules: boolean;
  setHasBrokenIndividualRules: (value: boolean) => void;
}

export function Step2({
  data,
  hasBrokenIndividualRules,
  setHasBrokenIndividualRules,
}: Props) {
  const [filterPaymentForm, setFilterPaymentForm] = useState("");
  const { width } = useScreenWidth();

  const banks = [
    { code: "001", name: "Banco do Brasil" },
    { code: "237", name: "Bradesco" },
    { code: "341", name: "Itaú" },
    { code: "033", name: "Santander" },
  ];

  const paymentForms = [
    "PIX",
    "Boleto",
    "Cartão de Crédito",
    "Depósito",
    "Transferência Bancária",
    "Dinheiro em Mãos",
    "Fatura",
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span
          className={cn(
            "transition duration-200",
            hasBrokenIndividualRules ? "text-red-500" : "text-primary",
          )}
        >
          Cliente Pagador
        </span>
        <button
          onClick={() => setHasBrokenIndividualRules(!hasBrokenIndividualRules)}
          className={cn(
            "relative flex h-12 items-center gap-2 rounded-2xl border px-2 py-1 transition duration-200 xl:h-16 xl:px-3 xl:py-2",
            hasBrokenIndividualRules ? "border-red-500" : "border-primary",
          )}
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

        {!hasBrokenIndividualRules && (
          <>
            <div className="flex w-full gap-4">
              <div className="flex-1 space-y-1">
                <label className="block text-sm text-zinc-700">
                  Conta de Faturamento
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="border-primary relative flex h-12 w-full items-center justify-center gap-2 rounded-2xl border px-2 py-1 xl:h-16 xl:px-3 xl:py-2"
                    >
                      Selecione a Conta
                      <ChevronDown size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuArrow />
                    {banks.map((b) => (
                      <DropdownMenuItem
                        key={b.code}
                        className="hover:bg-primary/20 w-full cursor-pointer rounded px-4 py-2 text-sm transition duration-300"
                      >
                        {b.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <label className="flex flex-1 flex-col gap-1">
                <span className="text-sm text-zinc-600">Forma de Cobrança</span>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full focus:outline-none">
                    <div className="border-primary relative flex h-12 items-center gap-2 rounded-2xl border px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
                      <DollarSign
                        className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                        size={16}
                      />
                      <div className="flex-1 text-zinc-700 2xl:text-lg">
                        {data.paymentForm || "Selecione"}
                      </div>
                      <Edit
                        className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                        size={16}
                      />
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    side={width > 768 ? "right" : "top"}
                    align={width > 768 ? "start" : "end"}
                    className="z-[999] w-72 border-zinc-200"
                  >
                    <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                      <input
                        value={filterPaymentForm}
                        onChange={(e) => setFilterPaymentForm(e.target.value)}
                        placeholder="Pesquisar Forma de Pagamento"
                        className="flex-1 focus:outline-none"
                      />
                      <Search size={14} />
                    </div>
                    {paymentForms
                      .filter((f) =>
                        f
                          .toLowerCase()
                          .includes(filterPaymentForm.toLowerCase()),
                      )
                      .map((form) => (
                        <DropdownMenuItem
                          key={form}
                          className="hover:bg-primary/20 cursor-pointer transition duration-300"
                        >
                          <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                            {form}
                            {data.paymentForm === form && (
                              <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    {paymentForms.filter((f) =>
                      f.toLowerCase().includes(filterPaymentForm.toLowerCase()),
                    ).length === 0 && (
                      <div className="p-2 text-center text-sm text-zinc-600">
                        Nenhum item encontrado
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </label>
            </div>
            <div className="flex w-full gap-4">
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-sm text-zinc-600">Tipo de Serviço</span>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full focus:outline-none">
                    <div className="border-primary relative flex h-12 items-center gap-2 rounded-2xl border px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
                      <DollarSign
                        className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                        size={16}
                      />
                      <div className="flex-1 text-zinc-700 2xl:text-lg">
                        {data.paymentForm || "Selecione"}
                      </div>
                      <Edit
                        className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                        size={16}
                      />
                    </div>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </label>
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-sm text-zinc-600">
                  Condições de Pagamento
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full focus:outline-none">
                    <div className="border-primary relative flex h-12 items-center gap-2 rounded-2xl border px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
                      <DollarSign
                        className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                        size={16}
                      />
                      <div className="flex-1 text-zinc-700 2xl:text-lg">
                        {data.paymentForm || "Selecione"}
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
          </>
        )}
      </label>

      <div
        className={cn(
          "h-px w-full transition duration-200",
          hasBrokenIndividualRules ? "bg-red-500" : "bg-primary",
        )}
      />
      <span
        className={cn(
          "text-sm transition duration-200",
          hasBrokenIndividualRules ? "text-red-500" : "text-primary",
        )}
      >
        {hasBrokenIndividualRules ? "Alterações Necessárias:" : "Liberação"}
      </span>
      <span className="text-zinc-600">
        {hasBrokenIndividualRules
          ? "Divida a nota em duas faturas com valores menores que R$ 50.000,00 cada, ou ajuste o valor desta fatura para se enquadrar no limite permitido."
          : "Todas as Requisições de Recebimento deste cliente estão sendo respeitadas."}
      </span>
      {!hasBrokenIndividualRules && (
        <CheckCircle2 className="m-auto h-20 w-20 fill-green-500 text-white" />
      )}
    </div>
  );
}
