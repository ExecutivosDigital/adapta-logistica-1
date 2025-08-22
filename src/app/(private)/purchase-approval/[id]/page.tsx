/* app/(dashboard)/create-business-unit/page.tsx */
"use client";
import { OrangeButton } from "@/components/OrangeButton";
import {
  AiFileReader,
  PaymentDocumentProps,
} from "@/components/ai-file-reader";
import { cn } from "@/utils/cn";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  DollarSign,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AccontsType, Accounts } from "./components/acconts";
import { AccountingModal } from "./components/accounting-modal";
import { Step1 } from "./components/step1";
import { Step3 } from "./components/step3";
import { SupplierModal } from "./components/supplier-modal";

export interface DataType {
  totalValue: number;
  entryType: "DESPESAS" | "IMPOSTOS" | "C. VENDAS";
  supplier: {
    name: string;
    cnpj: string;
  };
  documentType: string;
  amount: number;
  currency: string;
  costType: string;
  category: string;
  costCenters: {
    name: string;
    value: string;
    locked?: boolean;
  }[];
  accountingAccount: {
    code: string;
    description: string;
  };
  paymentMethod: {
    bank: string;
    account: string;
  };
  paymentForm: string;
  documentNumber: string;
  issueDate: string; // Format: 'YYYY-MM-DD'
  dueDate: string; // Format: 'YYYY-MM-DD'
  paymentTerms: string;
  paymentDetails: string;
  description: string;
  approval: string;
  mail: string;
}

export interface SupplierProps {
  name: string;
  cnpj: string;
  expirationDate: string;
  status: string;
}

export interface ClientProps {
  name: string;
  cnpj: string;
}

export default function PurchaseApproval() {
  const router = useRouter();

  const [data, setData] = useState<DataType>({
    totalValue: 100000,
    entryType: "DESPESAS",
    supplier: {
      name: "",
      cnpj: "",
    },
    documentType: "",
    amount: 0,
    currency: "",
    costType: "",
    category: "",
    costCenters: [],
    accountingAccount: {
      code: "",
      description: "",
    },
    paymentMethod: {
      bank: "",
      account: "",
    },
    paymentForm: "",
    documentNumber: "",
    issueDate: "",
    dueDate: "",
    paymentTerms: "",
    paymentDetails: "",
    description: "",
    approval: "",
    mail: "",
  });
  /* render */

  const [isOpenSupplierModal, setIsOpenSupplierModal] = useState(false);
  const [isOpenContabilAccountModal, setIsOpenContabilAccountModal] =
    useState(false);
  const suppliers = [
    {
      name: "Fornecedor 1",
      cnpj: "11.111.111/0001-11",
      expirationDate: "01/01/2025",
      status: "ATIVO",
    },
    {
      name: "Fornecedor 2",
      cnpj: "22.222.222/0002-22",
      expirationDate: "02/02/2025",
      status: "INATIVO",
    },
    {
      name: "Fornecedor 3",
      cnpj: "33.333.333/0003-33",
      expirationDate: "03/03/2025",
      status: "ATIVO",
    },
    {
      name: "Fornecedor 4",
      cnpj: "44.444.444/0004-44",
      expirationDate: "04/04/2025",
      status: "INATIVO",
    },
    {
      name: "Fornecedor 5",
      cnpj: "55.555.555/0005-55",
      expirationDate: "05/05/2025",
      status: "ATIVO",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [steps, setSteps] = useState(1);
  const [selectedClient, setSelectedClient] = useState({
    name: "",
    cnpj: "",
  });
  const [filteredSuppliers, setFilteredSuppliers] = useState("");
  const [filteredContabilAccounts, setFilteredContabilAccounts] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<AccontsType>({
    contaContabil: "",
    descricao: "",
    tipoCusto: "",
    grupo: "",
    tipoConta: "",
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

  const ITEMS_PER_PAGE = 6;
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

  const handleData = (payment: PaymentDocumentProps) => {
    const supplier = suppliers.find(
      (supplier) => supplier.cnpj === payment.cpfCnpj,
    );

    setData({
      ...data,
      supplier: supplier || { name: "", cnpj: "" },
      amount: payment.value,
      dueDate: payment.dueDate,
      documentNumber: payment.documentNumber,
    });
  };

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
                  {data.totalValue.toLocaleString("pt-BR", {
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
            {steps === 1 ? (
              <Step1
                data={data}
                setData={setData}
                setIsOpenSupplierModal={setIsOpenSupplierModal}
                setIsOpenContabilidadeModal={setIsOpenContabilAccountModal}
              />
            ) : steps === 2 ? (
              <Step3 data={data} setData={setData} />
            ) : (
              <></>
            )}
            {steps === 1 ? (
              <footer className="mt-4 flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
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
                    toast.success("Compra Aprovada com Sucesso!");
                    setTimeout(() => {
                      router.push("/calendar");
                    }, 1000);
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
      {isOpenSupplierModal && (
        <SupplierModal
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filteredSuppliers={filteredSuppliers}
          setFilteredSuppliers={setFilteredSuppliers}
          suppliers={suppliers}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          isOpenSupplierModal={isOpenSupplierModal}
          setIsOpenSupplierModal={setIsOpenSupplierModal}
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
