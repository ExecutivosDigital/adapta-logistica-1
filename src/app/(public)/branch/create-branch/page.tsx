"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { maskCep, maskCnpj, maskCpf, maskPhone } from "@/lib/masks";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import OpenAI from "openai";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

/* ----------------------------------------------------------------
 * Interfaces auxiliares
 * -------------------------------------------------------------- */
interface CnpjCardResponse {
  fullName: string;
  fantasyName: string;
  cnpj: string;
  openDate: string;
  juridicNature: string;
  mainActivity: string;
  secondaryActivities: string;
  registerSituation: string;
  contactNumber: string;
  situationDate: string;
  email: string;
  address: {
    address: string;
    number: string;
    province: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

/* ----------------------------------------------------------------
 * Schema Zod
 * -------------------------------------------------------------- */
const FormSchema = z.object({
  code: z.coerce.number({ invalid_type_error: "Código inválido" }),
  name: z.string().min(1, "Nome obrigatório"),
  cnpj: z
    .string()
    .regex(
      /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/,
      "Formato CNPJ 00.000.000/0000-00",
    ),
  acronym: z.string().min(1, "Sigla obrigatória"),
  isHeadquarter: z.boolean(),
  postalCode: z.string().regex(/\d{5}-\d{3}/, "Formato CEP 00000-000"),
  address: z.string().min(1, "Logradouro obrigatório"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().nullable().optional(),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  city: z.string().min(1, "Município obrigatório"),
  state: z.string().length(2, "UF inválida"),
  latitude: z.coerce.number({ invalid_type_error: "Latitude inválida" }),
  longitude: z.coerce.number({ invalid_type_error: "Longitude inválida" }),
  responsibleName: z.string().min(1, "Nome do responsável obrigatório"),
  responsibleEmail: z.string().email("E-mail inválido"),
  responsiblePhone: z.string().min(8, "Telefone obrigatório"),
  responsibleCpf: z
    .string()
    .regex(/\d{3}\.\d{3}\.\d{3}-\d{2}/, "Formato CPF 000.000.000-00"),
  legalNatureId: z.string().min(1, "Natureza jurídica obrigatória"),
  tributaryRegimeId: z.string().min(1, "Regime tributário obrigatório"),
  companyId: z.string().min(1, "Empresa obrigatória"),
  mainEconomicActivityId: z.string().min(1, "CNAE principal obrigatório"),
  phone: z.string().min(8, "Telefone obrigatório"),
  email: z.string().email("E-mail inválido"),
  stateRegistration: z.string().nullable().optional(),
  municipalRegistration: z.string().nullable().optional(),
});

export type SubsidiaryFormData = z.infer<typeof FormSchema>;

/* ----------------------------------------------------------------
 * Hook de passos
 * -------------------------------------------------------------- */
const useFormSteps = (form: UseFormReturn<SubsidiaryFormData>) => {
  const [activeStep, setActiveStep] = useState(0);

  const stepFields = {
    0: [
      "code",
      "name",
      "cnpj",
      "acronym",
      "isHeadquarter",
      "postalCode",
      "address",
      "number",
      "neighborhood",
      "city",
      "state",
      "phone",
      "email",
    ] as const,
    1: ["complement", "latitude", "longitude"] as const,
    2: [
      "responsibleName",
      "responsibleEmail",
      "responsiblePhone",
      "responsibleCpf",
      "legalNatureId",
      "tributaryRegimeId",
      "companyId",
      "mainEconomicActivityId",
      "stateRegistration",
      "municipalRegistration",
    ] as const,
  } as const;

  const validateStep = async (step: number) => {
    const fields = stepFields[step as keyof typeof stepFields];
    return await form.trigger(Array.from(fields));
  };

  return { activeStep, setActiveStep, validateStep };
};

/* ----------------------------------------------------------------
 * Componente principal
 * -------------------------------------------------------------- */
export default function SubsidiaryForm() {
  const router = useRouter();
  const form = useForm<SubsidiaryFormData>({
    resolver: zodResolver(FormSchema),
    shouldFocusError: false,
    mode: "onBlur",
    defaultValues: {
      code: 0,
      name: "",
      cnpj: "",
      acronym: "",
      isHeadquarter: false,
      postalCode: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      latitude: 0,
      longitude: 0,
      responsibleName: "",
      responsibleEmail: "",
      responsiblePhone: "",
      responsibleCpf: "",
      legalNatureId: "",
      tributaryRegimeId: "",
      companyId: "",
      mainEconomicActivityId: "",
      phone: "",
      email: "",
      stateRegistration: "",
      municipalRegistration: "",
    },
  });

  const { control, handleSubmit, setValue, watch } = form;
  const { activeStep, setActiveStep, validateStep } = useFormSteps(form);

  /* ----------------------------------------------------------------
   * Estados & refs
   * -------------------------------------------------------------- */
  const [loadingCard, setLoadingCard] = useState(false);
  const openaiRef = useRef<OpenAI>(null);
  if (!openaiRef.current) {
    openaiRef.current = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }
  const client = openaiRef.current;
  const summaryAssistant = "asst_Q6Xw1vrYYzYrF9c4m3rsnvDx";

  /* ----------------------------------------------------------------
   * Preenche campos com dados do cartão
   * -------------------------------------------------------------- */
  const fillWithSummary = (summary: CnpjCardResponse) => {
    setValue("name", summary.fullName);
    setValue("cnpj", maskCnpj(summary.cnpj));
    setValue("postalCode", maskCep(summary.address.postalCode));
    setValue("address", summary.address.address);
    setValue("number", summary.address.number);
    setValue("neighborhood", summary.address.province);
    setValue("city", summary.address.city);
    setValue("state", summary.address.state);
    setValue("phone", maskPhone(summary.contactNumber));
    setValue("email", summary.email);
  };

  /* ----------------------------------------------------------------
   * ViaCEP auto-preenchimento
   * -------------------------------------------------------------- */

  /* ----------------------------------------------------------------
   * Via-CEP sem re-render
   * -------------------------------------------------------------- */
  useEffect(() => {
    const sub = watch(async (all, { name }) => {
      if (name !== "postalCode") return;
      const cepDigits = all.postalCode?.replace(/\D/g, "");
      if (cepDigits?.length !== 8) return;

      try {
        const data = await fetch(
          `https://viacep.com.br/ws/${cepDigits}/json/`,
        ).then((r) => r.json());
        if (data.erro) return;

        const opts = {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
          shouldFocus: false,
        } as const;

        setValue("address", data.logradouro ?? "", opts);
        setValue("neighborhood", data.bairro ?? "", opts);
        setValue("city", data.localidade ?? "", opts);
        setValue("state", data.uf ?? "", opts);
      } catch {
        /* nada */
      }
    });
    return () => sub.unsubscribe();
  }, [watch, setValue]);

  /* ----------------------------------------------------------------
   * Máscaras onChange
   * -------------------------------------------------------------- */
  const handleMask =
    (fn: (v: string) => string, onChange: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(fn(e.target.value));

  /* ----------------------------------------------------------------
   * Análise do PDF do Cartão CNPJ
   * -------------------------------------------------------------- */
  async function analyze(fileBuffer: ArrayBuffer) {
    try {
      const file = new File([fileBuffer], "cartao_cnpj.pdf", {
        type: "application/pdf",
      });
      const sendFile = await client.files.create({
        file,
        purpose: "assistants",
      });

      const thread = await client.beta.threads.createAndRun({
        assistant_id: summaryAssistant,
        thread: {
          messages: [
            {
              role: "user",
              content: "transcreva",
              attachments: [
                {
                  file_id: sendFile.id,
                  tools: [{ type: "file_search" }],
                },
              ],
            },
          ],
        },
      });

      const wait = async (runId: string, threadId: string): Promise<void> => {
        const st = await client.beta.threads.runs.retrieve(threadId, runId);
        if (st.status === "completed") return;
        if (st.status === "queued" || st.status === "in_progress") {
          await new Promise((r) => setTimeout(r, 4000));
          return await wait(runId, threadId);
        }
      };

      await wait(thread.id, thread.thread_id);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const msgs: any = await client.beta.threads.messages.list(
        thread.thread_id,
      );
      const jsonText = msgs.data[0].content[0].text.value
        .replace("```json\n", "")
        .replace("\n```", "");

      return JSON.parse(jsonText) as CnpjCardResponse;
    } catch (err) {
      console.error(err);
      toast.error("Erro ao analisar cartão CNPJ");
      return null;
    }
  }

  /* ----------------------------------------------------------------
   * FieldError – espaço reservado fixo
   * -------------------------------------------------------------- */
  const FieldError = ({ name }: { name: keyof SubsidiaryFormData }) => {
    const message = form.formState.errors[name]?.message as string | undefined;
    return (
      <div className="absolute -bottom-4 w-full">
        <p className="text-destructive z-[999] h-4 text-xs">
          {message || "\u00A0"}
        </p>
      </div>
    );
  };

  /* ----------------------------------------------------------------
   * Row genérico estilo card
   * -------------------------------------------------------------- */
  const Row = ({
    label,
    field,
    index,
    lastIndex,
  }: {
    label: string;
    field: React.ReactNode;
    index: number;
    lastIndex: number;
  }) => (
    <div
      className={cn(
        "- flex min-w-[calc(50%-14px)] items-center gap-4 px-6 py-5",
      )}
    >
      <div
        className={cn(
          `border-r-primary/50 grid w-full grid-cols-12 items-center gap-4`,
          {
            "lg:border-r": (index + 1) % 2 === 1 && index !== lastIndex,
          },
        )}
      >
        <div className="col-span-3 text-gray-800">{label}</div>
        <div className="col-span-8 flex items-center">{field}</div>
      </div>
    </div>
  );

  /* ----------------------------------------------------------------
   * Step0 – dados básicos + cartão CNPJ
   * -------------------------------------------------------------- */
  const Step0 = () => {
    const fields: (readonly [
      keyof SubsidiaryFormData,
      string,
      ((v: string) => string)?,
    ])[] = [
      ["code", "Código"],
      ["name", "Nome"],
      ["cnpj", "CNPJ", maskCnpj],
      ["acronym", "Sigla"],
      ["postalCode", "CEP", maskCep],
      ["address", "Logradouro"],
      ["number", "Número"],
      ["neighborhood", "Bairro"],
      ["city", "Município"],
      ["state", "UF"],
      ["phone", "Telefone", maskPhone],
      ["email", "E-mail"],
    ];

    return (
      <>
        {fields.map(([name, label, maskFn], index) => (
          <Row
            key={name}
            label={label}
            index={index}
            lastIndex={fields.length - 1}
            field={
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <div className="relative flex w-full flex-col">
                    <Input
                      {...field}
                      value={field.value?.toString() ?? ""}
                      className="w-full"
                      maxLength={name === "state" ? 2 : undefined}
                      onChange={
                        maskFn
                          ? handleMask(maskFn, field.onChange)
                          : field.onChange
                      }
                      disabled={loadingCard}
                    />
                    <FieldError name={name} />
                  </div>
                )}
              />
            }
          />
        ))}

        {/* Switch Matriz */}
        <Row
          label="É a matriz?"
          index={fields.length}
          lastIndex={fields.length}
          field={
            <Controller
              name="isHeadquarter"
              control={control}
              render={({ field }) => (
                <Switch
                  id="isHeadquarter"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (checked) {
                      toast.success("Matriz Marcada");
                    } else {
                      toast.error("Matriz Desmarcada");
                    }
                  }}
                  className="border-primary data-[state=checked]:bg-primary/20 w-10 border p-[1px]"
                  thumbClass="bg-primary"
                  disabled={loadingCard}
                />
              )}
            />
          }
        />
      </>
    );
  };

  /* ----------------------------------------------------------------
   * Step1 – coordenadas / complemento
   * -------------------------------------------------------------- */
  const Step1 = () => {
    const fields: (readonly [keyof SubsidiaryFormData, string])[] = [
      ["complement", "Complemento"],
      ["latitude", "Latitude"],
      ["longitude", "Longitude"],
    ];
    return (
      <>
        {fields.map(([name, label], index) => (
          <Row
            key={name}
            label={label}
            index={index}
            lastIndex={fields.length - 1}
            field={
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <div className="relative flex w-full flex-col">
                    <Input
                      {...field}
                      type={
                        name === "latitude" || name === "longitude"
                          ? "number"
                          : "text"
                      }
                      step={
                        name === "latitude" || name === "longitude"
                          ? "0.000001"
                          : undefined
                      }
                      value={field.value?.toString() ?? ""}
                    />
                    <FieldError name={name} />
                  </div>
                )}
              />
            }
          />
        ))}
      </>
    );
  };

  /* ----------------------------------------------------------------
   * Step2 – responsável + dados fiscais
   * -------------------------------------------------------------- */
  const Step2 = () => {
    const fields: (readonly [
      keyof SubsidiaryFormData,
      string,
      ((v: string) => string)?,
    ])[] = [
      ["responsibleName", "Responsável"],
      ["responsibleEmail", "E-mail do responsável"],
      ["responsiblePhone", "Telefone do responsável", maskPhone],
      ["responsibleCpf", "CPF do responsável", maskCpf],
      ["legalNatureId", "Natureza Jurídica"],
      ["tributaryRegimeId", "Regime Tributário"],
      ["companyId", "Empresa"],
      ["mainEconomicActivityId", "CNAE Principal"],
      ["stateRegistration", "Inscrição Estadual"],
      ["municipalRegistration", "Inscrição Municipal"],
    ];

    return (
      <>
        {fields.map(([name, label, maskFn], index) => (
          <Row
            key={name}
            label={label}
            index={index}
            lastIndex={fields.length - 1}
            field={
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <div className="relative flex w-full flex-col">
                    <Input
                      {...field}
                      value={field.value?.toString() ?? ""}
                      maxLength={
                        name === "stateRegistration"
                          ? 9
                          : name === "municipalRegistration"
                            ? 8
                            : name === "responsibleCpf"
                              ? 14
                              : undefined
                      }
                      onChange={
                        maskFn
                          ? handleMask(maskFn, field.onChange)
                          : field.onChange
                      }
                    />
                    <FieldError name={name} />
                  </div>
                )}
              />
            }
          />
        ))}
      </>
    );
  };

  /* ----------------------------------------------------------------
   * Navegação & submit
   * -------------------------------------------------------------- */
  const handleNext = async () => {
    const isValid = await validateStep(activeStep);
    if (!isValid) {
      const firstError = Object.values(form.formState.errors)[0];
      if (firstError && "message" in firstError)
        toast.error(String(firstError.message));
      return;
    }
    setActiveStep((s) => s + 1);
  };

  const handlePrev = () => setActiveStep((s) => s - 1);

  const onSubmit = handleSubmit(() => {
    toast.success("Filial salva com sucesso!");
  });

  /* ----------------------------------------------------------------
   * JSX
   * -------------------------------------------------------------- */
  return (
    <form
      onSubmit={onSubmit}
      className="w-full overflow-hidden rounded-xl border border-gray-300"
    >
      {/* Header */}
      <div className="bg-primary/20 flex w-full items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
            <Pencil className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Cadastro de Filial
            </h1>
            <p className="text-sm text-gray-600">Preencha os dados abaixo</p>
          </div>
        </div>

        {/* Botão de upload */}
        <Button
          type="button"
          className="group border-primary text-primary hover:border-primary-dark hover:text-primary-dark hover:bg-primary-dark/10 bg-primary/20 relative flex h-20 cursor-pointer flex-col items-center rounded-xl border border-dashed px-2 py-4 font-medium transition duration-300"
          disabled={loadingCard}
        >
          {loadingCard ? (
            <>
              {" "}
              <Loader2 className="animate-spin" size={40} />
              Inserindo Cartão CNPJ
            </>
          ) : (
            <>
              {" "}
              <Upload size={40} />
              Inserir Cartão CNPJ
            </>
          )}
          <input
            type="file"
            disabled={loadingCard}
            title=" "
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setLoadingCard(true);
              try {
                const buf = await f.arrayBuffer();
                const summary = await analyze(buf);
                if (summary) fillWithSummary(summary);
              } finally {
                setLoadingCard(false);
              }
            }}
          />
        </Button>
      </div>

      {/* Corpo */}
      <div className="grid grid-cols-1 divide-y divide-gray-300 lg:grid-cols-2">
        {activeStep === 0 && <Step0 />}
        {activeStep === 1 && <Step1 />}
        {activeStep === 2 && <Step2 />}
      </div>

      {/* Navegação */}
      <div className="flex justify-between border-t border-gray-300 bg-gray-50 px-6 py-6">
        <Button
          type="button"
          variant="outline"
          disabled={activeStep === 0}
          onClick={handlePrev}
        >
          Voltar
        </Button>

        {activeStep < 2 ? (
          <Button type="button" onClick={handleNext}>
            Próximo
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={() => router.push("/branch/branch-details")}
          >
            Salvar
          </Button>
        )}
      </div>
    </form>
  );
}
