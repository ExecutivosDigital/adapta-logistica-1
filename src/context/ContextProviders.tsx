import { CookiesProvider } from "next-client-cookies/server";
import { ApiContextProvider } from "./ApiContext";
import { BranchProvider } from "./BranchContext";
import { FinancialDataContextProvider } from "./FinancialDataContext";
import { SampleContextProvider } from "./SampleContext";
import { ValueContextProvider } from "./ValueContext";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CookiesProvider>
        <ApiContextProvider>
          <SampleContextProvider>
            <BranchProvider>
              <ValueContextProvider>
                <FinancialDataContextProvider>
                  {children}
                </FinancialDataContextProvider>
              </ValueContextProvider>
            </BranchProvider>
          </SampleContextProvider>
        </ApiContextProvider>
      </CookiesProvider>
    </>
  );
}
