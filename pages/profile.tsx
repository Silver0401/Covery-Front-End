import type { NextPage } from "next";
import Head from "next/head";
import { List } from "antd";
import { useContext } from "react";
import { GlobalContext } from "../e2e/globalContext";
import RandomAvatar from "../components/Avatar";
import styles from "../styles/scss/modules.module.scss";
import { useRouter } from "next/router";

// Library Pages

const Profile: NextPage = () => {
  const { userData, createNotification, setLoginState } =
    useContext(GlobalContext);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Covery | Profile Page</title>
      </Head>
      <section id="GlobalSection" className={styles.phoneOptFlex}>
        <div className={`${styles.alignCenter}`}>
          <div className={styles.card}>
            <RandomAvatar size={300} />
          </div>
        </div>
        <div className={`${styles.card} ${styles.spaceItemsVertical}`}>
          <List
            style={{ width: "80%" }}
            itemLayout="vertical"
            dataSource={[userData]}
            renderItem={(dataItem) => (
              <List.Item>
                <List.Item.Meta
                  title={<h4>{"Username"}</h4>}
                  description={<p>{dataItem.username}</p>}
                />
                <List.Item.Meta
                  title={<h4>{"Bio"}</h4>}
                  description={
                    <p>
                      {dataItem.bio
                        ? dataItem.bio
                        : "You have not written a personal description of yourself"}
                    </p>
                  }
                />
              </List.Item>
            )}
          />
          <button className="EditButton">Edit Profile</button>
          <button className="PayDataButton">Edit Payment Data</button>
          <button
            className="LogoutButton"
            onClick={() => {
              createNotification(
                "info",
                "Logging Out",
                "Please wait a moment..."
              );
              setTimeout(() => {
                setLoginState(null);
                window.localStorage.removeItem("loggedUserId");
                router.push("/");
                createNotification(
                  "success",
                  "Logged Out",
                  "You have logged out of your account"
                );
              }, 500);
            }}
          >
            Log Out
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;
