export interface SubsidiaryProps {
  code: number;
  name: string;
  cnpj: string;
  acronym: string;
  isHeadquarter: boolean;
  corporateName: string;
  stateRegistration: string | null;
  municipalRegistration: string | null;
  postalCode: string;
  address: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  responsibleName: string;
  responsibleEmail: string;
  responsiblePhone: string;
  responsibleCpf: string;
  legalNatureId: string;
  tributaryRegimeId: string;
  companyId: string;
  mainEconomicActivityId: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
}
