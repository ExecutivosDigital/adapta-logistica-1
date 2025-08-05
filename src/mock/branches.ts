export type Branch = {
  id: string;
  name: string;
  CNPJ: string;
  place: string;
  parentCompany: boolean;
};
export const branches = [
  {
    id: "1",
    name: "Integra Brasil Transportes Ltda (cwb)",
    CNPJ: "09.395.767/0001-31",
    place: "Curitiba - PR",
    parentCompany: true,
  },
  {
    id: "2",
    name: "Integra Brasil Transportes Ltda (bsb)",
    CNPJ: "09.395.767/0002-12",
    place: "Brasilia - DF",
    parentCompany: false,
  },
  {
    id: "3",
    name: "Integra Brasil Transportes Ltda (spo)",
    CNPJ: "09.395.767/0003-01",
    place: "Itapevi - SP",
    parentCompany: false,
  },
  {
    id: "4",
    name: "Integra Brasil Transportes Ltda (rcf)",
    CNPJ: "09.395.767/0004-84",
    place: "Jaboatao dos Guararapes - PE",
    parentCompany: false,
  },
  {
    id: "5",
    name: "Integra Brasil Transportes Ltda (ctg)",
    CNPJ: "09.395.767/0005-65",
    place: "Contagem - MG",
    parentCompany: false,
  },
  {
    id: "6",
    name: "Integra Brasil Transportes Ltda (for)",
    CNPJ: "09.395.767/0006-46",
    place: "Fortaleza - CE",
    parentCompany: false,
  },
  {
    id: "7",
    name: "Integra Brasil Transportes Ltda (poa)",
    CNPJ: "09.395.767/0007-27",
    place: "Canoas - RS",
    parentCompany: false,
  },
  {
    id: "8",
    name: "Integra Brasil Transportes Ltda (cpl)",
    CNPJ: "09.395.767/0008-08",
    place: "Campo Largo - PR",
    parentCompany: false,
  },
  {
    id: "9",
    name: "Integra Brasil Transportes Ltda (gyn)",
    CNPJ: "09.395.767/0009-99",
    place: "Goiania - GO",
    parentCompany: false,
  },
  {
    id: "10",
    name: "Integra Brasil Transportes Ltda (bel)",
    CNPJ: "09.395.767/0010-22",
    place: "Belem - PA",
    parentCompany: false,
  },
];
