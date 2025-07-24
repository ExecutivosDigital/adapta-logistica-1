import { Prompt } from "@/components/chatPopup/types";

export const generalPrompt = {
  id: "general",
  name: "Geral",
  prompt: "Seu nome é Larissa",
};

export const screenPrompts: Prompt[] = [
  {
    id: "general",
    name: "Geral",
    prompt: "Seu nome é Marina",
    screen: "/bank-accounts",
  },
];
