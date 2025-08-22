"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { cn } from "@/utils/cn";
import { NotepadText } from "lucide-react";
import { useState } from "react";

interface Home2ButtonGroupProps {
  selectedToolType: number;
  setSelectedToolType: React.Dispatch<React.SetStateAction<number>>;
}

export function Home2ButtonGroup({
  selectedToolType,
  setSelectedToolType,
}: Home2ButtonGroupProps) {
  const [buttons, setButtons] = useState([
    {
      id: "1",
      label: "Ver todos",
      icon: <NotepadText className="h-4 w-max" />,
      selected: true,
    },
    {
      id: "2",
      label: "Financeiro",
      icon: <NotepadText className="h-4 w-max" />,
      selected: false,
    },
    {
      id: "3",
      label: "Mecânica",
      icon: <NotepadText className="h-4 w-max" />,
      selected: false,
    },
  ]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {buttons.map((b) => (
          <OrangeButton
            unselected={!b.selected}
            onClick={() => {
              const newButtons = buttons.map((button) => {
                if (button.id === b.id) {
                  return {
                    ...button,
                    selected: true,
                  };
                } else {
                  return {
                    ...button,
                    selected: false,
                  };
                }
              });
              setButtons(newButtons);
            }}
            key={b.id}
            className={cn(
              "hover:bg-primary flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 transition duration-300 hover:font-semibold hover:text-white",
              b.selected
                ? "bg-primary border-primary text-white"
                : "text-zinc-600",
            )}
          >
            {b.icon}
            {b.label}
          </OrangeButton>
        ))}
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
          <span className="text-sm uppercase">Transportadores</span>
        </button>
      </div>
    </>
  );
}
