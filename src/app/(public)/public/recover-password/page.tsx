"use client";
import { useApiContext } from "@/context/ApiContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Header } from "../components/Header";

// Schemas de validação com Zod
const schemaRecover = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

const schemaCode = z.object({
  code: z.string().min(6, "Código inválido"),
});

const schemaEdit = z
  .object({
    code: z.string(),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmação de senha inválida"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem corresponder",
    path: ["confirmPassword"],
  });

interface RecoverFormData {
  email: string;
}
interface ValidateCodeFormData {
  code: string;
}
interface EditPasswordFormData {
  code: string;
  password: string;
  confirmPassword: string;
}
export default function RecoverPassword() {
  const { PostAPI, GetAPI, PutAPI } = useApiContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] =
    useState(false);
  const [recoverError, setRecoverError] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [timer, setTimer] = useState(10); // 2 minutos
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [code, setCode] = useState("");

  // Contagem regressiva para reenviar o código
  useEffect(() => {
    if (currentStep === 2 && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [currentStep, timer]);

  // Funções de formulário
  const {
    register: registerRecover,
    handleSubmit: handleSubmitRecover,
    formState: { errors: errorsRecover },
  } = useForm<RecoverFormData>({
    resolver: zodResolver(schemaRecover),
  });

  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: errorsCode },
  } = useForm<ValidateCodeFormData>({
    resolver: zodResolver(schemaCode),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
  } = useForm<EditPasswordFormData>({
    resolver: zodResolver(schemaEdit),
  });

  // Step 1: Enviar E-mail de recuperação

  async function HandleSendRecover(data: RecoverFormData) {
    setIsLogging(true);
    const response = await PostAPI(
      "/password-code",
      {
        email: data.email,
      },
      false,
    );
    setIsLogging(false);

    if (response.status === 200) {
      setEmail(data.email); // Salva o email para o reenvio do código
      setCurrentStep(2);
    } else {
      setRecoverError(response.body.message);
    }
  }

  // Step 2: Validar Código de recuperação

  async function HandleValidateCode(data: ValidateCodeFormData) {
    setIsLogging(true);
    const response = await GetAPI(`/password-code/${data.code}`, false);
    setIsLogging(false);
    setCurrentStep(3);
    if (response.status === 200) {
    } else {
      setRecoverError("Código inválido ou expirado. Tente novamente.");
    }
  }

  // Reenviar Código
  async function handleResendCode() {
    setIsLogging(true);
    const response = await PostAPI("/password-code", { email }, false);
    setIsLogging(false);
    if (response.status === 200) {
      setTimer(120); // Reinicia o temporizador
    } else {
      setRecoverError("Erro ao reenviar o código. Tente novamente.");
    }
  }

  // Step 3: Redefinir Senha

  async function HandleEditPassword(data: EditPasswordFormData) {
    setIsLogging(true);
    const response = await PutAPI(
      "/influencer/password",
      {
        code: code,
        password: data.password,
      },
      false,
    );
    setIsLogging(false);

    if (response.status === 200) {
      router.push("/public/login");
    } else {
      setRecoverError(response.body.message);
    }
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white">
      <div className="relative z-10 flex h-full w-full flex-col overflow-hidden px-8 xl:h-[calc(100vh-6rem)] xl:px-20">
        <Header />
        <Image
          src={"/static/login-bg.png"}
          className="absolute right-0 bottom-0 z-10 hidden h-full w-[49%] object-cover md:block"
          alt=""
          width={1000}
          height={2500}
        />
        <div className="z-20 mt-32 flex w-full flex-col gap-2 md:mt-40 md:w-[45%] xl:ml-[10%] xl:w-[40%] xl:gap-4">
          <h1 className="text-primary text-xl font-bold md:text-3xl">
            {currentStep === 1
              ? "Recuperar Senha"
              : currentStep === 2
                ? "Validação de Código"
                : "Redefinir Senha"}
          </h1>
          <h2 className="text-lg text-[#8392AB]">
            {currentStep === 1
              ? "Digite seu e-mail para enviarmos um código de recuperação"
              : currentStep === 2
                ? "Insira o código de recuperação enviado para seu e-mail"
                : "Digite uma nova senha para sua conta"}
          </h2>

          {/* Step 1: E-mail */}
          {currentStep === 1 && (
            <form
              onSubmit={handleSubmitRecover(HandleSendRecover)}
              className="flex flex-col gap-2"
            >
              <label className="text-sm font-semibold text-[#252F40]">
                Email
              </label>
              <input
                placeholder="Digite seu email"
                {...registerRecover("email")}
                className="outline-primary focus:border-primary h-8 rounded-md border border-zinc-400 p-2 text-sm text-black"
                type="email"
                disabled={isLogging}
              />
              <div className="h-4">
                {errorsRecover.email && (
                  <span className="text-red-500">
                    {errorsRecover.email.message}
                  </span>
                )}
              </div>
              <div className="h-4 text-sm" />
              <span className="mt-2 h-6 text-red-500">
                {recoverError ? recoverError : ""}
              </span>

              <button
                type="submit"
                disabled={isLogging}
                className="bg-primary mt-6 rounded-md border p-2 font-bold text-white"
              >
                {isLogging ? "Carregando..." : "Enviar Código"}
              </button>
            </form>
          )}

          {/* Step 2: Código de Recuperação */}
          {currentStep === 2 && (
            <form
              onSubmit={handleSubmitCode(HandleValidateCode)}
              className="flex flex-col gap-2"
            >
              <label className="text-sm font-semibold text-[#252F40]">
                Código de Recuperação
              </label>
              <input
                placeholder="Digite o código enviado para seu email"
                {...registerCode("code")}
                className="outline-primary focus:border-primary h-8 rounded-md border border-zinc-400 p-2 text-sm text-black"
                type="text"
                disabled={isLogging}
                onChange={(e) => setCode(e.target.value)}
              />
              <div className="h-4">
                {errorsCode.code && (
                  <span className="text-red-500">
                    {errorsCode.code.message}
                  </span>
                )}
              </div>
              <div className="h-4 text-sm">
                {timer !== 0 ? (
                  <div className="text-sm text-gray-600">
                    Código expira em {Math.floor(timer / 60)}:
                    {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                  </div>
                ) : (
                  <button
                    onClick={handleResendCode}
                    className="text-sm text-blue-500 hover:underline"
                    disabled={isLogging}
                  >
                    Reenviar código
                  </button>
                )}
              </div>
              <span className="mt-2 h-6 text-red-500">
                {recoverError ? recoverError : ""}
              </span>
              <button
                type="submit"
                disabled={isLogging}
                className="bg-primary mt-6 rounded-md border p-2 font-bold text-white"
              >
                {isLogging ? "Carregando..." : "Validar Código"}
              </button>
            </form>
          )}

          {/* Step 3: Redefinir Senha */}
          {currentStep === 3 && (
            <form
              onSubmit={handleSubmitEdit(HandleEditPassword)}
              className="flex flex-col gap-2"
            >
              <label className="text-md font-semibold text-[#252F40]">
                Nova Senha
              </label>
              <div className="outline-primary focus:border-primary flex flex-row items-center overflow-hidden rounded-md border border-zinc-400">
                <input
                  {...registerEdit("password")}
                  placeholder="Digite sua nova senha"
                  className="h-8 w-[90%] p-2 text-black outline-none"
                  type={isShowingPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setIsShowingPassword(!isShowingPassword)}
                  className="flex w-[10%] items-center justify-center"
                >
                  {isShowingPassword ? (
                    <EyeOff className="h-4 w-4 text-black" />
                  ) : (
                    <Eye className="h-4 w-4 text-black" />
                  )}
                </button>
              </div>
              {errorsEdit.password && (
                <span className="text-red-500">
                  {errorsEdit.password.message}
                </span>
              )}

              <label className="text-md font-semibold text-[#252F40]">
                Confirmar Nova Senha
              </label>
              <div className="outline-primary focus:border-primary flex flex-row items-center overflow-hidden rounded-md border border-zinc-400">
                <input
                  {...registerEdit("confirmPassword")}
                  placeholder="Confirme sua nova senha"
                  className="h-8 w-[90%] p-2 text-black outline-none"
                  type={isShowingConfirmPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsShowingConfirmPassword(!isShowingConfirmPassword)
                  }
                  className="flex w-[10%] items-center justify-center"
                >
                  {isShowingConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-black" />
                  ) : (
                    <Eye className="h-4 w-4 text-black" />
                  )}
                </button>
              </div>
              {errorsEdit.confirmPassword && (
                <span className="text-red-500">
                  {errorsEdit.confirmPassword.message}
                </span>
              )}
              {recoverError && (
                <span className="mt-2 text-red-500">{recoverError}</span>
              )}
              <button
                type="submit"
                disabled={isLogging}
                className="bg-primary mt-6 rounded-md border p-2 font-bold text-white"
              >
                {isLogging ? "Carregando..." : "Redefinir Senha"}
              </button>
            </form>
          )}
          <button
            onClick={() => router.push("/public/login")}
            className="bg-primary ml-1 cursor-pointer bg-clip-text text-sm font-bold text-transparent"
          >
            Voltar ao Login
          </button>
        </div>
      </div>
      <footer className="mt-auto flex h-24 w-full flex-col-reverse items-center justify-center pb-1 md:flex-col-reverse md:px-20 md:pb-0">
        <div className="md:text-md -mt-2 flex flex-row items-center gap-2 text-[10px] text-[#8392AB] md:mt-0 md:items-end md:text-sm">
          <span> Copyright © 2025 Software Criado por</span>
          <Image
            className="h-10 w-auto"
            alt=" "
            width={200}
            height={200}
            src={"/logo/logoEx.png"}
          />
        </div>
        <div className="invisible flex w-full flex-col justify-center gap-2 p-4 text-[12px] text-[#8392AB] md:flex-row md:gap-4 md:px-20 md:text-sm">
          <div className="flex w-full flex-row justify-between gap-2 text-xs text-[#8392AB] md:w-auto md:gap-4 md:text-sm">
            <a className="w-1/3 md:w-auto">Empresa</a>
            <a className="w-1/3 md:w-auto">Sobre nós</a>
            <a className="w-1/3 md:w-auto">Preços</a>
          </div>
          <div className="flex w-full flex-row justify-between gap-2 text-xs text-[#8392AB] md:w-auto md:gap-4 md:text-sm">
            <a className="w-1/3 md:w-auto">Produtos</a>
            <a className="w-1/3 md:w-auto">Blog</a>
            <a className="w-1/3 md:w-auto">Redes Sociais</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
