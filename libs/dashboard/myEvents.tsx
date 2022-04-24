import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import styles from "../../styles/scss/modules.module.scss";
import { GlobalContext } from "../../e2e/globalContext";

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

const MyEvents: React.FC = () => {
  const { userData } = useContext(GlobalContext);
  const [fetchedEvents, setFetchedEvents] = useState<any>(undefined);

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/queries/filter_events`,
        { creator: userData.username },
        {
          headers: {
            AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setFetchedEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section id="DashboardElementSection">
      {fetchedEvents ? (
        <div
          style={{
            width: "100%",
            height: "77%",
            overflow: "scroll",
          }}
        >
          {fetchedEvents &&
            Object.values(fetchedEvents).map((event: any) => {
              return (
                <div className={styles.card} style={{ width: "90%" }}>
                  <div>
                    <h3>{event?.name}</h3>
                    <h4>{`eventID: ${event?._id}`}</h4>
                  </div>
                  <div>
                    <p>{`Creator: ${event?.creator}`}</p>
                    <p>{`Date: ${event?.date}`}</p>
                    <p>{`Location: ${event?.location_url}`}</p>
                    <p>{`Duration: ${event?.time_start} - ${event?.time_end}`}</p>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <h2>Loading your events...</h2>
        </div>
      )}
    </section>
  );
};

export default MyEvents;
