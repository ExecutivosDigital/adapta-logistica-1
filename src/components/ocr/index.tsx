"use client";
import { Loader2, Upload } from "lucide-react";
import OpenAI from "openai";
import { useState } from "react";

interface SummaryProps {
  cpfCnpj: string;
  documentNumber: string;
  value: number;
  dueDate: string;
}

export function Ocr({}) {
  const [summary, setSummary] = useState<SummaryProps | null>(null);
  const [loading, setLoading] = useState(false);
  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const summaryAssistant = "asst_Tb0t6rgXuR1nhiHO8aexLmNC";

  console.log(summary);

  async function analyze(buffer: Buffer) {
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
        return {
          summary: null,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button className="border-primary text-primary bg-primary/20 relative flex flex-col items-center rounded-xl border px-2 py-4 font-medium">
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
              console.log("event: ", event);
              const buffer = Buffer.from(event.target?.result as ArrayBuffer);
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
  );
}
