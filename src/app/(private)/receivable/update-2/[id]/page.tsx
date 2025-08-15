/* app/(dashboard)/create-business-unit/page.tsx */
"use client";
import { AiFileReader } from "@/components/ai-file-reader";
import { OrangeButton } from "@/components/OrangeButton";
import { cn } from "@/utils/cn";
import { ChevronDown, ChevronLeft, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClientModal } from "./components/client-modal";
import { Step1 } from "./components/step1";
import { Step2 } from "./components/step2";

export interface ClientsProps {
  name: string;
  cnpj: string;
  expirationDate: string;
  place: string;
  status: string;
}

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

export default function UpdateReceivable2() {
  const router = useRouter();
  const [isOpenClientModal, setIsOpenClientModal] = useState(false);
  const [steps, setSteps] = useState(1);
  const [hasBrokenIndividualRules, setHasBrokenIndividualRules] =
    useState(true);
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

  const handleData = () => {
    return;
  };

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-hidden pb-20 xl:pb-0">
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

        <main
          className={cn(
            "flex flex-1 overflow-x-hidden overflow-y-auto xl:flex-row",
            steps === 1
              ? "flex-col-reverse xl:flex-row"
              : "flex-col xl:flex-row",
          )}
        >
          <section
            className={cn(
              "",
              steps === 1 &&
                "flex flex-1 flex-col px-2 pt-2 pb-4 xl:px-12 xl:pt-10 xl:pb-4",
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
              steps === 2 &&
                "flex flex-1 flex-col px-2 pt-2 pb-4 xl:px-12 xl:pt-10 xl:pb-4",
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
      {isOpenClientModal && (
        <ClientModal
          show={isOpenClientModal}
          onHide={() => setIsOpenClientModal(false)}
          data={data}
          setData={setData}
        />
      )}
    </>
  );
}
