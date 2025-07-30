"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import { NotepadText } from "lucide-react";
import { useState } from "react";

interface ButtonGroupProps {
  accessLevel: string;
  setAccessLevel: React.Dispatch<React.SetStateAction<string>>;
}

export function ButtonGroup({ accessLevel, setAccessLevel }: ButtonGroupProps) {
  const [buttons, setButtons] = useState([
    {
      id: "1",
      label: "Todos",
      icon: <NotepadText className="h-4 w-max" />,
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="rounded-md border border-zinc-200 px-4 py-2 font-semibold text-zinc-400">
            Acesso {accessLevel === "common" ? "Comum" : "Diretor"}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-zinc-200">
          <DropdownMenuItem
            onClick={() => setAccessLevel("common")}
            className={cn(
              "hover:bg-primary/20 cursor-pointer transition duration-300",
              accessLevel === "common" &&
                "bg-primary/20 text-primary font-semibold",
            )}
          >
            Comum
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setAccessLevel("admin")}
            className={cn(
              "hover:bg-primary/20 cursor-pointer transition duration-300",
              accessLevel === "admin" &&
                "bg-primary/20 text-primary font-semibold",
            )}
          >
            Diretor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
