import { cn } from "@/utils/cn";
import { CheckCircle2, Edit, MapPin } from "lucide-react";
import { DataType } from "./page";

interface Props {
  data: DataType;
  hasBrokenIndividualRules: boolean;
  setHasBrokenIndividualRules: (value: boolean) => void;
}

export function Step2({
  data,
  hasBrokenIndividualRules,
  setHasBrokenIndividualRules,
}: Props) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span
          className={cn(
            "transition duration-200",
            hasBrokenIndividualRules ? "text-red-500" : "text-primary",
          )}
        >
          Cliente Pagador
        </span>
        <button
          onClick={() => setHasBrokenIndividualRules(!hasBrokenIndividualRules)}
          className={cn(
            "flex h-16 items-center gap-2 rounded-2xl border px-3 py-2 transition duration-200",
            hasBrokenIndividualRules ? "border-red-500" : "border-primary",
          )}
        >
          <div className="flex h-full w-6">
            <MapPin size={16} className="text-primary" />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="flex-1 text-lg">
              {data.client.name || "Selecione"}
            </span>
            <span className="text-xs text-zinc-400">
              {data.client.cnpj || ""}
            </span>
            <span className="text-xs text-zinc-400">
              {data.client.place || ""}
            </span>
          </div>
          <div className="flex h-full w-6 justify-end">
            <Edit size={16} className="text-primary" />
          </div>
        </button>
      </label>
      <div
        className={cn(
          "h-px w-full transition duration-200",
          hasBrokenIndividualRules ? "bg-red-500" : "bg-primary",
        )}
      />
      <span
        className={cn(
          "text-sm transition duration-200",
          hasBrokenIndividualRules ? "text-red-500" : "text-primary",
        )}
      >
        {hasBrokenIndividualRules ? "Alterações Necessárias:" : "Liberação"}
      </span>
      <span className="font-semibold text-zinc-400">
        {hasBrokenIndividualRules
          ? "Divida a nota em duas faturas com valores menores que R$ 50.000,00 cada, ou ajuste o valor desta fatura para se enquadrar no limite permitido."
          : "Todas as Requisições de Recebimento deste cliente estão sendo respeitadas."}
      </span>
      {!hasBrokenIndividualRules && (
        <CheckCircle2 className="m-auto h-20 w-20 fill-green-500 text-white" />
      )}
    </div>
  );
}
