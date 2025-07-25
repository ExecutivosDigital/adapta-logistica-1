"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Loader2 } from "lucide-react";
import OpenAI from "openai";
import { useState } from "react";
import toast from "react-hot-toast";
export interface PaymentDocumentProps {
  cpfCnpj: string;
  documentNumber: string;
  value: number;
  dueDate: string;
}

interface AiFileReaderProps {
  handleData: (data: PaymentDocumentProps) => void;
}

export function AiFileReader({ handleData }: AiFileReaderProps) {
  const [isShowingDocument, setIsShowingDocument] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<string | null>(null);

  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  async function analyze(
    buffer: Buffer,
  ): Promise<PaymentDocumentProps | null | undefined> {
    const summaryAssistant = "asst_Tb0t6rgXuR1nhiHO8aexLmNC";

    try {
      const file = new File([buffer], "edital.pdf", {
        type: "application/pdf",
      });

      const sendFile = await client.files.create({
        file: file,
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

        // Tenta fazer o parse da string
        return JSON.parse(
          threadMessages.data[0].content[0].text.value
            .replace("```json\n", "")
            .replace("\n```", ""),
        );
      } else {
        toast.error(
          "Ocorreu um problema ao processar o arquivo, tente novamente ou mude o arquivo processado.",
        );
        return null;
      }
    } catch (error) {
      toast.error(
        "Ocorreu um problema ao processar o arquivo, tente novamente ou mude o arquivo processado.",
      );
      console.log(error);
      return null;
    }
  }

  return (
    <>
      {!isShowingDocument ? (
        <div
          className="border-primary relative flex h-[80%] w-[80%] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8"
          style={{ borderWidth: "2px", borderSpacing: "80px" }}
        >
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
                  const fileUrl = URL.createObjectURL(file);
                  const summaryData = await analyze(buffer);

                  if (summaryData) {
                    handleData(summaryData);
                    setFile(fileUrl);
                    setIsShowingDocument(true);
                  }
                  setLoading(false);
                };
                reader.readAsArrayBuffer(file);
              }
            }}
            title=" "
            className="absolute top-0 h-full w-full cursor-pointer bg-transparent text-transparent"
          />
          {loading ? (
            <>
              <div className="border-primary flex h-16 w-16 items-center justify-center rounded-full border">
                <Loader2 className="text-primary animate-spin" />
              </div>
              <div className="mt-2 text-center">
                <p className="text-primary font-medium">Carregando Documento</p>
                <p className="text-primary/70 text-sm">
                  Aguarde enquanto carregamos e analisamos o documento
                  <br />
                  PDF
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="border-primary flex h-16 w-16 items-center justify-center rounded-full border">
                <span className="text-primary text-3xl font-light">+</span>
              </div>
              <div className="mt-2 text-center">
                <p className="text-primary font-medium">Upload de Documento</p>
                <p className="text-primary/70 text-sm">
                  Arraste e solte o arquivo aqui ou adicione do seu dispositivo
                  <br />
                  PDF ou PNG
                </p>
              </div>
            </>
          )}
        </div>
      ) : file ? (
        <div className="relative flex h-full w-full">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={file} />
          </Worker>
          <button
            onClick={() => {
              setIsShowingDocument(false);
              setFile(null);
              setLoading(false);
            }}
            className="absolute top-1 left-1 rounded-md bg-orange-500 px-4 py-2 text-white"
          >
            Alterar Documento
          </button>
        </div>
      ) : (
        <>aaaaa</>
      )}
    </>
  );
}
