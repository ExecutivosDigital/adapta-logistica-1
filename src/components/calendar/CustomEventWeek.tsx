import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/chat/tooltip";
import { cn } from "@/utils/cn";
import { Layers } from "lucide-react";
import { EventType2 } from "./EventData";
interface Props {
  event: EventType2;
  label: string;
  localizer: {
    messages: {
      today: string;
    };
  };
  onNavigate: (action: string) => void;
  onView: (view: string) => void;
  view: string;
  views: string[];
  addNewEvent: () => void;
}

export function CustomEventWeek({ event, onView }: Props) {
  const viewHandler = (viewName: string) => {
    onView(viewName);
  };
  console.log("event3232323", event.status);
  return (
    <button
      onClick={() => viewHandler("week")}
      className={cn(
        "flex w-full flex-col justify-between rounded-r-sm text-start",
        // {
        //   "bg-green-500/20 text-green-800": event.status === "Baixado",
        //   "bg-red-500/20 text-red-800": event.status === "Rejeitado",
        // },
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex h-full flex-1 flex-col justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="flex h-4.5 w-4.5 items-center justify-center">
                  <Layers />
                </div>

                <span className="truncate text-sm font-bold">{event.name}</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <small className="text-xs">{event.value}</small>
                {event.installments && (
                  <small className="font-bold">{event.installments}</small>
                )}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="start"
            className="border-primary border bg-white p-3"
          >
            <div className="font-bold text-[#6C7386]">
              <span className="mr-1">Nome:</span>
              <span className="text-primary">{event.name}</span>
            </div>
            <div className="font-bold text-[#6C7386]">
              <span className="mr-1">Data:</span>
              <span className="text-primary">
                {event.start.toLocaleDateString()}
              </span>
            </div>
            <div className="font-bold text-[#6C7386]">
              <span className="mr-1">Movimento:</span>
              <span className="text-primary">{event.movementType}</span>
            </div>
            <div className="font-bold text-[#6C7386]">
              <span className="mr-1">Valor:</span>
              <span className="text-primary">{event.value}</span>
            </div>
            <div className="font-bold text-[#6C7386]">
              <span className="mr-1">Parcelas:</span>
              <span className="text-primary">{event.installments}</span>
            </div>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex h-full w-full flex-col items-center justify-center self-center">
        <div className="mt-1 mb-1 flex w-full rounded-md bg-white">
          <div
            className={cn(
              "w-full rounded-md text-center text-xs",
              event.status === "Pago"
                ? "border border-[#00A181] bg-[#00A181]/20 px-1 py-1 text-[#00A181]"
                : event.status === "Atrasado"
                  ? "border border-[#EF4444] bg-[#EF4444]/20 px-1 py-1 text-[#EF4444]"
                  : "border border-[#D4A300] bg-[#D4A300]/20 px-1 py-1 text-[#D4A300]",
            )}
          >
            {event.status}{" "}
          </div>{" "}
        </div>
      </div>
    </button>
  );
}
