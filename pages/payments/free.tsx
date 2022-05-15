import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import styles from "../../styles/scss/modules.module.scss";
import LottieContainer from "../../components/LottieContainer";
import SuccessLottie from "../../assets/lotties/SuccessLottie.json";
import LoadingAnimation from "../../components/LoadingAnimation";
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
  const [requestStatus, setRequestStatus] = useState<"success" | "waiting">(
    "waiting"
  );
  const { username, event_id } = router.query;
  const [eventInfo, setEventInfo] = useState<eventData>();
  const [tickedID, setTickedID] = useState<string>(nanoid());

  useEffect(() => {
    if (username && event_id) {
      setRequestStatus("success");
      console.log(tickedID);
      //   axios
      //     .post(
      //       `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/assistance/register_assistance`,
      //       {  },
      //       {
      //         headers: {
      //           AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
      //         },
      //       }
      //     )
      //     .then((res: any) => {
      //       console.log(res);

      //       if (res.status === 400) {
      //         router.push("/payments/error")
      //       } else {
      //         setEventInfo(res.data);
      //         setRequestStatus("success");
      //         setTickedID(nanoid());
      //       }
      //     })
      //     .catch((err) => {
      //       router.push("/payments/error")
      //       console.error(err);
      //     });
    }
  }, [username, event_id]);

  return username && event_id && requestStatus === "success" ? (
    <div
      id="GlobalSection"
      className={styles.phoneOptFlex}
      onClick={() => {
        console.log(requestStatus);
        console.log(eventInfo);
        console.log(username, event_id, ` ------ $}`);
        console.log(tickedID);
      }}
    >
      <div className={styles.alignCenter}>
        <LottieContainer
          lottie={SuccessLottie}
          style={{ transform: "scale(1)" }}
        />
      </div>
      <div className={styles.spaceItemsVertical}>
        <h2 style={{ textAlign: "center", color: "#41ef99" }}>Success!</h2>
        <h3 style={{ textAlign: "center" }}>
          Thanks for your purchase {username}. You can see your ticket in the
          dashboard section: "My Tickets"{" "}
        </h3>
        <h4
          style={{ textAlign: "center", textDecoration: "2px underline red" }}
        >
          IMPORTANT: The ticket can only be used once! so don't share it or let
          anyone scan it!
        </h4>
      </div>
    </div>
  ) : (
    <div id="GlobalSection" className={styles.alignCenter}>
      <LoadingAnimation />
    </div>
  );
};

export default SuccessPage;
