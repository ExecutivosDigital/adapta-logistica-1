"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VerificationCodeInput from "./VerificationCodeInput";

export default function RecoverPassword() {
  const router = useRouter();

  const [steps, setSteps] = useState(1);
  // const [code, setCode] = useState<string>("");
  const handleComplete = () => {
    // setCode(filledCode);
  };
  function handleBack() {
    if (steps > 1) {
      setSteps(steps - 1);
    } else {
      router.push("/login");
    }
  }
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 lg:w-5/12 lg:p-0">
        <button
          onClick={handleBack}
          className="text-primary absolute top-4 left-4 flex cursor-pointer flex-row items-center gap-1 object-contain"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <div className="flex w-full flex-col items-center gap-8 lg:w-11/12 lg:items-start">
          <Image
            src="/logo/logo.png"
            alt=""
            width={500}
            height={750}
            className="h-40 w-max object-contain"
          />
          {steps === 1 && (
            <>
              <div className="flex flex-col">
                <span className="t text-2xl font-bold">
                  Esqueci minha Senha
                </span>
                <span className="t text-sm lg:text-xl">
                  Para trocar sua senha é muito simples, faça os passos abaixo e
                  poderá inserir sua nova senha{" "}
                  <span className="text-primary">{""} #AdaptSe</span>
                </span>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full flex-col gap-8 lg:w-full"
              >
                <div className="relative">
                  <Label htmlFor="email" className="border-default-900 text-lg">
                    Seu e-mail
                  </Label>
                  <Input
                    removeWrapper
                    id="email"
                    placeholder=""
                    className={cn("peer border-zinc-200 text-base")}
                  />
                </div>
                <span className="text-primary self-center text-center underline md:text-start">
                  Sem acesso ao meu e-mail, falar com administrativo
                </span>
                <button
                  onClick={() => setSteps(2)}
                  className="bg-primary h-12 w-full cursor-pointer rounded-lg font-semibold text-white lg:w-[80%] lg:self-center"
                >
                  Enviar Código
                </button>
                <span className="mx-auto text-center md:text-start">
                  Novo aqui no Adapta?
                  <span className="text-primary cursor-pointer font-semibold">
                    {""} Conheça o Grupo Agora
                  </span>
                </span>
              </form>
            </>
          )}
          {steps === 2 && (
            <>
              <div className="flex flex-col">
                <Image
                  src="/mail.png"
                  alt=""
                  width={500}
                  height={750}
                  className="mb-4 hidden h-16 w-max object-contain lg:block"
                />
                <span className="text-center text-2xl font-bold md:text-start">
                  Confirme em seu email
                </span>
                <span className="text-center text-sm md:text-start lg:text-xl">
                  Nós enviamos o código que você deverá inserir abaixo
                  diretamente em seu email:
                </span>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full flex-col gap-8 lg:w-2/3"
              >
                <div className="relative">
                  <VerificationCodeInput onComplete={handleComplete} />
                </div>

                <div className="">
                  Não recebeu o código?{" "}
                  <button className="text-primary cursor-pointer">
                    Enviar novamente
                  </button>
                </div>
                <button
                  onClick={() => setSteps(3)}
                  className="bg-primary h-12 w-full cursor-pointer rounded-lg font-semibold text-white"
                >
                  Validar Código
                </button>
                <span className="mx-auto text-center md:text-start">
                  Novo aqui no Adapta?
                  <span className="text-primary cursor-pointer font-semibold">
                    {""} Conheça o Grupo Agora
                  </span>
                </span>
              </form>
            </>
          )}
          {steps === 3 && (
            <>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">Esqueci minha Senha</span>
                <span className="text-sm lg:text-xl">
                  Para trocar sua senha é muito simples, faça os passos abaixo e
                  poderá inserir sua nova senha{" "}
                  <span className="text-primary">{""} #AdaptSe</span>
                </span>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full flex-col gap-8 lg:w-2/3"
              >
                <div className="relative">
                  <Label htmlFor="pass" className="border-default-900 text-lg">
                    Nova senha
                  </Label>
                  <Input
                    removeWrapper
                    id="pass"
                    placeholder=""
                    className={cn("peer border-zinc-200 text-base")}
                  />
                </div>
                <div className="relative">
                  <Label
                    htmlFor="confirmPass"
                    className="border-default-900 text-lg"
                  >
                    Repita sua nova senha
                  </Label>
                  <Input
                    removeWrapper
                    id="confirmPass"
                    placeholder=""
                    className={cn("peer border-zinc-200 text-base")}
                  />
                </div>

                <button
                  onClick={() => router.push("/login")}
                  className="bg-primary h-12 w-full cursor-pointer rounded-lg font-semibold text-white"
                >
                  Entrar agora
                </button>
                <span className="mx-auto text-center md:text-start">
                  Novo aqui no Adapta?
                  <span className="text-primary cursor-pointer font-semibold">
                    {""} Conheça o Grupo Agora
                  </span>
                </span>
              </form>
            </>
          )}
        </div>
      </div>
      <div className="bg-primary relative hidden h-screen w-7/12 items-center justify-center p-8 lg:flex">
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
