"use client";

import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { tableItem } from "../interfaces/interfaces";

interface DataContextValue {
  testData: string;
  data: tableItem[];
  isLoading: boolean;
  setData: Dispatch<SetStateAction<tableItem[]>>;
  isModalOpen: boolean,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  setSelectedEmployee: Dispatch<SetStateAction<tableItem>>
  selectedEmployee: tableItem
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = useState<tableItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<tableItem>()

  const fetchData = async () => {
    const originData: tableItem[] = [];
    for (let i = 0; i < 5; i++) {
      originData.push({
        key: i.toString(),
        name: `Rashed${i}`,
        email: `rashed@gmail${i}.com`,
        phone: `${i}123456789`,
        isBlocked: false,
      });
    }

    setData(originData);
    setIsLoading(false);
    // try {
    //     const response = await axios.get('your-api-endpoint');
    //     setData(response.data);
    // } catch (error) {
    //     console.error('Error fetching data:', error);
    // }
  };

  //GETTING DATA FROM DATABASE
  React.useEffect(() => {
    fetchData();
  }, []);


  const value = { testData, data, isLoading, setData, isModalOpen, setIsModalOpen, selectedEmployee, setSelectedEmployee};

  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  );
};
