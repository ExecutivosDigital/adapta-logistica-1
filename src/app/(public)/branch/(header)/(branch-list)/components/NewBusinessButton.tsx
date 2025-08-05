import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function NewBusinessButton() {
  // const { openCreateBusinessUnitModal } = useCreateBusinessUnit();
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/branch/create-business-unit ")}
      className="border-primary relative h-full w-full cursor-pointer gap-1 overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 hover:scale-[1.02]"
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
        <span className="z-10 w-2/3 text-start text-2xl font-bold text-white">
          Cadastrar Nova Unidade de Negócios da Filial
        </span>
      </div>
    </button>
  );
}
