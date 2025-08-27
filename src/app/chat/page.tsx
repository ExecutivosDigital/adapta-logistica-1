"use client";
import { LoadingOverlay } from "@/components/loading-overlay";
import { useLoadingContext } from "@/context/LoadingContext";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Section } from "./SectionGemini";

export default function BranchesList() {
  const router = useRouter();
  const { isNavigating } = useLoadingContext();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return (
    <>
      {isNavigating && <LoadingOverlay />}
      <div className="bg-primary h-screen max-h-screen w-full p-4 pb-0 lg:p-8">
        <div className="relative flex h-[calc(100vh-16px)] max-h-[calc(100vh-16px)] w-full flex-col rounded-t-2xl bg-white py-4 lg:h-[calc(100vh-32px)] lg:max-h-[calc(100vh-32px)] lg:p-8">
          <div className="absolute top-0 -left-8 p-8 pb-0 lg:top-5 lg:left-5">
            <button
              onClick={() => router.back()}
              className="lg:text-md flex cursor-pointer items-center gap-2 text-xs"
            >
              <ArrowLeft />
              <span>Voltar</span>
            </button>
          </div>
          <div>
            <Image
              src="/logo/ai-icon.png"
              alt=""
              width={500}
              height={750}
              className="absolute top-5 right-5 hidden h-10 w-max object-contain lg:block lg:h-20"
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
    </>
  );
}
