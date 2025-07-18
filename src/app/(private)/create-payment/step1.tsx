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
  data: DataType;
  setData: (value: DataType) => void;
}

/**
 * Helper to format BRL currency while we keep the raw number in state.
 */
const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

export function Step1({ setIsOpenClientModal, data, setData }: Props) {
  const categories = [
    "Aluguel / Condomínio / IPTU",
    "Internet",
    "Energia",
    "Licenças e Softwares",
    "Seguros de Carga",
    "Custos - Contabilidade",
    "Serviços Terceirizados",
    "Manutenção Preventiva",
    "Água e Esgoto",
    "Telefonia e Similares",
    "Seguros Patrimoniais",
    "Seguros Empresariais Gerais",
    "Folha Administrativa",
    "Taxas Bancárias",
    "Material de Escritório",
    "Material Limpeza",
    "Outros - Descreva",
  ];
  const costCenters = [
    "Frete Contratado",
    "Operacional",
    "Consolidação de Carga",
    "Seguros / GR",
    "Frota",
    "Comercial",
    "Administrativo",
    "Financeiro / Contábil",
    "Ativo/Passivo Transitório",
    "Retiradas de Sócios",
    "Corporativo",
    "Recursos Humanos (RH)",
    "Jurídico",
    "Compras / Suprimentos",
  ];
  const costTypes = [
    "Custo Fixo",
    "Custo Variável",
    "Impostos e Tributos",
    "Custo de Vendas/Op. Logística",
    "Capex (Investimentos)",
    "Reembolsos / Adiantamentos",
    "Outros",
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

  return (
    <div className="flex-1">
      {/* -------------------------
       *  TOGGLE TIPO DE LANÇAMENTO
       * ------------------------*/}
      <div className="flex w-full flex-row items-center justify-between">
        <span className="font-medium text-zinc-600">Tipo de Lançamento:</span>
        <div className="mt-2 flex gap-2">
          <div className="bg-primary/40 relative flex overflow-hidden rounded-lg p-2">
            {/* Slider */}
            <div
              className={`absolute inset-y-0 left-0 w-1/2 transform items-center justify-center transition-transform duration-300 ${
                data.entryType === "TOTAL"
                  ? "translate-x-full pr-2"
                  : "translate-x-0 pl-2"
              }`}
            >
              <div className="bg-primary h-[80%] w-[95%] rounded-lg" />
            </div>
            {/* Buttons */}
            <button
              onClick={() => setData({ ...data, entryType: "PARTIAL" })}
              className={`relative z-10 w-1/2 px-4 py-1 text-sm transition-all duration-300 ${
                data.entryType === "PARTIAL" ? "text-white" : "text-white/80"
              }`}
            >
              PARCIAL
            </button>
            <button
              onClick={() => setData({ ...data, entryType: "TOTAL" })}
              className={`relative z-10 w-1/2 px-4 py-1 text-sm transition-all duration-300 ${
                data.entryType === "TOTAL" ? "text-white" : "text-white/80"
              }`}
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
              <span className="flex-1 text-xl font-semibold">
                {data.amount ? formatBRL(data.amount) : "R$ 0,00"}
              </span>
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
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <Settings size={16} className="text-primary" />
                </div>
                <div className="flex h-full flex-1 items-center">
                  <span className="flex flex-1 flex-col text-left font-semibold">
                    {data.category || "Selecione"}
                    {!data.category && (
                      <span className="text-md font-normal text-zinc-400">
                        Selecione
                      </span>
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
                    value={filteredCategories}
                    onChange={(e) => setFilteredCategories(e.target.value)}
                    placeholder="Pesquisar a Categoria"
                    className="flex-1 focus:outline-none"
                  />
                  <Search size={14} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {categories.filter((item) =>
                  item.toLowerCase().includes(filteredCategories.toLowerCase()),
                ).length === 0 && (
                  <div className="col-span-2 p-2 text-center text-sm text-zinc-600">
                    Nenhum item encontrado
                  </div>
                )}
                {categories
                  .filter((item) =>
                    item
                      .toLowerCase()
                      .includes(filteredCategories.toLowerCase()),
                  )
                  .map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => setData({ ...data, category: item })}
                      className="hover:bg-primary/20 cursor-pointer transition duration-300"
                    >
                      <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                        {item}
                        {data.category === item && (
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
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
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
