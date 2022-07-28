import type { NextPage } from "next";
import Head from "next/head";
import { List, Typography } from "antd";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../e2e/globalContext";
import RandomAvatar from "../components/Avatar";
import styles from "../styles/scss/modules.module.scss";
import { useRouter } from "next/router";
import axios from "axios";

// Library Pages

const Profile: NextPage = () => {
  const {
    userData,
    createNotification,
    setLoginState,
    contextIsFetchingData,
    loginState,
  } = useContext(GlobalContext);
  const router = useRouter();
  const { Text } = Typography;

  const createNewStripeLinkedAccount = async () => {
    if (!userData.treasury_account) {
      createNotification("info", "Loading...", "processing your request");
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/user_treasury/add/${userData.username}`,
          {},
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then(async (res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
          createNotification(
            "error",
            "Error",
            "there was an error processing your request"
          );
        });
    }

    if (!userData.treasury_account_activated) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/user_treasury/activate/${userData.username}`,
          {
            return_url: "https://www.covery.fun/accounts/activationSuccess",
            refresh_url: "https://www.covery.fun/accounts/activationFailed",
          },
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then((res) => {
          window.open(res.data.activation_link.url, "_self");
        })
        .catch((err) => {
          console.error(err.message);
          createNotification(
            "error",
            "Error",
            "there was an error processing your request"
          );
        });
    } else {
      createNotification(
        "error",
        "Error",
        "You have already created and filled the data of your treasury account"
      );
    }
  };

  useEffect(() => {
    if (!contextIsFetchingData) {
      console.log(userData);

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
        <title>Covery | Profile Page</title>
      </Head>
      <section
        id="GlobalSection"
        className={styles.phoneOptFlex}
        style={{ overflow: "scroll" }}
      >
        <div className={`${styles.spaceItemsVertical}`}>
          <RandomAvatar size={250} />

          <List
            style={{ width: "min(90%, 500px)", marginTop: "40px" }}
            className={`${styles.card}`}
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

                <List.Item.Meta
                  title={<h4>{"Treasury Account"}</h4>}
                  description={
                    dataItem.treasury_account &&
                    dataItem.treasury_account_activated ? (
                      <>
                        <p style={{ color: "lime" }}>Activated</p>
                      </>
                    ) : (
                      <>
                        <p style={{ color: "red" }}>Deactivated</p>
                        <Text type="secondary">
                          {
                            "----> Note: You do NOT need a treasury account to buy Tickets!"
                          }
                        </Text>
                        <Text type="secondary">
                          {
                            "   You only need to activate it for creating and receiving monery for your event ticket sales"
                          }
                        </Text>
                      </>
                    )
                  }
                />
              </List.Item>
            )}
          />
        </div>
        <div
          className={`${styles.spaceItemsVertical}`}
          style={{ minHeight: "500px", maxHeight: "70%" }}
        >
          <button onClick={() => console.log(userData)} className="EditButton">
            Edit my Info
          </button>
          <button
            className="PayDataButton"
            onClick={createNewStripeLinkedAccount}
          >
            Set my treasury account
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
  ) : (
    <section id="GlobalSection" className={styles.spaceItemsVertical}>
      <h2>Unauthorized Access</h2>
      <p>Redirecting to Login Page...</p>
    </section>
  );
};

export default Profile;
