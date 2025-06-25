"use client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Section } from "./SectionGemini";

export default function BranchesList() {
  const router = useRouter();
  return (
    <div className="bg-primary h-screen max-h-screen w-full p-4 pb-0 lg:p-8">
      <div className="relative flex h-[calc(100vh-16px)] max-h-[calc(100vh-16px)] w-full flex-col rounded-t-2xl bg-white py-4 lg:h-[calc(100vh-32px)] lg:max-h-[calc(100vh-32px)] lg:p-8">
        <div
          onClick={() => router.back()}
          className="text-primary absolute top-5 left-5 flex cursor-pointer items-center gap-2"
        >
          <ChevronLeft />
          <span>Voltar</span>
        </div>
        <div>
          <Image
            src="/logo/ai-icon.png"
            alt=""
            width={500}
            height={750}
            className="absolute top-5 right-5 h-10 w-max object-contain lg:h-40"
          />
        </div>
        <div className="flex w-full flex-1 flex-col">
          <div className="flex flex-col items-center gap-4 px-2 lg:mx-auto lg:px-0">
            <span className="text-2xl font-bold">Adapta.AI</span>
            <span className="text-center text-sm lg:w-2/3 lg:text-xl">
              Esta seção auxilia com tudo referente à empresa, incluindo PDFs,
              transcrição de áudio, explicação, resumo de arquivos,
              identificação de imagens e vídeos.
            </span>
          </div>
          <div className="mt-16 flex h-[calc((100vh-250px))] flex-col">
            <Section />
          </div>
        </div>
      </div>
    </div>
  );
}
