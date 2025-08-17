/* app/(dashboard)/create-business-unit/page.tsx */
"use client";
import { AiFileReader } from "@/components/ai-file-reader";
import { OrangeButton } from "@/components/OrangeButton";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/utils/cn";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  DollarSign,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Step1 } from "./components/step1";

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

export default function PayableAddDocument() {
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

  const handleData = () => {
    return;
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden pb-20 xl:pb-0">
      {/* HEADER -------------------------------------------------------- */}
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
        <Modal
          show={isOpenSupplierModal}
          onHide={() => setIsOpenSupplierModal(false)}
          className="w-[720px] border-none bg-transparent shadow-none"
        >
          <div className="scrollbar-hide w-[720px] overflow-scroll rounded-xl bg-white shadow-xl">
            {/* Cabeçalho */}
            <div className="bg-primary flex items-center justify-between px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Lista de Fornecedores no Sistema
              </h2>
              <button className="text-primary flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl">
                ⋮
              </button>
            </div>

            {/* Campo de busca */}
            <div className="flex flex-row items-center gap-2 px-6 py-4">
              <label className="mb-2 block text-xl text-[#6C7386]">
                Selecione o Fornecedor:
              </label>
              <div className="bg-primary/20 border-primary relative flex flex-1 items-center rounded-md border px-4 py-2">
                <input
                  type="text"
                  value={filteredSuppliers}
                  onChange={(e) => setFilteredSuppliers(e.target.value)}
                  placeholder="Digite o CNPJ, CPF ou clique"
                  className="w-full flex-1 px-2 text-sm outline-none focus:outline-none"
                />
                <span className="text-primary">
                  <Search />
                </span>
              </div>
            </div>

            {/* Lista de fornecedors */}
            <ul className="space-y-4 px-6">
              {suppliers.filter(
                (fornecedor) =>
                  fornecedor.cnpj.includes(filteredSuppliers) ||
                  fornecedor.name
                    .toLowerCase()
                    .includes(filteredSuppliers.toLowerCase()),
              ).length === 0 && (
                <li className="flex cursor-pointer items-center justify-between border-b border-zinc-200 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary h-4 w-4 rounded-full" />
                    <div className="flex flex-col text-sm">
                      <span className="text-zinc-800">
                        Nenhum Fornecedor Encontrado
                      </span>
                    </div>
                  </div>
                </li>
              )}
              {suppliers
                .filter(
                  (fornecedor) =>
                    fornecedor.cnpj.includes(filteredSuppliers) ||
                    fornecedor.name
                      .toLowerCase()
                      .includes(filteredSuppliers.toLowerCase()),
                )
                .map((fornecedor, index) => (
                  <li
                    onClick={() => setSelectedClient(fornecedor)}
                    key={index}
                    className={`hover:bg-primary/20 flex cursor-pointer items-center justify-between rounded-lg border-b border-zinc-200 p-2 transition duration-200 ${
                      selectedClient.cnpj === fornecedor.cnpj
                        ? "bg-primary/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary h-4 w-4 rounded-full" />
                      <div className="flex flex-col text-sm">
                        <span className="text-zinc-800">{fornecedor.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-zinc-900">
                          {fornecedor.cnpj}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-primary flex items-center gap-1 font-medium">
                        <span>🪙</span>
                        <span>{fornecedor.expirationDate}</span>
                      </div>
                      <span className="rounded-md border border-emerald-500 bg-emerald-600/20 px-3 py-1 font-semibold text-emerald-600">
                        {fornecedor.status}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>

            {/* Paginação */}
            <div className="my-6 flex items-center justify-center gap-2 text-sm">
              {[1, 2, 3, 4, 5, 6].map((page) => (
                <button
                  key={page}
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    page === currentPage
                      ? "bg-primary text-white"
                      : "text-primary"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Botões de ação */}
            <div className="flex justify-between border-t border-zinc-200 px-6 py-4">
              <button className="text-primary cursor-pointer rounded-md border border-zinc-200 px-6 py-2 font-bold">
                Cancelar
              </button>
              <button
                onClick={() => {
                  setData({ ...data, supplier: selectedClient });
                  setIsOpenSupplierModal(false);
                }}
                className="text-primary hover:bg-primary hover:border-primary flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 px-6 py-2 font-bold transition duration-200 hover:text-white"
              >
                Selecionar →
              </button>
            </div>
          </div>
        </Modal>
        <section className="flex flex-1 flex-col px-3 py-2 pb-4 xl:px-12 xl:pt-10">
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <ChevronLeft
                onClick={() => setSteps((s) => s - 1)}
                className={cn("cursor-pointer", steps === 1 && "hidden")}
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Faturas à Pagar</h2>
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
                Valor Total do Pagamento
              </span>
            </div>
          </div>
          <div className="my-4 h-px bg-zinc-200/60" />
          <Step1
            data={data}
            setData={setData}
            setIsOpenSupplierModal={setIsOpenSupplierModal}
          />
          <footer className="mt-4 flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
            <button
              onClick={() => router.back()}
              className="h-9 rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Salvar e sair
            </button>

            <OrangeButton
              className="h-9 w-[132px]"
              onClick={() => {
                toast.success("Fatura atualizada com sucesso!");
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
        </section>
        <div className="w-px bg-orange-200" />
        <section className="bg-primary/10 flex flex-1 items-center justify-center p-4">
          <AiFileReader handleData={handleData} />
        </section>
      </main>
    </div>
  );
}
