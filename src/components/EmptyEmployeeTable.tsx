import React from "react";
import { Button, Empty } from "antd";

const EmptyEmployeeTable: React.FC = () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ height: 60, display: "flex", justifyContent:"center"}}
    description={<p>You have't added any employee yet!!</p>}
  >
    <Button type="primary">Add Employee</Button>
  </Empty>
);

export default EmptyEmployeeTable;
