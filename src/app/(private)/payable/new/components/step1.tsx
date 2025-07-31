import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useState } from "react";
import { DataType } from "../page";
import { CategoryModal } from "./category-modal";
import { CostCentersList } from "./cost-centers-list";

import "moment/locale/pt-BR";
moment.locale("pt-BR");
interface Props {
  setIsOpenSupplierModal: (value: boolean) => void;
  setIsOpenContabilidadeModal: (value: boolean) => void;
  setIsOpenLaunchTypeModal: (value: boolean) => void;
  data: DataType;
  setData: (value: DataType) => void;
  selectedCostCenters: {
    name: string;
    value: string;
    locked?: boolean | undefined;
  }[];
  setSelectedCostCenters: (
    value: { name: string; value: string; locked: boolean | undefined }[],
  ) => void;
  handleCostCenterToggle: (costCenterName: string) => void;
}
type CostType =
  | "Custo Fixo"
  | "Custo Variável"
  | "Custo de Vendas / Operação Logística"
  | "Impostos e Tributos"
  | "Capex (Investimentos)"
  | "Reembolsos / Adiantamentos";

type Category = {
  type: string;
  category: CostType;
};

export function Step1({
  setIsOpenSupplierModal,
  data,
  setData,
  setIsOpenLaunchTypeModal,
  setIsOpenContabilidadeModal,
  selectedCostCenters,
  setSelectedCostCenters,
  handleCostCenterToggle,
}: Props) {
  const categoriesByCostType: Record<CostType, Category[]> = {
    "Custo Fixo": [
      { type: "Aluguel / Condomínio / IPTU", category: "Custo Fixo" },
      { type: "Água e Esgoto", category: "Custo Fixo" },
      { type: "Internet", category: "Custo Fixo" },
      { type: "Telefonia e Similares", category: "Custo Fixo" },
      { type: "Energia", category: "Custo Fixo" },
      { type: "Seguros Patrimoniais", category: "Custo Fixo" },
      { type: "Licenças e Software", category: "Custo Fixo" },
      { type: "Seguros Empresariais Gerais", category: "Custo Fixo" },
      { type: "Seguros de Carga", category: "Custo Fixo" },
      { type: "Folha Administrativa", category: "Custo Fixo" },
      { type: "Custos - Contabilidade", category: "Custo Fixo" },
      { type: "Taxas Bancárias", category: "Custo Fixo" },
      { type: "Serviços Terceirizados", category: "Custo Fixo" },
      { type: "Material de Escritório", category: "Custo Fixo" },
      { type: "Manutenção Preventiva", category: "Custo Fixo" },
      { type: "Material Limpeza", category: "Custo Fixo" },
      { type: "Outros - Descreva", category: "Custo Fixo" },
    ],
    "Custo Variável": [
      { type: "Custos Bancários", category: "Custo Variável" },
      { type: "Combustível", category: "Custo Variável" },
      { type: "Pedágios", category: "Custo Variável" },
      { type: "Frete Subcontratado", category: "Custo Variável" },
      { type: "Adiantamento", category: "Custo Variável" },
      { type: "Horas Extras Operacionais", category: "Custo Variável" },
      { type: "Deslocamento entre Filiais", category: "Custo Variável" },
      { type: "Manutenção Corretiva", category: "Custo Variável" },
      { type: "Multas e Penalidades", category: "Custo Variável" },
      { type: "Armazenagem", category: "Custo Variável" },
      { type: "Transbordo / Redespacho", category: "Custo Variável" },
      { type: "Carga e Descarga Terceirizada", category: "Custo Variável" },
      { type: "Material de Expedição", category: "Custo Variável" },
      { type: "Locação de Equipamentos", category: "Custo Variável" },
      { type: "Serviços Avulsos", category: "Custo Variável" },
      { type: "Ger. de Risco por Operação", category: "Custo Variável" },
      { type: "Falhas de Entrega", category: "Custo Variável" },
      { type: "Despesas Administrativas", category: "Custo Variável" },
      { type: "Falhas Operacionais", category: "Custo Variável" },
      { type: "Falhas Jurídicas", category: "Custo Variável" },
      { type: "Outros", category: "Custo Variável" },
    ],
    "Impostos e Tributos": [
      { type: "IRPJ", category: "Impostos e Tributos" },
      { type: "CSLL", category: "Impostos e Tributos" },
      { type: "PIS", category: "Impostos e Tributos" },
      { type: "COFINS", category: "Impostos e Tributos" },
      { type: "ISS", category: "Impostos e Tributos" },
      { type: "ICMS ST", category: "Impostos e Tributos" },
      { type: "ICMS DIFAL", category: "Impostos e Tributos" },
      { type: "INSS Patronal", category: "Impostos e Tributos" },
      { type: "FGTS", category: "Impostos e Tributos" },
      { type: "IRRF", category: "Impostos e Tributos" },
      { type: "DPVAT", category: "Impostos e Tributos" },
      { type: "ANTT / RNTRC / Fiscalização", category: "Impostos e Tributos" },
      { type: "Taxas Municipais", category: "Impostos e Tributos" },
      { type: "Taxas Estaduais", category: "Impostos e Tributos" },
      { type: "Parc. Tributos Federais", category: "Impostos e Tributos" },
      {
        type: "Parc. Tributos Estado / Munic.",
        category: "Impostos e Tributos",
      },
      {
        type: "Multas e Juros por Atraso Fiscal",
        category: "Impostos e Tributos",
      },
      { type: "Outros Tributos - Descreva", category: "Impostos e Tributos" },
    ],
    "Custo de Vendas / Operação Logística": [
      {
        type: "Frete Subcontratado",
        category: "Custo de Vendas / Operação Logística",
      },
      { type: "Combustível", category: "Custo de Vendas / Operação Logística" },
      { type: "Pedágios", category: "Custo de Vendas / Operação Logística" },
      {
        type: "Seguro de Carga",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Gerenciamento de Risco",
        category: "Custo de Vendas / Operação Logística",
      },
      { type: "Armazenagem", category: "Custo de Vendas / Operação Logística" },
      {
        type: "Ajudas de Custo",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Motoristas Agregados",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Escolta / Especial",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Locação de Equipamentos",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Transbordo / Redespacho",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Carga e Descarga Terceirizada",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Devolução de Mercadoria",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Projetos Pontuais",
        category: "Custo de Vendas / Operação Logística",
      },
      { type: "Outros", category: "Custo de Vendas / Operação Logística" },
    ],
    "Capex (Investimentos)": [
      { type: "Compra de Veículos", category: "Capex (Investimentos)" },
      {
        type: "Aquisição - Máquinass e Equip.",
        category: "Capex (Investimentos)",
      },
      { type: "Galpão / CD", category: "Capex (Investimentos)" },
      { type: "Reformas e Infraestrutura", category: "Capex (Investimentos)" },
      { type: "Sistemas e Softwares", category: "Capex (Investimentos)" },
      { type: "Mobiliários", category: "Capex (Investimentos)" },
      { type: "Obras", category: "Capex (Investimentos)" },
      { type: "Projetos de Expansão", category: "Capex (Investimentos)" },
      { type: "Investimentos Financeiro", category: "Capex (Investimentos)" },
    ],
    "Reembolsos / Adiantamentos": [
      {
        type: "Adiantamento de Viagem",
        category: "Reembolsos / Adiantamentos",
      },
      {
        type: "Despesas com Alimentação",
        category: "Reembolsos / Adiantamentos",
      },
      {
        type: "Combustível (Reembolso)",
        category: "Reembolsos / Adiantamentos",
      },
      { type: "Despesas com Pedágio", category: "Reembolsos / Adiantamentos" },
      {
        type: "Caixa Interno / Fundo Fixo",
        category: "Reembolsos / Adiantamentos",
      },
    ],
  };

  const costCenters = [
    "Centro de Custo",
    "Abastecimento Interno",
    "Administrativo",
    "Armazém / CD",
    "Atendimento ao Cliente / SAC",
    "Auditoria / Conformidade",
    "Backoffice / Suporte",
    "Caixa Interno / Fundo Fixo",
    "Capex / Investimentos",
    "Comercial",
    "Compras / Suprimentos",
    "Consultivo Empresarial",
    "Consultoria Estratégica",
    "Contabilidade",
    "Contencioso Trabalhista",
    "Controle de Estoque / Inventário",
    "Departamento Pessoal",
    "Desenvolvimento de Produto",
    "Desenvolvimento de Sistemas",
    "Engenharia de Processos",
    "Equipamentos Logísticos",
    "Filiais / Regionais",
    "Financeiro",
    "Fiscal / Tributário",
    "Frota",
    "Funcionários em Viagem",
    "Gerenciamento de Crises",
    "Gestão Ambiental",
    "Infraestrutura",
    "Infraestrutura / Manutenção",
    "Infraestrutura de TI",
    "Inovação e P&D",
    "Investimentos",
    "Jurídico",
    "Licenças e Softwares",
    "Manutenção Predial",
    "Marketing Digital",
    "Motoristas",
    "Novas Filiais",
    "Obras e Projetos",
    "Obras e Reformas",
    "Oficina Interna",
    "Operacional",
    "Parcerias Estratégicas / Franquias",
    "Planejamento Operacional",
    "Produção",
    "Projetos Estratégicos",
    "Projetos e Expansão",
    "Provisões Jurídicas",
    "Qualidade / Compliance Operacional",
    "RH",
    "Recrutamento e Seleção",
    "Reembolsos e Adiantamentos",
    "Relacionamento com Cliente",
    "Saúde e Segurança do Trabalho",
    "Sede / Escritório Central",
    "Segurança Logística",
    "Suporte Técnico",
    "TI",
    "Tecnologia",
    "Tesouraria",
    "Transferência / Roteirização",
    "Transportadoras Parceiras",
    "Treinamento e Desenvolvimento",
    "Vendas Diretas",
    "Viagens Corporativas",
  ];

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

  const paymentTerms = ["Total no Ato", "Parcelado", "Recorrente"];

  const [filteredCategories, setFilteredCategories] = useState("");
  const [filteredCostCenters, setFilteredCostCenters] = useState("");

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [filterInstallments, setFilterInstallments] = useState("");

  const categoryOptions =
    data.costType && categoriesByCostType[data.costType as CostType]
      ? categoriesByCostType[data.costType as CostType].filter(({ type }) =>
          type.toLowerCase().includes(filteredCategories.toLowerCase()),
        )
      : [];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // mantém só 0‑9
    const onlyDigits = e.target.value.replace(/\D/g, "");

    // se o usuário digitou “1234”, queremos 12,34
    // => divide por 100 para posicionar a vírgula
    const amountNumber = Number(onlyDigits) / 100;

    setData({ ...data, amount: amountNumber });
  };
  return (
    <>
      <div className="flex-1">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="mt-2 flex gap-2">
            <div className="bg-primary/40 relative flex w-96 flex-row overflow-hidden rounded-lg p-2">
              <div
                className={`absolute top-0 bottom-0 left-0 flex w-1/3 transform items-center justify-center transition-transform duration-300 ${data.entryType === "DESPESAS" ? "translate-x-0 pl-2" : data.entryType === "IMPOSTOS" ? "translate-x-full" : "translate-x-[200%] pr-2"}`}
              >
                <div className="bg-primary h-[80%] w-[95%] rounded-lg"></div>
              </div>
              <button
                onClick={() => setData({ ...data, entryType: "DESPESAS" })}
                className={`relative z-10 w-1/3 px-4 py-1 text-sm transition-all duration-300 ${data.entryType === "DESPESAS" ? "font-semibold text-white" : "text-white/80"}`}
              >
                DESPESAS
              </button>
              <button
                onClick={() => setData({ ...data, entryType: "IMPOSTOS" })}
                className={`relative z-10 w-1/3 px-4 py-1 text-sm transition-all duration-300 ${data.entryType === "IMPOSTOS" ? "font-semibold text-white" : "text-white/80"}`}
              >
                IMPOSTOS
              </button>
              <button
                onClick={() => setData({ ...data, entryType: "C. VENDAS" })}
                className={`relative z-10 w-1/3 px-4 py-1 text-sm transition-all duration-300 ${data.entryType === "C. VENDAS" ? "font-semibold text-white" : "text-white/80"}`}
              >
                <span className="w-max">C. VENDAS</span>
              </button>
            </div>
          </div>
        </div>
        <div className="my-4 h-px bg-zinc-200/60" />
        <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
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
                <span className="flex-1 2xl:text-lg">
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
            <button
              onClick={() => setIsOpenLaunchTypeModal(true)}
              className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2"
            >
              <div className="flex h-full w-6">
                <DollarSign size={16} className="text-primary" />
              </div>
              <div className="flex h-full flex-1 items-center">
                <span className="flex-1 2xl:text-lg">
                  {data.documentType || "Selecione"}
                </span>
              </div>
              <div className="flex h-full w-6 justify-end">
                <Edit size={16} className="text-primary" />
              </div>
            </button>
            {/* <DropdownMenu
              open={isDocumentTypeDropdownOpen}
              onOpenChange={setIsDocumentTypeDropdownOpen}
            >
              <DropdownMenuTrigger className="w-full focus:outline-none"> 
                 <button onClick={() => setIsOpenLaunchTypeModal(true)} className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                  <div className="flex h-full w-6">
                    <DollarSign size={16} className="text-primary" />
                  </div>
                  <div className="flex h-full flex-1 items-center">
                    <span className="flex-1 2xl:text-lg">
                      {data.documentType || "Selecione"}
                    </span>
                  </div>
                  <div className="flex h-full w-6 justify-end">
                    <Edit size={16} className="text-primary" />
                  </div>
                </button> 
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
                  item.toLowerCase().includes(filteredDocuments.toLowerCase()),
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
                      onClick={() => setData({ ...data, documentType: item })}
                      className="hover:bg-primary/20 cursor-pointer transition duration-300"
                    >
                      <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                        {item}
                        {/* Check icon 
                         {data.documentType === item && (
                          <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu> */}
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
                    value={data.amount.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    onChange={handleChange}
                    placeholder="R$ 0,00"
                    className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
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
                    <div className="flex-1 text-zinc-700 2xl:text-lg">
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
                    <div className="flex-1 text-zinc-700 2xl:text-lg">
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
                  <span className="flex-1 text-zinc-700 2xl:text-lg">
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
                    onClick={() => setData({ ...data, paymentTerms: term })}
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
                  <span className="flex-1 text-zinc-700 2xl:text-lg">
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
                    ins
                      .toLowerCase()
                      .includes(filterInstallments.toLowerCase()),
                  )
                  .map((ins) => (
                    <DropdownMenuItem
                      key={ins}
                      onClick={() => setData({ ...data, paymentDetails: ins })}
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

          {/* --------------------- CENTRO DE CUSTO --------------------- */}
          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Centro de Custos</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full focus:outline-none">
                <div className="flex h-16 items-center gap-2 overflow-hidden rounded-2xl border border-zinc-200 px-3 py-2">
                  <div className="flex h-full w-6">
                    <Building2 size={16} className="text-primary" />
                  </div>
                  <div className="flex h-full flex-1 items-center">
                    <span className="flex flex-1 flex-col text-left">
                      {selectedCostCenters.length > 0
                        ? `${selectedCostCenters.length} selecionado${selectedCostCenters.length > 1 ? "s" : ""}`
                        : "Selecione"}
                      {selectedCostCenters.length === 0 && (
                        <span className="text-sm text-zinc-500">
                          Selecionar
                        </span>
                      )}
                      {selectedCostCenters.length > 0 && (
                        <span className="truncate text-sm text-zinc-500">
                          {selectedCostCenters
                            .slice(0, 2)
                            .map((cc) => cc.name)
                            .join(", ")}
                          {selectedCostCenters.length > 2 &&
                            ` +${selectedCostCenters.length - 2}`}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex h-full w-6 justify-end">
                    <Edit size={16} className="text-primary" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                className="z-[999] max-h-[500px] overflow-y-auto rounded-lg border-zinc-200"
              >
                <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                  <input
                    value={filteredCostCenters}
                    onChange={(e) => setFilteredCostCenters(e.target.value)}
                    placeholder="Pesquisar Centro de Custos"
                    className="flex-1 focus:outline-none"
                  />
                  <Search size={14} />
                </div>

                {/* Add clear all button */}
                {selectedCostCenters.length > 0 && (
                  <div className="px-8 pb-2">
                    <button
                      onClick={() => {
                        setSelectedCostCenters([]);
                        setData({ ...data, costCenters: [] });
                      }}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Limpar seleção
                    </button>
                  </div>
                )}

                <div className="flex flex-col">
                  {costCenters
                    .filter((item) =>
                      item
                        .toLowerCase()
                        .includes(filteredCostCenters.toLowerCase()),
                    )
                    .map((item) => (
                      <DropdownMenuItem
                        key={item}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleCostCenterToggle(item);
                        }}
                        className="hover:bg-primary/20 cursor-pointer transition duration-300"
                      >
                        <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                          {item}
                          {selectedCostCenters.some(
                            (cc) => cc.name === item,
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

          {/* --------------------- CONTA CONTÁBIL --------------------- */}
          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Conta Contábil</span>
            <div
              onClick={() => setIsOpenContabilidadeModal(true)}
              className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2"
            >
              <div className="flex h-full w-6">
                <MapPin size={16} className="text-primary" />
              </div>
              <div className="flex flex-1 flex-col text-left">
                <span className="flex-1">
                  {data.accountingAccount.code || "-"}
                </span>
                <span className="text-zinc-400">
                  {data.accountingAccount.description || "Selecione"}
                </span>
              </div>
              <div className="flex h-full w-6 justify-end">
                <Edit size={16} className="text-primary" />
              </div>
            </div>
          </label>
        </div>
        {data.costCenters.length > 0 && (
          <CostCentersList data={data} setData={setData} />
        )}
      </div>
      {isCategoryModalOpen && (
        <CategoryModal
          show={isCategoryModalOpen}
          onHide={() => setIsCategoryModalOpen(false)}
          filteredCategories={filteredCategories}
          setFilteredCategories={setFilteredCategories}
          categoryOptions={categoryOptions}
          data={data}
          setData={setData}
        />
      )}
    </>
  );
}
