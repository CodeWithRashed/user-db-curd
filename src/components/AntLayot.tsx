"use client";
import React from "react";
import {
  UserOutlined,
  AppstoreAddOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import AddEmployee from "./AddEmployee";

const { Content, Footer, Sider } = Layout;

const items = [
  { icon: AppstoreAddOutlined, label: "Dashboard" },
  { icon: UserOutlined, label: "Add Employee" }
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.label
}));

const AntLayout: React.FC = () => {


  const [displayContent, setDisplayContent] = React.useState("Main Dashboard");

  const handleMenuChange = (key) => {
    switch (key) {
      case "1":
        console.log("key1");
        setDisplayContent("Main Dashboard");
        return;

      case "2":
        console.log("key2");
        setDisplayContent("Add User");
        return;
      default:
        break;
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
      <div className="p-5 text-white">Logo</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          onClick={(e) => handleMenuChange(e.key)}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0", background: "transparent"}}>
          <div
            style={{
              padding: 4,
              minHeight: "100%",
              borderRadius: 12,
              background: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddEmployee/>
            {/* {displayContent} */}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AntLayout;
