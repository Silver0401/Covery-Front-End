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

export const getStaticPaths = async () => {
  const { data } = await axios.post(
    "https://covery-api.herokuapp.com/queries/filter_events",
    {},
    {
      headers: {
        AUTH_TOKEN: `${process.env.NEXT_APP_NOT_BACKEND_TOKEN}`,
      },
    }
  );

  const paths = Object.values(data).map((event: any) => {
    return {
      params: { ["eventID"]: event._id },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const eventID = context.params.eventID;
  const { data } = await axios.post(
    "https://covery-api.herokuapp.com/queries/filter_events",
    { _id: eventID },
    {
      headers: {
        AUTH_TOKEN: `${process.env.NEXT_APP_NOT_BACKEND_TOKEN}`,
      },
    }
  );

  const event: eventData = data[0];
  return {
    props: { event },
  };
};

// @ts-ignore
const SearchEventsIndex: NextPage = ({ event }) => {
  return (
    <section id="GlobalSection" className={styles.spaceItemsHorizontal}>
      <Head>
        <title>Covery Event: {event?.name}</title>
        <meta name="description" content={`${event?.creator}: ${event?.bio}`} />
      </Head>
      <div className={styles.card}>
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
      {/* <div className={styles.card}>
        <StripeForm />
      </div> */}
    </section>
  );
};

export default SearchEventsIndex;
