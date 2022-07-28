import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../e2e/globalContext";
import styles from "../../styles/scss/modules.module.scss";
import ErrorLottie from "../../assets/lotties/money-investment.json";
import LottieContainer from "../../components/LottieContainer";
import { RightCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const CreateNew: NextPage = () => {
  const { userData, loginState, contextIsFetchingData, createNotification } =
    useContext(GlobalContext);
  const router = useRouter();

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

  const createNewStripeLinkedAccount = async () => {
    createNotification("info", "Loading...", "processing your request");

    if (!userData.treasury_account) {
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
  };

  return loginState ? (
    <div id="GlobalSection" className={styles.phoneOptFlex}>
      <div className={`${styles.spaceItemsVertical}`}>
        <h3 style={{ textAlign: "center" }} className={`${styles.card}`}>
          In order to receive payments for every ticket bought for your event,
          you must go through a couple more steps{" "}
        </h3>
        <button
          className="ContinueButton"
          onClick={createNewStripeLinkedAccount}
        >
          Continue
          <RightCircleOutlined
            style={{ marginLeft: "20px", transform: "scale(1.2)" }}
          />
        </button>
      </div>
      <div className={styles.alignCenter}>
        <LottieContainer
          lottie={ErrorLottie}
          style={{ transform: "scale(0.8)" }}
        />
      </div>
    </div>
  ) : (
    <section id="GlobalSection" className={styles.spaceItemsVertical}>
      <h2>Unauthorized Access</h2>
      <p>Redirecting to Login Page...</p>
    </section>
  );
};

export default CreateNew;
