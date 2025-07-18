import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Building2,
  ChevronRight,
  DollarSign,
  Edit,
  MapPin,
  Search,
  Settings,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { DataType } from "./page";

interface Props {
  setIsOpenClientModal: (value: boolean) => void;
  setIsOpenContabilidadeModal: (value: boolean) => void;
  data: DataType;
  setData: (value: DataType) => void;
}
type CostType =
  | "Custo Fixo"
  | "Custo Variável"
  | "Custo de Vendas / Operação Logística"
  | "Impostos e Tributos"
  | "Capex (Investimentos)"
  | "Reembolsos / Adiantamentos";

type Category = {
  /** Descrição da categoria a ser mostrada ao usuário */
  type: string;
  /** Deve SEMPRE repetir o CostType correspondente, para facilitar filtros  */
  category: CostType;
};
/**
 * Helper to format BRL currency while we keep the raw number in state.
 */

export function Step1({
  setIsOpenClientModal,
  data,
  setData,
  setIsOpenContabilidadeModal,
}: Props) {
  const categoriesByCostType: Record<CostType, Category[]> = {
    "Custo Fixo": [
      { type: "Aluguel", category: "Custo Fixo" },
      { type: "Energia Elétrica", category: "Custo Fixo" },
      { type: "Água", category: "Custo Fixo" },
      { type: "Internet", category: "Custo Fixo" },
      { type: "Telefone", category: "Custo Fixo" },
      { type: "Salários Administrativos", category: "Custo Fixo" },
      { type: "Segurança Patrimonial", category: "Custo Fixo" },
      { type: "Contabilidade", category: "Custo Fixo" },
      { type: "Licenças de Software", category: "Custo Fixo" },
      { type: "Limpeza e Conservação", category: "Custo Fixo" },
    ],
    "Custo Variável": [
      { type: "Comissões de Venda", category: "Custo Variável" },
      { type: "Bonificações", category: "Custo Variável" },
      { type: "Embalagens", category: "Custo Variável" },
      { type: "Materiais de Expedição", category: "Custo Variável" },
      { type: "Horas Extras Operacionais", category: "Custo Variável" },
      { type: "Custos com Terceirizados", category: "Custo Variável" },
      { type: "Combustível (uso variável)", category: "Custo Variável" },
      { type: "Materiais de Consumo", category: "Custo Variável" },
    ],
    "Impostos e Tributos": [
      { type: "IRPJ", category: "Impostos e Tributos" },
      { type: "CSLL", category: "Impostos e Tributos" },
      { type: "IRRF", category: "Impostos e Tributos" },
      { type: "IPI", category: "Impostos e Tributos" },
      { type: "II", category: "Impostos e Tributos" },
      { type: "PIS/PASEP", category: "Impostos e Tributos" },
      { type: "COFINS", category: "Impostos e Tributos" },
      { type: "IOF", category: "Impostos e Tributos" },
      { type: "Multa", category: "Impostos e Tributos" },
      { type: "Ganhos de Capital", category: "Impostos e Tributos" },
      { type: "Renda Fixa PF", category: "Impostos e Tributos" },
      { type: "Renda Fixa PJ", category: "Impostos e Tributos" },
      { type: "Rendimentos em Bolsa", category: "Impostos e Tributos" },
      { type: "SISCOMEX", category: "Impostos e Tributos" },
      { type: "INSS", category: "Impostos e Tributos" },
      { type: "FGTS", category: "Impostos e Tributos" },
      { type: "DARF", category: "Impostos e Tributos" },
      { type: "Simples", category: "Impostos e Tributos" },
      { type: "CPRB", category: "Impostos e Tributos" },
    ],
    "Custo de Vendas / Operação Logística": [
      {
        type: "Frete Contratado",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Frete Coleta",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Frete Redespacho",
        category: "Custo de Vendas / Operação Logística",
      },
      { type: "Combustível", category: "Custo de Vendas / Operação Logística" },
      { type: "Pedágio", category: "Custo de Vendas / Operação Logística" },
      { type: "GRIS", category: "Custo de Vendas / Operação Logística" },
      { type: "Advalorem", category: "Custo de Vendas / Operação Logística" },
      {
        type: "Seguro de Carga",
        category: "Custo de Vendas / Operação Logística",
      },
      { type: "Coleta", category: "Custo de Vendas / Operação Logística" },
      {
        type: "Taxas de Entrega",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Manutenção de Frota",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Pneus e Peças",
        category: "Custo de Vendas / Operação Logística",
      },
      {
        type: "Serviços de Logística Terceirizados",
        category: "Custo de Vendas / Operação Logística",
      },
    ],
    "Capex (Investimentos)": [
      { type: "Compra de Equipamentos", category: "Capex (Investimentos)" },
      { type: "Aquisição de Imobilizado", category: "Capex (Investimentos)" },
      { type: "Construção / Obra", category: "Capex (Investimentos)" },
      { type: "Investimento em Tecnologia", category: "Capex (Investimentos)" },
      { type: "Reforma de Infraestrutura", category: "Capex (Investimentos)" },
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

  const costTypes = [
    "Custo Fixo",
    "Custo Variável",
    "Custo de Vendas / Operação Logística",
    "Impostos e Tributos",
    "Capex (Investimentos)",
    "Reembolsos / Adiantamentos",
  ];
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

  const coins = [
    "Lançar Despesa",
    "Pagamento de Colaboradores",
    "Desp. Recorrentes",
  ];
  const documents = [
    "Lançar Despesa",
    "Pagamento de Colaboradores",
    "Desp. Recorrentes",
  ];
  const [filteredCategories, setFilteredCategories] = useState("");
  const [filteredCostCenters, setFilteredCostCenters] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState("");
  const [filteredCoin, setFilteredCoin] = useState("");
  const [filteredCostType, setFilteredCostType] = useState("");
  const [valor, setValor] = useState(data.amount); // centavos!

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // 1. só dígitos
    const digits = e.target.value.replace(/\D/g, "");
    // 2. se nada digitado, fica 0
    const cents = digits === "" ? 0 : parseInt(digits, 10);
    setValor(cents);
    setData({ ...data, amount: cents });
  }
  const formatBRL = (valueInCents: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valueInCents / 100);
  const categoryOptions =
    data.costType && categoriesByCostType[data.costType as CostType]
      ? categoriesByCostType[data.costType as CostType].filter(({ type }) =>
          type.toLowerCase().includes(filteredCategories.toLowerCase()),
        )
      : [];
  return (
    <div className="flex-1">
      {/* -------------------------
       *  TOGGLE TIPO DE LANÇAMENTO
       * ------------------------*/}
      <div className="flex w-full flex-row items-center justify-between">
        <span className="font-medium text-zinc-600">Tipo de Lançamento:</span>
        <div className="mt-2 flex gap-2">
          <div className="bg-primary/40 relative flex flex-row overflow-hidden rounded-lg p-2">
            <div
              className={`absolute top-0 bottom-0 left-0 flex w-1/2 transform items-center justify-center transition-transform duration-300 ${data.entryType === "TOTAL" ? "translate-x-full pr-2" : "translate-x-0 pl-2"}`}
            >
              <div className="bg-primary h-[80%] w-[95%] rounded-lg"></div>
            </div>
            <button
              onClick={() => setData({ ...data, entryType: "PARTIAL" })}
              className={`relative z-10 w-1/2 px-4 py-1 text-sm transition-all duration-300 ${data.entryType === "PARTIAL" ? "text-white/80" : "text-white"}`}
            >
              PARCIAL
            </button>
            <button
              onClick={() => setData({ ...data, entryType: "TOTAL" })}
              className={`relative z-10 w-1/2 px-4 py-1 text-sm transition-all duration-300 ${data.entryType === "TOTAL" ? "text-white" : "text-white/80"}`}
            >
              TOTAL
            </button>
          </div>
        </div>
        {/* Invisible span just to keep spacing */}
        <span className="invisible font-medium text-transparent">
          Tipo de Lançamento:
        </span>
      </div>

      <div className="my-4 h-px bg-zinc-200/60" />

      {/* -------------------------
       *  GRID DE INFORMAÇÕES
       * ------------------------*/}
      <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700">
        {/* --------------------- FORNECEDOR --------------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Fornecedor</span>
          <button
            onClick={() => setIsOpenClientModal(true)}
            className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2"
          >
            <div className="flex h-full w-6">
              <MapPin size={16} className="text-primary" />
            </div>
            <div className="flex flex-1 flex-col text-left">
              <span className="flex-1">
                {data.supplier.name || "Selecione"}
              </span>
              <span className="text-zinc-400">{data.supplier.cnpj || "-"}</span>
            </div>
            <div className="flex h-full w-6 justify-end">
              <Edit size={16} className="text-primary" />
            </div>
          </button>
        </label>

        {/* --------------------- TIPO DE DOCUMENTO --------------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Tipo de Documento</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <DollarSign size={16} className="text-primary" />
                </div>
                <div className="flex h-full flex-1 items-center">
                  <span className="flex-1 text-lg font-semibold">
                    {data.documentType || "Selecione"}
                  </span>
                </div>
                <div className="flex h-full w-6 justify-end">
                  <Edit size={16} className="text-primary" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="z-[999]">
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center justify-between gap-4 rounded-lg border p-2 text-sm">
                  <input
                    value={filteredDocuments}
                    onChange={(e) => setFilteredDocuments(e.target.value)}
                    placeholder="Pesquisar tipos de Documentos"
                    className="flex-1 focus:outline-none"
                  />
                  <Search size={14} />
                </div>
              </div>
              {filteredDocuments.length > 0 && (
                <div className="p-2 text-center text-sm text-zinc-600">
                  Nenhum item encontrado
                </div>
              )}
              {documents
                .filter((item) =>
                  item.toLowerCase().includes(filteredDocuments.toLowerCase()),
                )
                .map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => setData({ ...data, documentType: item })}
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

        {/* --------------------- VALOR --------------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Valor no Documento</span>
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <div className="flex h-full w-6">
              <DollarSign size={16} className="text-primary" />
            </div>
            <div className="flex h-full flex-1 items-center text-center">
              <input
                value={formatBRL(valor)}
                onChange={handleChange}
                placeholder="R$ 0,00"
                className="flex-1 bg-transparent text-lg text-zinc-700 outline-none"
              />
            </div>
            <div className="flex h-full w-6"></div>
          </div>
        </label>

        {/* --------------------- MOEDA --------------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Moeda</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <DollarSign size={16} className="text-primary" />
                </div>
                <div className="flex h-full flex-1 items-center">
                  <span className="flex-1 text-lg font-semibold">
                    {data.currency || "Selecione"}
                  </span>
                </div>
                <div className="flex h-full w-6 justify-end">
                  <Edit size={16} className="text-primary" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="z-[999]">
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center justify-between gap-4 rounded-lg border p-2 text-sm">
                  <input
                    value={filteredCoin}
                    onChange={(e) => setFilteredCoin(e.target.value)}
                    placeholder="Pesquisar Moeda"
                    className="flex-1 focus:outline-none"
                  />
                  <Search size={14} />
                </div>
              </div>
              {filteredCoin.length > 0 && (
                <div className="p-2 text-center text-sm text-zinc-600">
                  Nenhum item encontrado
                </div>
              )}
              {coins
                .filter((item) =>
                  item.toLowerCase().includes(filteredCoin.toLowerCase()),
                )
                .map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => setData({ ...data, currency: item })}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {item}
                      {data.currency === item && (
                        <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* --------------------- TIPO DE CUSTO --------------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Tipo de Custo</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <Tag size={16} className="text-primary" />
                </div>
                <div className="flex h-full flex-1 items-center">
                  <span className="flex flex-1 flex-col font-semibold">
                    {data.costType || "Selecione"}
                  </span>
                </div>
                <div className="flex h-full w-6 justify-end">
                  <Edit size={16} className="text-primary" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="z-[999]">
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center justify-between gap-4 rounded-lg border p-2 text-sm">
                  <input
                    value={filteredCostType}
                    onChange={(e) => setFilteredCostType(e.target.value)}
                    placeholder="Pesquisar tipo de Custo"
                    className="flex-1 focus:outline-none"
                  />

                  <Search size={14} />
                </div>
              </div>

              {costTypes.filter((item) =>
                item.toLowerCase().includes(filteredCostType.toLowerCase()),
              ).length === 0 && (
                <div className="col-span-2 p-2 text-center text-sm text-zinc-600">
                  Nenhum item encontrado
                </div>
              )}
              {costTypes
                .filter((item) =>
                  item.toLowerCase().includes(filteredCostType.toLowerCase()),
                )
                .map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => setData({ ...data, costType: item })}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {item}
                      {data.costType === item && (
                        <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* --------------------- CATEGORIA --------------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Categoria</span>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="w-full focus:outline-none"
              disabled={!data.costType}
            >
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <Settings size={16} className="text-primary" />
                </div>
                <div className="flex h-full flex-1 items-center">
                  <span className="flex flex-1 flex-col text-left font-semibold">
                    {!data.costType ? (
                      <span className="text-md font-normal text-zinc-400">
                        Selecione um tipo de custo para escolher
                      </span>
                    ) : (
                      data.category || "Selecione"
                    )}
                  </span>
                </div>
                <div className="flex h-full w-6 items-center">
                  <ChevronRight className="text-primary" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              className="z-[999] max-h-[600px] overflow-y-auto"
            >
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center justify-between gap-4 rounded-lg border p-2 text-sm">
                  <input
                    value={filteredCategories || ""}
                    onChange={(e) => setFilteredCategories(e.target.value)}
                    placeholder="Pesquisar a Categoria"
                    className="flex-1 focus:outline-none"
                  />
                  <Search size={14} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {categoryOptions.length === 0 && (
                  <div className="col-span-2 p-2 text-center text-sm text-zinc-600">
                    Nenhum item encontrado
                  </div>
                )}
                {categoryOptions?.map(({ type }) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setData({ ...data, category: type })}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {type}
                      {data.category === type && (
                        <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* --------------------- CENTRO DE CUSTO --------------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Centro de Custos</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <Building2 size={16} className="text-primary" />
                </div>
                <div className="flex h-full flex-1 items-center">
                  <span className="flex flex-1 flex-col text-left font-semibold">
                    {data.costCenter || "Selecione"}
                    {!data.costCenter && (
                      <span className="text-md font-normal text-zinc-400">
                        Selecionar
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
              side="top"
              className="z-[999] max-h-[600px] overflow-y-auto"
            >
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center justify-between gap-4 rounded-lg border p-2 text-sm">
                  <input
                    value={filteredCostCenters}
                    onChange={(e) => setFilteredCostCenters(e.target.value)}
                    placeholder="Pesquisar Centro de Custos"
                    className="flex-1 focus:outline-none"
                  />

                  <Search size={14} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {costCenters
                  .filter((item) =>
                    item
                      .toLowerCase()
                      .includes(filteredCostCenters.toLowerCase()),
                  )
                  .map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => setData({ ...data, costCenter: item })}
                      className="hover:bg-primary/20 cursor-pointer transition duration-300"
                    >
                      <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                        {item}
                        {data.costCenter === item && (
                          <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* --------------------- CONTA CONTÁBIL --------------------- */}
        <label className="flex flex-col gap-1">
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
    </div>
  );
}
