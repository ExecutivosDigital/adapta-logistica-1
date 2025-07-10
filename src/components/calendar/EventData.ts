const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

export interface EventType {
  title: string;
  name?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
}

const Events: EventType[] = [
  {
    title: "Evento 1",
    name: "Evento 1",
    start: new Date(y, m, 3),
    end: new Date(y, m, 5),
    color: "default",
  },
  {
    title: "Reunião 11",
    name: "Reunião 11",
    start: new Date(y, m, d + 3, 10, 30),
    end: new Date(y, m, d + 3, 11, 30),
    color: "green",
  },
  {
    title: "Evento 2",
    name: "Evento 2",
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    color: "red",
  },
  {
    title: "Reunião 2",
    name: "Reunião 2",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    color: "azure",
  },
  {
    title: "Evento 3",
    name: "Evento 3",
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    color: "azure",
  },
  {
    title: "Reunião 3",
    name: "Reunião 3",
    start: new Date(y, m, 23),
    end: new Date(y, m, 25),
    color: "warning",
  },
  {
    title: "Evento 4",
    name: "Evento 4",
    start: new Date(y, m, 19),
    end: new Date(y, m, 22),
    color: "default",
  },
];

export default Events;
