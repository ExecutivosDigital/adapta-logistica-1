"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useApiContext } from "@/context/ApiContext";
import { useBranch } from "@/context/BranchContext";
import { useFinancialDataContext } from "@/context/FinancialDataContext";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import OpenAI from "openai";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const FormSchema = z.object({
  address: z.string(),
  city: z.string(),
  clientGroupId: z.string(),
  cnpj: z.string(),
  email: z.string(),
  name: z.string(),
  neighborhood: z.string(),
  number: z.string(),
  phone: z.string(),
  postalCode: z.string(),
  state: z.string(),
  complement: z.string().optional(),
  companyId: z.string(),
  contractUrl: z.string(),
  paymentCondition: z.string(),
  municipalRegistration: z.string().optional(),
  stateRegistration: z.string().optional(),
});

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateClientSheet({ open, onOpenChange }: Props) {
  const { PostAPI } = useApiContext();
  const { selectedBranch } = useBranch();
  const { GetClientGroups, clientGroups } = useFinancialDataContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      address: "",
      city: "",
      clientGroupId: "",
      contractUrl: "",
      cnpj: "",
      email: "",
      name: "",
      neighborhood: "",
      number: "",
      phone: "",
      postalCode: "",
      state: "",
      complement: "",
      companyId: "",
      municipalRegistration: "",
      paymentCondition: "",
      stateRegistration: "",
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: [
        "address",
        "city",
        "cnpj",
        "email",
        "name",
        "neighborhood",
        "number",
        "phone",
        "postalCode",
        "state",
        "complement",
        "companyId",
        "clientGroupId",
        "contractUrl",
        "paymentCondition",
        "municipalRegistration",
        "stateRegistration",
      ] as const,
    };

    const validateStep = async (step: number) => {
      const fields = stepFields[step as keyof typeof stepFields];
      if (!fields) return true;
      return await form.trigger(fields);
    };

    return { activeStep, validateStep, setActiveStep };
  };

  const { validateStep } = useFormSteps(form);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const summaryAssistant = "asst_Q6Xw1vrYYzYrF9c4m3rsnvDx";

  /* Análise PDF */
  async function analyzePdf(buffer: Buffer) {
    try {
      const file = new File([new Uint8Array(buffer)], "cnpj.pdf", {
        type: "application/pdf",
      });
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsed = JSON.parse(cleaned) as any;
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${parsed?.address.postalCode
          .replace("-", "")
          .replace(".", "")}`,
      );
      const data = await response.json();
      const neighborhood = data.neighborhood;
      const finalParsed = {
        ...parsed,
        address: {
          ...parsed.address,
          neighborhood,
        },
      };
      form.setValue("cnpj", finalParsed.cnpj);
      form.setValue("name", finalParsed.fullName);
      form.setValue("email", finalParsed.email);
      form.setValue("phone", finalParsed.contactNumber);
      form.setValue("postalCode", finalParsed.address.postalCode);
      form.setValue("address", finalParsed.address.address);
      form.setValue("number", finalParsed.address.number);
      form.setValue("neighborhood", finalParsed.address.neighborhood);
      form.setValue("city", finalParsed.address.city);
      form.setValue("state", finalParsed.address.state);
    } catch (e) {
      console.error(e);
      toast.error("Erro ao processar CNPJ");
      return null;
    }
  }

  const handleNext = async (
    form: UseFormReturn<z.infer<typeof FormSchema>>,
  ) => {
    const isValid = await validateStep(0);
    if (!isValid) {
      const errors = form.formState.errors;

      const fieldLabels: Record<keyof z.infer<typeof FormSchema>, string> = {
        address: "Endereço",
        city: "Cidade",
        clientGroupId: "Grupo Cliente",
        contractUrl: "URL do Contrato",
        cnpj: "CNPJ",
        email: "E-mails",
        name: "Nome",
        neighborhood: "Bairro",
        number: "Número",
        phone: "Telefone",
        postalCode: "CEP",
        state: "Estado",
        complement: "Complemento",
        companyId: "Empresa",
        municipalRegistration: "Inscrição Municipal",
        paymentCondition: "Condicionante de Pagamento",
        stateRegistration: "Inscrição Estadual",
      };

      const firstErrorField = Object.keys(
        errors,
      )[0] as keyof typeof fieldLabels;
      const firstError = errors[firstErrorField];

      if (firstError?.message && firstErrorField in fieldLabels) {
        const fieldLabel = fieldLabels[firstErrorField];
        return toast.error(`${fieldLabel}: ${firstError.message}`);
      }

      return toast.error("Por favor, corrija os erros no formulário.");
    } else {
      setIsSubmitting(true);
      const create = await PostAPI(
        "/client",
        {
          ...form.getValues(),
          companyId: selectedBranch?.companyId,
        },
        true,
      );
      console.log("create", create);
      if (create.status === 200) {
        GetClientGroups();
        toast.success("Cliente criado com sucesso!");
        onOpenChange(false);
        return setIsSubmitting(false);
      }
      toast.error("Erro ao criar Cliente, tente novamente");
      return setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90vw] space-y-6 overflow-y-auto xl:w-[650px]">
        <SheetTitle>Novo Cadastro</SheetTitle>
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
              await analyzePdf(Buffer.from(buf));
              setLoading(false);
            }}
          />
        </button>

        <div className="flex h-[calc(100%-200px)] flex-col justify-between">
          <Form {...form}>
            <div className="space-y-4">
              <FormField
                key="cnpj"
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-100">CNPJ*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="CNPJ"
                        type="text"
                        {...field}
                        className={cn(
                          "",
                          field.value && "bg-primary/20 border-primary border",
                          {
                            "text-text-100 rounded-md border-red-500 focus:border-red-500":
                              form.formState.errors.cnpj,
                          },
                        )}
                        autoComplete="off"
                        maxLength={18}
                      />
                    </FormControl>
                    <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                key="name"
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-100">Nome*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome"
                        type="text"
                        {...field}
                        className={cn(
                          "",
                          field.value && "bg-primary/20 border-primary border",
                          {
                            "text-text-100 rounded-md border-red-500 focus:border-red-500":
                              form.formState.errors.name,
                          },
                        )}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                key="email"
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-100">E-mail*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="EMAIL"
                        type="email"
                        {...field}
                        className={cn(
                          "",
                          field.value && "bg-primary/20 border-primary border",
                          {
                            "text-text-100 rounded-md border-red-500 focus:border-red-500":
                              form.formState.errors.email,
                          },
                        )}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                key="phone"
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-100">Telefone*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Telefone"
                        type="text"
                        {...field}
                        className={cn(
                          "",
                          field.value && "bg-primary/20 border-primary border",
                          {
                            "text-text-100 rounded-md border-red-500 focus:border-red-500":
                              form.formState.errors.phone,
                          },
                        )}
                        autoComplete="off"
                        maxLength={15}
                      />
                    </FormControl>
                    <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                key="clientGroupId"
                control={form.control}
                name="clientGroupId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-text-100">
                      Grupo de Clientes*
                    </FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Input
                            placeholder="Grupo de Clientes"
                            type="text"
                            value={
                              clientGroups.find((cg) => cg.id === field.value)
                                ?.name || "Selecione"
                            }
                            readOnly
                            className={cn(
                              "",
                              field.value &&
                                "bg-primary/20 border-primary border",
                              {
                                "text-text-100 rounded-md border-red-500 focus:border-red-500":
                                  form.formState.errors.clientGroupId,
                              },
                            )}
                            autoComplete="off"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="z-[2000] h-80 overflow-y-scroll"
                          align="start"
                        >
                          {clientGroups.map((cg) => (
                            <DropdownMenuItem
                              key={cg.id}
                              onSelect={() => {
                                field.onChange(cg.id);
                              }}
                            >
                              {cg.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                key="contractUrl"
                control={form.control}
                name="contractUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-100">Contrato*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contrato"
                        type="text"
                        {...field}
                        className={cn(
                          "",
                          field.value && "bg-primary/20 border-primary border",
                          {
                            "text-text-100 rounded-md border-red-500 focus:border-red-500":
                              form.formState.errors.contractUrl,
                          },
                        )}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                key="paymentCondition"
                control={form.control}
                name="paymentCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-100">
                      Condição de Pagamento Negociada*
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Condição de Pagamento Negociada"
                        {...field}
                        className={cn(
                          "resize-none",
                          field.value && "bg-primary/20 border-primary border",
                          {
                            "text-text-100 rounded-md border-red-500 focus:border-red-500":
                              form.formState.errors.paymentCondition,
                          },
                        )}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border-primary border">
                  <AccordionTrigger className="">Endereço*</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <FormField
                        key="postalCode"
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-text-100">
                              CEP*
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="CEP"
                                type="text"
                                {...field}
                                className={cn(
                                  "",
                                  field.value &&
                                    "bg-primary/20 border-primary border",
                                  {
                                    "text-text-100 rounded-md border-red-500 focus:border-red-500":
                                      form.formState.errors.postalCode,
                                  },
                                )}
                                autoComplete="off"
                                maxLength={9}
                              />
                            </FormControl>
                            <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        key="address"
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-text-100">
                              Endereço*
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Endereço"
                                type="text"
                                {...field}
                                className={cn(
                                  "",
                                  field.value &&
                                    "bg-primary/20 border-primary border",
                                  {
                                    "text-text-100 rounded-md border-red-500 focus:border-red-500":
                                      form.formState.errors.address,
                                  },
                                )}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        key="number"
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-text-100">
                              Número*
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Número"
                                type="text"
                                {...field}
                                className={cn(
                                  "",
                                  field.value &&
                                    "bg-primary/20 border-primary border",
                                  {
                                    "text-text-100 rounded-md border-red-500 focus:border-red-500":
                                      form.formState.errors.number,
                                  },
                                )}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        key="neighborhood"
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-text-100">
                              Bairro*
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Bairro"
                                type="text"
                                {...field}
                                className={cn(
                                  "",
                                  field.value &&
                                    "bg-primary/20 border-primary border",
                                  {
                                    "text-text-100 rounded-md border-red-500 focus:border-red-500":
                                      form.formState.errors.neighborhood,
                                  },
                                )}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        key="city"
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-text-100">
                              Cidade*
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Cidade"
                                type="text"
                                {...field}
                                className={cn(
                                  "",
                                  field.value &&
                                    "bg-primary/20 border-primary border",
                                  {
                                    "text-text-100 rounded-md border-red-500 focus:border-red-500":
                                      form.formState.errors.city,
                                  },
                                )}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        key="state"
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-text-100">
                              Estado*
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Estado"
                                type="text"
                                {...field}
                                className={cn(
                                  "",
                                  field.value &&
                                    "bg-primary/20 border-primary border",
                                  {
                                    "text-text-100 rounded-md border-red-500 focus:border-red-500":
                                      form.formState.errors.state,
                                  },
                                )}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        key="complement"
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-text-100">
                              Complemento
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Complemento"
                                type="text"
                                {...field}
                                className={cn(
                                  "",
                                  field.value &&
                                    "bg-primary/20 border-primary border",
                                  {
                                    "text-text-100 rounded-md border-red-500 focus:border-red-500":
                                      form.formState.errors.complement,
                                  },
                                )}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        key="municipalRegistration"
                        control={form.control}
                        name="municipalRegistration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-text-100">
                              Inscrição Municipal
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Inscrição Municipal"
                                type="text"
                                {...field}
                                className={cn(
                                  "",
                                  field.value &&
                                    "bg-primary/20 border-primary border",
                                  {
                                    "text-text-100 rounded-md border-red-500 focus:border-red-500":
                                      form.formState.errors
                                        .municipalRegistration,
                                  },
                                )}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        key="stateRegistration"
                        control={form.control}
                        name="stateRegistration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-text-100">
                              Inscrição Estadual
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Inscrição Estadual"
                                type="text"
                                {...field}
                                className={cn(
                                  "",
                                  field.value &&
                                    "bg-primary/20 border-primary border",
                                  {
                                    "text-text-100 rounded-md border-red-500 focus:border-red-500":
                                      form.formState.errors.stateRegistration,
                                  },
                                )}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <SheetFooter className="mt-auto flex gap-2 py-4">
              <SheetClose asChild>
                <Button onClick={() => onOpenChange(false)} variant="outline">
                  Cancelar
                </Button>
              </SheetClose>
              <Button onClick={() => handleNext(form)} disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Criar Cliente"
                )}
              </Button>
            </SheetFooter>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
