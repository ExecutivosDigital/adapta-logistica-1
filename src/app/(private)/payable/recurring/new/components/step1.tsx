import { ResultCenterProps } from "@/@types/financial-data";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import { useFinancialDataContext } from "@/context/FinancialDataContext";
import { useScreenWidth } from "@/lib/useScreenWidth";
import { cn } from "@/utils/cn";
import { getLocalTimeZone } from "@internationalized/date";
import {
  Building2,
  CalendarIcon,
  Check,
  DollarSign,
  Edit,
  FileText,
  MapPin,
  Search,
} from "lucide-react";
import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";
import { DateValue } from "react-aria-components";
import { DataType } from "../page";
import { ResultCentersList } from "./result-centers-list";
moment.locale("pt-br");

interface Props {
  setIsOpenSupplierModal: (value: boolean) => void;
  setIsOpenContabilidadeModal: (value: boolean) => void;
  setIsOpenLaunchTypeModal: (value: boolean) => void;
  data: DataType;
  setData: (value: DataType) => void;
  selectedResultCenters: ResultCenterProps[];
  setSelectedResultCenters: React.Dispatch<
    React.SetStateAction<ResultCenterProps[]>
  >;
  handleResultCenterToggle: (resultCenterName: string) => void;
  paymentType: string;
  setPaymentType: React.Dispatch<React.SetStateAction<string>>;
  isCreating: boolean;
}

export function Step1({
  setIsOpenSupplierModal,
  data,
  setData,
  setIsOpenLaunchTypeModal,
  setIsOpenContabilidadeModal,
  selectedResultCenters,
  setSelectedResultCenters,
  handleResultCenterToggle,
  paymentType,
  setPaymentType,
  isCreating,
}: Props) {
  const installments = [
    "12",
    "24",
    "36",
    "48",
    "60",
    "72",
    "84",
    "96",
    "108",
    "120",
  ];

  const { width } = useScreenWidth();
  const { suppliers, ledgerAccounts, resultCenters } =
    useFinancialDataContext();

  const [filteredResultCenters, setFilteredResultCenters] = useState("");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [filterInstallments, setFilterInstallments] = useState("");
  const [isCustomInputActive, setIsCustomInputActive] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    const amountNumber = Number(onlyDigits) / 100;

    setData({ ...data, value: amountNumber });
  };

  const handleDateChange = (value: DateValue | null) => {
    if (!value) {
      setData({ ...data, referenceMonth: null });
      return;
    }

    const date =
      "toDate" in value ? value.toDate(getLocalTimeZone()) : (value as Date);

    const monthNumber = moment(date).month();
    setData({ ...data, referenceMonth: monthNumber });
  };

  return (
    <>
      <div className="flex-1">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="mt-2 flex gap-2">
            <div className="bg-primary/40 relative flex w-96 flex-row overflow-hidden rounded-lg p-2">
              <div
                className={`absolute top-0 bottom-0 left-0 flex w-1/2 transform items-center justify-center transition-transform duration-300 ${paymentType === "FULL" ? "translate-x-0 pl-2" : "translate-x-full"}`}
              >
                <div className="bg-primary h-[80%] w-[95%] rounded-lg"></div>
              </div>
              <button
                onClick={() => setPaymentType("FULL")}
                disabled={isCreating}
                className={`relative z-10 w-1/2 px-4 py-1 text-sm transition-all duration-300 ${paymentType === "FULL" ? "font-semibold text-white" : "text-white/80"}`}
              >
                VALOR INTEIRO
              </button>
              <button
                onClick={() => setPaymentType("DIVIDED")}
                disabled={isCreating}
                className={`relative z-10 w-1/2 px-4 py-1 text-sm transition-all duration-300 ${paymentType === "DIVIDED" ? "font-semibold text-white" : "text-white/80"}`}
              >
                VALOR DA PARCELA
              </button>
            </div>
          </div>
        </div>
        <div className="my-4 h-px bg-zinc-200/60" />
        <div className="grid grid-cols-12 gap-2 text-sm text-zinc-700 xl:gap-4">
          <label className="col-span-7 flex flex-col gap-1">
            <span className="text-zinc-600">
              {data.type === "EXPENSE"
                ? "Fornecedor"
                : data.type === "FEE"
                  ? "Impostos"
                  : "Parceiro"}
            </span>
            <button
              onClick={() => setIsOpenSupplierModal(true)}
              disabled={isCreating}
              className={cn(
                "relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2",
                data.supplierId &&
                  "bg-primary/20 border-primary transition duration-200",
              )}
            >
              <MapPin
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex flex-1 flex-col">
                <span className="flex-1 2xl:text-lg">
                  {suppliers.find((s) => s.id === data.supplierId)?.name ||
                    "Selecione"}
                </span>
                <span className="text-zinc-400">
                  {suppliers.find((s) => s.id === data.supplierId)?.cnpj || ""}
                </span>
              </div>
              <Edit
                size={16}
                className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
              />
            </button>
          </label>

          <label className="col-span-5 flex flex-col gap-1">
            <span className="text-zinc-600">
              {data.type === "EXPENSE"
                ? "Tipo de Lançamento"
                : data.type === "FEE"
                  ? "Imposto - Código"
                  : "Tipo de Lançamento"}
            </span>
            <button
              onClick={() => setIsOpenLaunchTypeModal(true)}
              disabled={isCreating}
              className={cn(
                "relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2",
                data.ledgerAccountId &&
                  "bg-primary/20 border-primary transition duration-200",
              )}
            >
              <DollarSign
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 items-center">
                <span className="flex-1 2xl:text-lg">
                  {ledgerAccounts.find((l) => l.id === data.ledgerAccountId)
                    ?.name || "Selecione"}
                </span>
              </div>
              <Edit
                size={16}
                className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
              />
            </button>
          </label>

          <div className="col-span-12 grid grid-cols-11 gap-2 xl:gap-4">
            <label className="col-span-5 flex flex-col gap-1">
              <span className="text-zinc-600">
                Valor {paymentType === "FULL" ? " Total" : " da Parcela"}
              </span>
              <div
                className={cn(
                  "relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2",
                  data.value &&
                    "bg-primary/20 border-primary transition duration-200",
                )}
              >
                <DollarSign
                  size={16}
                  className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                />
                <div className="flex h-full w-full flex-1 items-center justify-center text-center">
                  <input
                    value={data.value.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    disabled={isCreating}
                    onChange={handleChange}
                    placeholder="R$ 0,00"
                    className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
                  />
                </div>
              </div>
            </label>

            <label className="col-span-3 flex flex-col gap-1">
              <span className="text-zinc-600">Mês Referência</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isCreating}>
                  <div
                    className={cn(
                      "relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2",
                      data.referenceMonth !== null &&
                        "bg-primary/20 border-primary transition duration-200",
                    )}
                  >
                    <CalendarIcon
                      size={16}
                      className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                    />
                    <div className="flex-1 text-zinc-700 2xl:text-lg">
                      {data.referenceMonth !== null
                        ? moment().month(data.referenceMonth).format("MMM")
                        : "Selecione"}
                    </div>
                    <Edit
                      size={16}
                      className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                    />
                    <SimpleDatePicker
                      value={
                        data.referenceMonth !== null
                          ? moment().month(data.referenceMonth).toDate()
                          : null
                      }
                      view="month"
                      invisible
                      onChange={handleDateChange}
                    />
                  </div>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </label>

            <label className="col-span-3 flex flex-col gap-1">
              <span className="text-zinc-600">Vencimento</span>
              <DropdownMenu
                open={isDateDropdownOpen}
                onOpenChange={setIsDateDropdownOpen}
              >
                <DropdownMenuTrigger asChild disabled={isCreating}>
                  <div
                    className={cn(
                      "relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2",
                      data.dueDate &&
                        "bg-primary/20 border-primary transition duration-200",
                    )}
                  >
                    <CalendarIcon
                      size={16}
                      className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                    />
                    <div className="flex-1 text-zinc-700 2xl:text-lg">
                      {data.dueDate
                        ? moment(data.dueDate).format("DD/MM/YYYY")
                        : "Selecione"}
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
                    selected={moment(data.dueDate).toDate()}
                    onSelect={(date) => {
                      if (date) {
                        setData({ ...data, dueDate: moment(date).format() });
                        setIsDateDropdownOpen(false);
                      }
                    }}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </label>
          </div>

          <label className="col-span-5 flex flex-col gap-1">
            <span className="text-zinc-600">Condições de Pagamento</span>
            <div
              className={cn(
                "relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2",
                "bg-primary/20 border-primary",
              )}
            >
              <FileText
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <span className="flex-1 text-zinc-700 2xl:text-lg">
                Recorrente
              </span>
            </div>
          </label>

          <label className="col-span-7 flex flex-col gap-1">
            <span className="text-zinc-600">Quantidade de Pagamentos</span>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="w-full focus:outline-none"
                disabled={isCreating}
              >
                <div
                  className={cn(
                    "relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2",
                    data.installmentCount !== 0 &&
                      "bg-primary/20 border-primary transition duration-200",
                  )}
                >
                  <DollarSign
                    size={16}
                    className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                  />
                  <span className="flex-1 text-zinc-700 2xl:text-lg">
                    {data.installmentCount !== 0
                      ? data.installmentCount
                      : "Selecione"}
                    {data.installmentCount !== 0 && " Pagamento(s)"}
                  </span>
                  <Edit
                    size={16}
                    className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={width > 768 ? "right" : "top"}
                sideOffset={0}
                align="end"
                className="z-[999] h-80 w-72 overflow-y-scroll border-zinc-200 pt-4"
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

                {data.paymentMode === "INSTALLMENT" ? (
                  <>
                    {installments
                      .filter((ins) =>
                        ins
                          .toLowerCase()
                          .includes(filterInstallments.toLowerCase()),
                      )
                      .map((ins) => (
                        <DropdownMenuItem
                          key={ins}
                          onClick={() => {
                            setData({ ...data, installmentCount: Number(ins) });
                            setIsCustomInputActive(false);
                          }}
                          className="hover:bg-primary/20 cursor-pointer transition duration-300"
                        >
                          <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                            {ins}
                            {data.installmentCount === Number(ins) && (
                              <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))}

                    {/* Custom input option */}
                    {!isCustomInputActive ? (
                      <DropdownMenuItem
                        onClick={(e) => {
                          setIsCustomInputActive(true);
                          setCustomValue("");
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        className="hover:bg-primary/20 cursor-pointer transition duration-300"
                      >
                        <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                          Outra - Digite aqui
                        </div>
                      </DropdownMenuItem>
                    ) : (
                      <div className="px-2 py-1">
                        <div className="flex w-full flex-row items-center gap-2 border-b border-b-zinc-400 p-1 py-2">
                          <input
                            type="number"
                            value={customValue}
                            onChange={(e) => setCustomValue(e.target.value)}
                            placeholder="Digite o número de parcelas"
                            className="flex-1 bg-transparent focus:outline-none"
                            autoFocus
                            onKeyDown={(e) => {
                              e.stopPropagation(); // Prevent dropdown from handling this
                              if (e.key === "Enter" && customValue.trim()) {
                                setData({
                                  ...data,
                                  installmentCount: Number(customValue),
                                });
                                setIsCustomInputActive(false);
                                setCustomValue("");
                              } else if (e.key === "Escape") {
                                setIsCustomInputActive(false);
                                setCustomValue("");
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              if (customValue.trim()) {
                                setData({
                                  ...data,
                                  installmentCount: Number(customValue),
                                });
                              }
                              setIsCustomInputActive(false);
                              setCustomValue("");
                            }}
                            className="text-primary hover:text-primary/80 text-sm"
                          >
                            ✓
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setIsCustomInputActive(false);
                              setCustomValue("");
                            }}
                            className="text-sm text-zinc-500 hover:text-zinc-700"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <DropdownMenuItem
                    onClick={() => setData({ ...data, installmentCount: 1 })}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      Pagamento Único
                      <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                    </div>
                  </DropdownMenuItem>
                )}

                {installments.filter((ins) =>
                  ins.toLowerCase().includes(filterInstallments.toLowerCase()),
                ).length === 0 &&
                  !isCustomInputActive && (
                    <div className="p-2 text-center text-sm text-zinc-600">
                      Nenhum item encontrado
                    </div>
                  )}
              </DropdownMenuContent>
            </DropdownMenu>
          </label>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Centro de Custos</span>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="w-full focus:outline-none"
                disabled={isCreating}
              >
                <div
                  className={cn(
                    "relative flex h-12 items-center gap-2 overflow-hidden rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2",
                    data.resultCenters.length !== 0 &&
                      "bg-primary/20 border-primary transition duration-200",
                  )}
                >
                  <Building2
                    size={16}
                    className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                  />
                  <div className="flex h-full flex-1 items-center">
                    <span className="ml-4 flex flex-1 flex-col text-left">
                      {selectedResultCenters.length > 0
                        ? `${selectedResultCenters.length} selecionado${selectedResultCenters.length > 1 ? "s" : ""}`
                        : "Selecione"}
                      {selectedResultCenters.length === 0 && (
                        <span className="text-sm text-zinc-500">
                          Selecionar
                        </span>
                      )}
                      {selectedResultCenters.length > 0 && (
                        <span className="truncate text-sm text-zinc-500">
                          {selectedResultCenters
                            .slice(0, 2)
                            .map((cc) => cc.name)
                            .join(", ")}
                          {selectedResultCenters.length > 2 &&
                            ` +${selectedResultCenters.length - 2}`}
                        </span>
                      )}
                    </span>
                  </div>
                  <Edit
                    size={16}
                    className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={width > 768 ? "right" : "top"}
                align={width > 768 ? "end" : "start"}
                className="z-[999] h-[500px] overflow-y-auto rounded-lg border-zinc-200 pt-4"
              >
                <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                  <input
                    value={filteredResultCenters}
                    onChange={(e) => setFilteredResultCenters(e.target.value)}
                    placeholder="Pesquisar Centro de Custos"
                    className="flex-1 focus:outline-none"
                  />
                  <Search size={14} />
                </div>

                {/* Add clear all button */}
                {selectedResultCenters.length > 0 && (
                  <div className="px-8 pb-2">
                    <button
                      onClick={() => {
                        setSelectedResultCenters([]);
                        setData({ ...data, resultCenters: [] });
                      }}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Limpar seleção
                    </button>
                  </div>
                )}

                <div className="flex flex-col">
                  {resultCenters
                    .filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(filteredResultCenters.toLowerCase()),
                    )
                    .map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleResultCenterToggle(item.id);
                        }}
                        className="hover:bg-primary/20 cursor-pointer transition duration-300"
                      >
                        <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                          {item.name}
                          {selectedResultCenters.some(
                            (cc) => cc.name === item.name,
                          ) && (
                            <div className="border-primary bg-primary flex h-4 w-4 items-center justify-center rounded-md border">
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </label>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Conta Contábil</span>
            <button
              onClick={() => setIsOpenContabilidadeModal(true)}
              disabled={isCreating}
              className={cn(
                "relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2",
                data.ledgerAccountId &&
                  "bg-primary/20 border-primary transition duration-200",
              )}
            >
              <MapPin
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="ml-4 flex flex-1 flex-col overflow-hidden text-left">
                <span className="flex-1">
                  {ledgerAccounts.find((l) => l.id === data.ledgerAccountId)
                    ?.code || "-"}
                </span>
                <span className="truncate text-zinc-400">
                  {ledgerAccounts.find((l) => l.id === data.ledgerAccountId)
                    ?.name || "Selecione"}
                </span>
              </div>
              <Edit
                size={16}
                className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
              />
            </button>
          </label>
        </div>
        {data.resultCenters.length > 0 && (
          <ResultCentersList
            data={data}
            setData={setData}
            paymentType={paymentType}
          />
        )}
      </div>
    </>
  );
}
