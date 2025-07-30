import {
  Building2,
  CalendarIcon,
  CreditCard,
  DollarSign,
  Edit,
  FileText,
  MapPin,
  Settings,
  Tag,
} from "lucide-react";
import moment from "moment";
import { DataType } from "../page";

interface Props {
  data: DataType;
  setData: (value: DataType) => void;
}

export function Step4({ data, setData }: Props) {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
        {/* ----------------- PAGAMENTO VIA ----------------- */}
        <label className="col-span-8 flex flex-col gap-1">
          <span className="text-zinc-600">Pagamento via</span>
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <div className="flex h-full w-6">
              <CreditCard className="text-primary" size={16} />
            </div>
            <div className="flex flex-1 flex-col text-left">
              <span>{data.paymentMethod.bank || "Método de Pagamento"}</span>
              <span className="text-zinc-400">
                {data.paymentMethod.account || "Selecione"}
              </span>
            </div>
            <div className="flex h-full w-6 justify-end">
              <Edit className="text-primary" size={16} />
            </div>
          </div>
        </label>

        {/* ----------------- FORMA DE PAGAMENTO ----------------- */}
        <label className="col-span-4 flex flex-col gap-1">
          <span className="text-zinc-600">Forma de Pagamento</span>

          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
            <div className="flex h-full w-6">
              <DollarSign className="text-primary" size={16} />
            </div>
            <div className="flex-1 text-lg text-zinc-700">
              {data.paymentForm || "Selecione"}
            </div>
            <div className="flex h-full w-6 justify-end">
              <Edit className="text-primary" size={16} />
            </div>
          </div>
        </label>

        {/* ----------------- NÚMERO NO DOCUMENTO ----------------- */}
        <label className="col-span-8 flex flex-col gap-1">
          <span className="text-zinc-600">Número no Documento</span>
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <DollarSign className="text-primary" size={16} />
            <input
              value={data.documentNumber}
              onChange={(e) =>
                setData({ ...data, documentNumber: e.target.value })
              }
              disabled
              placeholder="Digite o número"
              className="flex-1 bg-transparent text-center text-lg text-zinc-700 outline-none"
            />
          </div>
        </label>

        {/* ----------------- DATA PRÓX. PAGAMENTO ----------------- */}
        <label className="col-span-4 flex flex-col gap-1">
          <span className="text-zinc-600">Data Próximo Pagamento</span>
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
            <div className="flex h-full w-6">
              <CalendarIcon className="text-primary" size={16} />
            </div>
            <div className="flex-1 text-lg text-zinc-700">
              {moment().format("DD/MM/YYYY")}
            </div>
            <div className="flex h-full w-6 justify-end">
              <Edit className="text-primary" size={16} />
            </div>
          </div>
        </label>

        {/* ----------------- TIPO DE CUSTO ----------------- */}
        <label className="col-span-4 flex flex-col gap-1">
          <span className="text-zinc-600">Tipo de Custo</span>
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
            <div className="flex h-full w-6">
              <Tag size={16} className="text-primary" />
            </div>
            <div className="flex h-full flex-1 items-center">
              <span className="flex flex-1 flex-col text-lg">
                {data.costType || "Selecione"}
              </span>
            </div>
            <div className="flex h-full w-6 justify-end">
              <Edit size={16} className="text-primary" />
            </div>
          </div>
        </label>

        {/* --------------------- CATEGORIA --------------------- */}
        <label className="col-span-8 flex flex-col gap-1">
          <span className="text-zinc-600">Categoria</span>

          <div className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <div className="flex h-full w-6">
              <Settings size={16} className="text-primary" />
            </div>
            <div className="flex h-full flex-1 items-center">
              <span className="flex flex-1 flex-col text-center text-lg">
                {!data.costType ? (
                  <span className="text-md font-normal text-zinc-400">
                    Selecione um tipo de custo para escolher
                  </span>
                ) : (
                  data.category || "Selecione"
                )}
              </span>
            </div>
            <div className="flex h-full w-6 items-center"></div>
          </div>
        </label>

        <label className="col-span-6 flex flex-col gap-1">
          <span className="text-zinc-600">Centro de Custos</span>

          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
            <div className="flex h-full w-6">
              <Building2 size={16} className="text-primary" />
            </div>
            <div className="flex h-full flex-1 items-center">
              <span className="flex flex-1 flex-col text-left">
                -<span className="text-sm text-zinc-500">Selecionar</span>
              </span>
            </div>
            <div className="flex h-full w-6 justify-end">
              <Edit size={16} className="text-primary" />
            </div>
          </div>
        </label>

        {/* --------------------- CONTA CONTÁBIL --------------------- */}
        <label className="col-span-6 flex flex-col gap-1">
          <span className="text-zinc-600">Conta Contábil</span>
          <div className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
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

        {/* --------------------- CONDIÇÕES DE PAGAMENTO --------------------- */}
        <label className="col-span-4 flex flex-col gap-1">
          <span className="text-zinc-600">Condições de Pagamento</span>
          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
            <FileText className="text-primary" size={16} />
            <span className="flex-1 text-lg text-zinc-700">
              {data.paymentTerms || "Selecione"}
            </span>
            <Edit className="text-primary ml-auto" size={16} />
          </div>
        </label>

        {/* --------------------- DETALHES DO PAGAMENTO --------------------- */}
        <label className="col-span-8 flex flex-col gap-1">
          <span className="text-zinc-600">Detalhes do Pagamento</span>

          <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
            <DollarSign className="text-primary" size={16} />
            <span className="flex-1 text-lg text-zinc-700">
              {data.paymentDetails || "Selecione"}
            </span>
            <Edit className="text-primary ml-auto" size={16} />
          </div>
        </label>
      </div>
    </div>
  );
}
