"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/utils/cn";
import {
  CalendarDays,
  CalendarIcon,
  ChevronDown,
  DollarSign,
  Edit,
  EllipsisVertical,
  GripVertical,
  MapPin,
  Search,
  X,
} from "lucide-react";
import moment from "moment";
import "moment/locale/pt-BR";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataType } from "../../create-payment/page";
moment.locale("pt-BR");

interface TechField {
  id: string;
  number: number;
  type: string;
  date: string;
}

export default function FinalPurchaseApproval() {
  const router = useRouter();
  const [isOpenSupplierModal, setIsOpenSupplierModal] = useState(false);
  const [filteredSuppliers, setFilteredSuppliers] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDocuments, setFilteredDocuments] = useState("");
  const [isDocumentTypeDropdownOpen, setIsDocumentTypeDropdownOpen] =
    useState(false);
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
  const [selectedClient, setSelectedClient] = useState({
    name: "",
    cnpj: "",
  });
  const [invoices, setInvoices] = useState<TechField[]>([
    { id: crypto.randomUUID(), number: 0, type: "", date: "" },
  ]);

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

  const documents = [
    "Boleto",
    "Nota Fiscal",
    "Contrato",
    "Ordem de Serviço",
    "Fatura",
    "Lorem",
    "Lorem",
    "Lorem",
  ];

  return (
    <>
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
            onClick={() => router.back()}
            className="absolute top-4 right-8 flex cursor-pointer items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Sair
            <X size={16} />
          </button>
        </header>

        <main className="flex flex-1 overflow-y-auto">
          <section className="flex flex-1 flex-col py-4">
            <div className="flex w-full justify-between px-6">
              <h2 className="text-xl font-semibold">Aprovação - À Pagar</h2>
              <div className="flex items-center gap-1">
                <span className="text-sm text-zinc-600">12/06/2025</span>
                <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
              </div>
            </div>
            <div className="my-4 h-px w-full bg-zinc-200" />
            <div className="grid grid-cols-12 gap-4 px-6 text-sm text-zinc-700">
              {/* --------------------- FORNECEDOR --------------------- */}
              <label className="col-span-8 flex flex-col gap-1">
                <span className="text-zinc-600">
                  {data.entryType === "DESPESAS"
                    ? "Fornecedor"
                    : data.entryType === "IMPOSTOS"
                      ? "Sefaz"
                      : "Parceiro"}
                </span>
                <button
                  onClick={() => setIsOpenSupplierModal(true)}
                  className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2"
                >
                  <div className="flex h-full w-6">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="flex-1 text-lg">
                      {data.supplier.name || "Selecione"}
                    </span>
                    <span className="text-zinc-400">
                      {data.supplier.cnpj || ""}
                    </span>
                  </div>
                  <div className="flex h-full w-6 justify-end">
                    <Edit size={16} className="text-primary" />
                  </div>
                </button>
              </label>

              {/* --------------------- TIPO DE DOCUMENTO --------------------- */}
              <label className="col-span-4 flex flex-col gap-1">
                <span className="text-zinc-600">
                  {data.entryType === "DESPESAS"
                    ? "Tipo de Lançamento"
                    : data.entryType === "IMPOSTOS"
                      ? "Imposto - Código"
                      : "Tipo de Lançamento"}
                </span>
                <DropdownMenu
                  open={isDocumentTypeDropdownOpen}
                  onOpenChange={setIsDocumentTypeDropdownOpen}
                >
                  <DropdownMenuTrigger className="w-full focus:outline-none">
                    <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                      <div className="flex h-full w-6">
                        <DollarSign size={16} className="text-primary" />
                      </div>
                      <div className="flex h-full flex-1 items-center">
                        <span className="flex-1 text-lg">
                          {data.documentType || "Selecione"}
                        </span>
                      </div>
                      <div className="flex h-full w-6 justify-end">
                        <Edit size={16} className="text-primary" />
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    sideOffset={0}
                    className="z-[999] w-72 border-zinc-200"
                  >
                    <X
                      className="text-primary ml-auto cursor-pointer"
                      onClick={() => setIsDocumentTypeDropdownOpen(false)}
                    />
                    <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                      <input
                        value={filteredDocuments}
                        onChange={(e) => setFilteredDocuments(e.target.value)}
                        placeholder="Pesquisar tipos de Documentos"
                        className="flex-1 focus:outline-none"
                      />
                      <Search size={14} />
                    </div>
                    {documents.filter((item) =>
                      item
                        .toLowerCase()
                        .includes(filteredDocuments.toLowerCase()),
                    ).length === 0 && (
                      <div className="p-2 text-center text-sm text-zinc-600">
                        Nenhum item encontrado
                      </div>
                    )}
                    {documents
                      .filter((item) =>
                        item
                          .toLowerCase()
                          .includes(filteredDocuments.toLowerCase()),
                      )
                      .map((item, index) => (
                        <DropdownMenuItem
                          key={index}
                          onClick={() =>
                            setData({ ...data, documentType: item })
                          }
                          className="hover:bg-primary/20 cursor-pointer transition duration-300"
                        >
                          <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                            {item}
                            {/* Check icon */}
                            {data.documentType === item && (
                              <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </label>

              <div className="col-span-12 grid grid-cols-11 gap-4">
                <label className="col-span-5 flex flex-col gap-1">
                  <span className="text-zinc-600">Valor</span>
                  <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                    <div className="flex h-full w-6">
                      <DollarSign size={16} className="text-primary" />
                    </div>
                    <div className="flex h-full flex-1 items-center justify-center text-center">
                      <input
                        placeholder="R$ 0,00"
                        className="flex-1 items-center bg-transparent text-center text-lg text-zinc-700 outline-none"
                      />
                    </div>
                    <div className="flex h-full w-6"></div>
                  </div>
                </label>

                {/* --------------------- DATAS --------------------- */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <label className="col-span-3 flex flex-col gap-1">
                      <span className="text-zinc-600">Mês Referência</span>
                      <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
                        <div className="flex h-full w-6">
                          <CalendarIcon className="text-primary" size={16} />
                        </div>
                        <div className="flex-1 text-lg text-zinc-700">
                          {data.issueDate
                            ? moment(data.issueDate).format("MMM")
                            : moment().format("MMMM")}
                        </div>
                        <div className="flex h-full w-6 justify-end">
                          <Edit className="text-primary" size={16} />
                        </div>
                      </div>
                    </label>
                  </DropdownMenuTrigger>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <label className="col-span-3 flex flex-col gap-1">
                      <span className="text-zinc-600">Vencimento</span>
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
            </div>

            <div className="my-4 h-px w-full bg-zinc-200" />
            <div className="grid grid-cols-12 gap-4 px-6 text-sm text-zinc-700">
              <label className="col-span-8 flex flex-col gap-1">
                <span className="text-zinc-600">Método de Pagamento</span>
                <button className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                  <div className="flex h-full w-6">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="flex-1 text-lg">
                      {data.supplier.name || "Selecione"}
                    </span>
                    <span className="text-zinc-400">
                      {data.supplier.cnpj || ""}
                    </span>
                  </div>
                  <div className="flex h-full w-6 justify-end">
                    <Edit size={16} className="text-primary" />
                  </div>
                </button>
              </label>

              <label className="col-span-4 flex flex-col gap-1">
                <span className="text-zinc-600">Conta de Pagamento</span>
                <DropdownMenu
                  open={isDocumentTypeDropdownOpen}
                  onOpenChange={setIsDocumentTypeDropdownOpen}
                >
                  <DropdownMenuTrigger className="w-full focus:outline-none">
                    <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                      <div className="flex h-full w-6">
                        <DollarSign size={16} className="text-primary" />
                      </div>
                      <div className="flex h-full flex-1 items-center">
                        <span className="flex-1 text-lg">
                          {data.documentType || "Selecione"}
                        </span>
                      </div>
                      <div className="flex h-full w-6 justify-end">
                        <Edit size={16} className="text-primary" />
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </label>
            </div>
            <div className="my-4 h-px w-full bg-zinc-200" />

            <div className="px-6">
              <h3 className="mb-4 text-base font-semibold">
                Detalhes do Pagamento
              </h3>

              {invoices.map((field, idx) => (
                <div
                  key={field.id}
                  className="mb-4 grid grid-cols-12 items-center gap-4"
                >
                  <div className="col-span-6 flex items-center gap-2">
                    <GripVertical className="mt-5" />
                    <div className="flex w-full flex-col text-[13px] font-medium text-zinc-600">
                      <span className="">{idx + 1} - Pagamento</span>
                      <input
                        placeholder="R$ 0,00"
                        className={`h-16 w-full rounded-2xl border px-3 py-2 text-sm placeholder:text-zinc-500 ${field.number ? "border-primary" : "border-zinc-200"}`}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col text-[13px] font-medium text-zinc-600">
                    <span className="">Forma</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            "relative flex w-full items-center gap-2 rounded-lg border px-3 py-3 text-sm transition",
                            "h-16 justify-between rounded-2xl px-3 py-2",
                            field.type
                              ? "border-primary text-zinc-700"
                              : "border-zinc-200 text-zinc-500",
                          )}
                        >
                          {field.type || "Tipo"}
                          <ChevronDown size={16} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="bottom"
                        sideOffset={0}
                        className="z-[999] w-[var(--radix-dropdown-menu-trigger-width)] border-zinc-200"
                      >
                        {["Pix", "Boleto", "Cartão"].map((item) => (
                          <DropdownMenuItem
                            key={item}
                            onSelect={(e) => {
                              e.preventDefault();
                              setInvoices((prev) =>
                                prev.map((f, i) =>
                                  i === idx ? { ...f, type: item } : f,
                                ),
                              );
                            }}
                            className="hover:bg-primary/20 cursor-pointer transition duration-300"
                          >
                            <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                              {item}
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="col-span-3 flex flex-col text-[13px] font-medium text-zinc-600">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div>
                          <span className="">Data</span>

                          <div
                            className={`relative flex h-16 items-center rounded-2xl border px-3 py-2 text-sm placeholder:text-zinc-500 ${field.date ? "border-primary" : "border-zinc-200"}`}
                          >
                            {field.date
                              ? moment(field.date).format("DD/MM/YYYY")
                              : moment().format("DD/MM/YYYY")}
                            <ChevronDown className="absolute top-1/2 right-2 h-4 -translate-y-1/2" />
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="right"
                        sideOffset={0}
                        align="start"
                        className="z-[999] w-72 border-zinc-200"
                      >
                        <Calendar
                          mode="single"
                          selected={moment(field.date).toDate()}
                          onSelect={(e) =>
                            setInvoices((prev) =>
                              prev.map((f, i) =>
                                i === idx
                                  ? {
                                      ...f,
                                      date: moment(e).format("YYYY-MM-DD"),
                                    }
                                  : f,
                              ),
                            )
                          }
                          initialFocus
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="border-primary col-span-1 mt-5 flex h-16 items-center justify-center rounded-2xl border">
                    <EllipsisVertical className="text-zinc-600" />
                  </div>
                </div>
              ))}

              <div className="mt-6 h-px bg-zinc-200/60" />
            </div>
          </section>

          {/* DIVISOR vertical */}
          <div className="w-px bg-orange-200" />

          <section className="bg-primary/10 flex flex-1 items-center justify-center p-4">
            <div
              className="border-primary flex h-[80%] w-[80%] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8"
              style={{ borderWidth: "2px", borderSpacing: "80px" }}
            >
              <div className="border-primary flex h-16 w-16 items-center justify-center rounded-full border">
                <span className="text-primary text-3xl font-light">+</span>
              </div>
              <div className="mt-2 text-center">
                <p className="text-primary font-medium">Upload de Documento</p>
                <p className="text-primary/70 text-sm">
                  Arraste e solte o arquivo aqui ou adicione do seu dispositivo
                  <br />
                  PDF ou PNG
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
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
    </>
  );
}
