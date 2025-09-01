"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiContext } from "@/context/ApiContext";
import { useLoadingContext } from "@/context/LoadingContext";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(4, "Senha deve ter ao menos 6 caracteres"),
});
type LoginForm = z.infer<typeof LoginSchema>;

export default function Login() {
  const { handleNavigation } = useLoadingContext();
  const cookies = useCookies();
  const { PostAPI } = useApiContext();
  const { register, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    shouldFocusError: true,
    defaultValues: { email: "", password: "" },
  });

  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password",
  );

  const togglePasswordType = () =>
    setPasswordType((p) => (p === "text" ? "password" : "text"));

  const onSubmit = handleSubmit(
    async ({ email, password }) => {
      const res = await PostAPI("/user/signin", { email, password }, false);
      if (res?.status === 200) {
        toast.success("Login realizado com sucesso!");
        cookies.set(
          process.env.NEXT_PUBLIC_USER_TOKEN as string,
          res.body.accessToken,
        );
        handleNavigation("/register/branches");
      } else {
        toast.error(
          res?.body?.message
            ? "Email ou Senha incorretos"
            : "Não foi possível realizar o login.",
        );
      }
    },
    (errors) => {
      const first = Object.values(errors)[0];
      const message = first?.message || "Preencha os campos corretamente.";
      toast.error(String(message));
    },
  );

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 md:p-0 lg:w-5/12">
        <div className="flex h-full w-full flex-col items-center gap-8 lg:h-full lg:w-11/12 lg:items-start lg:py-8">
          <Image
            src="/logo/logo.png"
            alt=""
            width={500}
            height={750}
            className="h-40 w-max object-contain"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-bold">
              Acessar Escritório Adapta
            </span>
            <span className="text-sm lg:text-xl">
              Gestão inteligente para uma logística moderna, tudo o que você
              precisa para rendimento{" "}
              <span className="text-primary">{""} #AdaptSe</span>
            </span>
          </div>
          <form
            onSubmit={onSubmit}
            className="flex w-full flex-col gap-8 lg:w-2/3"
          >
            <div className="relative">
              <Label htmlFor="email" className="border-default-900 text-lg">
                Email
              </Label>
              <Input
                removeWrapper
                id="email"
                placeholder=""
                className={cn(
                  "peer active:border-primary focus:border-primary border-zinc-200 text-base",
                )}
                {...register("email")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="border-default-900 text-lg">
                Senha
              </Label>
              <div className="relative">
                <Input
                  type={passwordType}
                  id="password"
                  className="peer active:border-primary focus:border-primary border-zinc-200 text-base"
                  {...register("password")}
                />
                <div
                  className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer opacity-50 ltr:right-4 rtl:left-4"
                  onClick={togglePasswordType}
                >
                  {passwordType === "password" ? (
                    <Eye className="text-default-400 h-5 w-5" />
                  ) : (
                    <EyeOff className="text-default-400 h-5 w-5" />
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex flex-1 items-center gap-1.5">
                  <Checkbox
                    size="sm"
                    className="border-primary data-[state=checked]:bg-primary mt-[1px] data-[state=checked]:text-white"
                    id="isRemembered"
                  />
                  <Label
                    htmlFor="isRemembered"
                    className="text-default-700 cursor-pointer text-base whitespace-nowrap"
                  >
                    Lembrar de mim
                  </Label>
                </div>
                {/* <Link
                  href="/recover-password"
                  className="text-primary hover:text-primary-dark flex-none text-sm font-bold transition duration-300"
                >
                  Esqueceu a senha?
                </Link> */}
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark h-12 w-full cursor-pointer rounded-lg font-semibold text-white transition duration-300"
            >
              Entrar Agora
            </button>
            {/* <span className="mx-auto text-center md:text-start">
              Novo aqui no Adapta?
              <span className="text-primary hover:text-primary-dark cursor-pointer font-semibold transition duration-300">
                {""} Conheça o Grupo Agora
              </span>
            </span> */}
          </form>
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
