import { EquipmentsProps } from "@/@types/equipments";
import {
  CheckCheck,
  Factory,
  Info,
  NotepadText,
  Package,
  Scale,
  Tag,
} from "lucide-react";

interface FormProps {
  selectedEquipment: EquipmentsProps;
}

export function Form({ selectedEquipment }: FormProps) {
  return (
    <div className="grid w-full grid-cols-12 items-center justify-center gap-4 p-4">
      <div className="col-span-12 grid grid-cols-2 gap-2 xl:col-span-7 xl:grid-cols-3 xl:gap-4">
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <Tag className="fill-primary h-4 text-white" />
            <span className="text-primary text-sm">Equipamento</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedEquipment.name}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <NotepadText className="fill-primary h-4 text-white" />
            <span className="text-primary text-sm">TAG</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedEquipment.tag}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <Info className="fill-primary h-4 text-white" />
            <span className="text-primary text-sm">Consumo</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedEquipment.consumption}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <Factory className="fill-primary h-4 text-white" />
            <span className="text-primary text-sm">Último Serviço</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedEquipment.last}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <Package className="fill-primary h-4 text-white" />
            <span className="text-primary text-sm">Data Programada</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedEquipment.programmed}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <Scale className="fill-primary text-primary h-4" />
            <span className="text-primary text-sm">Data Executada</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedEquipment.executed}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
      </div>
      <div className="col-span-12 h-40 xl:col-span-5 xl:h-full">
        <div className="flex h-full flex-col gap-2">
          <div className="flex items-center gap-1">
            <NotepadText className="fill-primary text-primary h-4" />
            <span className="text-primary text-sm">Descrição</span>
          </div>
          <label className="bg-primary relative flex h-full items-center justify-end rounded-2xl px-2 md:px-4">
            <textarea
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] resize-none p-2 text-xs text-white placeholder:text-white focus:outline-none md:p-4 md:text-sm"
              placeholder="Descrição do Equipamento"
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
      </div>
    </div>
  );
}
