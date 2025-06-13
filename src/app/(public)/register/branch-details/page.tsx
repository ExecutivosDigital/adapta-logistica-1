"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { faker } from "@faker-js/faker";
import { ArrowLeft, ChevronRight, ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BranchDetails() {
  const router = useRouter();
  const members = [
    {
      name: "Nick Jonas",
      value: "userid1",
      image: faker.image.avatarLegacy(),
    },
    {
      name: "Fahim",
      value: "userid2",
      image: faker.image.avatarLegacy(),
    },
    {
      name: "Nayeem",
      value: "userid3",
      image: faker.image.avatarLegacy(),
    },
    {
      name: "Iftekhar",
      value: "userid4",
      image: faker.image.avatarLegacy(),
    },
  ];

  return (
    <div className="bg-primary h-screen w-full p-8 pb-0">
      <div className="relative flex h-[calc(100vh-32px)] max-h-[calc(100vh-32px)] w-full flex-col rounded-t-2xl bg-white p-8">
        <button
          onClick={() => router.back()}
          className="text-primary absolute top-5 left-5 flex cursor-pointer items-center gap-2"
        >
          <ArrowLeft />
          <span>Voltar</span>
        </button>
        <Image
          src="/logo/icon.png"
          alt=""
          width={500}
          height={750}
          className="absolute top-5 right-5 h-40 w-max object-contain"
        />
        <div className="flex h-full w-full flex-col">
          <div className="mx-auto flex w-max flex-col items-center gap-4">
            <span className="text-2xl font-bold">
              Detalhes da Unidade de Negócio
            </span>
            <span className="w-2/3 text-center text-xl">
              Texto referente a explicar que aqui conseguimos acessas listadas,
              cadastrar e também acessar as Unidades de Negócios.
            </span>
          </div>
          <div className="mt-16 flex h-[calc(100%-150px)] w-full flex-col gap-4">
            <div className="flex items-center gap-8">
              <span className="text-xl font-semibold">Filiais de (cidade)</span>
              <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 p-1">
                <span className="font-semibold">43.795.283/0001-18</span>
                <ChevronsUpDown className="text-zinc-400" />
              </div>
            </div>
            <ScrollArea className="h-[calc(100%-150px)] w-full">
              <div className="grid h-full w-full grid-cols-3 gap-8">
                <div className="border-primary relative h-40 w-full overflow-hidden rounded-xl border-2 p-4">
                  <Image
                    src="/static/branch-details-bg.png"
                    alt=""
                    width={1000}
                    height={250}
                    className="absolute top-0 left-0 h-full w-full object-cover"
                  />
                  <div className="flex h-full w-full flex-col justify-between">
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-md bg-white">
                      <Plus className="text-primary" />
                    </div>
                    <span className="z-10 w-1/2 text-2xl font-bold text-white">
                      Cadastrar Nova Unidade de Negócios da Filial
                    </span>
                  </div>
                </div>
                {Array.from({ length: 11 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => router.push("/register/unit-details")}
                    className="border-primary relative h-40 w-full cursor-pointer rounded-xl border-2 bg-white p-4 shadow-lg"
                  >
                    <div className="flex h-full w-full flex-col justify-between">
                      <span className="text-2xl font-bold">
                        NOME DA UNID. DE NEGÓCIO
                      </span>

                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col">
                          <span>Membros</span>
                          <AvatarGroup
                            max={3}
                            total={members.length - 3}
                            countClass="w-10 h-10"
                          >
                            {members?.map((item, index) => (
                              <TooltipProvider
                                key={`task-assigned-members-${index}`}
                              >
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Avatar className="ring-primary ring-offset-primary h-10 w-10 ring-1 ring-offset-[1px]">
                                      <AvatarImage src={item.image} />
                                      <AvatarFallback>AB</AvatarFallback>
                                    </Avatar>
                                  </TooltipTrigger>
                                  <TooltipContent
                                    color="primary"
                                    side="bottom"
                                    className="px-2 py-[2px]"
                                  >
                                    <p className="text-xs font-medium text-white">
                                      {item.name}
                                    </p>
                                    <TooltipArrow className="fill-primary" />
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}

                            <Avatar className="ring-background ring-offset-background h-6 w-6 ring-1 ring-offset-[2px]">
                              <AvatarFallback className="font-normal">
                                +10
                              </AvatarFallback>
                            </Avatar>
                          </AvatarGroup>
                        </div>
                        <button className="border-primary bg-primary/20 text-primary flex items-center gap-2 rounded-xl border p-1">
                          <span>Acessar Unidade</span>
                          <ChevronRight />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="absolute bottom-5 left-5 flex flex-col">
          <span>Há alguma necessidade de conversar com o time Adapta?</span>
          <span className="text-primary cursor-pointer font-semibold underline">
            Clique aqui para conversar com o time
          </span>
        </div>
      </div>
    </div>
  );
}
