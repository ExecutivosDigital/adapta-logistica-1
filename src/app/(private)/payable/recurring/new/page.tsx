/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ResultCenterProps } from "@/@types/financial-data";
import { OrangeButton } from "@/components/OrangeButton";
import {
  AiFileReader,
  PaymentDocumentProps,
} from "@/components/ai-file-reader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApiContext } from "@/context/ApiContext";
import { useBranch } from "@/context/BranchContext";
import { useFinancialDataContext } from "@/context/FinancialDataContext";
import { useLoadingContext } from "@/context/LoadingContext";
import { cn } from "@/utils/cn";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  DollarSign,
  Loader2,
  MapPin,
  X,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AccountingModal } from "./components/accounting-modal";
import CreateSupplierSheet from "./components/create-client-sheet";
import LaunchTypeModal from "./components/launch-type-modal";
import { Step1 } from "./components/step1";
import { Step3 } from "./components/step3";
import { SupplierModal } from "./components/supplier-modal";

export interface DataType {
  businessUnitId: string;
  dueDate: string;
  installmentCount: number;
  ledgerAccountId: string;
  paymentMode: "FULL" | "INSTALLMENT";
  paymentType?: string;
  resultCenters: {
    resultCenterId: string;
    value: number;
    locked?: boolean;
    name?: string;
  }[];
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";
  subsidiaryId: string;
  supplierId: string;
  transactions: {
    dueDate: string;
    position: number;
    status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";
    value: number;
    paymentType: string;
    locked?: boolean;
  }[];
  type: "EXPENSE" | "FEE" | "COST" | "RECURRING";
  mainDocumentUrl?: string;
  referenceMonth: number | null;
  value: number;
}

export interface ClientProps {
  name: string;
  cnpj: string;
}

export default function NewRecurringPayable() {
  const { handleNavigation } = useLoadingContext();
  const router = useRouter();
  const { PostAPI } = useApiContext();
  const {
    branches,
    selectedBranch,
    setSelectedBranch,
    businessUnits,
    selectedBusinessUnit,
    setSelectedBusinessUnit,
  } = useBranch();
  const { resultCenters } = useFinancialDataContext();

  const [isOpenSupplierModal, setIsOpenSupplierModal] = useState(false);
  const [isOpenLaunchTypeModal, setIsOpenLaunchTypeModal] = useState(false);
  const [openCreateSupplierSheet, setOpenCreateSupplierSheet] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [steps, setSteps] = useState(1);
  const [isOpenContabilAccountModal, setIsOpenContabilAccountModal] =
    useState(false);
  const [selectedResultCenters, setSelectedResultCenters] = useState<
    ResultCenterProps[]
  >([]);
  const [paymentType, setPaymentType] = useState("FULL");

  const [data, setData] = useState<DataType>({
    businessUnitId: selectedBusinessUnit?.id || "",
    dueDate: "",
    installmentCount: 0,
    ledgerAccountId: "",
    paymentMode: "INSTALLMENT",
    referenceMonth: null,
    resultCenters: [],
    status: "PENDING",
    subsidiaryId: selectedBranch?.id || "",
    supplierId: "",
    transactions: [],
    type: "RECURRING",
    value: 0,
    mainDocumentUrl: "",
  });

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

      const grandTotal =
        paymentType === "FULL"
          ? data.value
          : data.value * data.installmentCount;
      const remainingValue = grandTotal - lockedTotal;

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

  const handleData = (
    summaryData: PaymentDocumentProps,
    documentUrl: string,
  ) => {
    setData((prevData) => ({
      ...prevData,
      value: summaryData.value,
      dueDate: moment(summaryData.dueDate).format("DD/MM/YYYY"),
      mainDocumentUrl: documentUrl,
    }));
  };

  async function CreatePayable() {
    setIsCreating(true);
    const create = await PostAPI(
      "/payable",
      {
        ...data,
        dueDate: moment(data.dueDate).toDate(),
        resultCenters: data.resultCenters.map((center) => ({
          ...center,
          value: Number(center.value),
        })),
        value:
          paymentType === "FULL"
            ? data.value
            : data.value * data.installmentCount,
        isTotalValue: paymentType === "FULL" ? true : false,
      },
      true,
    );
    if (create.status === 200) {
      toast.success("À Pagar Recorrente criado com sucesso!");
      handleNavigation("/calendar");
      return setIsCreating(false);
    }
    toast.error("Erro ao criar À Pagar Recorrente, tente novamente");
    return setIsCreating(false);
  }

  useEffect(() => {
    if (selectedBranch) {
      setData({
        ...data,
        subsidiaryId: selectedBranch.id,
      });
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedBusinessUnit) {
      setData({
        ...data,
        businessUnitId: selectedBusinessUnit.id,
      });
    }
  }, [selectedBusinessUnit]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  const HandleNextStep = () => {
    if (steps === 1) {
      if (
        data.supplierId === "" ||
        data.ledgerAccountId === "" ||
        data.value === 0 ||
        data.resultCenters.length === 0
      ) {
        return toast.error("Preencha todos os campos obrigatórios");
      } else {
        setSteps((s) => s + 1);
      }
    } else if (steps === 2) {
      if (
        data.transactions.length === 0 ||
        data.transactions.find((t) => t.paymentType === "")
      ) {
        return toast.error("Preencha todos os campos obrigatórios");
      } else {
        return CreatePayable();
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-hidden pb-20 xl:pb-0">
        <header className="relative flex items-center justify-center border-b border-orange-200 border-b-zinc-400 px-8 py-4">
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
          <section className="flex flex-1 flex-col px-2 pt-2 pb-4 xl:px-12 xl:pt-10">
            <div className="flex w-full justify-between">
              <div className="flex gap-2">
                <ChevronLeft
                  onClick={() => setSteps((s) => s - 1)}
                  className={cn("cursor-pointer", steps === 1 && "hidden")}
                />
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">
                    Fatura Recorrente À Pagar
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
                  {data.value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                </h2>
                <span className="flex items-center gap-1 text-sm text-zinc-600">
                  {paymentType === "FULL"
                    ? "Preço da Fatura"
                    : "Preço da Parcela"}
                </span>
              </div>
            </div>
            <div className="my-4 h-px bg-zinc-200/60" />
            <div className="flex items-center justify-between gap-4">
              <label className="flex w-1/2 flex-col gap-1">
                <span className="text-zinc-600">Filial</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled={isCreating}>
                    <button
                      className={cn(
                        "relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2",
                        data.subsidiaryId &&
                          "bg-primary/20 border-primary transition duration-200",
                      )}
                    >
                      <MapPin
                        size={16}
                        className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                      />
                      <div className="flex flex-1 flex-col">
                        <span className="flex-1 2xl:text-lg">
                          {selectedBranch?.name}
                        </span>
                      </div>
                      <ChevronDown
                        size={16}
                        className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[var(--radix-dropdown-menu-trigger-width)]"
                    side="top"
                  >
                    {branches.map((branch) => (
                      <DropdownMenuItem
                        className={cn(
                          selectedBranch?.id === branch.id && "bg-primary/20",
                        )}
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch)}
                      >
                        {branch.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </label>
              <label className="flex w-1/2 flex-col gap-1">
                <span className="text-zinc-600">Unidade de Negócio</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled={isCreating}>
                    <button
                      className={cn(
                        "relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2",
                        data.businessUnitId &&
                          "bg-primary/20 border-primary transition duration-200",
                      )}
                    >
                      <MapPin
                        size={16}
                        className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                      />
                      <div className="flex flex-1 flex-col">
                        <span className="flex-1 2xl:text-lg">
                          {selectedBusinessUnit?.name}
                        </span>
                      </div>
                      <ChevronDown
                        size={16}
                        className="text-primary absolute top-1 right-1 xl:top-2 xl:right-2"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[var(--radix-dropdown-menu-trigger-width)]"
                    side="top"
                  >
                    {businessUnits.map((businessUnit) => (
                      <DropdownMenuItem
                        className={cn(
                          selectedBusinessUnit?.id === businessUnit.id &&
                            "bg-primary/20",
                        )}
                        key={businessUnit.id}
                        onClick={() => setSelectedBusinessUnit(businessUnit)}
                      >
                        {businessUnit.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </label>
            </div>
            <div className="my-4 h-px bg-zinc-200/60" />
            {steps === 1 ? (
              <Step1
                data={data}
                setData={setData}
                selectedResultCenters={selectedResultCenters}
                setSelectedResultCenters={setSelectedResultCenters}
                handleResultCenterToggle={handleResultCenterToggle}
                setIsOpenSupplierModal={setIsOpenSupplierModal}
                setIsOpenContabilidadeModal={setIsOpenContabilAccountModal}
                setIsOpenLaunchTypeModal={setIsOpenLaunchTypeModal}
                paymentType={paymentType}
                setPaymentType={setPaymentType}
                isCreating={isCreating}
              />
            ) : steps === 2 ? (
              <Step3
                data={data}
                setData={setData}
                paymentType={paymentType}
                setPaymentType={setPaymentType}
                isCreating={isCreating}
              />
            ) : (
              <></>
            )}
            {steps === 1 ? (
              <footer className="mt-4 flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => router.back()}
                    className="h-9 rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                  >
                    Salvar rascunho
                  </button>

                  <OrangeButton
                    className="h-9 w-[132px]"
                    onClick={HandleNextStep}
                    icon={<ChevronDown size={16} className="-rotate-90" />}
                    iconPosition="right"
                  >
                    Continuar
                  </OrangeButton>
                </div>
              </footer>
            ) : steps === 2 ? (
              <footer className="mt-auto flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
                <button
                  onClick={() => router.back()}
                  className="h-9 w-max rounded-lg border border-zinc-300 px-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                >
                  Salvar rascunho
                </button>

                <OrangeButton
                  className="h-9 w-[132px]"
                  onClick={HandleNextStep}
                  icon={<ChevronDown size={16} className="-rotate-90" />}
                  iconPosition="right"
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Criando...</span>
                    </>
                  ) : (
                    "Criar"
                  )}
                </OrangeButton>
              </footer>
            ) : (
              <></>
            )}
          </section>

          <div className="w-px bg-orange-200" />

          <section className="bg-primary/10 flex flex-1 items-center justify-center p-4">
            <AiFileReader handleData={handleData} />
          </section>
        </main>

        {/* FOOTER -------------------------------------------------------- */}
      </div>
      {openCreateSupplierSheet && (
        <CreateSupplierSheet
          open={openCreateSupplierSheet}
          onOpenChange={setOpenCreateSupplierSheet}
        />
      )}
      {isOpenSupplierModal && (
        <SupplierModal
          setOpenCreateSupplierSheet={setOpenCreateSupplierSheet}
          isOpenSupplierModal={isOpenSupplierModal}
          setIsOpenSupplierModal={setIsOpenSupplierModal}
          data={data}
          setData={setData}
        />
      )}
      {isOpenLaunchTypeModal && (
        <LaunchTypeModal
          show={isOpenLaunchTypeModal}
          onClose={() => setIsOpenLaunchTypeModal(false)}
          data={data}
          setData={setData}
        />
      )}
      {isOpenContabilAccountModal && (
        <AccountingModal
          isOpenContabilAccountModal={isOpenContabilAccountModal}
          setIsOpenContabilAccountModal={setIsOpenContabilAccountModal}
          data={data}
          setData={setData}
        />
      )}
    </>
  );
}
