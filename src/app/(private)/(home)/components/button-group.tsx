"use client";
import { cn } from "@/utils/cn";
import { Building2, NotepadText } from "lucide-react";
import { useState } from "react";

export function HomeButtonGroup() {
  const [buttons, setButtons] = useState([
    {
      id: "1",
      label: "Filial",
      icon: <Building2 className="h-4 w-max" />,
      selected: true,
    },
    {
      id: "2",
      label: "Mecânica",
      icon: <NotepadText className="h-4 w-max" />,
      selected: false,
    },
    {
      id: "3",
      label: "Financeiro",
      icon: <NotepadText className="h-4 w-max" />,
      selected: false,
    },
    {
      id: "4",
      label: "Monitoramento",
      icon: <NotepadText className="h-4 w-max" />,
      selected: false,
    },
    {
      id: "5",
      label: "Frota",
      icon: <NotepadText className="h-4 w-max" />,
      selected: false,
    },
    {
      id: "6",
      label: "Armazém",
      icon: <NotepadText className="h-4 w-max" />,
      selected: false,
    },
    {
      id: "7",
      label: "Marketing",
      icon: <NotepadText className="h-4 w-max" />,
      selected: false,
    },
    {
      id: "8",
      label: "Lorem",
      icon: <NotepadText className="h-4 w-max" />,
      selected: false,
    },
  ]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {buttons.map((b) => (
        <button
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
              ? "bg-primary border-primary font-semibold text-white"
              : "text-zinc-600",
          )}
        >
          {b.icon}
          {b.label}
        </button>
      ))}
    </div>
  );
}
