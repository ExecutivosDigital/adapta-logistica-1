import { Loader2 } from "lucide-react";
import Image from "next/image";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
      <div className="m-auto flex flex-col items-center justify-center rounded-lg bg-white p-10 shadow-lg">
        <Image
          src="/logo/logo.png"
          alt=""
          width={500}
          height={500}
          className="h-20 w-20 object-contain"
        />

        <div className="flex items-center gap-2 text-gray-700">
          <Loader2 className="animate-spin" />
          <span>Carregando...</span>
        </div>
      </div>
    </div>
  );
}
