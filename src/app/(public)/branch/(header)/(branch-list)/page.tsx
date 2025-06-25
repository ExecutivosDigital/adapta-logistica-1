"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { faker } from "@faker-js/faker";
import { ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NewBusinessButton } from "./components/NewBusinessButton";

export default function BranchDetails() {
  const router = useRouter();
  const members = [
    {
      name: "Alex",
      value: "userid1",
      image: faker.image.avatarLegacy(),
    },
    {
      name: "João",
      value: "userid2",
      image: faker.image.avatarLegacy(),
    },
    {
      name: "Paulo",
      value: "userid3",
      image: faker.image.avatarLegacy(),
    },
    {
      name: "Gabriel",
      value: "userid4",
      image: faker.image.avatarLegacy(),
    },
  ];

  return (
    <div className="grid h-full w-full grid-cols-3 gap-8">
      <NewBusinessButton />
      <div className="border-primary relative h-40 w-full cursor-pointer overflow-hidden rounded-xl border-2 p-4">
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
          className="border-primary relative h-40 w-full cursor-pointer rounded-xl border-2 bg-white p-4 shadow-lg transition duration-300 hover:scale-[1.005]"
        >
          <div className="flex h-full w-full flex-col justify-between">
            <span className="text-2xl font-bold">NOME DA UNID. DE NEGÓCIO</span>

            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <span>Membros</span>
                <AvatarGroup
                  max={3}
                  total={members.length - 3}
                  countClass="w-10 h-10"
                >
                  {members?.map((item, index) => (
                    <TooltipProvider key={`task-assigned-members-${index}`}>
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
                    <AvatarFallback className="font-normal">+10</AvatarFallback>
                  </Avatar>
                </AvatarGroup>
              </div>
              <button className="border-primary bg-primary/20 text-primary hover:bg-primary flex cursor-pointer items-center gap-2 rounded-xl border px-2 py-1 transition duration-300 hover:text-white">
                <span>Acessar Unidade</span>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
