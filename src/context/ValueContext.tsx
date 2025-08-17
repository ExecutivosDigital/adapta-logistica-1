"use client";

import { createContext, useContext, useState } from "react";

interface ValueContextProps {
  viewAllValues: boolean;
  setViewAllValues: React.Dispatch<React.SetStateAction<boolean>>;
}

const ValueContext = createContext<ValueContextProps | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const ValueContextProvider = ({ children }: ProviderProps) => {
  const [viewAllValues, setViewAllValues] = useState(false);

  return (
    <ValueContext.Provider
      value={{
        viewAllValues,
        setViewAllValues,
      }}
    >
      {children}
    </ValueContext.Provider>
  );
};

export function useValueContext() {
  const context = useContext(ValueContext);
  if (!context) {
    throw new Error(
      "useValueContext deve ser usado dentro de um ValueContextProvider",
    );
  }
  return context;
}
