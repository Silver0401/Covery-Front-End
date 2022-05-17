import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../e2e/globalContext";
import styles from "../../styles/scss/modules.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "antd";
import Head from "next/head";
import GoogleMapsComponent from "../../components/googleMap";

type Prices = 0 | 50 | 60 | 70 | 80 | 90 | 100 | 200 | 300 | 400 | 500;

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
  const { userData, loginState, createNotification, setSearchedEventID } =
    useContext(GlobalContext);
  const router = useRouter();

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

  useEffect(() => {
    console.log(props);
    setSearchedEventID(props.event._id);

    window.onload = () => {
      const googleGeo = new google.maps.Geocoder();

      fetchCoordinates(googleGeo);
    };

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
    <section id="GlobalSection" className={styles.phoneOptFlex}>
      <Head>
        <title>Covery Event: {props.event?.name}</title>
        <meta
          name="description"
          content={`Event description: ${props.event?.bio}`}
        />
        <meta name="image" content={`${props.event?.eventpic}`} />
      </Head>

      <div className={`${styles.card} ${styles.spaceItemsVertical}`}>
        <div>
          <h2>{props.event?.name}</h2>
          <h3>
            {`Ticket Price: $ ${
              props.event?.price === 0 || props.event?.price === undefined
                ? "FREE"
                : props.event?.price
            }`}
          </h3>
          <h4>{`event_ID: ${props.event?._id}`}</h4>
          <p>{`Description: ${props.event?.bio}`}</p>
        </div>

        <div className={styles.miniPhoneOptFlex} style={{ width: "90%" }}>
          <div style={{ marginRight: "20px" }}>
            <p>{`Creator: ${props.event?.creator}`}</p>
            <p>{`Date: ${props.event?.date}`}</p>
            <p>{`Location: ${props.event?.location_url}`}</p>
            <p>{`Duration: ${props.event?.time_start} - ${props.event?.time_end}`}</p>
          </div>
          <div>
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
        </div>

        {props.event?.price === 0 || props.event?.price === undefined ? null : (
          <Button size="large" block type="primary" onClick={HandlePayment}>
            {"Buy Ticket 🎟️"}
          </Button>
        )}
      </div>
      <div className={styles.card} style={{ minHeight: "150px" }}>
        <GoogleMapsComponent searchBarHidden initialLocation={center} />
      </div>
    </section>
  );
};

export default SearchEventID;
