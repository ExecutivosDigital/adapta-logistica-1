import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Filter } from "lucide-react";

export function Home2GoalCards() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
          <span className="font-semibold text-white">Despesas Consolidado</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
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

        <div className="relative flex flex-col gap-2 p-2 px-4">
          <div className="absolute top-2 right-2 flex items-center gap-2 self-end rounded-lg border border-zinc-400 p-1 text-sm text-black">
            <Filter size={14} />
            <span className="text-sm">Período</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <div className="h-full w-1 bg-[#EF4444]" />
              <span className="text-2xl text-zinc-400">Despesas</span>
            </div>
            <span className="text-2xl font-semibold text-[#EF4444]">
              R$ <span className="">1.322.890,00</span>
            </span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <button className="text-primary self-center rounded-lg border border-zinc-400 p-2 font-semibold">
            Ver Transações Recebidas
          </button>
          <div />
        </div>
      </div>
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
          <span className="font-semibold text-white">Pagar este Mês</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
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

        <div className="relative flex flex-col gap-2 p-2 px-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <div className="h-full w-1 bg-[#EF4444]" />
              <span className="text-2xl text-zinc-400">Em Aberto</span>
            </div>
            <span className="text-2xl font-semibold text-[#EF4444]">
              R$ <span className="">1.322.890,00</span>
            </span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <button className="text-primary self-center rounded-lg border border-zinc-400 p-2 font-semibold">
            Ver Transações em Aberto
          </button>
          <div />
        </div>
      </div>
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
          <span className="font-semibold text-white">Atrasados</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
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

        <div className="relative flex flex-col gap-2 p-2 px-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <div className="h-full w-1 bg-[#EF4444]" />
              <span className="text-2xl text-zinc-400">Atrasados</span>
            </div>
            <span className="text-2xl font-semibold text-[#EF4444]">
              R$ <span className="">1.322.890,00</span>
            </span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <button className="text-primary self-center rounded-lg border border-zinc-400 p-2 font-semibold">
            Ver Transações Atrasadas
          </button>
          <div />
        </div>
      </div>
    </div>
  );
}
