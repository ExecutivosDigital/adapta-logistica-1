export interface SupplierProps {
  address: string;
  city: string;
  cnpj: string;
  code: number;
  companyId: string;
  complement: string;
  createdAt: string;
  emails: string[];
  fiscalGroupId: string;
  id: string;
  latitude: number;
  ledgerAccountId: string;
  longitude: number;
  mobilePhone: string;
  municipalRegistration: string;
  name: string;
  neighborhood: string;
  number: string;
  paymentAccount: string;
  paymentAccountOwner: string;
  paymentAccountOwnerDocument: string;
  paymentAgency: string;
  paymentBank: string;
  phone: string;
  postalCode: string;
  resultCenterId: string;
  state: string;
  stateRegistration: string;
  suframa: string;
  supplierGroupId: string;
  supplierTypeId: string;
  tributaryRegimeId: string;
}

export interface LedgerAccountsProps {
  code: string;
  companyId: string;
  entryType: {
    code: number;
    companyId: string;
    id: string;
    name: string;
  };
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
