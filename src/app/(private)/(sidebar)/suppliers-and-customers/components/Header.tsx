"use client";
import { Box, File, User2 } from "lucide-react";
import Image from "next/image";
import Backgrond from "/public/header.png";
interface HeaderProps {
  selectedToolType: number;
  setSelectedToolType: React.Dispatch<React.SetStateAction<number>>;
}
export function Header({ selectedToolType, setSelectedToolType }: HeaderProps) {
  return (
    <div className="relative flex h-60 w-full flex-col overflow-hidden rounded-t-sm">
      <Image
        src={Backgrond}
        alt="background"
        width={6000}
        height={6000}
        className="absolute h-full w-full object-cover"
      />
      <div className="z-[1] flex flex-1 flex-col items-center justify-center gap-4 text-white">
        <div className="flex flex-row items-center gap-4 text-white">
          <File />
          <h2 className="text-xl font-bold text-white uppercase">
            clientes e fornecedores
          </h2>
        </div>
        <p className="text-center text-lg">
          Por aqui você tem acesso aos detalhes de todos os clientes e
          fornecedores <br /> cadastrados em sua filial
        </p>
      </div>
      <div className="z-[1] -mb-2 flex h-20 w-full flex-row gap-8 overflow-x-scroll bg-white xl:items-center xl:justify-center xl:overflow-x-auto xl:rounded-t-full">
        <button
          onClick={() => setSelectedToolType(0)}
          className={`flex w-max flex-row items-center gap-2 py-2 xl:w-auto ${
            selectedToolType === 0
              ? "text-primary border-b-primary border-b-2 font-bold"
              : "text-text border-b-2 border-b-transparent"
          } cursor-pointer transition-all duration-300`}
        >
          <User2 />
          <span className="text-sm uppercase">CLIENTES</span>
        </button>
        <button
          onClick={() => setSelectedToolType(1)}
          className={`flex w-max flex-row items-center gap-2 py-2 xl:w-auto ${
            selectedToolType === 1
              ? "text-primary border-b-primary border-b-2 font-bold"
              : "text-text border-b-2 border-b-transparent"
          } cursor-pointer transition-all duration-300`}
        >
          <Box />
          <span className="text-sm uppercase">Fornecedores</span>
        </button>
        <button
          onClick={() => setSelectedToolType(2)}
          className={`flex w-max flex-row items-center gap-2 py-2 xl:w-auto ${
            selectedToolType === 2
              ? "text-primary border-b-primary border-b-2 font-bold"
              : "text-text border-b-2 border-b-transparent"
          } cursor-pointer transition-all duration-300`}
        >
          <User2 />
          <span className="text-sm uppercase">Motoristas</span>
        </button>
        <button
          onClick={() => setSelectedToolType(3)}
          className={`flex w-max flex-row items-center gap-2 py-2 xl:w-auto ${
            selectedToolType === 3
              ? "text-primary border-b-primary border-b-2 font-bold"
              : "text-text border-b-2 border-b-transparent"
          } cursor-pointer transition-all duration-300`}
        >
          <User2 />
          <span className="text-sm uppercase">Transportadores</span>
        </button>
      </div>
    </div>
  );
}
