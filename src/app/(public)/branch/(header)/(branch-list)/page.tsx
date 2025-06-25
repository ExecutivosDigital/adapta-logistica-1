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
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { NewBusinessButton } from "./components/NewBusinessButton";

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
    <>
      <div className="grid h-full w-full grid-cols-3 gap-8 p-4">
        <NewBusinessButton />

        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            onClick={() => router.push("/register/unit-details")}
            className="border-primary relative h-40 w-full cursor-pointer rounded-xl border-2 bg-white p-4 shadow-lg transition-all duration-300 hover:scale-[1.02]"
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
    </>
  );
}
