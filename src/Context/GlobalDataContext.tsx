"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
export const dynamic = "force-dynamic";
export const fetchCache = 'force-no-store'
import axios from "axios";
import toast from "react-hot-toast";
import { tableItem } from "../interfaces/interfaces";
import EmployeeTable from "../components/EmployeesTable";
import AddEmployee from "../components/AddEmployee";

const headers = {
  'Cache-Control': 'no-store'
};

interface DataContextValue {
  testData: string;
  data: tableItem[];
  isLoading: boolean;
  setData: React.Dispatch<React.SetStateAction<tableItem[]>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEmployee: tableItem | undefined;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<tableItem | undefined>>;
  displayContent: React.ReactNode;
  setDisplayContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  handleMenuChange: (key: string) => void;
  selectedKey: string;
  setSelectedKey: React.Dispatch<React.SetStateAction<string>>;
}

interface DataContextProviderProps {
  children: React.ReactNode;
}

const GlobalDataContext = createContext<DataContextValue | null>(null);

export const useGlobalDataContext = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [testData, setTestData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<tableItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<tableItem>();
  const [displayContent, setDisplayContent] = useState<React.ReactNode>(<EmployeeTable />);
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuChange = (key: string) => {
    switch (key) {
      case "1":
        console.log("key1");
        setSelectedKey("1")
        setDisplayContent(<EmployeeTable />);
        break;

      case "2":
        console.log("key2");
        setSelectedKey("2")
        setDisplayContent(<AddEmployee />);
        break;

      default:
        break;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/employee/get", { headers });
      if (response.status === 200) {
        console.log("response.data", response?.data?.employees);
        setData(response?.data?.employees);
      } else {
        toast.error("Error Getting Users");
      }
    } catch (error) {
      toast.error("Error Getting Users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value: DataContextValue = {
    testData,
    data,
    isLoading,
    setData,
    isModalOpen,
    setIsModalOpen,
    selectedEmployee,
    setSelectedEmployee,
    displayContent,
    setDisplayContent,
    handleMenuChange,
    selectedKey,
    setSelectedKey
  };

  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  );
};
