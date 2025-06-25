"use client";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/cn";
import { EllipsisVertical, Filter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function HomeCategoryList() {
  const [categoryPages] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const categories = [
    {
      id: "1",
      type: "red",
      icon: (
        <Image
          src="/icons/category-red.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Folha de Pagamento",
      value: 122890,
    },
    {
      id: "2",
      type: "red",
      icon: (
        <Image
          src="/icons/category-red.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Manutenção de Frota",
      value: 200,
    },
    {
      id: "3",
      type: "green",
      icon: (
        <Image
          src="/icons/category-green.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Frete Fracionado",
      value: 16000,
    },
    {
      id: "4",
      type: "green",
      icon: (
        <Image
          src="/icons/category-green.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Armazenagem",
      value: 9999271.32,
    },
    {
      id: "5",
      type: "green",
      icon: (
        <Image
          src="/icons/category-green.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Categoria 1",
      value: 0,
    },
    {
      id: "6",
      type: "red",
      icon: (
        <Image
          src="/icons/category-red.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Energia Elétrica",
      value: 200,
    },
    {
      id: "7",
      type: "red",
      icon: (
        <Image
          src="/icons/category-red.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Folha de Pagamento",
      value: 122890,
    },
    {
      id: "8",
      type: "red",
      icon: (
        <Image
          src="/icons/category-red.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Manutenção de Frota",
      value: 200,
    },
    {
      id: "9",
      type: "green",
      icon: (
        <Image
          src="/icons/category-green.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Frete Fracionado",
      value: 16000,
    },
    {
      id: "10",
      type: "green",
      icon: (
        <Image
          src="/icons/category-green.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Armazenagem",
      value: 9999271.32,
    },
    {
      id: "11",
      type: "green",
      icon: (
        <Image
          src="/icons/category-green.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Categoria 1",
      value: 0,
    },
    {
      id: "12",
      type: "red",
      icon: (
        <Image
          src="/icons/category-red.png"
          alt=""
          width={100}
          height={100}
          className="h-max w-4 object-contain"
        />
      ),
      label: "Energia Elétrica",
      value: 200,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
        <span className="text-sm font-semibold">Categorias</span>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 px-2 py-1 text-zinc-400 focus:outline-none">
                <Filter />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem Ipsum
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem Ipsum
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem Ipsum
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center rounded-md border border-zinc-200 p-1 text-zinc-400">
                <EllipsisVertical />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem Ipsum
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem Ipsum
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem Ipsum
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ScrollArea className="h-80 w-full p-2">
        {categories.map((cat) => (
          <div
            className="relative my-1 flex w-full items-center justify-between"
            key={cat.id}
          >
            <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-zinc-200" />
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full p-1",
                  cat.type === "green" ? "bg-[#00A181]/20" : "bg-[#EF4444]/20",
                )}
              >
                {cat.icon}
              </div>
              <span className="text-sm">{cat.label}</span>
            </div>
            <span
              className={cn(
                "text-sm font-semibold",
                cat.type === "green" ? "text-[#00A181]" : "text-[#EF4444]",
              )}
            >
              {cat.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        ))}
      </ScrollArea>
      <div className="w-full border-t border-t-zinc-200 p-2">
        <CustomPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={categoryPages}
        />
      </div>
    </div>
  );
}
