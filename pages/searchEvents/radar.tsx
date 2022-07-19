import type { NextPage } from "next";
import { useContext } from "react";
import { GlobalContext } from "../../e2e/globalContext";
import { LoadingOutlined } from "@ant-design/icons";
import GoogleMapsComponent from "../../components/googleMap";
import Head from "next/head";
import { useRouter } from "next/router";
// import LottieContainer from "../../components/LottieContainer";
// import LottieRadar from "../../assets/lotties/Scanning.json";
import styles from "../../styles/scss/modules.module.scss";
import { useEffect, useState } from "react";
import LoadingAnimation from "../../components/LoadingAnimation";
import axios from "axios";

type Prices = 0 | 50 | 60 | 70 | 80 | 90 | 100 | 200 | 300 | 400 | 500;

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

const RadarPage: NextPage = () => {
  const [eventsFetchState, setEventsFetchState] = useState<
    "fetching" | "fetched"
  >("fetching");
  const [eventsList, setEventsList] = useState<Array<eventData>>([]);
  const { createNotification } = useContext(GlobalContext);
  const [eventLocations, setEventLocations] = useState<Array<string>>([]);
  const router = useRouter();

  useEffect(() => {
    const FetchEvents = async () => {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/queries/filter_events`,
          {},
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then((res) => {
          const eventsFetched = res.data;
          const eventsOptimized = Object.values(eventsFetched).map(
            (eventEntry: any) => {
              return eventEntry;
            }
          );
          setEventsList(eventsOptimized);
        })
        .catch((err) => {
          console.error(err);
        });
      setEventsFetchState("fetched");
    };

    FetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const eventLocations = eventsList.map((event) => {
      return event.location_url;
    });
    setEventLocations(eventLocations);
  }, [eventsList]);

  return (
    <section id="GlobalSection">
      <Head>
        <title>{"Covery's Radar"}</title>
        <meta name="description" content="Scann every event around you" />
      </Head>
      <div className={`${styles.phoneOptAbsolute} ${styles.fillSpace}`}>
        <div className={`${styles.spaceItemsVertical}`} style={{ flex: 2 }}>
          <div
            style={{ width: "90%", margin: "0px 5%" }}
            className={`${styles.card} ${styles.alignCenter}`}
          >
            <h1 style={{ margin: 0, textAlign: "center" }}>Events near you</h1>
          </div>

          <div
            style={{
              height: "500px",
              width: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {eventsFetchState === "fetching" ? (
              <LoadingAnimation loadingText="Searching events around you..." />
            ) : eventsList === [] ? (
              <div className={`${styles.alignCenter} ${styles.card}`}>
                <h2>No events near you :(</h2>
              </div>
            ) : (
              eventsList.map((event) => {
                return (
                  <div
                    key={`${event.name} ${event.creator}`}
                    id="radarEventCard"
                    style={{
                      width: "90%",
                    }}
                  >
                    <div
                      id="radarContentWrapper"
                      className={`${styles.card}`}
                      onClick={() => {
                        createNotification(
                          "info",
                          "Redirecting...",
                          "Wait a second while we redirect you to the event page",
                          <LoadingOutlined style={{ color: "#0286ec" }} />
                        );
                        router.push(`/searchEvents/${event._id}`);
                      }}
                    >
                      <div
                        className={`${styles.spaceItemsVertical}`}
                        style={{ width: "20%" }}
                      >
                        <h4
                          style={{ textAlign: "center", marginBottom: "5px" }}
                        >
                          {event.name}
                        </h4>
                        <p id="radarCardPrice">
                          {event.price === 0 || event.price === undefined
                            ? "FREE"
                            : `${event.price} mxn`}
                        </p>
                      </div>
                      <div
                        className={`${styles.spaceItemsHorizontal}`}
                        style={{
                          justifyContent: "space-evenly",
                          width: "50%",
                        }}
                      >
                        <p style={{ margin: 0, width: "60%" }}>
                          {event.location_url}
                        </p>

                        <div className="svgContainer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 6h-3.135c-.385.641-.798 1.309-1.232 2h3.131l.5 1h-4.264l-.344.544-.289.456h.558l.858 2h-7.488l.858-2h.479l-.289-.456-.343-.544h-2.042l-1.011-1h2.42c-.435-.691-.848-1.359-1.232-2h-3.135l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div
          className={`${styles.card} ${styles.alignCenter}`}
          id="radarGoogleMap"
        >
          {/* <LottieContainer lottie={LottieRadar} /> */}
          <GoogleMapsComponent searchBarHidden locationsList={eventLocations} />
        </div>
      </div>
    </section>
  );
};

export default RadarPage;
