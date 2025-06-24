"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { ChevronRight, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BranchDetails() {
  const router = useRouter();

  const [value, setValue] = useState("");
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex-ro flex w-full items-center justify-between">
        <div className="border-primary text-primary flex flex-row items-center gap-2 rounded-lg border p-1">
          <Search />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            className="bg-transparent outline-none focus:outline-none"
          />
        </div>
        <OrangeButton iconPosition="right" icon={<Plus />} className="gap-8">
          Atrela
        </OrangeButton>
      </div>
      <div className="grid h-full w-full grid-cols-5 gap-x-12 gap-y-6 p-4">
        <div className="border-primary relative h-40 w-full overflow-hidden rounded-xl border-2 p-4 shadow-lg transition-all duration-300 hover:scale-[1.05]">
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
            <span className="z-10 w-2/3 text-lg font-bold text-white">
              Novo Centro de Resultados
            </span>
          </div>
        </div>
        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            onClick={() => router.push("/register/center-detail")}
            className="border-primary relative h-40 w-full cursor-pointer rounded-xl border-2 bg-white p-4 shadow-lg transition-all duration-300 hover:scale-[1.05]"
          >
            <div className="flex h-full w-full flex-col justify-between">
              <span className="text-lg font-bold">
                Nome centro de resultados
              </span>

              <div className="flex w-full items-center justify-between">
                <div className="border-primary bg-primary/20 text-primary flex cursor-pointer items-center gap-2 rounded-xl border p-1">
                  <span>Acessar Unidade</span>
                  <ChevronRight />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
