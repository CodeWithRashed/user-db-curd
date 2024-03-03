"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { tableItem } from "../interfaces/interfaces";
import axios from "axios";
import toast from "react-hot-toast";

interface DataContextValue {
  testData: string;
  data: tableItem[];
  isLoading: boolean;
  setData: Dispatch<SetStateAction<tableItem[]>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedEmployee: Dispatch<SetStateAction<tableItem>>;
  selectedEmployee: tableItem;
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
  const [selectedEmployee, setSelectedEmployee] = useState<tableItem>();

  const fetchData = async () => {
    axios
    .get("/api/employee/get")
    .then((response) => {
      if (response.status === 200) {
        console.log("response.data",response?.data?.employees)
        setData(response?.data?.employees);
      } else {
        toast.error("Error Getting Users");
      }
    })
    .catch((error) => {
      toast.error("Error Getting Users");
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  //GETTING DATA FROM DATABASE
  React.useEffect(() => {
    fetchData();
  }, []);

  const value = {
    testData,
    data,
    isLoading,
    setData,
    isModalOpen,
    setIsModalOpen,
    selectedEmployee,
    setSelectedEmployee,
  };

  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  );
};
