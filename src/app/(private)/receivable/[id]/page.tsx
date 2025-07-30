/* app/(dashboard)/create-business-unit/page.tsx */
"use client";
import { AiFileReader } from "@/components/ai-file-reader";
import { OrangeButton } from "@/components/OrangeButton";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/utils/cn";
import { ChevronDown, ChevronLeft, Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Step1 } from "./components/step1";
import { Step2 } from "./components/step2";

export interface DataType {
  totalValue: number;
  entryType: "TOTAL" | "PARTIAL";
  client: {
    name: string;
    cnpj: string;
    place: string;
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
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  paymentDetails: string;
  description: string;
  approval: string;
  mail: string;
}

export default function NewReceivable() {
  const router = useRouter();
  const [isOpenClientModal, setIsOpenClientModal] = useState(false);
  const [filteredClients, setFilteredClients] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [steps, setSteps] = useState(1);
  const [hasBrokenIndividualRules, setHasBrokenIndividualRules] =
    useState(true);
  const [selectedClient, setSelectedClient] = useState({
    name: "",
    cnpj: "",
    place: "",
  });
  const [data, setData] = useState<DataType>({
    totalValue: 100000,
    entryType: "TOTAL",
    client: {
      name: "",
      cnpj: "",
      place: "",
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

  const clients = [
    {
      name: "Cliente 1",
      cnpj: "11.111.111/0001-11",
      expirationDate: "01/01/2025",
      place: "Curitiba - Paraná",
      status: "ATIVO",
    },
    {
      name: "Cliente 2",
      cnpj: "22.222.222/0002-22",
      expirationDate: "02/02/2025",
      place: "Curitiba - Paraná",
      status: "INATIVO",
    },
    {
      name: "Cliente 3",
      cnpj: "33.333.333/0003-33",
      expirationDate: "03/03/2025",
      place: "Curitiba - Paraná",
      status: "ATIVO",
    },
    {
      name: "Cliente 4",
      cnpj: "44.444.444/0004-44",
      expirationDate: "04/04/2025",
      place: "Curitiba - Paraná",
      status: "INATIVO",
    },
    {
      name: "Cliente 5",
      cnpj: "55.555.555/0005-55",
      expirationDate: "05/05/2025",
      place: "Curitiba - Paraná",
      status: "ATIVO",
    },
  ];

  const handleData = () => {
    return;
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
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
          Abortar
          <X size={16} />
        </button>
      </header>

      <main className="flex flex-1 overflow-y-auto">
        <Modal
          show={isOpenClientModal}
          onHide={() => setIsOpenClientModal(false)}
          className="w-[720px] border-none bg-transparent shadow-none"
        >
          <div className="scrollbar-hide w-[720px] overflow-scroll rounded-xl bg-white shadow-xl">
            {/* Cabeçalho */}
            <div className="bg-primary flex items-center justify-between px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Lista de Clientes no Sistema
              </h2>
              <button className="text-primary flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl">
                ⋮
              </button>
            </div>

            {/* Campo de busca */}
            <div className="flex flex-row items-center gap-2 px-6 py-4">
              <label className="mb-2 block text-xl text-[#6C7386]">
                Selecione o Cliente:
              </label>
              <div className="bg-primary/20 border-primary relative flex flex-1 items-center rounded-md border px-4 py-2">
                <input
                  type="text"
                  value={filteredClients}
                  onChange={(e) => setFilteredClients(e.target.value)}
                  placeholder="Digite o CNPJ, CPF ou clique"
                  className="w-full flex-1 px-2 text-sm outline-none focus:outline-none"
                />
                <span className="text-primary">
                  <Search />
                </span>
              </div>
            </div>

            {/* Lista de clientes */}
            <ul className="space-y-4 px-6">
              {clients.filter(
                (cliente) =>
                  cliente.cnpj.includes(filteredClients) ||
                  cliente.name
                    .toLowerCase()
                    .includes(filteredClients.toLowerCase()),
              ).length === 0 && (
                <li className="flex cursor-pointer items-center justify-between border-b border-zinc-200 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary h-4 w-4 rounded-full" />
                    <div className="flex flex-col text-sm">
                      <span className="text-zinc-800">
                        Nenhum Cliente Encontrado
                      </span>
                    </div>
                  </div>
                </li>
              )}
              {clients
                .filter(
                  (cliente) =>
                    cliente.cnpj.includes(filteredClients) ||
                    cliente.name
                      .toLowerCase()
                      .includes(filteredClients.toLowerCase()),
                )
                .map((cliente, index) => (
                  <li
                    onClick={() => setSelectedClient(cliente)}
                    key={index}
                    className={`hover:bg-primary/20 flex cursor-pointer items-center justify-between rounded-lg border-b border-zinc-200 p-2 transition duration-200 ${
                      selectedClient.cnpj === cliente.cnpj
                        ? "bg-primary/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary h-4 w-4 rounded-full" />
                      <div className="flex flex-col text-sm">
                        <span className="text-zinc-800">{cliente.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-zinc-900">
                          {cliente.cnpj}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-primary flex items-center gap-1 font-medium">
                        <span>🪙</span>
                        <span>{cliente.expirationDate}</span>
                      </div>
                      <span className="rounded-md border border-emerald-500 bg-emerald-600/20 px-3 py-1 font-semibold text-emerald-600">
                        {cliente.status}
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
                  setData({ ...data, client: selectedClient });
                  setIsOpenClientModal(false);
                }}
                className="text-primary hover:bg-primary hover:border-primary flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 px-6 py-2 font-bold transition duration-200 hover:text-white"
              >
                Selecionar →
              </button>
            </div>
          </div>
        </Modal>

        <section
          className={cn(
            "",
            steps === 1 && "flex flex-1 flex-col px-12 pt-10 pb-4",
            steps === 2 &&
              "bg-primary/10 flex flex-1 items-center justify-center p-4",
          )}
        >
          {steps === 1 ? (
            <>
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  <ChevronLeft
                    onClick={() => setSteps((s) => s - 1)}
                    className={cn("cursor-pointer", steps === 1 && "hidden")}
                  />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold">
                      Confirmar Fatura À Receber
                    </h2>
                  </div>
                </div>
              </div>
              <div className="my-4 h-px bg-zinc-200/60" />
              <Step1
                data={data}
                setData={setData}
                setIsOpenClientModal={setIsOpenClientModal}
              />
            </>
          ) : steps === 2 ? (
            <div className="flex h-[90%] w-[90%] flex-col items-center gap-2 rounded-lg bg-white p-8">
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-bold">
                    REGRAS DE RECEBIMENTO
                  </span>
                  <span className="text-sm">
                    EXECUTIVO&apos;S DIGITAL {""}
                    <span className="font-semibold">
                      CNPJ: 43.795.283/0001-18
                    </span>
                  </span>
                </div>
                <Image
                  src="/logo/icon.png"
                  alt=""
                  width={500}
                  height={500}
                  className="h-max w-12 object-contain"
                />
              </div>
              <div className="flex w-full items-center border-b border-b-zinc-200 p-2">
                <span className="text-sm text-zinc-400">Resumo</span>
              </div>
              <span className="text-lg text-zinc-600">
                A fatura não pôde ser confirmada porque ultrapassa o valor
                máximo permitido de R$ 50.000,00, conforme as regras de
                recebimento da filial.
              </span>
            </div>
          ) : (
            <></>
          )}
          {steps === 1 && (
            <footer className="mt-4 flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
              <button
                onClick={() => router.back()}
                className="h-9 w-[108px] rounded-lg border border-zinc-300 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Salvar e sair
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
          )}
        </section>

        <div className="w-px bg-orange-200" />

        <section
          className={cn(
            "",
            steps === 2 && "flex flex-1 flex-col px-12 pt-10 pb-4",
            steps === 1 &&
              "bg-primary/10 flex flex-1 items-center justify-center p-4",
          )}
        >
          {steps === 2 ? (
            <>
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  <ChevronLeft
                    onClick={() => setSteps((s) => s - 1)}
                    className="cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold">
                      Confirmar Fatura À Receber
                    </h2>
                  </div>
                </div>
              </div>
              <Step2
                data={data}
                hasBrokenIndividualRules={hasBrokenIndividualRules}
                setHasBrokenIndividualRules={setHasBrokenIndividualRules}
              />
            </>
          ) : steps === 1 ? (
            <AiFileReader handleData={handleData} />
          ) : (
            <></>
          )}
          {steps === 2 && (
            <footer className="mt-4 flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
              <button
                onClick={() => router.back()}
                className="h-9 w-[108px] rounded-lg border border-zinc-300 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Salvar e sair
              </button>

              <OrangeButton
                className="h-9 w-[132px]"
                onClick={
                  hasBrokenIndividualRules === true
                    ? () => toast.error("Existem Alterações Necessárias")
                    : () => router.push("/calendar")
                }
                icon={<ChevronDown size={16} className="-rotate-90" />}
                iconPosition="right"
              >
                Salvar
              </OrangeButton>
            </footer>
          )}
        </section>
      </main>
    </div>
  );
}
