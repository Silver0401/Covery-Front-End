import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import LoadingAnimation from "../components/LoadingAnimation";
import styles from "../styles/scss/modules.module.scss";
import LottieContainer from "../components/LottieContainer";
import { useEffect, useState } from "react";

import thumbsDown from "../assets/lotties/thumbsDown.json";
import thumbsUp from "../assets/lotties/thumbsUp.json";

const CheckInPage: NextPage = () => {
  const router = useRouter();
  const [checkInState, setCheckInState] = useState<
    "success" | "error" | "awaiting"
  >("success");
  const { username, event_id, secret_hash } = router.query;

  useEffect(() => {
    if (username && event_id && secret_hash) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/assistance/check_in`,
          { username: username, hash: secret_hash, eventID: event_id },
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setCheckInState("success");
        })
        .catch((err) => {
          console.error(err);
          setCheckInState("error");
        });
    }
  }, [username, event_id, secret_hash]);

  return checkInState === "success" ? (
    <div id="GlobalSection" className={styles.alignCenter}>
      <div className={styles.spaceItemsVertical}>
        <div className={styles.card}>
          <h1 style={{ textAlign: "center" }}>{"Ticket Found!"}</h1>
          <h3 style={{ textAlign: "center" }}>{`Welcome ${username}`}</h3>
        </div>
        <div className={styles.card} style={{ marginTop: "20px" }}>
          <LottieContainer lottie={thumbsUp} />
        </div>
      </div>
    </div>
  ) : checkInState === "error" ? (
    <div id="GlobalSection" className={styles.alignCenter}>
      <div className={styles.spaceItemsVertical}>
        <div className={styles.card}>
          <h1 style={{ textAlign: "center" }}>{"Ticket NOT Found!"}</h1>
          <h3 style={{ textAlign: "center" }}>
            {"User not registered in event"}
          </h3>
        </div>
        <div className={styles.card} style={{ marginTop: "20px" }}>
          <LottieContainer lottie={thumbsDown} />
        </div>
      </div>
    </div>
  ) : (
    <LoadingAnimation />
  );
};

export default CheckInPage;
