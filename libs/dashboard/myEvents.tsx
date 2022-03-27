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
  const [fetchedEvents, setFetchedEvents] = useState<any>();

  useEffect(() => {
    axios
      .post(
        `https://covery-api.herokuapp.com/queries/filter_events`,
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
    </section>
  );
};

export default MyEvents;
