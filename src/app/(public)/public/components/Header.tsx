import { Calendar, CircleUserRound, Copy, LayoutPanelLeft } from "lucide-react";
import Image from "next/image";
export function Header() {
  return (
    <header className="absolute top-4 z-20 flex h-16 w-[calc(100%-64px)] flex-row items-center justify-between gap-4 self-center rounded-full border-zinc-200 bg-white p-4 shadow-lg md:gap-16 xl:w-[73.75%]">
      <Image
        className="h-max w-24 object-contain lg:h-8 lg:w-max"
        alt=" "
        width={200}
        height={200}
        src={"/logo/logoFull.png"}
      />
      <div className="invisible hidden flex-row gap-16 xl:flex">
        <a className="flex flex-row items-center gap-1 text-[#8392AB]">
          <LayoutPanelLeft className="h-4 w-4 text-[#8C8C8C]" />
          <span>Funcionalidades</span>
        </a>
        <a className="flex flex-row items-center gap-1 text-[#8392AB]">
          <CircleUserRound className="h-4 w-4 text-[#8C8C8C]" />
          <span>FAQ</span>
        </a>
        <a className="flex flex-row items-center gap-1 text-[#8392AB]">
          <Copy className="h-4 w-4 text-[#8C8C8C]" />
          <span>Tutoriais</span>
        </a>
        <a className="flex flex-row items-center gap-1 text-[#8392AB]">
          <Calendar className="h-4 w-4 text-[#8C8C8C]" />
          <span>Planos</span>
        </a>
      </div>
      <button className="bg-primary flex h-9 scale-90 items-center justify-center rounded-full p-4 font-bold text-white transition-all duration-300 hover:scale-[1.05] md:scale-100">
        <span className="text-sm">NEWSLETTER</span>
      </button>
    </header>
  );
}
