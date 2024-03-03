"use client"
import React from "react";
import { Button, Empty } from "antd";
import { useGlobalDataContext } from "../Context/GlobalDataContext";


const EmptyEmployeeTable: React.FC = () => {
  const { handleMenuChange } = useGlobalDataContext();

  //IF DATA IS NOT AVAILABLE CHANGE TO ADD EMPLOYEE MENU
  const handleAddEmployeeClick = () => {
    handleMenuChange("2")
  };

  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60, display: "flex", justifyContent: "center" }}
      description={<p>You haven't added any employees yet!!</p>}
    >
      <Button onClick={handleAddEmployeeClick} type="primary">
        Add Employee
      </Button>
    </Empty>
  );
};

export default EmptyEmployeeTable;
