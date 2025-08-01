/* --------------------------------------------------------------------------
   CreateClientSheet.tsx – versão clean (React-Hook-Form + Zod)
   -------------------------------------------------------------------------- */
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import OpenAI from "openai";
import React, { useEffect, useMemo, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import Select, { SingleValue } from "react-select";
import * as z from "zod";

import { FieldConfig, fieldsConfig, Option } from "./fieldsConfig";

/* ------------------------------------------------------------------ */
/* Tipos extra                                                        */
/* ------------------------------------------------------------------ */
export interface CnpjCardResponse {
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

/* ------------------------------------------------------------------ */
/* Gera schema + defaults a partir de fieldsConfig                     */
/* ------------------------------------------------------------------ */
const buildSchemaAndDefaults = () => {
  const shape: Record<string, z.ZodTypeAny> = {};
  const defaults: Record<string, unknown> = {};

  fieldsConfig.forEach((f) => {
    let schema: z.ZodTypeAny;

    switch (f.type) {
      case "switch":
        schema = z.boolean();
        defaults[f.id] = f.value ?? false;
        break;
      case "percent":
      case "number":
        schema = z
          .preprocess((v) => (v === "" ? undefined : Number(v)), z.number())
          .refine((v) => v === undefined || !Number.isNaN(v), {
            message: "Número inválido",
          });
        defaults[f.id] = f.type === "percent" ? 0 : "";
        break;
      default:
        schema = z.string();
        defaults[f.id] = "";
    }

    shape[f.id] = f.required
      ? schema.refine((v) => (f.type === "switch" ? true : v !== ""), {
          message: `${f.label} é obrigatório`,
        })
      : schema.optional();
  });

  return { schema: z.object(shape), defaults } as const;
};

const { schema: FormSchema, defaults } = buildSchemaAndDefaults();
type FormData = z.infer<typeof FormSchema>;

/* ------------------------------------------------------------------ */
/* Hook de validação por passo                                         */
/* ------------------------------------------------------------------ */
const useSteps = (form: UseFormReturn<FormData>) => {
  const stepFields = { 0: fieldsConfig.map((f) => f.id) } as const;
  const validateStep = () => form.trigger(stepFields[0] as (keyof FormData)[]);
  return { validateStep };
};

/* ------------------------------------------------------------------ */
/* FieldRenderer                                                       */
/* ------------------------------------------------------------------ */
const FieldRenderer: React.FC<{ field: FieldConfig }> = ({ field }) => {
  const { control, register } = useFormContext<FormData>();

  const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={field.id}>{field.label}</Label>
      {children}
    </div>
  );

  switch (field.type) {
    case "select":
      return (
        <Wrap>
          <Controller
            control={control}
            name={field.id as keyof FormData}
            render={({ field: ctl }) => (
              <Select
                {...ctl}
                id={field.id}
                placeholder={field.label}
                options={field.options}
                value={field.options?.find((o) => o.value === ctl.value)}
                onChange={(opt: SingleValue<Option>) =>
                  ctl.onChange(opt?.value ?? "")
                }
              />
            )}
          />
        </Wrap>
      );

    case "switch":
      return (
        <Wrap>
          <Controller
            control={control}
            name={field.id as keyof FormData}
            render={({ field: ctl }) => (
              <label className="flex items-center gap-3">
                <span className="text-primary w-12 text-sm">
                  {ctl.value ? "Sim" : "Não"}
                </span>
                <Switch
                  id={field.id}
                  checked={ctl.value as boolean}
                  onCheckedChange={ctl.onChange}
                  className="border-primary data-[state=checked]:bg-primary/20 border"
                  thumbClass="bg-primary"
                />
              </label>
            )}
          />
        </Wrap>
      );

    case "percent":
      return (
        <Wrap>
          <Controller
            control={control}
            name={field.id as keyof FormData}
            render={({ field: ctl }) => (
              <div key={field.id} className="flex items-center gap-4 py-2">
                <span className="w-10 text-right text-sm font-medium">
                  {ctl.value ?? 0}%
                </span>
                <Slider
                  id={field.id}
                  value={[Number(ctl.value)]}
                  max={100}
                  step={1}
                  onValueChange={(v) => ctl.onChange(v[0])}
                  className="border border-zinc-400"
                />
              </div>
            )}
          />
        </Wrap>
      );

    default:
      return (
        <Wrap>
          <Input
            id={field.id}
            type={
              field.type === "date"
                ? "date"
                : field.type === "number"
                  ? "number"
                  : "text"
            }
            placeholder={field.label}
            {...register(field.id as keyof FormData)}
          />
        </Wrap>
      );
  }
};

/* ------------------------------------------------------------------ */
/* Componente principal                                               */
/* ------------------------------------------------------------------ */
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateClientSheet({ open, onOpenChange }: Props) {
  /* form */
  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: defaults as Partial<FormData>,
  });
  const { handleSubmit, setValue, reset } = methods;
  const { validateStep } = useSteps(methods);

  /* estado ui */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState<"client" | "supplier">(
    "client",
  );
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<CnpjCardResponse | null>(null);

  /* OpenAI helpers */
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const summaryAssistant = "asst_Q6Xw1vrYYzYrF9c4m3rsnvDx";

  /* Preencher campos via cartão CNPJ */
  useEffect(() => {
    if (!summary) return;
    const map: Record<string, keyof FormData> = {
      fullName: "name",
      cnpj: "cnpj",
      email: "email",
      contactNumber: "phone",
      "address.address": "endereco",
      "address.number": "nrendereco",
      "address.city": "nmcidade",
      "address.state": "estado",
      fantasyName: "grupocliente",
    };
    Object.entries(map).forEach(([src, dst]) => {
      const val = src
        .split(".")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce<unknown>((acc, key) => (acc as any)?.[key], summary);
      if (val !== undefined) setValue(dst, val as never);
    });
  }, [summary, setValue]);

  /* Análise PDF */
  async function analyzePdf(buffer: Buffer) {
    try {
      const file = new File([buffer], "cnpj.pdf", { type: "application/pdf" });
      const sendFile = await openai.files.create({
        file,
        purpose: "assistants",
      });
      const thread = await openai.beta.threads.createAndRun({
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

      // aguarda conclusão
      while (true) {
        const status = await openai.beta.threads.runs.retrieve(
          thread.thread_id,
          thread.id,
        );
        if (status.status === "completed") break;
        if (["queued", "in_progress"].includes(status.status)) {
          await new Promise((r) => setTimeout(r, 2500));
          continue;
        }
        throw new Error("Falha ao processar PDF");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const msgs: any = await openai.beta.threads.messages.list(
        thread.thread_id,
      );
      const raw = msgs.data[0].content[0].text.value;
      const cleaned = raw.replace(/```json\n?|```/g, "");
      return JSON.parse(cleaned) as CnpjCardResponse;
    } catch (e) {
      console.error(e);
      toast.error("Erro ao processar CNPJ");
      return null;
    }
  }

  /* submit */
  const onSubmit = async () => {
    if (!(await validateStep())) {
      toast.error("Corrija os erros antes de salvar.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Cadastro salvo!");
    setIsSubmitting(false);
    onOpenChange(false);
    reset();
  };

  /* derivações p/ render */
  const highPriority = useMemo(
    () => fieldsConfig.filter((f) => f.importance === 1),
    [],
  );
  const grouped = useMemo(() => {
    return fieldsConfig.reduce<Record<string, FieldConfig[]>>((acc, f) => {
      if (f.importance > 1) (acc[f.group] ??= []).push(f);
      return acc;
    }, {});
  }, []);

  /* ----------------------------------------------------------------
     JSX
     ---------------------------------------------------------------- */
  return (
    <FormProvider {...methods}>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="z-[999999] w-[650px] space-y-6 overflow-y-auto">
          <SheetTitle>Novo Cadastro</SheetTitle>

          {/* tipo cliente/fornecedor */}
          <div className="flex items-center justify-center">
            <div className="bg-primary/40 relative flex w-60 overflow-hidden rounded-lg p-2">
              <div
                className={`absolute inset-y-0 left-0 flex w-1/2 transform items-center justify-center transition-transform duration-300 ${
                  selectedType === "client"
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
              >
                <div className="bg-primary h-[80%] w-[95%] rounded-lg" />
              </div>
              {(["client", "supplier"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedType(t)}
                  className={`relative z-10 w-1/2 px-4 py-1 text-sm transition-all duration-300 ${
                    selectedType === t
                      ? "font-semibold text-white"
                      : "text-white/80"
                  }`}
                >
                  {t === "client" ? "Cliente" : "Fornecedor"}
                </button>
              ))}
            </div>
          </div>

          {/* upload CNPJ */}
          <button className="group border-primary bg-primary/20 text-primary hover:border-primary-dark hover:text-primary-dark relative flex w-full flex-col items-center rounded-xl border border-dashed px-2 py-4 font-medium transition duration-300">
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Inserindo Cartão CNPJ
              </>
            ) : (
              <>
                <Upload /> Inserir Cartão CNPJ
              </>
            )}
            <input
              disabled={loading}
              type="file"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setLoading(true);
                const buf = await file.arrayBuffer();
                const parsed = await analyzePdf(Buffer.from(buf));
                setSummary(parsed);
                setLoading(false);
              }}
            />
          </button>

          {/* formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* campos importantes */}
            <div className="space-y-4">
              {highPriority.map((f) => (
                <FieldRenderer key={f.id} field={f} />
              ))}
            </div>

            {/* demais campos */}
            <Accordion type="multiple" className="flex flex-col gap-4">
              {Object.entries(grouped).map(([groupName, fields]) => (
                <AccordionItem
                  key={groupName}
                  value={groupName}
                  className="border-primary border p-4"
                >
                  <AccordionTrigger>{groupName}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {fields
                        .sort((a, b) => a.importance - b.importance)
                        .map((f) => (
                          <FieldRenderer key={f.id} field={f} />
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* footer */}
            <SheetFooter className="mt-auto flex gap-2">
              <SheetClose asChild>
                <Button variant="outline">Cancelar</Button>
              </SheetClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando…" : "Salvar"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </FormProvider>
  );
}
