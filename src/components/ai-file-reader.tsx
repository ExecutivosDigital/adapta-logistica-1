"use client";

import { useApiContext } from "@/context/ApiContext";
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
  handleData: (data: PaymentDocumentProps, documentUrl: string) => void;
  setIsAddingDocument?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AiFileReader({
  handleData,
  setIsAddingDocument,
}: AiFileReaderProps) {
  const { PostAPI } = useApiContext();
  const [isShowingDocument, setIsShowingDocument] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  async function analyze(
    buffer: Buffer,
  ): Promise<PaymentDocumentProps | null | undefined> {
    const summaryAssistant = "asst_Tb0t6rgXuR1nhiHO8aexLmNC";

    try {
      const file = new File([buffer.buffer as ArrayBuffer], "edital.pdf", {
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
          return await waitForCompletion({ run, thread });
        } else {
          return { status: newStatus.status };
        }
      };

      const isCompleted = await waitForCompletion({
        thread: thread.thread_id,
        run: thread.id,
      });

      if (isCompleted.status === "completed") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const threadMessages: any = await client.beta.threads.messages.list(
          thread.thread_id,
        );

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
      console.error(error);
      return null;
    }
  }

  const handleUploadFile = async (
    summaryData: PaymentDocumentProps,
    selectedFile: File,
  ) => {
    const formData = new FormData();
    const sanitized = selectedFile.name.replace(/\s+/g, "-");
    formData.append("file", selectedFile, sanitized);
    const res = await PostAPI("/file", formData, true);
    if (res?.status === 200 && res.body?.fullUrl) {
      handleData(summaryData, res.body.url);
      setFile(selectedFile);
      setIsShowingDocument(true);
      return res.body.fullUrl as string;
    }
    toast.error(res?.body?.message ?? "Falha no upload.");
  };

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
            accept=".pdf"
            onChange={async (e) => {
              setLoading(true);
              if (setIsAddingDocument) {
                setIsAddingDocument(true);
              }
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                  const buffer = Buffer.from(
                    event.target?.result as ArrayBuffer,
                  );
                  const summaryData = await analyze(buffer);

                  if (summaryData) {
                    handleUploadFile(summaryData, selectedFile);
                  }
                  setLoading(false);
                };
                reader.readAsArrayBuffer(selectedFile);
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
        <div className="relative flex h-full w-full flex-col">
          <div className="flex items-center justify-between bg-gray-100 p-4">
            <button
              onClick={() => {
                setIsShowingDocument(false);
                setFile(null);
                setLoading(false);
                setPageNumber(1);
                setNumPages(0);
              }}
              className="rounded-md bg-orange-500 px-4 py-2 text-white"
            >
              Alterar Documento
            </button>

            {numPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber <= 1}
                  className="rounded bg-blue-500 px-3 py-1 text-white disabled:bg-gray-300"
                >
                  Anterior
                </button>
                <span className="text-sm">
                  Página {pageNumber} de {numPages}
                </span>
                <button
                  onClick={() =>
                    setPageNumber(Math.min(numPages, pageNumber + 1))
                  }
                  disabled={pageNumber >= numPages}
                  className="rounded bg-blue-500 px-3 py-1 text-white disabled:bg-gray-300"
                >
                  Próxima
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-1 justify-center overflow-auto p-4">
            <iframe
              src={URL.createObjectURL(file)}
              width="100%"
              height="100%"
              title="PDF Viewer"
            />
          </div>
        </div>
      ) : (
        <>aaaa</>
      )}
    </>
  );
}
