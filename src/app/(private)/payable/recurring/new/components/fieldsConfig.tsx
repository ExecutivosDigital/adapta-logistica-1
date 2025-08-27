type FieldType = "text" | "number" | "date" | "select" | "switch" | "percent";

export interface Option {
  value: string;
  label: string;
}
export interface FieldConfig {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  importance: 1 | 2 | 3;
  group: string;
  options?: Option[];
  value?: boolean | number | string;
}

export const fieldsConfig: FieldConfig[] = [
  {
    id: "cnpj",
    label: "CNPJ",
    type: "text",
    required: true,
    importance: 1,
    group: "Dados Básicos",
  },
  {
    id: "name",
    label: "Nome",
    type: "text",
    required: true,
    importance: 1,
    group: "Dados Básicos",
  },
  {
    id: "email",
    label: "E-mail",
    type: "text",
    importance: 1,
    group: "Contato",
  },
  {
    id: "phone",
    label: "Telefone",
    type: "text",
    importance: 1,
    group: "Contato",
  },

  {
    id: "endereco",
    label: "Endereço",
    type: "text",
    importance: 2,
    group: "Endereço",
  },
  {
    id: "nrendereco",
    label: "Número",
    type: "text",
    importance: 2,
    group: "Endereço",
  },
  {
    id: "complend",
    label: "Complemento",
    type: "text",
    importance: 3,
    group: "Endereço",
  },
  {
    id: "bairro",
    label: "Bairro",
    type: "text",
    importance: 2,
    group: "Endereço",
  },
  {
    id: "nmcidade",
    label: "Cidade",
    type: "text",
    importance: 2,
    group: "Endereço",
  },
  {
    id: "estado",
    label: "Estado",
    type: "text",
    importance: 2,
    group: "Endereço",
  },

  {
    id: "rginscest",
    label: "Inscrição Estadual",
    type: "text",
    importance: 3,
    group: "Documentos Fiscais",
  },
  {
    id: "inscrmun",
    label: "Inscrição Municipal",
    type: "text",
    importance: 3,
    group: "Documentos Fiscais",
  },
];
