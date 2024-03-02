"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface DataContextValue {
  testData: string;
}

interface DataContextProviderProps {
  children: React.ReactNode;
}

export const GlobalDataContext = createContext<DataContextValue | null>(null);

export const useGlobalDataContext = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [testData, setTestData] = useState<string>("");
  useEffect(() => {
    setTestData("Hello ");
  }, []);

  const value = { testData };

  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  );
};
