import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlignLeft,
  Calendar,
  CreditCard,
  DollarSign,
  Edit,
  FileText,
  Search,
} from "lucide-react";
import { DataType } from "./page";
interface Props {
  data: DataType;
  setData: (value: DataType) => void;
}
// export function Step2({ data, setData }: Props) {
export function Step2({}: Props) {
  const CreditCardList = [
    {
      id: 1,
      name: "Itaú - C/c **333",
    },
    {
      id: 2,
      name: "Itaú Invest. - **222",
    },
    {
      id: 3,
      name: "Credito Itaú - Final 4455",
    },
    {
      id: 4,
      name: "lorem",
    },
    {
      id: 5,
      name: "lorem",
    },
    {
      id: 6,
      name: "lorem",
    },
    {
      id: 7,
      name: "lorem",
    },
  ];
  const PaymentFormList = [
    { id: 0, name: "PIX" },
    {
      id: 1,
      name: "Boleto",
    },
    {
      id: 2,
      name: "Cartão de Crédito",
    },
    {
      id: 3,
      name: "Deposito",
    },
    {
      id: 4,
      name: "Transferecia Bancária",
    },
    { id: 5, name: "Dinheiro em Mãos" },
    { id: 6, name: "Fatura " },
    { id: 7, name: "lorem" },
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
    "Outra - Digita aqui",
  ];
  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700">
        {/* Pagamento via */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Pagamento via</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <CreditCard className="text-primary" size={16} />
                </div>
                <div className="flex flex-1 flex-col">
                  <span>Método de Pagamento</span>
                  <span className="text-zinc-400">Itaú – C/c **333</span>
                </div>
                <div className="flex h-full w-6 justify-end">
                  <Edit className="text-primary" size={16} />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              className="z-[999] mt-4 max-h-[600px] overflow-y-auto"
            >
              <div className="mt-2 mb-2 px-8">
                <div className="text-primary border-primary flex h-8 w-full items-center justify-between gap-4 rounded-lg border p-2">
                  <div className="flex-1">Pesquisar Cartão de Credito</div>
                  <Search />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {CreditCardList.map((categoria, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {categoria.name}
                      <div className="border-primary h-4 w-4 rounded-md border"></div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* Forma de Pagamento */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Forma de Pagamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <div className="flex h-full w-6">
                  <DollarSign className="text-primary" size={16} />
                </div>
                <div className="flex-1 text-lg text-zinc-500">Selecione</div>
                <div className="flex h-full w-6 justify-end">
                  <Edit className="text-primary" size={16} />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              className="z-[999] mt-4 max-h-[600px] overflow-y-auto"
            >
              <div className="mt-2 mb-2 px-8">
                <div className="text-primary border-primary flex h-8 w-full items-center justify-between gap-4 rounded-lg border p-2">
                  <div className="flex-1">Pesquisar a Forma de Pagamento</div>
                  <Search />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {PaymentFormList.map((categoria, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {categoria.name}
                      <div className="border-primary h-4 w-4 rounded-md border"></div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* Número no Documento */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Número no Documento</span>
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <DollarSign className="text-primary" size={16} />
            <span className="text-lg text-zinc-500">0023232323232323 22</span>
          </div>
        </label>

        {/* Datas: Emissão e Vencimento */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-zinc-600">Data Emissão</span>
            <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
              <Calendar className="text-primary" size={16} />
              <span className="text-lg text-zinc-500">25/03/2025</span>
            </div>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-zinc-600">Data Vencimento</span>
            <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
              <Calendar className="text-primary" size={16} />
              <span className="text-lg text-zinc-500">25/03/2025</span>
            </div>
          </label>
        </div>

        {/* Condições de Pagamento */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Condições de Pagamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <FileText className="text-primary" size={16} />
                <span className="text-lg text-zinc-500">Selecione</span>
                <Edit className="text-primary ml-auto" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              className="z-[999] max-h-[600px] min-w-80 overflow-y-auto"
            >
              <div className="grid grid-cols-1 gap-8">
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                  <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                    Total no Ato
                    <div className="border-primary h-4 w-4 rounded-md border"></div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                  <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                    Parcelado
                    <div className="border-primary h-4 w-4 rounded-md border"></div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                  <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                    Recorrente
                    <div className="border-primary h-4 w-4 rounded-md border"></div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* Detalhes do Pagamento */}
        <label className="flex flex-col gap-1">
          <span className="text-zinc-600">Detalhes do Pagamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                <DollarSign className="text-primary" size={16} />
                <span className="text-lg text-zinc-500">Selecione</span>
                <Edit className="text-primary ml-auto" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              className="z-[999] mt-4 max-h-[600px] min-w-80 overflow-y-auto"
            >
              <div className="grid grid-cols-1 gap-8">
                {installments.map((categoria, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {categoria}
                      <div className="border-primary h-4 w-4 rounded-md border"></div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        {/* Descrição */}
        <div className="col-span-2 flex flex-col gap-1">
          <span className="text-zinc-600">Descrição</span>
          <div className="flex min-h-[96px] items-start gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <AlignLeft className="text-primary mt-1" size={16} />
            <textarea
              placeholder="Digite sua observação"
              className="w-full resize-none border-none bg-transparent text-sm text-zinc-600 outline-none"
            />
            <Edit className="text-primary mt-1" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
