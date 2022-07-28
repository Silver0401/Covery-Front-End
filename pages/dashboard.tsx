// Libraries
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { Layout, Menu } from "antd";
import {
  TagOutlined,
  AppstoreAddOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { GlobalContext } from "../e2e/globalContext";
import styles from "../styles/scss/modules.module.scss";

// Nav Components
import CreateEvent from "../libs/dashboard/createEvent";
import MyEvents from "../libs/dashboard/myEvents";
import MyTickets from "../libs/dashboard/myTickets";
import { useRouter } from "next/router";

type NavComponents = "Create Event" | "My Events" | "My Tickets";
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
  const router = useRouter();
  const { Header, Content, Footer, Sider } = Layout;
  const [displayedNavElement, setDisplayedNavElement] =
    useState<NavComponents>("Create Event");
  const { loginState, contextIsFetchingData } = useContext(GlobalContext);

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
    "My Tickets": {
      Name: "My Tickets",
      Identifier: "My Tickets",
      Icon: <TagOutlined />,
      Component: <MyTickets />,
    },
  };

  useEffect(() => {
    if (!contextIsFetchingData) {
      if (loginState === null) {
        setTimeout(() => {
          router.push("/logRegister");
        }, 500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextIsFetchingData]);

  return loginState ? (
    <>
      <Head>
        <title>Covery | Dashboard</title>
      </Head>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0" id="dashboardSlider">
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
              style={{
                padding: 10,
                minHeight: 360,
                height: "100%",
                maxHeight: 650,
                minWidth: 300,
              }}
            >
              {NavElements[displayedNavElement].Component}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Covery ©2022 Created by TGMPM
          </Footer>
        </Layout>
      </Layout>
    </>
  ) : (
    <section id="GlobalSection" className={styles.spaceItemsVertical}>
      <h2>Unauthorized Access</h2>
      <p>Redirecting to Login Page...</p>
    </section>
  );
};

export default Dashboard;
