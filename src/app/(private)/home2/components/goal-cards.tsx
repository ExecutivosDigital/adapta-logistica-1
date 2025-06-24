import { EllipsisVertical, Plus, Redo2 } from "lucide-react";
import moment from "moment";

export function Home2GoalCards() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
          <span className="font-semibold text-white">Meta da Filial</span>
          <div className="flex items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
            <EllipsisVertical />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <span>R$12,890.00</span>
          <div className="border-primary relative h-4 w-full rounded-full border bg-zinc-200">
            <div className="bg-primary absolute top-0 left-0 h-full w-1/2 rounded-full" />
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-xs text-zinc-400">Realizado</span>
                <div className="bg-primary h-3 w-3 rounded-full" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-zinc-400">Pendente</span>
                <div className="h-3 w-3 rounded-full bg-zinc-200" />
              </div>
            </div>
            <span className="text-xs text-zinc-400">R$21.421,00</span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-zinc-400">
                <Redo2 />
                <span className="text-sm">Lorem</span>
              </div>
              <span>{moment().format("DD/MM/YYYY")}</span>
            </div>
            <button className="border-primary text-primary cursor-pointer rounded-md border px-2 py-1 text-sm font-semibold">
              Plano de Contas
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
          <span className="font-semibold text-white">Lorem</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
              <Plus />
            </div>
            <div className="flex items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
              <EllipsisVertical />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2">
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
        </div>
      </div>
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
          <span className="font-semibold text-white">Lorem</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
              <Plus />
            </div>
            <div className="flex items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
              <EllipsisVertical />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-sm">Lorem</span>
              </div>
              <span>4 - R$920,00</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-sm">Lorem</span>
              </div>
              <span>2 - R$6.000,00</span>
            </div>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Lorem</span>
            </div>
            <span>Lorem - R$12.000,00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
