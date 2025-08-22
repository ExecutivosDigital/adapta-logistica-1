"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useApiContext } from "@/context/ApiContext";
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

const FormSchema = z.object({
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
  secondaryEconomicActivityIds: z
    .array(z.string())
    .min(1, "CNAEs secundários obrigatórios"),
  phone: z.string().min(8, "Telefone obrigatório"),
  email: z.string().email("E-mail inválido"),
  stateRegistration: z.string().nullable().optional(),
  municipalRegistration: z.string().nullable().optional(),
});

export type SubsidiaryFormData = z.infer<typeof FormSchema>;

const useFormSteps = (form: UseFormReturn<SubsidiaryFormData>) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepFields = {
    0: [
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
      "secondaryEconomicActivityIds",
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

const onlyDigits = (v: string) => (v ?? "").replace(/\D/g, "");

type SubsidiaryPayload = {
  acronym: string;
  address: string;
  cnpj: string;
  companyId: string;
  corporateName: string;
  isHeadquarter: boolean;
  name: string;
  number: string;
  postalCode: string;
  complement?: string | null;
  municipalRegistration?: string | null;
  stateRegistration?: string | null;
  city: string;
  email: string;
  latitude: number;
  legalNatureId: string;
  longitude: number;
  mainEconomicActivityId: string;
  neighborhood: string;
  phone: string;
  responsibleCpf: string;
  responsibleEmail: string;
  responsibleName: string;
  responsiblePhone: string;
  secondaryEconomicActivityIds: string[];
  state: string;
  tributaryRegimeId: string;
};

function toSubsidiaryPayload(values: SubsidiaryFormData): SubsidiaryPayload {
  return {
    acronym: values.acronym.trim(),
    address: values.address.trim(),
    cnpj: onlyDigits(values.cnpj),
    companyId: values.companyId.trim(),
    corporateName: values.name.trim(),
    isHeadquarter: values.isHeadquarter,
    name: values.name.trim(),
    number: String(values.number ?? "").trim(),
    postalCode: onlyDigits(values.postalCode),
    complement: values.complement?.trim() || null,
    municipalRegistration: values.municipalRegistration?.trim() || null,
    stateRegistration: values.stateRegistration?.trim() || null,
    city: values.city.trim(),
    email: values.email.trim(),
    latitude: Number(values.latitude),
    legalNatureId: values.legalNatureId.trim(),
    longitude: Number(values.longitude),
    mainEconomicActivityId: values.mainEconomicActivityId.trim(),
    neighborhood: values.neighborhood.trim(),
    phone: onlyDigits(values.phone),
    responsibleCpf: onlyDigits(values.responsibleCpf),
    responsibleEmail: values.responsibleEmail.trim(),
    responsibleName: values.responsibleName.trim(),
    responsiblePhone: onlyDigits(values.responsiblePhone),
    secondaryEconomicActivityIds: values.secondaryEconomicActivityIds,
    state: values.state.trim().toUpperCase(),
    tributaryRegimeId: values.tributaryRegimeId.trim(),
  };
}

type Option = { id: string; name: string; code?: string };

export default function SubsidiaryForm() {
  const router = useRouter();
  const { PostAPI, GetAPI } = useApiContext();

  const form = useForm<SubsidiaryFormData>({
    resolver: zodResolver(FormSchema),
    shouldFocusError: false,
    mode: "onBlur",
    defaultValues: {
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
      secondaryEconomicActivityIds: [],
      phone: "",
      email: "",
      stateRegistration: "",
      municipalRegistration: "",
    },
  });

  const { control, handleSubmit, setValue, watch } = form;
  const { activeStep, setActiveStep, validateStep } = useFormSteps(form);

  const [loadingCard, setLoadingCard] = useState(false);
  const [regimes, setRegimes] = useState<Option[]>([]);
  const [companies, setCompanies] = useState<Option[]>([]);
  const [legalNatures, setLegalNatures] = useState<Option[]>([]);
  const [activities, setActivities] = useState<Option[]>([]);

  const openaiRef = useRef<OpenAI>(null);
  if (!openaiRef.current) {
    openaiRef.current = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }
  const client = openaiRef.current;
  const summaryAssistant = "asst_Q6Xw1vrYYzYrF9c4m3rsnvDx";

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
      } catch {}
    });
    return () => sub.unsubscribe();
  }, [watch, setValue]);

  useEffect(() => {
    (async () => {
      const res = await GetAPI("/tributary-regime", true);
      const res2 = await GetAPI("/company", true);
      const res3 = await GetAPI("/legal-nature", true);
      const res4 = await GetAPI("/economic-activity", true);

      if (res?.status === 200 && Array.isArray(res.body?.regimes)) {
        setRegimes(res.body.regimes as Option[]);
      } else if (Array.isArray(res?.body)) {
        setRegimes(res.body as Option[]);
      }

      if (res2?.status === 200 && Array.isArray(res2.body?.companies)) {
        setCompanies(res2.body.companies as Option[]);
      } else if (Array.isArray(res2?.body)) {
        setCompanies(res2.body as Option[]);
      }

      if (res3?.status === 200 && Array.isArray(res3.body?.legalNatures)) {
        setLegalNatures(res3.body.legalNatures as Option[]);
      } else if (Array.isArray(res3?.body)) {
        setLegalNatures(res3.body as Option[]);
      }

      if (
        res4?.status === 200 &&
        Array.isArray(res4.body?.economicActivities)
      ) {
        setActivities(res4.body.economicActivities as Option[]);
      } else if (Array.isArray(res4?.body)) {
        setActivities(res4.body as Option[]);
      }
    })();
  }, [GetAPI]);

  const handleMask =
    (fn: (v: string) => string, onChange: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(fn(e.target.value));

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
                { file_id: sendFile.id, tools: [{ type: "file_search" }] },
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
      toast.error("Erro ao analisar cartão CNPJ");
      console.error(err);
      return null;
    }
  }

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

  const Step0 = () => {
    const fields: (readonly [
      keyof SubsidiaryFormData,
      string,
      ((v: string) => string)?,
    ])[] = [
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
      ["secondaryEconomicActivityIds", "CNAEs Secundários"],
      ["stateRegistration", "Inscrição Estadual"],
      ["municipalRegistration", "Inscrição Municipal"],
    ];
    return (
      <>
        {fields.map(([name, label, maskFn], index) => {
          if (name === "legalNatureId") {
            return (
              <Row
                key={name}
                label={label}
                index={index}
                lastIndex={fields.length - 1}
                field={
                  <Controller
                    name="legalNatureId"
                    control={control}
                    render={({ field }) => (
                      <div className="w-full">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Input
                              value={
                                field.value
                                  ? (legalNatures.find(
                                      (o) => o.id === field.value,
                                    )?.name ?? "Selecione")
                                  : "Selecione"
                              }
                              readOnly
                              className="text-start"
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="z-[999999999] max-h-60 w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto bg-white">
                            {(legalNatures.length === 0
                              ? [{ id: "", name: "Nenhum encontrado" }]
                              : legalNatures
                            ).map((opt) => (
                              <DropdownMenuItem
                                key={opt.id || "none"}
                                className={cn(
                                  "hover:bg-secondary text-black hover:text-white",
                                  field.value === opt.id &&
                                    "bg-secondary text-white",
                                )}
                                onSelect={() =>
                                  opt.id && field.onChange(opt.id)
                                }
                              >
                                {opt.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <FieldError name="legalNatureId" />
                      </div>
                    )}
                  />
                }
              />
            );
          }
          if (name === "tributaryRegimeId") {
            return (
              <Row
                key={name}
                label={label}
                index={index}
                lastIndex={fields.length - 1}
                field={
                  <Controller
                    name="tributaryRegimeId"
                    control={control}
                    render={({ field }) => (
                      <div className="w-full">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Input
                              value={
                                field.value
                                  ? (regimes.find((o) => o.id === field.value)
                                      ?.name ?? "Selecione")
                                  : "Selecione"
                              }
                              readOnly
                              className="text-start"
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="z-[999999999] max-h-60 w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto bg-white">
                            {(regimes.length === 0
                              ? [{ id: "", name: "Nenhum encontrado" }]
                              : regimes
                            ).map((opt) => (
                              <DropdownMenuItem
                                key={opt.id || "none"}
                                className={cn(
                                  "hover:bg-secondary text-black hover:text-white",
                                  field.value === opt.id &&
                                    "bg-secondary text-white",
                                )}
                                onSelect={() =>
                                  opt.id && field.onChange(opt.id)
                                }
                              >
                                {opt.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <FieldError name="tributaryRegimeId" />
                      </div>
                    )}
                  />
                }
              />
            );
          }
          if (name === "companyId") {
            return (
              <Row
                key={name}
                label={label}
                index={index}
                lastIndex={fields.length - 1}
                field={
                  <Controller
                    name="companyId"
                    control={control}
                    render={({ field }) => (
                      <div className="w-full">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Input
                              value={
                                field.value
                                  ? (companies.find((o) => o.id === field.value)
                                      ?.name ?? "Selecione")
                                  : "Selecione"
                              }
                              readOnly
                              className="text-start"
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="z-[999999999] max-h-60 w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto bg-white">
                            {(companies.length === 0
                              ? [{ id: "", name: "Nenhuma empresa" }]
                              : companies
                            ).map((opt) => (
                              <DropdownMenuItem
                                key={opt.id || "none"}
                                className={cn(
                                  "hover:bg-secondary text-black hover:text-white",
                                  field.value === opt.id &&
                                    "bg-secondary text-white",
                                )}
                                onSelect={() =>
                                  opt.id && field.onChange(opt.id)
                                }
                              >
                                {opt.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <FieldError name="companyId" />
                      </div>
                    )}
                  />
                }
              />
            );
          }
          if (name === "mainEconomicActivityId") {
            return (
              <Row
                key={name}
                label={label}
                index={index}
                lastIndex={fields.length - 1}
                field={
                  <Controller
                    name="mainEconomicActivityId"
                    control={control}
                    render={({ field }) => (
                      <div className="w-full">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Input
                              value={
                                field.value
                                  ? (activities.find(
                                      (o) => o.id === field.value,
                                    )?.name ?? "Selecione")
                                  : "Selecione"
                              }
                              readOnly
                              className="text-start"
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="z-[999999999] max-h-60 w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto bg-white">
                            {(activities.length === 0
                              ? [{ id: "", name: "Nenhuma atividade" }]
                              : activities
                            ).map((opt) => (
                              <DropdownMenuItem
                                key={opt.id || "none"}
                                className={cn(
                                  "hover:bg-secondary text-black hover:text-white",
                                  field.value === opt.id &&
                                    "bg-secondary text-white",
                                )}
                                onSelect={() =>
                                  opt.id && field.onChange(opt.id)
                                }
                              >
                                {opt.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <FieldError name="mainEconomicActivityId" />
                      </div>
                    )}
                  />
                }
              />
            );
          }
          if (name === "secondaryEconomicActivityIds") {
            return (
              <Row
                key={name}
                label={label}
                index={index}
                lastIndex={fields.length - 1}
                field={
                  <Controller
                    name="secondaryEconomicActivityIds"
                    control={control}
                    render={({ field }) => {
                      const selected = activities.filter((a) =>
                        field.value?.includes(a.id),
                      );
                      const display =
                        selected.length === 0
                          ? "Selecione"
                          : selected.length <= 2
                            ? selected.map((s) => s.name).join(", ")
                            : `${selected.length} selecionadas`;
                      return (
                        <div className="w-full">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Input
                                value={display}
                                readOnly
                                className="text-start"
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="z-[999999999] max-h-60 w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto bg-white">
                              {(activities.length === 0
                                ? [{ id: "", name: "Nenhuma atividade" }]
                                : activities
                              ).map((opt) => {
                                const isSel = field.value?.includes(opt.id);
                                return (
                                  <DropdownMenuItem
                                    key={opt.id || "none"}
                                    className={cn(
                                      "hover:bg-secondary text-black hover:text-white",
                                      isSel && "bg-secondary text-white",
                                    )}
                                    onSelect={() => {
                                      if (!opt.id) return;
                                      const set = new Set(field.value || []);
                                      if (set.has(opt.id)) set.delete(opt.id);
                                      else set.add(opt.id);
                                      field.onChange(Array.from(set));
                                    }}
                                  >
                                    {opt.name}
                                  </DropdownMenuItem>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <FieldError name="secondaryEconomicActivityIds" />
                        </div>
                      );
                    }}
                  />
                }
              />
            );
          }
          return (
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
          );
        })}
      </>
    );
  };

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

  const onSubmit = handleSubmit(async (values) => {
    const payload = toSubsidiaryPayload(values);
    const res = await PostAPI("/subsidiary", payload, true);
    if (res?.status === 200) {
      toast.success("Filial salva com sucesso!");
      router.push("/branch/branch-details");
    } else {
      toast.error(res?.body?.message ?? "Erro ao salvar filial.");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="w-full overflow-hidden rounded-xl border border-gray-300"
    >
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
        <Button
          type="button"
          className="group border-primary text-primary hover:border-primary-dark hover:text-primary-dark hover:bg-primary-dark/10 bg-primary/20 relative flex h-20 cursor-pointer flex-col items-center rounded-xl border border-dashed px-2 py-4 font-medium transition duration-300"
          disabled={loadingCard}
        >
          {loadingCard ? (
            <>
              <Loader2 className="animate-spin" size={40} />
              Inserindo Cartão CNPJ
            </>
          ) : (
            <>
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
      <div className="grid grid-cols-1 divide-y divide-gray-300 lg:grid-cols-2">
        {activeStep === 0 && <Step0 />}
        {activeStep === 1 && <Step1 />}
        {activeStep === 2 && <Step2 />}
      </div>
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
          <Button type="submit">Salvar</Button>
        )}
      </div>
    </form>
  );
}
