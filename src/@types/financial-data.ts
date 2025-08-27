export interface SupplierProps {
  address: string;
  city: string;
  cnpj: string;
  code: number;
  companyId: string;
  complement: string | null;
  createdAt: string;
  email: string;
  id: string;
  municipalRegistration: string | null;
  name: string;
  neighborhood: string;
  number: string;
  phone: string;
  postalCode: string;
  state: string;
  stateRegistration: string | null;
}

export interface LedgerAccountsProps {
  code: number;
  companyId: string;
  id: string;
  name: string;
}

export interface ResultCenterProps {
  code: number;
  companyId: string;
  id: string;
  name: string;
  locked?: boolean;
}

export interface SupplierGroupProps {
  code: number;
  companyId: string;
  id: string;
  name: string;
}

export interface SupplierTypeProps {
  code: number;
  companyId: string;
  id: string;
  name: string;
}

export interface TributaryRegimeProps {
  code: string;
  id: string;
  name: string;
}

export interface FiscalGroupProps {
  code: number;
  companyId: string;
  id: string;
  name: string;
}
