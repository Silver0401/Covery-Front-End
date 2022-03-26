// Libraries
import React, { useContext, useState } from "react";
import { Layout, Menu } from "antd";
import {
  ToolOutlined,
  AppstoreAddOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { GlobalContext } from "../e2e/globalContext";
import styles from "../styles/scss/modules.module.scss";

// Nav Components
import CreateEvent from "../libs/dashboard/createEvent";
import MyEvents from "../libs/dashboard/myEvents";
import UserSettings from "../libs/dashboard/userSettings";

type NavComponents = "Create Event" | "My Events" | "User Settings";
interface NavElement {
  Name: string;
  Identifier: NavComponents;
  Icon: React.ReactElement;
  Component: React.ReactElement;
}
type NavComponentsIndex = {
  [key in NavComponents]: NavElement;
};

const Dashboard: React.FC = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const [displayedNavElement, setDisplayedNavElement] =
    useState<NavComponents>("Create Event");
  const { loginState } = useContext(GlobalContext);
  const NavElements: NavComponentsIndex = {
    "Create Event": {
      Name: "Create Event",
      Identifier: "Create Event",
      Icon: <AppstoreAddOutlined />,
      Component: <CreateEvent />,
    },
    "My Events": {
      Name: "My Events",
      Identifier: "My Events",
      Icon: <GoldOutlined />,
      Component: <MyEvents />,
    },
    "User Settings": {
      Name: "User Settings",
      Identifier: "User Settings",
      Icon: <ToolOutlined />,
      Component: <UserSettings />,
    },
  };

  return loginState ? (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        id="dashboardSlider"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[displayedNavElement]}
        >
          {Object.values(NavElements).map((value) => {
            return (
              <Menu.Item
                onClick={() => setDisplayedNavElement(value.Identifier)}
                key={value.Identifier}
                icon={value.Icon}
              >
                {value.Name}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 10, minHeight: 360, height: "100%" }}
          >
            {NavElements[displayedNavElement].Component}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Covery ©2022 Created by TGMPM
        </Footer>
      </Layout>
    </Layout>
  ) : (
    <section className={styles.alignCenter}>
      <h2>Unauthorized Access</h2>
    </section>
  );
};

export default Dashboard;
