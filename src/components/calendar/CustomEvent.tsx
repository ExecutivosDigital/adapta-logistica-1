import { cn } from "@/utils/cn";
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

export function CustomEvent({ event, onView }: Props) {
  const viewHandler = (viewName: string) => {
    onView(viewName);
  };
  return (
    <button
      onClick={() => viewHandler("week")}
      className={cn(
        "flex flex-row justify-between rounded-r-sm",
        //   {
        //   "bg-green-300": event.status === "Aprovado aguardando comprovante",
        //   "bg-red-300": event.status === "Rejeitado",
        //   "bg-gray-300": event.status === "Baixado",
        //   "bg-blue-300": event.status === "Aprovação",
        // }
      )}
    >
      <div className="flex flex-1 flex-col">
        <span className="text-xs">{event.name}</span>
        <small className="text-xs">{event.value}</small>
      </div>
      {event.installments && (
        <div className="flex flex-col">
          <small className="evt-desc">{event.installments}</small>
        </div>
      )}
    </button>
  );
}
