/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResultCenterProps } from "@/@types/financial-data";
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
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  Building2,
  CalendarIcon,
  Check,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Edit,
  MapPin,
  Search,
} from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { DataType } from "../page";
import { ResultCentersList } from "./result-centers-list";

interface Props {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  hasBrokenIndividualRules: boolean;
  setHasBrokenIndividualRules: (value: boolean) => void;
}

export function Step2({
  data,
  setData,
  hasBrokenIndividualRules,
  setHasBrokenIndividualRules,
}: Props) {
  const { width } = useScreenWidth();
  const { resultCenters } = useFinancialDataContext();
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [filteredResultCenters, setFilteredResultCenters] = useState("");
  const [selectedResultCenters, setSelectedResultCenters] = useState<
    ResultCenterProps[]
  >([]);

  const banks = [
    { code: "001", name: "Banco do Brasil" },
    { code: "237", name: "Bradesco" },
    { code: "341", name: "Itaú" },
    { code: "033", name: "Santander" },
    { code: "000", name: "Asaas" },
  ];

  const handleResultCenterToggle = (ResultCenterId: string) => {
    const isSelected = selectedResultCenters.some(
      (cc) => cc.id === ResultCenterId,
    );
    let updatedSelectedCenters;
    let updatedResultCenters;
    if (isSelected) {
      updatedSelectedCenters = selectedResultCenters.filter(
        (cc) => cc.id !== ResultCenterId,
      );
      updatedResultCenters = data.resultCenters.filter(
        (cc) => cc.resultCenterId !== ResultCenterId,
      );
    } else {
      const newResultCenter = {
        name:
          resultCenters.find((center) => center.id === ResultCenterId)?.name ||
          "",
        resultCenterId: ResultCenterId,
        value: 0,
        locked: false,
      };
      updatedSelectedCenters = [...selectedResultCenters, newResultCenter];
      updatedResultCenters = [...data.resultCenters, newResultCenter];
    }
    setSelectedResultCenters(updatedSelectedCenters as ResultCenterProps[]);
    if (updatedResultCenters.length > 0) {
      const lockedCenters = updatedResultCenters.filter(
        (center) => center.locked,
      );
      const unlockedCenters = updatedResultCenters.filter(
        (center) => !center.locked,
      );
      const lockedTotal = lockedCenters.reduce(
        (sum, center) => sum + (center.value || 0),
        0,
      );
      const remainingValue = data.value - lockedTotal;
      if (unlockedCenters.length > 0 && remainingValue >= 0) {
        const remainingCents = Math.round(remainingValue * 100);
        const baseValueCents = Math.floor(
          remainingCents / unlockedCenters.length,
        );
        const remainder = remainingCents % unlockedCenters.length;
        const finalUpdatedResultCenters = updatedResultCenters.map(
          (center, index) => {
            if (center.locked) {
              return center;
            }
            const unlockedIndex = unlockedCenters.findIndex(
              (uc) =>
                updatedResultCenters.findIndex((dc) => dc === uc) === index,
            );
            const extraCent = unlockedIndex < remainder ? 1 : 0;
            const finalValueCents = baseValueCents + extraCent;
            const finalValue = (finalValueCents / 100).toFixed(2);
            return {
              ...center,
              value: finalValue,
            };
          },
        );
        setData({ ...data, resultCenters: finalUpdatedResultCenters as any });
      } else {
        setData({ ...data, resultCenters: updatedResultCenters as any });
      }
    } else {
      setData({ ...data, resultCenters: [] });
    }
  };

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
        <div
          onClick={() => setHasBrokenIndividualRules(!hasBrokenIndividualRules)}
          className={cn(
            "relative flex h-12 items-center justify-center gap-2 rounded-2xl border px-2 py-1 text-center transition duration-200 xl:h-16 xl:px-3 xl:py-2",
            hasBrokenIndividualRules ? "border-red-500" : "border-primary",
          )}
        >
          <MapPin
            size={16}
            className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
          />
          <div className="flex flex-1 flex-col">
            <span className="flex-1 2xl:text-lg">Cliente Tal</span>
            <span className="text-xs text-zinc-400">00.000.000/0000-00</span>
            <span className="text-xs text-zinc-400">Rua Tal, 123</span>
          </div>
        </div>
      </label>

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
                    {banks.find((b) => b.code === data.bankAccountId)?.name ||
                      "Selecione a Conta"}
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuArrow />
                  {banks.map((b) => (
                    <DropdownMenuItem
                      key={b.code}
                      onSelect={() => {
                        setData({
                          ...data,
                          bankAccountId: b.code,
                        });
                      }}
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
                  <DropdownMenuItem
                    onSelect={() => {
                      setData({
                        ...data,
                        paymentForm: "Boleto",
                      });
                    }}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      Boleto
                    </div>
                  </DropdownMenuItem>
                  {data.bankAccountId !== "000" && (
                    <DropdownMenuItem
                      onSelect={() => {
                        setData({
                          ...data,
                          paymentForm: "Depósito",
                        });
                      }}
                      className="hover:bg-primary/20 cursor-pointer transition duration-300"
                    >
                      <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                        Depósito
                      </div>
                    </DropdownMenuItem>
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
                      {data.serviceType || "Selecione"}
                    </div>
                    <Edit
                      className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                      size={16}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onSelect={() => {
                      setData({
                        ...data,
                        serviceType: "CTEs",
                      });
                    }}
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      CTEs
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      setData({
                        ...data,
                        serviceType: "NFSes",
                      });
                    }}
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      NFSes
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      setData({
                        ...data,
                        serviceType: "Fretes Retorno",
                      });
                    }}
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      Fretes Retorno
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </label>
            <label className="flex flex-1 flex-col gap-1">
              <span className="text-zinc-600">Data de Cobrança</span>
              <DropdownMenu
                open={isDateDropdownOpen}
                onOpenChange={setIsDateDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <div className="border-primary relative flex h-12 items-center gap-2 rounded-2xl border px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
                    <CalendarIcon
                      className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                      size={16}
                    />
                    <div className="flex-1 text-zinc-700 2xl:text-lg">
                      {data.issueDate
                        ? moment(data.issueDate).format("DD/MM/YYYY")
                        : moment().format("DD/MM/YYYY")}
                    </div>
                    <Edit
                      className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                      size={16}
                    />
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
                    selected={
                      moment(data.issueDate).toDate() || moment().toDate()
                    }
                    onSelect={(date) => {
                      if (date) {
                        setData({ ...data, issueDate: moment(date).format() });
                        setIsDateDropdownOpen(false);
                      }
                    }}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </label>
          </div>
          <label className="flex flex-1 flex-col gap-1">
            <span className="text-zinc-600">Centro de Custos</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full focus:outline-none">
                <div className="border-primary relative flex h-12 items-center gap-2 overflow-hidden rounded-2xl border px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
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
          {data.resultCenters.length > 0 && (
            <ResultCentersList data={data} setData={setData} />
          )}
        </>
      )}

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
