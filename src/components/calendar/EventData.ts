const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

export interface EventType {
  id?: string;
  name: string;
  color?: string;
  start?: Date;
  end?: Date;
  description?: string;
  socialMedia?: string;
}

const Events: EventType[] = [
  {
    name: "Twice event For two Days",
    start: new Date(y, m, 3),
    end: new Date(y, m, 5),
    description: "Descrição",
    color: "default",
    socialMedia: "Instagram",
  },
  {
    name: "Learn ReactJs",
    start: new Date(y, m, d + 3, 10, 30),
    end: new Date(y, m, d + 3, 11, 30),
    description: "Descrição",
    color: "green",
    socialMedia: "YouTube",
  },
  {
    name: "Launching MaterialArt Angular",
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    description: "Descrição",
    color: "red",
    socialMedia: "TikTok",
  },
  {
    name: "Lunch with Mr.Raw",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    description: "Descrição",
    color: "azure",
    socialMedia: "Facebook",
  },
  {
    name: "Going For Party of Sahs",
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    description: "Descrição",
    color: "azure",
    socialMedia: "Instagram",
  },
  {
    name: "Learn Ionic",
    start: new Date(y, m, 23),
    end: new Date(y, m, 25),
    description: "Descrição",
    color: "warning",
    socialMedia: "YouTube",
  },
  {
    name: "Research of making own Browser",
    start: new Date(y, m, 19),
    end: new Date(y, m, 22),
    description: "Descrição",
    color: "default",
    socialMedia: "TikTok",
  },
];

export default Events;
