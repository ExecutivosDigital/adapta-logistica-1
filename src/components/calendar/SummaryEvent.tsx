import { EventType2 } from "./EventData";

export function SummaryEvent(event: EventType2) {
  return (
    <div className={`sum-card`}>
      <span>{event.name}</span>
      {/* <span className="qtd">{event.count}</span> */}
    </div>
  );
}
