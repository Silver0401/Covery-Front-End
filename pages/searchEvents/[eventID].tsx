import type { NextPage } from "next";
import styles from "../../styles/scss/modules.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import StripeForm from "../../components/StripeFrom";
import Head from "next/head";

interface searchID {
  idIntroduced: string;
}

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

const SearchEventsIndex: NextPage = () => {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState<eventData>();
  const { eventID } = router.query;

  useEffect(() => {
    eventID &&
      axios
        .post(
          "https://covery-api.herokuapp.com/queries/filter_events",
          { _id: eventID?.slice(8) },
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_APP_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then((res) => {
          const data: eventData = res.data[0];
          setFetchedData(data);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [eventID]);

  return (
    <section id="GlobalSection" className={styles.spaceItemsHorizontal}>
      <Head>
        <title>Covery Event: {fetchedData?.name}</title>
        <meta
          name="description"
          content={`${fetchedData?.creator}: ${fetchedData?.bio}`}
        />
      </Head>
      <div className={styles.card}>
        <div>
          <h3>{fetchedData?.name}</h3>
          <h4>{`eventID: ${fetchedData?._id}`}</h4>
        </div>
        <div>
          <p>{`Creator: ${fetchedData?.creator}`}</p>
          <p>{`Date: ${fetchedData?.date}`}</p>
          <p>{`Location: ${fetchedData?.location_url}`}</p>
          <p>{`Duration: ${fetchedData?.time_start} - ${fetchedData?.time_end}`}</p>
        </div>
      </div>
      {/* <div className={styles.card}> */}
      <StripeForm />
      {/* </div> */}
    </section>
  );
};

export default SearchEventsIndex;
