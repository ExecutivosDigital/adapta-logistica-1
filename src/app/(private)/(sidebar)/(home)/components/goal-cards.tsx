import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

export function HomeGoalCards() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2 font-bold text-white">
          <span>Fluxo de Caixa Projetado</span>
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

        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Á Receber</span>
            </div>
            <span>R$ 9.999.999,99</span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Á Pagar</span>
            </div>
            <span>R$ 9.999.999,99</span>
          </div>
        </div>
      </div>
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2 font-bold text-white">
          <span>Análise de Margem</span>
          <div className="flex items-center gap-2">
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
        </div>
        {/* <div className="flex flex-col gap-2 p-2">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-sm">Lorem</span>
              </div>
              <span>Lorem</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-sm">Lorem</span>
              </div>
              <span>Lorem</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-sm">Lorem</span>
              </div>
              <span>-</span>
            </div>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Lorem</span>
            </div>
            <span>Lorem</span>
          </div>
        </div> */}
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Margem Bruta</span>
            </div>
            <span>100%</span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Margem Líquida</span>
            </div>
            <span>100%</span>
          </div>
        </div>
      </div>
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2 font-bold text-white">
          <span> Obrigações Fiscais</span>
          <div className="flex items-center gap-2">
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
        </div>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Pago</span>
            </div>
            <span>R$ 9.999.999,99</span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">À Pagar</span>
            </div>
            <span>R$ 9.999.999,99</span>
          </div>
        </div>
      </div>
    </div>
  );
}
