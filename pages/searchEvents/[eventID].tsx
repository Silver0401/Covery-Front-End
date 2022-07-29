import type { NextPage } from "next";
import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../../e2e/globalContext";
import styles from "../../styles/scss/modules.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Typography, List } from "antd";
import Head from "next/head";
import GoogleMapsComponent from "../../components/googleMap";
import { RotateLeftOutlined } from "@ant-design/icons";
import CheckoutForm from "../../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

type Prices = 0 | 50 | 60 | 70 | 80 | 90 | 100 | 200 | 300 | 400 | 500;

const stripePromise = loadStripe(
  "pk_test_51KqNXaFLKFgqJf56cmCYZr0gfhLxgJ4LvX8uwpdvayIm7wfn0bcQGy5iWpIbauep4tVwPT8mKeYwAw9rLMT1bsBs00ut0lLdVp"
);

interface eventData {
  assistants: Array<string>;
  price: Prices;
  bio: string;
  creator: string;
  eventpic: string;
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

interface coordinates {
  lat: number;
  lng: number;
}

export const getStaticPaths = async () => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/queries/filter_events`,
    {},
    {
      headers: {
        AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
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
        AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
      },
    }
  );

  const event: eventData = data[0];
  return {
    props: { event },
  };
};

const SearchEventID: NextPage<eventProps> = (props) => {
  const [center, setCenter] = useState<coordinates>();
  const [clientSecret, setClientSecret] = useState("awaiting...");
  const [cardDisplayed, setCardDisplayed] = useState<"Front" | "Back">("Front");
  const { userData, loginState, createNotification, setSearchedEventID } =
    useContext(GlobalContext);
  const router = useRouter();
  const eventDataFormated = [
    {
      title: "Price",
      description: props.event.price ? `$ ${props.event.price} MXN` : "FREE",
    },
    {
      title: "Creator",
      description: props.event.creator,
    },
    {
      title: "Date",
      description: props.event.date,
    },
    {
      title: "Duration",
      description: `${props.event.time_start} - ${props.event.time_end}`,
    },
    {
      title: "Location",
      description: props.event.location_url,
    },
  ];
  const { Paragraph } = Typography;

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
    0: "none",
  };

  const options = useMemo(() => {
    return {
      // passing the client secret obtained in step 2
      clientSecret: clientSecret,
      // Fully customizable with appearance API.
      appearance: {
        theme: "stripe",
        variables: {
          colorPrimary: "#0286ec",
          colorBackground: "f5f5f5",
          // colorText: '#000000',
          // colorDanger: '#df1b41',
          // fontFamily: 'Ideal Sans, system-ui, sans-serif',
          // spacingUnit: '2px',
          // borderRadius: '4px',
          // See all possible variables below
        },
      },
    };
  }, [clientSecret]);

  const fetchCoordinates = (googleGeo: any) => {
    googleGeo.geocode(
      { address: props.event.location_url },
      function (results: any, status: any) {
        if (status == google.maps.GeocoderStatus.OK && results) {
          const latitude = results[0].geometry.location.lat();
          const longitude = results[0].geometry.location.lng();
          setCenter({ lat: latitude, lng: longitude });
        }
      }
    );
  };

  const FlipCard = () => {
    setCardDisplayed(cardDisplayed === "Back" ? "Front" : "Back");
  };

  useEffect(() => {
    setSearchedEventID(props.event._id);

    const FetchClientSecret = async () => {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/payments/charge`,
          {
            username: userData.username,
            event_id: props.event._id,
          },
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setClientSecret(response.data.client_secret);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    FetchClientSecret();
    // window.onload = () => {
    //   const googleGeo = new google.maps.Geocoder();

    //   fetchCoordinates(googleGeo);
    // };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const googleGeo = new google.maps.Geocoder();
      fetchCoordinates(googleGeo);
    } catch (err) {
      console.error(err);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HandlePayment = () => {
    if (loginState) {
      if (props.event.price === 0) {
        console.log("create ticket page");
      } else {
        axios
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
                AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
              },
            }
          )
          .then((res) => {
            window.open(res.data.url, "_self");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      createNotification(
        "info",
        "Create Account",
        "To buy a ticket to this event, you must create an account, redirecting..."
      );
      setTimeout(() => {
        router.push("/logRegister");
      }, 500);
    }
  };

  return (
    <section
      id="GlobalSection"
      className={styles.phoneOptFlex}
      style={{ overflow: "scroll" }}
    >
      <Head>
        <title>Covery Event: {props.event?.name}</title>
        <meta
          name="description"
          content={`Event description: ${props.event?.bio}`}
        />
        <meta name="image" content={`${props.event?.eventpic}`} />
      </Head>

      <div
        id="CompleteLeftEventIDContainer"
        className={`${styles.card} Card${cardDisplayed}`}
      >
        <div id="eventIDInfoContainer">
          <h2>{props.event?.name}</h2>
          <Paragraph
            id="IdTextCopy"
            className="fakeh4"
            copyable={{ text: props.event?._id }}
          >
            {`event_ID:    ${props.event?._id}`}
          </Paragraph>
          <div className="listsContainer">
            <List
              className="LeftList"
              itemLayout="horizontal"
              dataSource={eventDataFormated}
              renderItem={(dataItem) => (
                <List.Item>
                  <List.Item.Meta
                    title={<h4>{dataItem.title}</h4>}
                    description={<p>{dataItem.description}</p>}
                  />
                </List.Item>
              )}
            />
            <div className="RightList">
              <div className="eventIdImageContainer">
                {props.event?.eventpic ? (
                  <img
                    alt="No photo provided by the creator"
                    style={{ borderRadius: "20px" }}
                    className="eventIDImage"
                    src={props.event.eventpic}
                  />
                ) : (
                  <p className="eventIDImage">
                    {"No photo provided by the creator"}
                  </p>
                )}
              </div>
              <div>
                <h4>{"Event Description"}</h4>
                <p style={{ color: "#7f8686" }}>{props.event.bio}</p>
              </div>
              {/* {props.event?.price === 0 ||
              props.event?.price === undefined ? null : (
                <Button size="large" block type="primary" onClick={FlipCard}>
                  {"Buy Ticket 🎟️"}
                </Button>
              )} */}
              <Button size="large" block type="primary" onClick={FlipCard}>
                {"Buy Ticket 🎟️"}
              </Button>
            </div>
          </div>
        </div>
        <div id="PaymentForm">
          <button className="returnButton" onClick={FlipCard}>
            <RotateLeftOutlined />
            {/* <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements> */}
          </button>
        </div>
      </div>
      <div id="eventIdGoogleMapsContainer" className={styles.card}>
        <GoogleMapsComponent searchBarHidden initialLocation={center} />
      </div>
    </section>
  );
};

export default SearchEventID;
