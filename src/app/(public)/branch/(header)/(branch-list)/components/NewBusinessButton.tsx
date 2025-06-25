import { useCreateBusinessUnit } from "@/context/CreateBusinessUnitContext";
import { Plus } from "lucide-react";
import Image from "next/image";

export function NewBusinessButton() {
  const { openCreateBusinessUnitModal } = useCreateBusinessUnit();
  return (
    <button
      onClick={() => openCreateBusinessUnitModal()}
      className="border-primary relative h-40 w-full cursor-pointer overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 hover:scale-[1.02]"
    >
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
    </button>
  );
}
