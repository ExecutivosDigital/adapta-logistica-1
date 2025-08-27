"use client";
import { useApiContext } from "@/context/ApiContext";
import { useLoadingContext } from "@/context/LoadingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Header } from "../components/Header";

interface LoginDataProps {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email({ message: "Email Inválido" }),
  password: z.string().min(6, "Senha inválida"),
});

export default function Login() {
  const { handleNavigation } = useLoadingContext();
  const { PostAPI } = useApiContext();
  const [continueConnected, setContinueConnected] = useState(true);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataProps>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  async function HandleLogin(data: LoginDataProps) {
    setIsLogging(true);
    const login = await PostAPI(
      "/influencer/signin",
      {
        email: data.email,
        password: data.password,
      },
      false,
    );
    if (login.status === 200) {
      // cookies.set(Token, login.body.accessToken);
      setTimeout(() => {
        handleNavigation("/");
      }, 1000);
    } else {
      toast.error("Erro ao logar, tente novamente");
      setIsLogging(false);
      setLoginError(login.body.message);
    }
  }

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
        <div className="z-20 mt-32 flex w-full flex-col gap-2 md:mt-40 md:w-[45%] xl:ml-[10%] xl:w-[40%] xl:gap-4">
          <h1 className="text-primary text-xl font-bold md:text-3xl">
            Acessar Plataforma
          </h1>
          <h2 className="text-lg text-[#8392AB]">
            Digite seu e-mail e senha para <br /> acessar sua conta
          </h2>
          <form
            onSubmit={handleSubmit(HandleLogin)}
            className="flex flex-col gap-2"
          >
            <label className="text-sm font-semibold text-[#252F40]">
              Email
            </label>

            <input
              placeholder="Digite seu email"
              {...register("email")}
              className="outline-primary focus:border-primary h-8 rounded-md border border-zinc-400 p-2 text-sm text-black"
              type="email"
              disabled={isLogging}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            <label className="text-sm font-semibold text-[#252F40]">
              Senha
            </label>
            <div className="outline-primary focus:border-primary flex flex-row items-center overflow-hidden rounded-md border border-zinc-400 bg-white">
              <input
                {...register("password")}
                placeholder="Digite sua senha"
                className="h-8 w-[90%] p-2 text-black outline-none"
                type={isShowingPassword ? "text" : "password"}
                disabled={isLogging}
              />
              <button
                type="button"
                onClick={() => setIsShowingPassword(!isShowingPassword)}
                className="flex w-[10%] items-center justify-center bg-transparent"
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
            <button
              type="button"
              onClick={() => handleNavigation("/public/recover-password")}
              className="self-start text-[10px] text-black"
            >
              Esqueci minha senha
            </button>
            <div className="flex flex-row items-center gap-2">
              <button
                type="button"
                onClick={() => setContinueConnected(!continueConnected)}
                className={`flex h-4 w-8 ${
                  continueConnected ? "bg-green-500" : "bg-[#3A416F]"
                } relative rounded-full p-[1px]`}
              >
                <div
                  className={`absolute top-[1px] h-[90%] w-1/2 rounded-full bg-white transition-transform duration-300 ${
                    continueConnected ? "translate-x-0" : "translate-x-[90%]"
                  }`}
                />
              </button>
              <span className="text-sm text-black">Continuar conectado</span>
            </div>

            <button
              type="submit"
              disabled={isLogging}
              className="bg-primary mt-6 rounded-md border p-2 font-bold text-white"
            >
              {isLogging ? "Carregando..." : "Acessar Plataforma"}
            </button>
          </form>
          {loginError && (
            <span className="mt-2 text-red-500">Senha ou email incorretos</span>
          )}

          <span className="text-md mt-4 text-[#8392AB]">
            Não tem conta ainda?
            <button
              onClick={() => handleNavigation("/public/register")}
              className="bg-primary ml-1 cursor-pointer bg-clip-text font-bold text-transparent"
            >
              Se cadastre agora
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
    </main>
  );
}
