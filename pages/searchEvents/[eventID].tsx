import type { NextPage } from "next";
import { useContext } from "react";
import { GlobalContext } from "../../e2e/globalContext";
import styles from "../../styles/scss/modules.module.scss";
import axios from "axios";
import { Button } from "antd";
import Head from "next/head";

type Prices = 50 | 60 | 70 | 80 | 90 | 100 | 200 | 300 | 400 | 500;

interface eventData {
  assistants: Array<string>;
  price: Prices;
  bio: string;
  creator: string;
  date: string;
  location_url: string;
  name: string;
  time_end: string;
  time_start: string;
  _id: string;
}

interface eventProps {
  event: eventData;
}

export const getStaticPaths = async () => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/queries/filter_events`,
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
    `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/queries/filter_events`,
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

const SearchEventsIndex: NextPage<eventProps> = (props) => {
  const { userData, loginState, createNotification } =
    useContext(GlobalContext);

  const pricesID = {
    500: "price_1KrpeOFLKFgqJf56E8DVxzuq",
    400: "price_1KrpeNFLKFgqJf56M366vqUv",
    300: "price_1KrpeNFLKFgqJf562zB1rn8u",
    200: "price_1KrpeNFLKFgqJf56Cx4kdbpz",
    100: "price_1KrpeNFLKFgqJf567HDKb714",
    90: "price_1KrpeNFLKFgqJf56p6MQd2NL",
    80: "price_1KrpeNFLKFgqJf56H3D863Ci",
    70: "price_1KrpeNFLKFgqJf56Rk7lc2n9",
    60: "price_1KrpeNFLKFgqJf56gysn1eSO",
    50: "price_1KrpeNFLKFgqJf56ROLiSpZI",
  };

  const HandlePayment = () => {
    loginState
      ? axios
          .post(
            `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/payments/pay_cover`,
            {
              username: userData.username,
              eventID: props.event?._id,
              priceID: pricesID[props.event?.price],
              secretHash: "tangamandapian",
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
          })
      : createNotification(
          "info",
          "Create Account",
          "To buy a ticket to this event, you must create an account, redirecting..."
        );
  };

  // useEffect(() => {
  //   console.log(props.event);
  // }, []);

  return (
    <section id="GlobalSection" className={styles.spaceItemsHorizontal}>
      <Head>
        <title>Covery Event: {props.event?.name}</title>
        <meta
          name="description"
          content={`Event description: ${props.event?.bio}`}
        />
      </Head>
      <div className={styles.card}>
        <div>
          <h2>{props.event?.name}</h2>
          <h3>{`Ticket Price: $ ${props.event?.price}`}</h3>
          <h4>{`event_ID: ${props.event?._id}`}</h4>
        </div>
        <div>
          <p>{`Creator: ${props.event?.creator}`}</p>
          <p>{`Date: ${props.event?.date}`}</p>
          <p>{`Location: ${props.event?.location_url}`}</p>
          <p>{`Duration: ${props.event?.time_start} - ${props.event?.time_end}`}</p>
        </div>
        <Button size="large" block type="primary" onClick={HandlePayment}>
          Buy Ticket 🎟️
        </Button>
      </div>
    </section>
  );
};

export default SearchEventsIndex;
