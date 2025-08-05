import { CookiesProvider } from "next-client-cookies/server";
import { ApiContextProvider } from "./ApiContext";
import { BranchProvider } from "./BranchContext";
import { SampleContextProvider } from "./SampleContext";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CookiesProvider>
        <ApiContextProvider>
          <SampleContextProvider>
            <BranchProvider>{children}</BranchProvider>
          </SampleContextProvider>
        </ApiContextProvider>
      </CookiesProvider>
    </>
  );
}
