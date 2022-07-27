import type { NextPage } from "next";
import Head from "next/head";
import { List } from "antd";
import { useContext } from "react";
import { GlobalContext } from "../e2e/globalContext";
import RandomAvatar from "../components/Avatar";
import styles from "../styles/scss/modules.module.scss";
import { useRouter } from "next/router";
import axios from "axios";

// Library Pages

const Profile: NextPage = () => {
  const { userData, createNotification, setLoginState } =
    useContext(GlobalContext);
  const router = useRouter();

  const addPaymentData = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/user_treasury/add/${userData.username}`,
        {},
        {
          headers: {
            AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPaymentData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/user_treasury/get/${userData.username}`,
        {
          headers: {
            AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const activatePaymentData = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/user_treasury/activate/${userData.username}`,
        {
          refresh_url: "https://www.covery.fun/accounts/activationSuccess",
          return_url: "https://www.covery.fun/accounts/activationFailed",
        },
        {
          headers: {
            AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <>
      <Head>
        <title>Covery | Profile Page</title>
      </Head>
      <section id="GlobalSection" className={styles.phoneOptFlex}>
        <div className={`${styles.spaceItemsVertical}`}>
          <div className={styles.card}>
            <RandomAvatar size={300} />
          </div>

          <List
            style={{ width: "80%" }}
            className={styles.card}
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
        </div>
        <div className={`${styles.card} ${styles.spaceItemsVertical}`}>
          <button className="EditButton">Edit Profile</button>
          <button className="PayDataButton" onClick={activatePaymentData}>
            Edit Payment Data
          </button>
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
