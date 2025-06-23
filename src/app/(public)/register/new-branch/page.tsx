"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { faker } from "@faker-js/faker";
import {
  ArrowLeft,
  ChevronsUpDown,
  Loader2,
  Pencil,
  PlusSquare,
  Upload,
} from "lucide-react";
import Image from "next/image";
import OpenAI from "openai";
import { useEffect, useRef, useState } from "react";

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

const members = [
  {
    name: "Nick Jonas",
    value: "userid1",
    image: faker.image.avatar(),
  },
  {
    name: "Fahim",
    value: "userid2",
    image: faker.image.avatar(),
  },
  {
    name: "Nayeem",
    value: "userid3",
    image: faker.image.avatar(),
  },
  {
    name: "Iftekhar",
    value: "userid4",
    image: faker.image.avatar(),
  },
];

export default function Home() {
  const [summary, setSummary] = useState<CnpjCardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const client = new OpenAI({
    apiKey:
      "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",
    dangerouslyAllowBrowser: true,
  });

  const summaryAssistant = "asst_Q6Xw1vrYYzYrF9c4m3rsnvDx";

  useEffect(() => {}, []);

  async function analyze(buffer: Buffer) {
    console.log("iniciou ");
    try {
      const file = new File([buffer], "edital.pdf", {
        type: "application/pdf",
      });

      const sendFile = await client.files.create({
        file: file,
        purpose: "assistants",
      });

      console.log("sendFile", sendFile);

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

      const waitForCompletion = async ({
        run,
        thread,
      }: {
        run: string;
        thread: string;
      }): Promise<{ status: string }> => {
        const newStatus = await client.beta.threads.runs.retrieve(thread, run);
        if (newStatus.status === "completed") {
          return { status: newStatus.status };
        } else if (
          newStatus.status === "in_progress" ||
          newStatus.status === "queued"
        ) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          return await waitForCompletion({ run, thread }); // Recursivamente verifica novamente
        } else {
          return { status: newStatus.status };
        }
      };

      const isCompleted = await waitForCompletion({
        thread: thread.thread_id,
        run: thread.id,
      });

      if (isCompleted.status === "completed") {
        //eslint ignore:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const threadMessages: any = await client.beta.threads.messages.list(
          thread.thread_id,
        );

        console.log(
          "threadMessages",
          threadMessages.data[0].content[0].text.value,
        );

        // Tenta fazer o parse da string
        return JSON.parse(
          threadMessages.data[0].content[0].text.value
            .replace("```json\n", "")
            .replace("\n```", ""),
        );
      } else {
        return {
          summary: null,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [summary]);

  return (
    <div className="bg-primary flex h-max w-full p-8 pb-0">
      <div className="relative flex h-max w-full flex-col rounded-t-2xl bg-white p-8">
        <button
          //   onClick={() => router.back()}
          className="text-primary absolute top-5 left-5 flex cursor-pointer items-center gap-2"
        >
          <ArrowLeft />
          <span>Voltar</span>
        </button>
        <Image
          src="/logo/icon.png"
          alt=""
          width={500}
          height={750}
          className="absolute top-5 right-5 h-40 w-max object-contain"
        />
        <div className="flex h-full w-full flex-col">
          <div className="mx-auto flex w-max flex-col items-center gap-4">
            <span className="text-2xl font-bold">
              Lista de Filiais Cadastradas
            </span>
            <span className="w-2/3 text-center text-xl">
              Texto referente a explicar que aqui conseguimos acessas listadas,
              cadastrar e também acessar as Unidades de Negócios.
            </span>
          </div>
          <div className="mt-16 flex h-[calc(100%-150px)] w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-8">
                <span className="text-xl font-semibold">
                  Filiais do Negócio
                </span>
                <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 p-1">
                  <span className="font-semibold">43.795.283/0001-18</span>
                  <ChevronsUpDown className="text-zinc-400" />
                </div>
              </div>
              <button className="border-primary text-primary flex items-center gap-2 rounded-lg border p-1">
                <PlusSquare />
                <span>Adicionar mais uma filial</span>
              </button>
            </div>
            <div className="relative flex w-full border-b border-b-zinc-200">
              <div className="flex h-12 w-60 cursor-pointer items-center justify-center border-b border-b-transparent">
                Filiais Cadastradas
              </div>
              <div className="text-primary border-b-primary flex h-12 w-60 cursor-pointer items-center justify-center border-b">
                Informações do CNPJ
              </div>
            </div>
            <div className="w-full rounded-xl border border-gray-300">
              <div className="flex w-full justify-between px-6 py-4">
                <div className="flex gap-4">
                  <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full p-2">
                    <Pencil className="text-white" />
                  </div>
                  <div className="">
                    <h1 className="text-xl font-bold text-gray-800">
                      {summary ? summary.fullName : "Razão Social Matriz"}
                    </h1>
                    <p className="text-sm text-gray-600">
                      Responsáveis pela Matriz
                    </p>
                    <div className="mt-4 flex items-end gap-4">
                      <AvatarGroup
                        max={3}
                        total={members.length - 3}
                        countClass="w-6 h-6"
                      >
                        {members?.map((item, index) => (
                          <TooltipProvider
                            key={`task-assigned-members-${index}`}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className="ring-primary ring-offset-primary h-6 w-6 ring-1 ring-offset-[1px]">
                                  <AvatarImage src={item.image} />
                                  <AvatarFallback>AB</AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent
                                color="primary"
                                side="bottom"
                                className="px-2 py-[2px]"
                              >
                                <p className="text-xs font-medium text-white">
                                  {item.name}
                                </p>
                                <TooltipArrow className="fill-primary" />
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </AvatarGroup>
                      <button className="text-primary underline">
                        Ver todos
                      </button>
                    </div>
                  </div>
                  <span className="bg-primary/20 text-primary h-max rounded-sm px-2 py-1 text-sm font-medium">
                    CNPJ: {summary ? summary.cnpj : "000.000.000/0000-00"}
                  </span>
                </div>
                <button className="border-primary text-primary bg-primary/10 relative flex flex-col items-center rounded-xl border px-2 py-4 font-medium">
                  {loading ? (
                    <>
                      {" "}
                      <Loader2 className="animate-spin" />
                      Inserindo Cartão CNPJ
                    </>
                  ) : (
                    <>
                      {" "}
                      <Upload />
                      Inserir Cartão CNPJ
                    </>
                  )}
                  <input
                    disabled={loading}
                    type="file"
                    onChange={async (e) => {
                      setLoading(true);
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = async (event) => {
                          const buffer = Buffer.from(
                            event.target?.result as ArrayBuffer,
                          );
                          const summaryData = await analyze(buffer);
                          setSummary(summaryData);
                          setLoading(false);
                        };
                        reader.readAsArrayBuffer(file);
                      }
                    }}
                    title=" "
                    className="absolute top-0 h-full w-full bg-transparent text-transparent"
                  />
                </button>
              </div>
              <div className="flex w-full flex-col gap-4">
                <div className="flex w-full flex-col gap-4">
                  <div className="grid grid-cols-12 justify-between border-t border-gray-300 px-6 py-4">
                    <div className="col-span-3 w-10/12 text-gray-800">
                      Nome Fantasia
                    </div>
                    <div className="col-span-8 text-gray-800">
                      {summary ? summary.fantasyName : "Nome Fantasia"}
                    </div>
                    <div className="col-span-1">
                      <button className="text-primary">Editar {">"}</button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 justify-between border-t border-gray-300 px-6 py-4">
                  <div className="col-span-3 w-10/12 text-gray-800">
                    Atividade Economica Principal (CNAE)
                  </div>
                  <div className="col-span-8 text-gray-800">
                    {summary
                      ? summary.mainActivity
                      : "Atividade Economica Principal"}
                  </div>
                  <div className="col-span-1">
                    <button className="text-primary">Editar {">"}</button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-4">
                <div className="grid grid-cols-12 justify-between border-t border-gray-300 px-6 py-4">
                  <div className="col-span-3 w-10/12 text-gray-800">
                    Atividades Econômicas Secundarias (CNAE)
                  </div>
                  <textarea
                    disabled
                    ref={textareaRef}
                    className="col-span-8 h-max w-full resize-none text-gray-800"
                    value={
                      summary
                        ? summary.secondaryActivities
                        : "Atividades Econômicas Secundarias"
                    }
                  />
                  <div className="col-span-1">
                    <button className="text-primary">Editar {">"}</button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-4 text-gray-800">
                <div className="grid grid-cols-12 justify-between border-t border-gray-300 px-6 py-4">
                  <div className="col-span-3 w-10/12">
                    <span className="text-gray-800">Endereço Completo</span>
                    <p className="text-sm text-gray-600">
                      Endereço referente ao CNPJ
                    </p>
                  </div>
                  <div className="col-span-8 flex gap-8">
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-950">
                          Logradouro:
                        </span>
                        <span>{summary ? summary.address.address : ""}</span>
                      </div>
                      <div className="flex gap-8">
                        <div className="flex gap-2">
                          <span className="font-semibold text-gray-950">
                            Município:{" "}
                          </span>
                          <span>{summary ? summary.address.city : ""}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-gray-950">
                            UF:
                          </span>
                          <span>{summary ? summary.address.state : ""}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-950">
                          Bairro:
                        </span>
                        <span>{summary ? summary.address.province : ""}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-950">
                          CEP:
                        </span>
                        <span>{summary ? summary.address.postalCode : ""}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <button className="text-primary">Editar {">"}</button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-4">
                <div className="grid grid-cols-12 justify-between border-t border-gray-300 px-6 py-4">
                  <div className="col-span-3 w-10/12">
                    <span className="text-gray-800">
                      Código e Descrição da Natureza Jurídica
                    </span>
                    <p className="text-sm text-gray-600">
                      E sua Situação Cadastral
                    </p>
                  </div>
                  <div className="col-span-8 flex flex-col gap-2">
                    <span className="text-gray-800">
                      {summary ? summary.juridicNature : "Natureza Jurídica"}
                    </span>
                    <span className="text-sm text-gray-600">
                      {summary
                        ? summary.registerSituation
                        : "Ativa, Inapta, Suspensa, Baixada"}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <button className="text-primary">Editar {">"}</button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-4">
                <div className="grid grid-cols-12 justify-between border-t border-gray-300 px-6 py-4">
                  <div className="col-span-3 flex w-10/12 flex-col gap-2">
                    <span className="text-gray-800">DATA DE ABERTURA</span>
                    <span className="text-sm text-gray-600">
                      Data da Situação Cadastral
                    </span>
                  </div>
                  <div className="col-span-8 flex flex-col gap-2">
                    <span className="text-gray-800">
                      {summary ? summary.openDate : "XX/XX/XXXX"}
                    </span>
                    <span className="text-sm text-gray-600">
                      {summary ? summary.situationDate : "XX/XX/XXXX"}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <button className="text-primary">Editar {">"}</button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-4">
                <div className="grid grid-cols-12 justify-between border-t border-gray-300 px-6 py-4">
                  <div className="col-span-3 flex w-10/12 flex-col gap-2">
                    <span className="text-gray-800">Telefone de Contato</span>
                    <span className="text-sm text-gray-600">
                      Email para Contato
                    </span>
                  </div>
                  <div className="col-span-8 flex flex-col gap-2">
                    <span>06/10/2021</span>
                    <span className="text-sm text-gray-600">
                      {summary ? summary.email : "email de contato"}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <button className="text-primary">Editar {">"}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-5 left-5 mt-4 flex flex-col">
          <span>Há alguma necessidade de conversar com o time Adapta?</span>
          <span className="text-primary cursor-pointer font-semibold underline">
            Clique aqui para conversar com o time
          </span>
        </div>
      </div>
    </div>
  );
}
