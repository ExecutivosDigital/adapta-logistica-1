/* app/(dashboard)/create-business-unit/page.tsx */
"use client";
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
import { useEffect, useMemo, useState } from "react";
import { AccontsType, Accounts } from "./acconts";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";
import { Step4 } from "./step4";
import { Step4Second } from "./step4Second";

export interface DataType {
  entryType: "TOTAL" | "PARTIAL";
  supplier: {
    name: string;
    cnpj: string;
  };
  documentType: string;
  amount: number;
  currency: string;
  costType: string;
  category: string;
  costCenter: string;
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

export default function CreateBusinessUnitPage() {
  const router = useRouter();

  const [data, setData] = useState<DataType>({
    entryType: "TOTAL", // 'TOTAL' or 'PARTIAL'
    supplier: {
      name: "",
      cnpj: "",
    },
    documentType: "",
    amount: 0,
    currency: "",
    costType: "",
    category: "",
    costCenter: "",
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

  const [isOpenClientModal, setIsOpenClientModal] = useState(false);
  const [isOpenContabilAccountModal, setIsOpenContabilAccountModal] =
    useState(false);
  const clients = [
    {
      name: "Cliente 1",
      cnpj: "11.111.111/0001-11",
      expirationDate: "01/01/2025",
      status: "ATIVO",
    },
    {
      name: "Cliente 2",
      cnpj: "22.222.222/0002-22",
      expirationDate: "02/02/2025",
      status: "INATIVO",
    },
    {
      name: "Cliente 3",
      cnpj: "33.333.333/0003-33",
      expirationDate: "03/03/2025",
      status: "ATIVO",
    },
    {
      name: "Cliente 4",
      cnpj: "44.444.444/0004-44",
      expirationDate: "04/04/2025",
      status: "INATIVO",
    },
    {
      name: "Cliente 5",
      cnpj: "55.555.555/0005-55",
      expirationDate: "05/05/2025",
      status: "ATIVO",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [steps, setSteps] = useState(1);
  const [isShowingDocument, setIsShowingDocument] = useState(false);
  const [selectedClient, setSelectedClient] = useState({
    name: "",
    cnpj: "",
  });
  const [filteredClients, setFilteredClients] = useState("");
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

  /**
   * Número total de páginas baseado no resultado filtrado
   */
  const ITEMS_PER_PAGE = 6;
  const pageCount = Math.max(
    1,
    Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE),
  );
  /**
   * Itens a serem exibidos na página atual
   */
  const paginatedAccounts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAccounts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAccounts, currentPage]);

  /**
   * Gera uma lista de botões de página adequados.
   * - Até 5 botões visíveis para não poluir o layout.
   * - "Desliza" a janela conforme navegação.
   */
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

  /**
   * Handler de seleção
   */

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredContabilAccounts]);

  console.log("steps: ", steps);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
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
          onClick={() => router.back()}
          className="absolute top-4 right-8 flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Encerrar
          <X size={16} />
        </button>
      </header>

      <main className="flex flex-1 overflow-y-auto">
        <Modal
          show={isOpenClientModal}
          onHide={() => setIsOpenClientModal(false)}
          className="w-[720px] border-none bg-transparent shadow-none"
        >
          <div className="w-[720px] overflow-hidden rounded-xl bg-white shadow-xl">
            {/* Cabeçalho */}
            <div className="bg-primary flex items-center justify-between px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Lista de Clientes e/ou Grupos Empresariais no Sistema
              </h2>
              <button className="text-primary flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl">
                ⋮
              </button>
            </div>

            {/* Campo de busca */}
            <div className="flex flex-row items-center gap-2 px-6 py-4">
              <label className="mb-2 block text-xl text-[#6C7386]">
                Selecione o Cliente Pagador:
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
                        Nenhum cliente encontrado
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
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-b border-zinc-200 p-2 ${
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
              <button className="text-primary rounded-md border border-zinc-200 px-6 py-2 font-bold">
                Cancelar
              </button>
              <button
                onClick={() => {
                  setData({ ...data, supplier: selectedClient });
                  setIsOpenClientModal(false);
                }}
                className="text-primary flex items-center gap-2 rounded-md border border-zinc-200 px-6 py-2 font-bold"
              >
                Avançar →
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          show={isOpenContabilAccountModal}
          onHide={() => setIsOpenContabilAccountModal(false)}
          className="w-[720px] border-none bg-transparent shadow-none"
        >
          <div className="w-[720px] overflow-hidden rounded-xl bg-white shadow-xl">
            {/* Cabeçalho */}
            <div className="bg-primary flex items-center justify-between px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Lista de Contas
              </h2>
              <button
                onClick={() => setIsOpenContabilAccountModal(false)}
                className="text-primary flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl"
              >
                <X />
              </button>
            </div>

            {/* Campo de busca */}
            <div className="flex flex-row items-center gap-2 px-6 py-4">
              <label className="mb-2 block text-xl text-[#6C7386]">
                Selecione a Conta Contábil:
              </label>
              <div className="bg-primary/20 border-primary relative flex flex-1 items-center rounded-md border px-4 py-2">
                <input
                  type="text"
                  value={filteredContabilAccounts}
                  onChange={(e) => setFilteredContabilAccounts(e.target.value)}
                  placeholder="Digite o código ou descrição"
                  className="w-full flex-1 px-2 text-sm outline-none"
                />
                <span className="text-primary">
                  <Search size={18} />
                </span>
              </div>
            </div>

            {/* Lista filtrada + paginada */}
            <ul className="min-h-[300px] space-y-4 px-6">
              {paginatedAccounts.length === 0 && (
                <li className="flex justify-center py-10 text-zinc-500">
                  Nenhuma conta encontrada
                </li>
              )}

              {paginatedAccounts.map((acc, i) => (
                <li
                  key={`${acc.contaContabil}-${i}`}
                  onClick={() => setSelectedAccount(acc)}
                  className={`hover:bg-primary/10 flex cursor-pointer items-center gap-8 rounded-lg border-b border-zinc-200 p-2 transition-colors ${
                    selectedAccount?.contaContabil === acc.contaContabil
                      ? "bg-primary/20"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary h-4 w-4 rounded-full" />
                    <div className="flex flex-col text-sm">
                      <span className="font-medium text-zinc-800">
                        {acc.contaContabil}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex flex-col text-sm">
                      <span className="-mt-1 text-xs text-zinc-500">
                        {acc.descricao}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <span className="rounded-md border border-emerald-500 bg-emerald-600/20 px-3 py-1 font-semibold text-emerald-600">
                      {acc.tipoCusto}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Paginação */}
            <div className="my-6 flex items-center justify-center gap-2 text-sm select-none">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={`flex h-6 w-6 items-center justify-center rounded-full ${currentPage === 1 ? "text-zinc-300" : "text-primary"}`}
              >
                ←
              </button>

              {pages.map((page) => (
                <button
                  key={page}
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                    page === currentPage
                      ? "bg-primary text-white"
                      : "text-primary"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === pageCount}
                onClick={() =>
                  setCurrentPage((p) => Math.min(pageCount, p + 1))
                }
                className={`flex h-6 w-6 items-center justify-center rounded-full ${currentPage === pageCount ? "text-zinc-300" : "text-primary"}`}
              >
                →
              </button>
            </div>

            {/* Botões de ação */}
            <div className="flex justify-end gap-4 border-t border-zinc-200 px-6 py-4">
              <button
                onClick={() => setIsOpenContabilAccountModal(false)}
                className="text-primary rounded-md border border-zinc-200 px-6 py-2 font-bold"
              >
                Cancelar
              </button>
              <button
                disabled={!selectedAccount}
                onClick={() => {
                  if (selectedAccount) {
                    setData({
                      ...data,
                      accountingAccount: {
                        code: selectedAccount.contaContabil,
                        description: selectedAccount.descricao,
                      },
                    });
                    setIsOpenContabilAccountModal(false);
                  }
                }}
                className="bg-primary rounded-md px-6 py-2 font-bold text-white disabled:opacity-50"
              >
                Avançar →
              </button>
            </div>
          </div>
        </Modal>
        <section className="flex flex-1 flex-col px-12 pt-10 pb-4">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <ChevronLeft
                onClick={() => setSteps((s) => s - 1)}
                className={cn("", steps === 1 && "hidden")}
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
                100.000,00
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
              setIsOpenClientModal={setIsOpenClientModal}
              setIsOpenContabilidadeModal={setIsOpenContabilAccountModal}
            />
          ) : steps === 2 ? (
            <Step2 data={data} setData={setData} />
          ) : steps === 3 ? (
            <Step3 data={data} setData={setData} />
          ) : (
            <Step4 data={data} setData={setData} />
          )}
          {steps !== 4 && (
            <footer className="mt-auto flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
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

        {/* DIVISOR vertical */}
        <div className="w-px bg-orange-200" />

        {steps === 4 ? (
          <section className="flex flex-1 flex-col px-12 pt-10 pb-4">
            <Step4Second
              data={data}
              setData={setData}
              setIsOpenClientModal={setIsOpenClientModal}
            />
          </section>
        ) : (
          <section className="bg-primary/10 flex flex-1 items-center justify-center p-4">
            {!isShowingDocument ? (
              <div
                onClick={() => setIsShowingDocument(true)}
                className="border-primary flex h-[80%] w-[80%] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8"
                style={{ borderWidth: "2px", borderSpacing: "80px" }}
              >
                <div className="border-primary flex h-16 w-16 items-center justify-center rounded-full border">
                  <span className="text-primary text-3xl font-light">+</span>
                </div>
                <div className="mt-2 text-center">
                  <p className="text-primary font-medium">
                    Upload de Documento
                  </p>
                  <p className="text-primary/70 text-sm">
                    Arraste e solte o arquivo aqui ou adicione do seu
                    dispositivo
                    <br />
                    PDF ou PNG
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full w-full overflow-y-auto">
                <Image
                  src="/doc.png"
                  width={500}
                  height={500}
                  className="h-max w-full"
                  alt=""
                />
              </div>
            )}
          </section>
        )}
      </main>
      {steps === 4 && (
        <footer className="mt-auto flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
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

      {/* FOOTER -------------------------------------------------------- */}
    </div>
  );
}
