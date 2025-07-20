import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Calendar } from "@/components/ui/calendar";
import {
  AlignLeft,
  CalendarIcon,
  CreditCard,
  DollarSign,
  Edit,
  FileText,
  Search,
} from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { DataType } from "./page";

interface Props {
  data: DataType;
  setData: (value: DataType) => void;
}

export function Step2({ data, setData }: Props) {
  /* -------------------------------------------------------------------------- */
  /*                                STATIC LISTS                                */
  /* -------------------------------------------------------------------------- */
  const creditCards = [
    "Itaú - C/c **333",
    "Itaú Invest. - **222",
    "Credito Itaú - Final 4455",
    "Bradesco - C/c **999",
    "Nubank - **5555",
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

  const paymentTerms = ["Total no Ato", "Parcelado", "Recorrente"];

  const installments = [
    "2 Pagamentos",
    "3 Pagamentos",
    "4 Pagamentos",
    "5 Pagamentos",
    "6 Pagamentos",
    "7 Pagamentos",
    "8 Pagamentos",
    "9 Pagamentos",
    "10 Pagamentos",
    "11 Pagamentos",
    "12 Pagamentos",
    "Outra - Digite aqui",
  ];

  /* -------------------------------------------------------------------------- */
  /*                               FILTER STATES                                */
  /* -------------------------------------------------------------------------- */
  const [filterCard, setFilterCard] = useState("");
  const [filterPaymentForm, setFilterPaymentForm] = useState("");
  const [filterInstallments, setFilterInstallments] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                              HELPER HANDLERS                               */
  /* -------------------------------------------------------------------------- */
  const handleSelectCard = (value: string) => {
    const [bank, account] = value.split(" - ");
    setData({
      ...data,
      paymentMethod: {
        bank: bank?.trim() ?? value,
        account: account?.trim() ?? "",
      },
    });
  };

  const handleSelectPaymentForm = (value: string) => {
    setData({ ...data, paymentForm: value });
  };

  const handleSelectPaymentTerm = (value: string) => {
    setData({ ...data, paymentTerms: value });
  };

  const handleSelectInstallment = (value: string) => {
    setData({ ...data, paymentDetails: value });
  };

  /* -------------------------------------------------------------------------- */
  /*                                 RENDERING                                  */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="flex-1">
      <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
        {/* --------------------- PAGAMENTO VIA --------------------- */}
        <label className="col-span-8 flex flex-col gap-1">
          <span className="text-zinc-600">Pagamento via</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <CreditCard className="text-primary" size={16} />
                </div>
                <div className="flex flex-1 flex-col text-left">
                  <span>
                    {data.paymentMethod.bank || "Método de Pagamento"}
                  </span>
                  <span className="text-zinc-400">
                    {data.paymentMethod.account || "Selecione"}
                  </span>
                </div>
                <div className="flex h-full w-6 justify-end">
                  <Edit className="text-primary" size={16} />
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="right"
              sideOffset={0}
              align="start"
              className="z-[999] w-72 border-zinc-200"
            >
              {/* Search */}
              <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                <input
                  value={filterCard}
                  onChange={(e) => setFilterCard(e.target.value)}
                  placeholder="Pesquisar Conta / Cartão"
                  className="flex-1 focus:outline-none"
                />
                <Search size={14} />
              </div>
              <div className="grid grid-cols-1 gap-2">
                {creditCards
                  .filter((c) =>
                    c.toLowerCase().includes(filterCard.toLowerCase()),
                  )
                  .map((card) => (
                    <DropdownMenuItem
                      key={card}
                      onClick={() => handleSelectCard(card)}
                      className="hover:bg-primary/20 cursor-pointer transition duration-300"
                    >
                      <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                        {card}
                        {data.paymentMethod.bank +
                          " - " +
                          data.paymentMethod.account ===
                          card && (
                          <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                {creditCards.filter((c) =>
                  c.toLowerCase().includes(filterCard.toLowerCase()),
                ).length === 0 && (
                  <div className="p-2 text-center text-sm text-zinc-600">
                    Nenhum item encontrado
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* --------------------- FORMA DE PAGAMENTO --------------------- */}
        <label className="col-span-4 flex flex-col gap-1">
          <span className="text-zinc-600">Forma de Pagamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <DollarSign className="text-primary" size={16} />
                </div>
                <div className="flex-1 text-lg text-zinc-700">
                  {data.paymentForm || "Selecione"}
                </div>
                <div className="flex h-full w-6 justify-end">
                  <Edit className="text-primary" size={16} />
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="right"
              align="start"
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
                  f.toLowerCase().includes(filterPaymentForm.toLowerCase()),
                )
                .map((form) => (
                  <DropdownMenuItem
                    key={form}
                    onClick={() => handleSelectPaymentForm(form)}
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

        <div className="col-span-12 grid grid-cols-11 gap-4">
          {/* --------------------- NÚMERO NO DOCUMENTO --------------------- */}
          <label className="col-span-5 flex flex-col gap-1">
            <span className="text-zinc-600">Número no Documento</span>
            <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
              <DollarSign className="text-primary" size={16} />
              <input
                value={data.documentNumber}
                onChange={(e) =>
                  setData({ ...data, documentNumber: e.target.value })
                }
                placeholder="Digite o número"
                className="flex-1 bg-transparent text-center text-lg text-zinc-700 outline-none"
              />
            </div>
          </label>

          {/* --------------------- DATAS --------------------- */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <label className="col-span-3 flex flex-col gap-1">
                <span className="text-zinc-600">Data Emissão</span>
                <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
                  <div className="flex h-full w-6">
                    <CalendarIcon className="text-primary" size={16} />
                  </div>
                  <div className="flex-1 text-lg text-zinc-700">
                    {data.issueDate
                      ? moment(data.issueDate).format("DD/MM/YYYY")
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
                selected={moment(data.issueDate).toDate()}
                onSelect={(date) => {
                  if (date) {
                    setData({ ...data, issueDate: moment(date).format() });
                  }
                }}
              />
            </DropdownMenuContent>
          </DropdownMenu>

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
        </div>

        {/* --------------------- CONDIÇÕES DE PAGAMENTO --------------------- */}
        <label className="col-span-4 flex flex-col gap-1">
          <span className="text-zinc-600">Condições de Pagamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <FileText className="text-primary" size={16} />
                <span className="flex-1 text-lg text-zinc-700">
                  {data.paymentTerms || "Selecione"}
                </span>
                <Edit className="text-primary ml-auto" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              sideOffset={0}
              align="end"
              className="z-[999] w-72 border-zinc-200"
            >
              {paymentTerms.map((term) => (
                <DropdownMenuItem
                  key={term}
                  onClick={() => handleSelectPaymentTerm(term)}
                  className="hover:bg-primary/20 cursor-pointer transition duration-300"
                >
                  <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                    {term}
                    {data.paymentTerms === term && (
                      <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* --------------------- DETALHES DO PAGAMENTO --------------------- */}
        <label className="col-span-8 flex flex-col gap-1">
          <span className="text-zinc-600">Detalhes do Pagamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <DollarSign className="text-primary" size={16} />
                <span className="flex-1 text-lg text-zinc-700">
                  {data.paymentDetails || "Selecione"}
                </span>
                <Edit className="text-primary ml-auto" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              sideOffset={0}
              className="z-[999] h-80 w-72 overflow-y-scroll border-zinc-200"
            >
              <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                <input
                  value={filterInstallments}
                  onChange={(e) => setFilterInstallments(e.target.value)}
                  placeholder="Pesquisar Detalhes"
                  className="flex-1 focus:outline-none"
                />
                <Search size={14} />
              </div>
              {installments
                .filter((ins) =>
                  ins.toLowerCase().includes(filterInstallments.toLowerCase()),
                )
                .map((ins) => (
                  <DropdownMenuItem
                    key={ins}
                    onClick={() => handleSelectInstallment(ins)}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {ins}
                      {data.paymentDetails === ins && (
                        <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              {installments.filter((ins) =>
                ins.toLowerCase().includes(filterInstallments.toLowerCase()),
              ).length === 0 && (
                <div className="p-2 text-center text-sm text-zinc-600">
                  Nenhum item encontrado
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* --------------------- DESCRIÇÃO --------------------- */}
        <div className="col-span-12 flex flex-col gap-1">
          <span className="text-zinc-600">Descrição</span>
          <div className="flex min-h-[96px] items-start gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <AlignLeft className="text-primary mt-1" size={16} />
            <textarea
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              placeholder="Digite sua observação"
              className="w-full resize-none border-none bg-transparent text-sm text-zinc-600 outline-none"
            />
            <Edit className="text-primary mt-1" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
