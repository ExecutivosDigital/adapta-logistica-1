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
  code: string;
  companyId: string;
  id: string;
  level: number;
  name: string;
  normalizedCode: string;
  parentLedgerAccountId: string;
  resultCenterId: string;
  type: string;
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

export interface ClientGroupProps {
  id: string;
  name: string;
}

export interface BankAccountProps {
  id: string;
  name: string;
}
