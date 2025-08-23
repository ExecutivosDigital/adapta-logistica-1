export interface BranchProps {
  acronym: string;
  address: string;
  city: string;
  cnpj: string;
  code: number;
  companyId: string;
  complement: string | null;
  corporateName: string;
  createdAt: string;
  email: string;
  id: string;
  isHeadquarter: boolean;
  latitude: number;
  legalNatureId: string;
  longitude: number;
  mainEconomicActivityId: string;
  municipalRegistration: string | null;
  name: string;
  neighborhood: string;
  number: string;
  phone: string;
  postalCode: string;
  responsibleCpf: string;
  responsibleEmail: string;
  responsibleName: string;
  responsiblePhone: string;
  state: string;
  stateRegistration: string | null;
  tributaryRegimeId: string;
}

export interface BusinessUnitProps {
  acronym: string;
  address: string;
  city: string;
  code: number;
  companyId: string;
  complement: string | null;
  createdAt: string;
  id: string;
  name: string;
  neighborhood: string;
  number: string;
  postalCode: string;
  responsibleCpf: string;
  responsibleEmail: string;
  responsibleName: string;
  responsiblePhone: string;
  state: string;
  subsidiaryId: string;
}
