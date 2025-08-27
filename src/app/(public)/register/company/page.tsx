"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useApiContext } from "@/context/ApiContext";
import { maskCep, maskCnpj } from "@/lib/masks";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Upload } from "lucide-react";
import OpenAI from "openai";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CnpjCardResponse {
  fullName: string;
  cnpj: string;
  email: string;
  contactNumber: string;
  address: {
    address: string;
    number: string;
    province: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

type Regime = { id: string; code: string; name: string };

const FormSchema = z.object({
  nomeEmpresa: z.string().min(1, "Nome da empresa obrigatório"),
  cnpj: z
    .string()
    .regex(
      /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/,
      "Formato CNPJ 00.000.000/0000-00",
    ),
  logradouro: z.string().min(1, "Logradouro obrigatório"),
  cep: z.string().regex(/\d{5}-\d{3}/, "CEP inválido"),
  cidade: z.string().min(1, "Cidade obrigatória"),
  bairro: z.string().min(1, "Bairro obrigatório"),
  uf: z.string().length(2, "UF inválida"),
  numero: z.string().min(1, "Número obrigatório"),
  complemento: z.string().nullable().optional(),
  tributaryRegimeId: z.string().min(1, "Regime tributário obrigatório"),
  stateRegistration: z.string().nullable().optional(),
});

export type CompanyFormData = z.infer<typeof FormSchema>;

const onlyDigits = (v: string) => (v ?? "").replace(/\D/g, "");

type CompanyPayload = {
  address: string;
  city: string;
  cnpj: string;
  name: string;
  neighborhood: string;
  number: string;
  postalCode: string;
  state: string;
  tributaryRegimeId: string;
  complement?: string | null;
  stateRegistration?: string | null;
};

function toCompanyPayload(values: CompanyFormData): CompanyPayload {
  return {
    address: values.logradouro.trim(),
    city: values.cidade.trim(),
    cnpj: onlyDigits(values.cnpj),
    name: values.nomeEmpresa.trim(),
    neighborhood: values.bairro.trim(),
    number: String(values.numero ?? "").trim(),
    postalCode: onlyDigits(values.cep),
    state: values.uf.trim().toUpperCase(),
    tributaryRegimeId: values.tributaryRegimeId.trim(),
    complement: values.complemento?.trim() || null,
    stateRegistration: values.stateRegistration?.trim() || null,
  };
}

export default function CadastroCompanyForm() {
  const { PostAPI, GetAPI } = useApiContext();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(FormSchema),
    shouldFocusError: false,
    mode: "onBlur",
    defaultValues: {
      nomeEmpresa: "",
      cnpj: "",
      logradouro: "",
      cep: "",
      cidade: "",
      bairro: "",
      uf: "",
      numero: "",
      complemento: "",
      tributaryRegimeId: "",
      stateRegistration: "",
    },
  });

  const { control, handleSubmit, setValue, watch } = form;

  const [loadingCard, setLoadingCard] = useState(false);
  const [regimes, setRegimes] = useState<Regime[]>([]);
  const openaiRef = useRef<OpenAI | null>(null);
  if (!openaiRef.current) {
    openaiRef.current = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }
  const client = openaiRef.current;
  const summaryAssistant = "asst_Q6Xw1vrYYzYrF9c4m3rsnvDx";

  const fillWithSummary = (summary: CnpjCardResponse) => {
    setValue("nomeEmpresa", summary.fullName);
    setValue("cnpj", maskCnpj(summary.cnpj));
    setValue("logradouro", summary.address.address);
    setValue("numero", summary.address.number);
    setValue("bairro", summary.address.province);
    setValue("cidade", summary.address.city);
    setValue("uf", summary.address.state);
    setValue("cep", maskCep(summary.address.postalCode));
  };

  useEffect(() => {
    const sub = watch(async (all, { name }) => {
      if (name !== "cep") return;
      const cepDigits = all.cep?.replace(/\D/g, "");
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
        setValue("logradouro", data.logradouro ?? "", opts);
        setValue("bairro", data.bairro ?? "", opts);
        setValue("cidade", data.localidade ?? "", opts);
        setValue("uf", data.uf ?? "", opts);
      } catch {}
    });
    return () => sub.unsubscribe();
  }, [watch, setValue]);

  useEffect(() => {
    (async () => {
      const res = await GetAPI("/tributary-regime", true);

      if (res?.status === 200 && Array.isArray(res.body?.regimes)) {
        setRegimes(res.body.regimes as Regime[]);
      } else {
        toast.error(res?.body?.message ?? "Não foi possível carregar regimes.");
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
      console.error(err);
      toast.error("Erro ao analisar cartão CNPJ");
      return null;
    }
  }

  type FieldName = keyof CompanyFormData;
  const FieldError = ({ name }: { name: FieldName }) => {
    const message = form.formState.errors[name]?.message as string | undefined;
    return (
      <div className="absolute -bottom-4 w-full">
        <p className="text-destructive z-[999] h-4 text-xs text-red-400">
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
    <div className="flex min-w-[calc(50%-14px)] items-center gap-4 px-6 py-5">
      <div
        className={cn(
          "border-r-primary/50 grid w-full grid-cols-12 items-center gap-4",
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

  const fields: (readonly [FieldName, string, ((v: string) => string)?])[] = [
    ["nomeEmpresa", "Nome da Empresa"],
    ["cnpj", "CNPJ", maskCnpj],
    ["cep", "CEP", maskCep],
    ["logradouro", "Logradouro"],
    ["numero", "Número"],
    ["bairro", "Bairro"],
    ["cidade", "Cidade"],
    ["uf", "UF"],
    ["tributaryRegimeId", "Regime Tributário"],
    ["complemento", "Complemento"],
    ["stateRegistration", "Inscrição Estadual"],
  ];

  const onSubmit = handleSubmit(async (values) => {
    const payload = toCompanyPayload(values);
    const res = await PostAPI("/company", payload, true);
    if (res?.status === 200) {
      toast.success("Empresa salva com sucesso!");
    } else {
      toast.error(res?.body?.message ?? "Erro ao salvar empresa.");
    }
  });

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="w-full overflow-hidden rounded-xl border border-gray-300 bg-white"
    >
      <div className="bg-primary/20 flex w-full items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
            <Pencil className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Cadastro de Empresa
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
        {fields.map(([name, label, maskFn], index) => {
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
                                  ? (regimes.find((r) => r.id === field.value)
                                      ?.name ?? "Selecione um regime")
                                  : "Selecione um regime"
                              }
                              readOnly
                              className="text-start"
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="z-[999999999] max-h-60 w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto bg-white">
                            {regimes.length === 0 ? (
                              <DropdownMenuItem className="text-black">
                                Nenhum regime encontrado
                              </DropdownMenuItem>
                            ) : (
                              regimes.map((opt) => (
                                <DropdownMenuItem
                                  key={opt.id}
                                  className={cn(
                                    "hover:bg-secondary text-black hover:text-white",
                                    field.value === opt.id &&
                                      "bg-secondary text-white",
                                  )}
                                  onSelect={() => field.onChange(opt.id)}
                                >
                                  {opt.name}
                                </DropdownMenuItem>
                              ))
                            )}
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
                          name === "uf" ? 2 : name === "cnpj" ? 18 : undefined
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
      </div>

      <div className="flex justify-between border-t border-gray-300 bg-gray-50 px-6 py-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            window.history.back();
          }}
        >
          Voltar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
