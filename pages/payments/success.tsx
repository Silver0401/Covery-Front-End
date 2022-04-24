import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import styles from "../../styles/scss/modules.module.scss";
import LottieContainer from "../../components/LottieContainer";
import SuccessLottie from "../../assets/lotties/SuccessLottie.json";
import ErrorLottie from "../../assets/lotties/ErrorLottie.json";
import couponImg from "../../assets/images/cupon.png";
import Image from "next/image";
import axios from "axios";

interface eventData {
  assistants: Array<string>;
  bio: string;
  creator: string;
  date: string;
  location_url: string;
  name: string;
  time_end: string;
  time_start: string;
  _id: string;
}

const SuccessPage: NextPage = () => {
  const router = useRouter();
  const { username, event_id } = router.query;
  const [eventInfo, setEventInfo] = useState<eventData>();
  const [tickedID, setTickedID] = useState<string>("awaiting...");

  useEffect(() => {
    if (username && event_id) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/queries/filter_events`,
          { _id: event_id },
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_APP_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then((res: any) => {
          setEventInfo(res[0]);
        })
        .catch((err) => {
          console.error(err);
        });

      setTickedID(nanoid());
    }
  }, [username, event_id]);

  return username && event_id ? (
    <div id="GlobalSection" className={styles.phoneOptFlex}>
      <div className={styles.alignCenter}>
        <LottieContainer
          lottie={SuccessLottie}
          style={{ transform: "scale(1)" }}
        />
      </div>
      <div className={styles.spaceItemsVertical}>
        <h2 style={{ textAlign: "center" }}>Success!</h2>
        <h3 style={{ textAlign: "center" }}>
          Thanks for your purchase {username}
        </h3>
        <h4 style={{ textAlign: "center" }}>Here is your ticket</h4>
        <div className="TicketContainer">
          <Image src={couponImg} alt={"coupon"} />
          <div className="textContainer">
            <h5 id="eventName">{eventInfo?.name}</h5>
            <h5 id=""> Your Ticked ID: {tickedID}</h5>
            <p id="location">{eventInfo?.location_url}</p>
            <p id="start">{eventInfo?.time_start}</p>
            <p id="finish">{eventInfo?.time_end}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div id="GlobalSection" className={styles.phoneOptFlex}>
      <div className={styles.alignCenter}>
        <LottieContainer
          lottie={ErrorLottie}
          style={{ transform: "scale(6)" }}
        />
      </div>
      <div className={styles.spaceItemsVertical}>
        <h1 style={{ textAlign: "center" }}>Error</h1>
        <h2 style={{ textAlign: "center" }}>Purchase Unsuccessfull</h2>
        <h3
          style={{
            textAlign: "center",
            textDecoration: "underline 4px solid #5eb2b6",
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          Click here to go back to the home page
        </h3>
      </div>
    </div>
  );
};

export default SuccessPage;
