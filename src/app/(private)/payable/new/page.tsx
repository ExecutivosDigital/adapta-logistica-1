/* app/(dashboard)/create-business-unit/page.tsx */
"use client";
import { SupplierProps } from "@/@types/financial-data";
import { OrangeButton } from "@/components/OrangeButton";
import { AiFileReader } from "@/components/ai-file-reader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApiContext } from "@/context/ApiContext";
import { useBranch } from "@/context/BranchContext";
import { useFinancialDataContext } from "@/context/FinancialDataContext";
import { cn } from "@/utils/cn";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  DollarSign,
  MapPin,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AccontsType, Accounts } from "./components/acconts";
import { AccountingModal } from "./components/accounting-modal";
import CreateClientSheet from "./components/create-client-sheet";
import LaunchTypeModal from "./components/launch-type-modal";
import { Step1 } from "./components/step1";
import { Step3 } from "./components/step3";
import { SupplierModal } from "./components/supplier-modal";

export interface DataType {
  businessUnitId: string;
  dueDate: string;
  installmentCount: string;
  ledgerAccountId: string;
  paymentMode: "FULL" | "INSTALLMENT";
  resultCenters: {
    resultCenterId: string;
    value: string;
    locked?: boolean;
  }[];
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";
  subsidiaryId: string;
  supplierId: string;
  transactions: {
    dueDate: string;
    position: string;
    status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";
    value: number;
    paymentType: string;
    locked?: boolean;
  }[];
  type: "EXPENSES" | "FEE" | "COST" | "RECURRING";
  mainDocumentUrl?: string;
  referenceMonth: number | null;
  value: number;
}

export interface ClientProps {
  name: string;
  cnpj: string;
}

interface LaunchType {
  tipoLancamento: string;
  descNivel4: string;
  conta: string;
  centroResultado: string;
}

export default function NewPayable() {
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
  const { suppliers, ledgerAccounts, resultCenters } =
    useFinancialDataContext();

  const ITEMS_PER_PAGE = 6;
  const [isOpenSupplierModal, setIsOpenSupplierModal] = useState(false);
  const [isOpenLaunchTypeModal, setIsOpenLaunchTypeModal] = useState(false);
  const [filteredSuppliers, setFilteredSuppliers] = useState("");
  const [filteredContabilAccounts, setFilteredContabilAccounts] = useState("");
  const [openCreateClientSheet, setOpenCreateClientSheet] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [steps, setSteps] = useState(1);
  const [isOpenContabilAccountModal, setIsOpenContabilAccountModal] =
    useState(false);
  const [selectedCostCenters, setSelectedCostCenters] = useState<
    { name: string; value: string; locked?: boolean }[]
  >([]);
  const [selectedSupplier, setSelectedSupplier] =
    useState<SupplierProps | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<AccontsType>({
    contaContabil: "",
    descricao: "",
    tipoCusto: "",
    grupo: "",
    tipoConta: "",
  });
  const [data, setData] = useState<DataType>({
    businessUnitId: selectedBusinessUnit?.id || "",
    dueDate: "",
    installmentCount: "1",
    ledgerAccountId: "",
    paymentMode: "FULL",
    referenceMonth: null,
    resultCenters: [],
    status: "PENDING",
    subsidiaryId: selectedBranch?.id || "",
    supplierId: "",
    transactions: [],
    type: "EXPENSES",
    value: 0,
    mainDocumentUrl: "",
  });

  const filteredAccounts = useMemo(() => {
    if (!filteredContabilAccounts.trim()) return Accounts;

    const term = filteredContabilAccounts.toLowerCase();
    return Accounts.filter(
      (acc) =>
        acc.contaContabil.includes(filteredContabilAccounts) ||
        acc.descricao.toLowerCase().includes(term),
    );
  }, [Accounts, filteredContabilAccounts]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE),
  );

  const paginatedAccounts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAccounts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAccounts, currentPage]);

  const pages = useMemo(() => {
    const maxButtons = 5;

    if (pageCount <= maxButtons)
      return [...Array(pageCount)].map((_, i) => i + 1);

    const half = Math.floor(maxButtons / 2);
    let from = Math.max(1, currentPage - half);
    const to = Math.min(pageCount, from + maxButtons - 1);

    // se não alcançou o máximo de botões, ajusta início
    if (to - from < maxButtons - 1) {
      from = Math.max(1, to - maxButtons + 1);
    }

    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  }, [pageCount, currentPage]);

  const handleCostCenterToggle = (costCenterName: string) => {
    // const isSelected = selectedCostCenters.some(
    //   (cc) => cc.name === costCenterName,
    // );
    // let updatedSelectedCenters;
    // let updatedCostCenters;
    // if (isSelected) {
    //   updatedSelectedCenters = selectedCostCenters.filter(
    //     (cc) => cc.name !== costCenterName,
    //   );
    //   updatedCostCenters = data.costCenters.filter(
    //     (cc) => cc.name !== costCenterName,
    //   );
    // } else {
    //   const newCostCenter = {
    //     name: costCenterName,
    //     value: "0.00",
    //     locked: false,
    //   };
    //   updatedSelectedCenters = [...selectedCostCenters, newCostCenter];
    //   updatedCostCenters = [...data.costCenters, newCostCenter];
    // }
    // setSelectedCostCenters(updatedSelectedCenters);
    // if (updatedCostCenters.length > 0) {
    //   const lockedCenters = updatedCostCenters.filter(
    //     (center) => center.locked,
    //   );
    //   const unlockedCenters = updatedCostCenters.filter(
    //     (center) => !center.locked,
    //   );
    //   const lockedTotal = lockedCenters.reduce(
    //     (sum, center) => sum + (parseFloat(center.value) || 0),
    //     0,
    //   );
    //   const remainingValue = data.totalValue - lockedTotal;
    //   if (unlockedCenters.length > 0 && remainingValue >= 0) {
    //     const remainingCents = Math.round(remainingValue * 100);
    //     const baseValueCents = Math.floor(
    //       remainingCents / unlockedCenters.length,
    //     );
    //     const remainder = remainingCents % unlockedCenters.length;
    //     const finalUpdatedCostCenters = updatedCostCenters.map(
    //       (center, index) => {
    //         if (center.locked) {
    //           return center;
    //         }
    //         const unlockedIndex = unlockedCenters.findIndex(
    //           (uc) => updatedCostCenters.findIndex((dc) => dc === uc) === index,
    //         );
    //         const extraCent = unlockedIndex < remainder ? 1 : 0;
    //         const finalValueCents = baseValueCents + extraCent;
    //         const finalValue = (finalValueCents / 100).toFixed(2);
    //         return {
    //           ...center,
    //           value: finalValue,
    //         };
    //       },
    //     );
    //     setData({ ...data, costCenters: finalUpdatedCostCenters });
    //   } else {
    //     setData({ ...data, costCenters: updatedCostCenters });
    //   }
    // } else {
    //   setData({ ...data, costCenters: [] });
    // }
  };

  const handleData = () => {
    return;
  };

  async function CreatePayable() {
    const create = await PostAPI("/payable", data, true);
    console.log("create", create);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredContabilAccounts]);

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-hidden pb-20 xl:pb-0">
        {/* HEADER -------------------------------------------------------- */}
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
                  <h2 className="text-xl font-semibold">Fatura À Pagar</h2>
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
                  })}
                </h2>
                <span className="flex items-center gap-1 text-sm text-zinc-600">
                  Preço da Fatura
                </span>
              </div>
            </div>
            <div className="my-4 h-px bg-zinc-200/60" />
            <div className="flex items-center justify-between gap-4">
              <label className="flex w-1/2 flex-col gap-1">
                <span className="text-zinc-600">Filial</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
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
                  <DropdownMenuTrigger asChild>
                    <button className="relative flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
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
                selectedCostCenters={selectedCostCenters}
                setSelectedCostCenters={setSelectedCostCenters}
                handleCostCenterToggle={handleCostCenterToggle}
                setIsOpenSupplierModal={setIsOpenSupplierModal}
                setIsOpenContabilidadeModal={setIsOpenContabilAccountModal}
                setIsOpenLaunchTypeModal={setIsOpenLaunchTypeModal}
              />
            ) : steps === 2 ? (
              <Step3 data={data} setData={setData} />
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
                    onClick={() => setSteps(steps + 1)}
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
                  onClick={() => {
                    CreatePayable();
                    // toast.success("À Pagar criado com sucesso!");
                    // setTimeout(() => {
                    //   router.push("/calendar");
                    // }, 1000);
                  }}
                  icon={<ChevronDown size={16} className="-rotate-90" />}
                  iconPosition="right"
                >
                  Salvar
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
      {openCreateClientSheet && (
        <CreateClientSheet
          open={openCreateClientSheet}
          onOpenChange={setOpenCreateClientSheet}
        />
      )}
      {isOpenSupplierModal && (
        <SupplierModal
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setOpenCreateClientSheet={setOpenCreateClientSheet}
          filteredSuppliers={filteredSuppliers}
          setFilteredSuppliers={setFilteredSuppliers}
          suppliers={suppliers}
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setIsOpenContabilAccountModal={setIsOpenContabilAccountModal}
          filteredContabilAccounts={filteredContabilAccounts}
          setFilteredContabilAccounts={setFilteredContabilAccounts}
          paginatedAccounts={paginatedAccounts}
          selectedAccount={selectedAccount}
          pages={pages}
          pageCount={pageCount}
          setSelectedAccount={setSelectedAccount}
          isOpenAccountingModal={isOpenContabilAccountModal}
          setIsOpenAccountingModal={setIsOpenContabilAccountModal}
          data={data}
          setData={setData}
        />
      )}
    </>
  );
}
