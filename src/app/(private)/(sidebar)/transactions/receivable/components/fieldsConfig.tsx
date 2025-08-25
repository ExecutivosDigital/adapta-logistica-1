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
  /* PRIORITÁRIOS -------------------------------------------------- */
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

  /* ENDEREÇO ------------------------------------------------------- */
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
  /* SEGMENTAÇÃO --------------------------------------------------- */
  {
    id: "tipogrupo",
    label: "Tipo de Grupo",
    type: "text",
    importance: 2,
    group: "Segmentação",
  },
  {
    id: "grupocliente",
    label: "Grupo do Cliente",
    type: "text",
    importance: 2,
    group: "Segmentação",
  },

  /* IDENTIFICAÇÃO -------------------------------------------------- */
  {
    id: "clientecodigo",
    label: "Código do Cliente",
    type: "text",
    importance: 2,
    group: "Identificação",
  },
  {
    id: "clientepagador",
    label: "Cliente Pagador",
    type: "text",
    importance: 2,
    group: "Identificação",
  },
  {
    id: "cnpjpagador",
    label: "CNPJ do Pagador",
    type: "text",
    importance: 2,
    group: "Identificação",
  },

  /* DOCUMENTOS FISCAIS -------------------------------------------- */
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

  /* CONTATO EXTRA -------------------------------------------------- */
  {
    id: "nrtelefone",
    label: "Telefone 2",
    type: "text",
    importance: 3,
    group: "Contato",
  },
  {
    id: "nrcelular",
    label: "Celular",
    type: "text",
    importance: 2,
    group: "Contato",
  },
  {
    id: "endemail",
    label: "E-mail 2",
    type: "text",
    importance: 3,
    group: "Contato",
  },

  /* CONFIGURAÇÕES -------------------------------------------------- */
  {
    id: "fgsubstituircli",
    label: "Substituir Cliente?",
    type: "switch",
    value: true,
    importance: 3,
    group: "Configurações",
  },
  {
    id: "fgsubstituirendere",
    label: "Substituir Endereço?",
    type: "switch",
    value: false,
    importance: 3,
    group: "Configurações",
  },
  {
    id: "fgsubstituirie",
    label: "Substituir IE?",
    type: "switch",
    value: false,
    importance: 3,
    group: "Configurações",
  },

  /* FINANCEIRO ----------------------------------------------------- */
  {
    id: "creditlimit",
    label: "Limite de Crédito (%)",
    type: "percent",
    importance: 2,
    group: "Financeiro",
  },

  /* AVANÇADO ------------------------------------------------------- */
  {
    id: "fginformatomador",
    label: "FGINFORMATOMADOR",
    type: "text",
    importance: 3,
    group: "Avançado",
  },
];
