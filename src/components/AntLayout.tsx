"use client";
import React from "react";
export const dynamic = "force-dynamic";
import { UserOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useGlobalDataContext } from "../Context/GlobalDataContext";

const { Content, Footer, Sider } = Layout;

const items = [
  { icon: AppstoreAddOutlined, label: "Dashboard" },
  { icon: UserOutlined, label: "Add Employee" },
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.label,
}));

const AntLayout: React.FC = () => {
  const { displayContent, handleMenuChange, selectedKey } =
    useGlobalDataContext();
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
        <div className="p-4 bg-slate-700 mb-2"><h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent">
          ASIF INC
          </h1></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          items={items}
          onClick={(e) => handleMenuChange(e.key)}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0", background: "transparent" }}>
          <div
            style={{
              padding: 4,
              minHeight: "100%",
              borderRadius: 12,
              background: "transparent",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {displayContent}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Asif INC ©{new Date().getFullYear()} Created by Rashed
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AntLayout;
