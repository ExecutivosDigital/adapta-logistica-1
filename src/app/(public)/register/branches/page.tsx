"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { maskCep, maskCnpj } from "@/lib/masks";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Upload } from "lucide-react";
import OpenAI from "openai";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  razaoSocial: z.string().min(1, "Razão social obrigatória"),
  cnpj: z
    .string()
    .regex(
      /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/,
      "Formato CNPJ 00.000.000/0000-00",
    ),
  cep: z.string().regex(/\d{5}-\d{3}/, "Formato CEP 00000-000"),
  cidade: z.string().min(1, "Cidade obrigatória"),
  logradouro: z.string().min(1, "Logradouro obrigatório"),
  bairro: z.string().min(1, "Bairro obrigatório"),
  uf: z.string().length(2, "UF inválida"),
  numero: z.string().min(1, "Número obrigatório"),
  complemento: z.string().nullable().optional(),
  qtdUsuarios: z.coerce.number().min(0, "Qtd. Usuários obrigatória"),
  qtdFiliais: z.coerce.number().min(0, "Qtd. Filiais obrigatória"),
  inscEstadual: z.string().nullable().optional(),
  inscMunicipal: z.string().nullable().optional(),
});

export type ContratanteFormData = z.infer<typeof FormSchema>;

/* ----------------------------------------------------------------
 * Componente principal
 * -------------------------------------------------------------- */
export default function CadastroContratanteForm({
  onBack,
}: {
  onBack?: () => void;
}) {
  const form = useForm<ContratanteFormData>({
    resolver: zodResolver(FormSchema),
    shouldFocusError: false,
    mode: "onBlur",
    defaultValues: {
      razaoSocial: "",
      cnpj: "",
      cep: "",
      cidade: "",
      logradouro: "",
      bairro: "",
      uf: "",
      numero: "",
      complemento: "",
      qtdUsuarios: 0,
      qtdFiliais: 0,
      inscEstadual: "",
      inscMunicipal: "",
    },
  });

  const { control, handleSubmit, setValue, watch } = form;

  /* ----------------------------------------------------------------
   * Estados & refs
   * -------------------------------------------------------------- */
  const [loadingCard, setLoadingCard] = useState(false);
  const openaiRef = useRef<OpenAI | null>(null);
  if (!openaiRef.current) {
    openaiRef.current = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }
  const client = openaiRef.current;
  const summaryAssistant = "asst_Q6Xw1vrYYzYrF9c4m3rsnvDx"; // seu assistant ID

  /* ----------------------------------------------------------------
   * Preenche campos com dados do cartão
   * -------------------------------------------------------------- */
  const fillWithSummary = (summary: CnpjCardResponse) => {
    setValue("razaoSocial", summary.fullName);
    setValue("cnpj", maskCnpj(summary.cnpj));
    setValue("cep", maskCep(summary.address.postalCode));
    setValue("logradouro", summary.address.address);
    setValue("numero", summary.address.number);
    setValue("bairro", summary.address.province);
    setValue("cidade", summary.address.city);
    setValue("uf", summary.address.state);
  };

  /* ----------------------------------------------------------------
   * ViaCEP auto-preenchimento
   * -------------------------------------------------------------- */
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
      } catch {
        /* vazio */
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
  const FieldError = ({ name }: { name: keyof ContratanteFormData }) => {
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

  /* ----------------------------------------------------------------
   * Lista de campos na ordem visual (mesmo da imagem)
   * -------------------------------------------------------------- */
  const fields: (readonly [
    keyof ContratanteFormData,
    string,
    ((v: string) => string)?,
  ])[] = [
    ["razaoSocial", "Razão Social"],
    ["cnpj", "CNPJ", maskCnpj],
    ["cep", "CEP", maskCep],
    ["cidade", "Cidade"],
    ["logradouro", "Logradouro"],
    ["bairro", "Bairro"],
    ["uf", "UF"],
    ["numero", "Número"],
    ["complemento", "Complemento"],
    ["qtdUsuarios", "Qnt. Usuários"],
    ["qtdFiliais", "Qnt. Filiais"],
    ["inscEstadual", "Insc. Estadual"],
    ["inscMunicipal", "Insc. Municipal"],
  ];

  /* ----------------------------------------------------------------
   * Submit do formulário
   * -------------------------------------------------------------- */
  const onSubmit = handleSubmit((data) => {
    toast.success("Contratante salvo com sucesso!");
    console.log(data);
  });

  /* ----------------------------------------------------------------
   * JSX
   * -------------------------------------------------------------- */
  return (
    <form
      onSubmit={onSubmit}
      className="w-full overflow-hidden rounded-xl border border-gray-300 bg-white"
    >
      {/* Header */}
      <div className="bg-primary/20 flex w-full items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
            <Pencil className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Cadastro de Contratante
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

      {/* Corpo */}
      <div className="grid grid-cols-1 divide-y divide-gray-300 lg:grid-cols-2">
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
                      maxLength={name === "uf" ? 2 : undefined}
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
      </div>

      {/* Navegação */}
      <div className="flex justify-between border-t border-gray-300 bg-gray-50 px-6 py-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack ?? (() => window.history.back())}
        >
          Voltar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
