"use client";
import { useLoadingContext } from "@/context/LoadingContext";
import { maskCpfCnpj, maskPhone } from "@/lib/masks";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Header } from "../components/Header";
import { PrivacyModal } from "./components/PrivacyModal";
import { TermsModal } from "./components/TermsModal";
// Validação com Zod
const schema = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    name: z.string().min(1, "Nome é obrigatório"),
    mobilePhone: z.string().min(14, "Telefone inválido"),
    cpfCnpj: z.string().min(14, "CPF/CNPJ inválido"),
    profession: z.string().min(1, "Profissão é obrigatória"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem corresponder",
    path: ["confirmPassword"],
  });

interface RegisterFormData {
  email: string;
  name: string;
  mobilePhone: string;
  profession: string;
  cpfCnpj: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const { handleNavigation } = useLoadingContext();
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] =
    useState(false);
  const [isRegistering] = useState(false);
  const [registerError] = useState("");
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [checkedPrivacy, setCheckedPrivacy] = useState(false);
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);

  const {
    register,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  // async function handleRegister(data: RegisterFormData) {
  //   setIsRegistering(true);
  //   const response = await PostAPI("/influencer/signup", {
  //     email: data.email,
  //     name: data.name,
  //     avatar:
  //       "https://static.vecteezy.com/ti/fotos-gratis/p1/26408485-homesm-estilo-de-vida-retrato-hipster-serio-camiseta-isolado-pessoa-branco-fundo-americano-sorrir-confiante-moda-foto.jpg",
  //     mobilePhone: data.mobilePhone,
  //     cpfCnpj: data.cpfCnpj,
  //     password: data.password,
  //     // description: profession,
  //   }, false);
  //   if (response.status === 200) {
  //     cookies.set(Token, response.body.accessToken);
  //     handleNavigation("/checkout");
  //   } else {
  //     toast.error("Erro ao registrar, tente novamente");
  //     if (response.body.message === "Resource already exists") {
  //       toast.error("Cpf, email ou telefone ja cadastrados");
  //       setRegisterError("Cpf, email ou telefone ja cadastrados");
  //     } else {
  //       setRegisterError(response.body.message!);
  //     }
  //     setIsRegistering(false);
  //   }
  // }

  interface PhoneChangeEvent {
    target: {
      value: string;
    };
  }

  const handlePhoneChange = (event: PhoneChangeEvent): void => {
    const maskedValue: string = maskPhone(event.target.value);
    setValue("mobilePhone", maskedValue); // Atualiza o valor do campo com a máscara
  };

  const handleCpfCnpjChange = (event: PhoneChangeEvent): void => {
    const maskedValue: string = maskCpfCnpj(event.target.value);
    setValue("cpfCnpj", maskedValue); // Atualiza o valor do campo com a máscara
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

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
        <div className="z-20 mt-32 flex w-full flex-col gap-2 md:mt-32 md:w-[45%] xl:ml-[10%] xl:w-[40%] 2xl:gap-4">
          <h1 className="text-primary text-2xl font-bold md:text-3xl">
            Cadastrar-se
          </h1>
          <h2 className="text-lg text-[#8392AB] md:text-lg">
            Preencha os dados abaixo para criar sua conta
          </h2>
          <form
            // onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#252F40] 2xl:text-sm">
                Nome
              </label>
              <input
                {...register("name")}
                placeholder="Digite seu nome"
                className="outline-primary focus:border-primary h-8 rounded-md border border-zinc-400 p-2 text-xs text-black 2xl:h-8 2xl:text-sm"
                type="text"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#252F40] 2xl:text-sm">
                CPF/CNPJ
              </label>
              <input
                {...register("cpfCnpj")}
                onChange={handleCpfCnpjChange}
                placeholder="Digite seu CPF ou CNPJ"
                className="outline-primary focus:border-primary h-8 rounded-md border border-zinc-400 p-2 text-xs text-black 2xl:h-8 2xl:text-sm"
                type="text"
              />
              {errors.cpfCnpj && (
                <span className="text-red-500">{errors.cpfCnpj.message}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#252F40] 2xl:text-sm">
                Telefone
              </label>
              <input
                {...register("mobilePhone")}
                onChange={handlePhoneChange}
                placeholder="Digite seu telefone"
                className="outline-primary focus:border-primary h-8 rounded-md border border-zinc-400 p-2 text-xs text-black 2xl:h-8 2xl:text-sm"
                type="text"
              />
              {errors.mobilePhone && (
                <span className="text-red-500">
                  {errors.mobilePhone.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#252F40] 2xl:text-sm">
                Email
              </label>
              <input
                {...register("email")}
                placeholder="Digite seu melhor email"
                className="outline-primary focus:border-primary h-8 rounded-md border border-zinc-400 p-2 text-xs text-black 2xl:h-8 2xl:text-sm"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#252F40] 2xl:text-sm">
                Senha
              </label>
              <div className="outline-primary focus:border-primary flex flex-row items-center overflow-hidden rounded-md border border-zinc-400 bg-white">
                <input
                  {...register("password")}
                  placeholder="Digite sua senha"
                  className="h-8 w-[90%] bg-white p-2 text-xs text-black outline-none 2xl:h-8 2xl:text-sm"
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
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#252F40] 2xl:text-sm">
                Confirmar Senha
              </label>
              <div className="outline-primary focus:border-primary flex flex-row items-center overflow-hidden rounded-md border border-zinc-400 bg-white">
                <input
                  {...register("confirmPassword")}
                  placeholder="Confirme sua senha"
                  className="h-8 w-[90%] bg-white p-2 text-xs text-black outline-none 2xl:h-8 2xl:text-sm"
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
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="mt-2 mb-0 flex flex-col gap-2">
              {/* <button
                type="button"
                onClick={() => setContinueConnected(!continueConnected)}
                className="flex h-4 w-8 bg-[#3A416F] relative rounded-full p-[1px]"
              >
                <div
                  className={`h-[90%] w-1/2 rounded-full absolute top-[1px] bg-white transition-transform duration-300 ${
                    continueConnected ? "translate-x-0" : "translate-x-[90%]"
                  }`}
                />
              </button> */}
              <div className="flex w-full items-center gap-2">
                <div
                  onClick={() => setCheckedTerms(!checkedTerms)}
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded border p-1",
                    checkedTerms && "bg-primary",
                  )}
                >
                  {checkedTerms && <Check className="h-4 w-4 text-white" />}
                </div>
                <span
                  onClick={() => setCheckedTerms(!checkedTerms)}
                  className="cursor-pointer text-sm text-black"
                >
                  Li e concordo com os {""}
                  <a
                    className="hover:underline"
                    // onClick={() => setOpenTermsModal(true)}
                  >
                    Termos de Uso
                  </a>
                </span>
              </div>
              <div className="flex w-full items-center gap-2">
                <div
                  onClick={() => setCheckedPrivacy(!checkedPrivacy)}
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded border p-1",
                    checkedPrivacy && "bg-primary",
                  )}
                >
                  {checkedPrivacy && <Check className="h-4 w-4 text-white" />}
                </div>
                <span
                  onClick={() => setCheckedPrivacy(!checkedPrivacy)}
                  className="cursor-pointer text-sm text-black"
                >
                  Li e concordo com os {""}
                  <a
                    className="hover:underline"
                    // onClick={() => setOpenPrivacyModal(true)}
                  >
                    Política de Privacidade
                  </a>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="bg-primary rounded-md border p-2 font-bold text-white"
              disabled={isRegistering}
              onClick={() => handleNavigation("/public/checkout")}
            >
              {isRegistering ? "Carregando..." : "Cadastrar"}
            </button>
            {registerError && (
              <span className="mt-2 text-red-500">{registerError}</span>
            )}
          </form>
          <span className="text-md text-[#8392AB]">
            Já possui uma conta?
            <button
              onClick={() => handleNavigation("/public/login")}
              className="bg-primary ml-1 cursor-pointer bg-clip-text font-bold text-transparent"
            >
              Entrar Agora
            </button>
          </span>
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
      {openTermsModal && <TermsModal setOpenTermsModal={setOpenTermsModal} />}
      {openPrivacyModal && (
        <PrivacyModal setOpenPrivacyModal={setOpenPrivacyModal} />
      )}
    </main>
  );
}
