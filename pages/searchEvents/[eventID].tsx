import type { NextPage } from "next";
import { useContext } from "react";
import { GlobalContext } from "../../e2e/globalContext";
import styles from "../../styles/scss/modules.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import bcrypt from "bcryptjs";
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
  const { userData } = useContext(GlobalContext);

  const HandlePayment = () => {
    // const salt = bcrypt.genSaltSync(10);

    axios
      .post(
        "https://covery-api.herokuapp.com/payments/pay_cover",
        {
          username: userData.username,
          eventID: event?._id,
          secretHash: "tangamandapian",
          // secretHash: bcrypt.hashSync(
          //   `${Math.floor(Math.random() * 100000 + 1)}`,
          //   salt
          // ),
        },
        {
          headers: {
            AUTH_TOKEN: `${process.env.NEXT_APP_NOT_BACKEND_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.open(res.data.url);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    console.log(event);
  }, []);

  return (
    <section id="GlobalSection" className={styles.spaceItemsHorizontal}>
      <Head>
        <title>Covery Event: {event?.name}</title>
        <meta name="description" content={`Event description: ${event?.bio}`} />
      </Head>
      <div className={styles.card}>
        <div>
          <h2>{event?.name}</h2>
          <h3>{`Ticket Price: $ ${event?.price}`}</h3>
          <h4>{`event_ID: ${event?._id}`}</h4>
        </div>
        <div>
          <p>{`Creator: ${event?.creator}`}</p>
          <p>{`Date: ${event?.date}`}</p>
          <p>{`Location: ${event?.location_url}`}</p>
          <p>{`Duration: ${event?.time_start} - ${event?.time_end}`}</p>
        </div>
        <Button size="large" block type="primary" onClick={HandlePayment}>
          Buy Ticket 🎟️
        </Button>
      </div>
    </section>
  );
};

export default SearchEventsIndex;
