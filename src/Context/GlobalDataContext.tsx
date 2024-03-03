"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DataContextProviderProps, DataContextValue, tableItem } from "../interfaces/interfaces";
import EmployeeTable from "../components/EmployeesTable";
import AddEmployee from "../components/AddEmployee";


const GlobalDataContext = createContext<DataContextValue | null>(null);

export const useGlobalDataContext = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

//MAIN DATA CONTEXT PROVIDER FUNCTION
export const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<tableItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<tableItem>();
  const [displayContent, setDisplayContent] = useState<React.ReactNode>(<EmployeeTable />);
  const [selectedKey, setSelectedKey] = useState("1");

  //HANDLING DASHBOARD MENU CHANGE
  const handleMenuChange = (key: string) => {
    switch (key) {
      case "1":
        setSelectedKey("1")
        setDisplayContent(<EmployeeTable />);
        break;

      case "2":
        setSelectedKey("2")
        setDisplayContent(<AddEmployee />);
        break;

      default:
        break;
    }
  };

  //FETCHING EMPLOYEE DATA
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/employee/get");
      if (response.status === 200) {
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
