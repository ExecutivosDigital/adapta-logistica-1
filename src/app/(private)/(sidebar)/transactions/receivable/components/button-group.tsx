"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { cn } from "@/utils/cn";
import { ChevronRight, NotepadText } from "lucide-react";
import { useState } from "react";
import { NewReceivableModal } from "./new-receivable-modal";

export function ReceivableButtonGroup() {
  const [showNewReceivableModal, setShowNewReceivableModal] = useState(false);
  const [buttons, setButtons] = useState([
    {
      id: "1",
      label: "Filial",
      icon: <NotepadText className="h-4 w-max" />,
      selected: true,
    },
    {
      id: "2",
      label: "Financeiro",
      icon: <NotepadText className="h-4 w-max" />,
      selected: false,
    },
  ]);

  return (
    <>
      <div className="flex w-full items-center justify-between">
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
                  ? "bg-primary border-primary text-white"
                  : "text-zinc-600",
              )}
            >
              {b.icon}
              {b.label}
            </button>
          ))}
        </div>
        <OrangeButton
          onClick={() => setShowNewReceivableModal(true)}
          className="bg-primary hover:bg-primary-dark hover:border-primary-dark border-primary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-white shadow-sm transition duration-300"
        >
          <span className="text-sm"> Criar Lançamento</span>
          <ChevronRight />
        </OrangeButton>
      </div>
      {showNewReceivableModal && (
        <NewReceivableModal
          show={showNewReceivableModal}
          onHide={() => setShowNewReceivableModal(false)}
        />
      )}
    </>
  );
}
