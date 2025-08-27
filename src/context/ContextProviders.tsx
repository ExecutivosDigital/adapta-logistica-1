import { CookiesProvider } from "next-client-cookies/server";
import { ApiContextProvider } from "./ApiContext";
import { BranchProvider } from "./BranchContext";
import { FinancialDataContextProvider } from "./FinancialDataContext";
import { LoadingContextProvider } from "./LoadingContext";
import { PayableContextProvider } from "./PayableContext";
import { SampleContextProvider } from "./SampleContext";
import { ValueContextProvider } from "./ValueContext";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingContextProvider>
        <CookiesProvider>
          <ApiContextProvider>
            <SampleContextProvider>
              <BranchProvider>
                <ValueContextProvider>
                  <FinancialDataContextProvider>
                    <PayableContextProvider>{children}</PayableContextProvider>
                  </FinancialDataContextProvider>
                </ValueContextProvider>
              </BranchProvider>
            </SampleContextProvider>
          </ApiContextProvider>
        </CookiesProvider>
      </LoadingContextProvider>
    </>
  );
}
