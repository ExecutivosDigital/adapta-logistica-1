export interface CompanyProps {
  code: number;
  name: string;
  cnpj: string;
  tributaryRegimeId: string;
  stateRegistration: string | null;
  postalCode: string;
  address: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
}
