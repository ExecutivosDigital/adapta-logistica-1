import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Building2,
  Calendar,
  CreditCard,
  DollarSign,
  Edit,
  FileText,
  MapPin,
  Search,
  Settings,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { DataType } from "./page";

interface Props {
  data: DataType;
  setData: (value: DataType) => void;
}

/**
 * Utility: BRL currency formatter
 
/**
 * Utility: dd/mm/yyyy from ISO (yyyy-mm-dd)
 */
const formatDateBR = (isoDate: string) => {
  if (!isoDate) return "--/--/----";
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
};

export function Step4({ data, setData }: Props) {
  /* ------------------ static lists ------------------ */
  const creditCardList = [
    { id: 1, name: "Itaú - C/c **333" },
    { id: 2, name: "Itaú Invest. - **222" },
    { id: 3, name: "Credito Itaú - Final 4455" },
    { id: 4, name: "Bradesco - **555" },
  ];
  const paymentFormList = [
    { id: 0, name: "PIX" },
    { id: 1, name: "Boleto" },
    { id: 2, name: "Cartão de Crédito" },
    { id: 3, name: "Depósito" },
    { id: 4, name: "Transferência Bancária" },
    { id: 5, name: "Dinheiro em Mãos" },
    { id: 6, name: "Fatura" },
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
  const costTypes = [
    "Custo Fixo",
    "Custo Variável",
    "Impostos e Tributos",
    "Custo de Vendas/Op. Logística",
    "Capex (Investimentos)",
    "Reembolsos / Adiantamentos",
    "Outros",
  ];
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

  /* ------------------ local search states ------------------ */
  const [filterCard, setFilterCard] = useState("");
  const [filterPaymentForm, setFilterPaymentForm] = useState("");
  const [filterCostType, setFilterCostType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filteredCostCenters, setFilteredCostCenters] = useState("");
  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700">
        {/* ----------------- PAGAMENTO VIA ----------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Pagamento via</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <CreditCard className="text-primary" size={16} />
                <div className="flex flex-1 flex-col text-left">
                  <span>Método de Pagamento</span>
                  <span className="text-zinc-400">
                    {data.paymentMethod?.bank || "Selecione"}
                  </span>
                </div>
                <Edit className="text-primary" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              className="z-[999] mt-3 max-h-[600px] overflow-y-auto"
            >
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center gap-2 rounded-lg border p-2 text-sm">
                  <input
                    className="flex-1 bg-transparent outline-none"
                    placeholder="Pesquisar Cartão / Conta"
                    value={filterCard}
                    onChange={(e) => setFilterCard(e.target.value)}
                  />
                  <Search size={14} />
                </div>
              </div>
              {creditCardList
                .filter((c) =>
                  c.name.toLowerCase().includes(filterCard.toLowerCase()),
                )
                .map((card) => (
                  <DropdownMenuItem
                    key={card.id}
                    onClick={() =>
                      setData({
                        ...data,
                        paymentMethod: {
                          bank: card.name.split(" - ")[0],
                          account: card.name,
                        },
                      })
                    }
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {card.name}
                      {data.paymentMethod?.account === card.name && (
                        <div className="bg-primary border-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* ----------------- FORMA DE PAGAMENTO ----------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Forma de Pagamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <DollarSign className="text-primary" size={16} />
                <span className="flex-1 text-left text-lg font-semibold">
                  {data.paymentForm || "Selecione"}
                </span>
                <Edit className="text-primary" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              className="z-[999] mt-3 max-h-[600px] overflow-y-auto"
            >
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center gap-2 rounded-lg border p-2 text-sm">
                  <input
                    className="flex-1 bg-transparent outline-none"
                    placeholder="Pesquisar Forma de Pagamento"
                    value={filterPaymentForm}
                    onChange={(e) => setFilterPaymentForm(e.target.value)}
                  />
                  <Search size={14} />
                </div>
              </div>
              {paymentFormList
                .filter((p) =>
                  p.name
                    .toLowerCase()
                    .includes(filterPaymentForm.toLowerCase()),
                )
                .map((p) => (
                  <DropdownMenuItem
                    key={p.id}
                    onClick={() => setData({ ...data, paymentForm: p.name })}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {p.name}
                      {data.paymentForm === p.name && (
                        <div className="bg-primary border-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* ----------------- NÚMERO NO DOCUMENTO ----------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Número no Documento</span>
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <DollarSign className="text-primary" size={16} />
            <input
              value={data.documentNumber}
              onChange={(e) =>
                setData({ ...data, documentNumber: e.target.value })
              }
              placeholder="Digite o número"
              className="flex-1 bg-transparent text-lg text-zinc-700 outline-none"
            />
          </div>
        </label>

        {/* ----------------- DATA PRÓX. PAGAMENTO ----------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Data Próximo Pagamento</span>
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <Calendar className="text-primary" size={16} />
            <span className="text-lg text-zinc-500">
              {formatDateBR(data.dueDate)}
            </span>
          </div>
        </label>

        {/* ----------------- TIPO DE CUSTO ----------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Tipo de Custo</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <Tag className="text-primary" size={16} />
                <span className="flex-1 text-left text-lg font-semibold">
                  {data.costType || "Selecione"}
                </span>
                <Edit className="text-primary" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              className="z-[999] mt-3 max-h-[600px] overflow-y-auto"
            >
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center gap-2 rounded-lg border p-2 text-sm">
                  <input
                    className="flex-1 bg-transparent outline-none"
                    placeholder="Pesquisar Tipo de Custo"
                    value={filterCostType}
                    onChange={(e) => setFilterCostType(e.target.value)}
                  />
                  <Search size={14} />
                </div>
              </div>
              {costTypes
                .filter((t) =>
                  t.toLowerCase().includes(filterCostType.toLowerCase()),
                )
                .map((t) => (
                  <DropdownMenuItem
                    key={t}
                    onClick={() => setData({ ...data, costType: t })}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {t}
                      {data.costType === t && (
                        <div className="bg-primary border-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* ----------------- CATEGORIA ----------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Categoria</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <Settings className="text-primary" size={16} />
                <span className="flex-1 text-left text-lg font-semibold">
                  {data.category || "Selecione"}
                </span>
                <Edit className="text-primary" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              className="z-[999] mt-3 max-h-[600px] overflow-y-auto"
            >
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center gap-2 rounded-lg border p-2 text-sm">
                  <input
                    className="flex-1 bg-transparent outline-none"
                    placeholder="Pesquisar Categoria"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  />
                  <Search size={14} />
                </div>
              </div>
              {categories
                .filter((c) =>
                  c.toLowerCase().includes(filterCategory.toLowerCase()),
                )
                .map((c) => (
                  <DropdownMenuItem
                    key={c}
                    onClick={() => setData({ ...data, category: c })}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {c}
                      {data.category === c && (
                        <div className="bg-primary border-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Centro de Custos</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <Building2 size={16} className="text-primary" />
                <div className="flex flex-1 items-center">
                  <span className="flex flex-1 flex-col text-left font-semibold">
                    {data.costCenter || "Selecione"}
                    {!data.costCenter && (
                      <span className="text-md font-normal text-zinc-400">
                        Selecionar
                      </span>
                    )}
                  </span>
                </div>
                <Edit size={16} className="text-primary" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              className="z-[999] max-h-[600px] overflow-y-auto"
            >
              <div className="mt-2 mb-2 px-8">
                <div className="border-primary text-primary flex h-8 w-full items-center gap-4 rounded-lg border p-2 text-sm">
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
                      <div className="flex w-full items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
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
            <MapPin size={16} className="text-primary" />
            <div className="flex flex-1 flex-col text-left">
              <span className="flex-1">
                {data.accountingAccount.code || "-"}
              </span>
              <span className="text-zinc-400">
                {data.accountingAccount.description || "Selecione"}
              </span>
            </div>
            <Edit size={16} className="text-primary" />
          </div>
        </label>

        {/* --------------------- CONDIÇÕES DE PAGAMENTO --------------------- */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Condições de Pagamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <FileText size={16} className="text-primary" />
                <span className="flex-1 text-lg font-semibold">
                  {data.paymentTerms || "Selecione"}
                </span>
                <Edit size={16} className="text-primary" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="bottom"
              className="z-[999] max-h-[600px] min-w-80 overflow-y-auto"
            >
              {["Total no Ato", "Parcelado", "Recorrente"].map((term) => (
                <DropdownMenuItem
                  key={term}
                  onClick={() => setData({ ...data, paymentTerms: term })}
                  className="hover:bg-primary/20 cursor-pointer transition duration-300"
                >
                  <div className="flex w-full items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
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
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Detalhes do Pagamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <DollarSign size={16} className="text-primary" />
                <span className="flex-1 text-lg font-semibold">
                  {data.paymentDetails || "Selecione"}
                </span>
                <Edit size={16} className="text-primary" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="right"
              className="z-[999] mt-4 max-h-[600px] min-w-80 overflow-y-auto"
            >
              {installments.map((opt) => (
                <DropdownMenuItem
                  key={opt}
                  onClick={() => setData({ ...data, paymentDetails: opt })}
                  className="hover:bg-primary/20 cursor-pointer transition duration-300"
                >
                  <div className="flex w-full items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                    {opt}
                    {data.paymentDetails === opt && (
                      <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>
      </div>
    </div>
  );
}
