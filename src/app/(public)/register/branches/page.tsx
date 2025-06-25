"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/cn";
import { ArrowLeft, PlusSquare } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterBranches() {
  const router = useRouter();
  const [arrayLength, setArrayLength] = useState(0);

  return (
    <div className="relative flex min-h-screen w-full">
      <button
        onClick={() => router.back()}
        className="text-primary absolute top-5 left-5 flex cursor-pointer items-center gap-2"
      >
        <ArrowLeft />
        <span>Voltar</span>
      </button>
      <div className="flex h-screen w-5/12 flex-col items-center justify-center">
        <div className="flex h-full w-11/12 flex-col gap-8 py-8 pt-14">
          <Image
            src="/logo/logo.png"
            alt=""
            width={500}
            height={750}
            className="h-28 w-max object-contain"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Cadastrar Filiais</span>
            <span className="w-1/2 text-xl">
              Texto referente ao cadastro das Filiais da empresa
            </span>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-2/3 flex-col gap-8"
          >
            <ScrollArea className="h-80">
              <div className="relative mb-2 flex flex-col gap-1">
                <Label htmlFor="CNPJ1" className="border-default-900 text-lg">
                  CNPJ Filial 1
                </Label>
                <Input
                  removeWrapper
                  id="CNPJ1"
                  placeholder=""
                  className={cn("peer border-zinc-200 text-base")}
                />
                <button className="bg-primary/20 text-primary border-primary mx-auto flex w-max items-center gap-2 rounded-lg border p-1">
                  <Image
                    src="/icons/export.png"
                    alt=""
                    width={100}
                    height={100}
                    className="h-5 w-max object-contain"
                  />
                  <span>Cadastro completo com Cartão CNPJ</span>
                </button>
              </div>
              <div className="relative mb-2 flex flex-col gap-1">
                <Label htmlFor="CNPJ2" className="border-default-900 text-lg">
                  CNPJ Filial 2 (se houver)
                </Label>
                <Input
                  removeWrapper
                  id="CNPJ2"
                  placeholder=""
                  className={cn("peer border-zinc-200 text-base")}
                />
                <button className="bg-primary/20 text-primary border-primary mx-auto flex w-max items-center gap-2 rounded-lg border p-1">
                  <Image
                    src="/icons/export.png"
                    alt=""
                    width={100}
                    height={100}
                    className="h-5 w-max object-contain"
                  />
                  <span>Cadastro completo com Cartão CNPJ</span>
                </button>
              </div>
              {Array.from({ length: arrayLength }, (_, index) => (
                <div key={index} className="relative mb-2 flex flex-col gap-1">
                  <Label
                    htmlFor={"CNPJ" + index + 3}
                    className="border-default-900 text-lg"
                  >
                    CNPJ Filial {index + 3} (se houver)
                  </Label>
                  <Input
                    removeWrapper
                    id={"CNPJ" + index + 3}
                    placeholder=""
                    className={cn("peer border-zinc-200 text-base")}
                  />
                  <button className="bg-primary/20 text-primary border-primary mx-auto flex w-max items-center gap-2 rounded-lg border p-1">
                    <Image
                      src="/icons/export.png"
                      alt=""
                      width={100}
                      height={100}
                      className="h-5 w-max object-contain"
                    />
                    <span>Cadastro completo com Cartão CNPJ</span>
                  </button>
                </div>
              ))}
            </ScrollArea>
            <button
              onClick={() => setArrayLength(arrayLength + 1)}
              className="border-primary hover:bg-primary text-primary flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border font-semibold transition duration-300 hover:text-white"
            >
              <PlusSquare />
              <span>Clique aqui para Inserir outra Filial</span>
            </button>
            <button
              onClick={() => router.push("/register/branches-list")}
              className="bg-primary hover:bg-primary-dark h-12 w-full cursor-pointer rounded-lg font-semibold text-white transition duration-300"
            >
              Continuar
            </button>
            <span className="mx-auto">
              Novo aqui no Adapta?
              <span className="text-primary hover:text-primary-dark cursor-pointer font-semibold transition duration-300">
                {""} Conheça o Grupo Agora
              </span>
            </span>
          </form>
        </div>
      </div>
      <div className="bg-primary relative flex h-screen w-7/12 items-center justify-center p-8">
        <Image
          src="/static/login-bg.png"
          alt=""
          width={1000}
          height={1500}
          quality={100}
          className="h-full w-full rounded-2xl object-cover"
        />
        <Image
          src="/logo/logo.png"
          alt=""
          width={500}
          height={750}
          className="absolute right-20 bottom-20 z-10 h-80 w-max object-contain opacity-20"
        />
      </div>
    </div>
  );
}
