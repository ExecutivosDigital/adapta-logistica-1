import { EventType2 } from "./EventData";

export function FullEvent(event: EventType2) {
  return (
    <div className="evt">
      <div className="evt-head">
        <span className="evt-title">{event.name}</span>
        {/* <span className="evt-side">{event.parcela}</span> */}
      </div>
      <small className="evt-desc">R$ {event.value}</small>
    </div>
  );
}
