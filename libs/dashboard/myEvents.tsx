import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import styles from "../../styles/scss/modules.module.scss";
import LoadingAnimation from "../../components/LoadingAnimation";
import { GlobalContext } from "../../e2e/globalContext";
import { List } from "antd";

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

const MyEvents: React.FC = () => {
  const { userData } = useContext(GlobalContext);
  const [fetchingStatus, setFetchingStatus] = useState<"fetching" | "fetched">(
    "fetching"
  );
  const [fetchedEvents, setFetchedEvents] = useState<Array<eventData>>([]);

  useEffect(() => {
    const FetchEvents = async () => {
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
          const eventsFetched = res.data;
          const eventsOptimized = Object.values(eventsFetched).map(
            (eventEntry: any) => {
              return eventEntry;
            }
          );
          console.log(eventsOptimized);
          setFetchedEvents(eventsOptimized);
        })
        .catch((err) => {
          console.log(err);
        });

      setFetchingStatus("fetched");
    };

    FetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="DashboardElementSection">
      <div
        style={{
          width: "100%",
          height: "650px",
          overflow: "scroll",
        }}
      >
        {fetchingStatus === "fetching" ? (
          <LoadingAnimation loadingText="Loading your events..." />
        ) : (
          <List
            itemLayout="vertical"
            size="small"
            dataSource={fetchedEvents}
            renderItem={(item) => {
              return (
                <div className={styles.card} id="MyEventsCardContainer">
                  <List.Item style={{ marginTop: "20px" }}>
                    <List.Item.Meta title={<h2>{item.name}</h2>} />
                  </List.Item>
                  <List.Item className="sentence">
                    <List.Item.Meta
                      title={<h4>{"Creator"}</h4>}
                      description={<p>{item.creator}</p>}
                    />
                  </List.Item>
                  <List.Item className="sentence">
                    <List.Item.Meta
                      title={<h4>{"Event ID"}</h4>}
                      description={<p>{item._id}</p>}
                    />
                  </List.Item>
                  <List.Item className="sentence">
                    <List.Item.Meta
                      title={<h4>{"Price"}</h4>}
                      description={
                        <p>
                          {item.price === 0 || item.price === undefined
                            ? "FREE"
                            : item.price}
                        </p>
                      }
                    />
                  </List.Item>
                  <List.Item className="sentence">
                    <List.Item.Meta
                      title={<h4>{"Place"}</h4>}
                      description={<p>{item.location_url}</p>}
                    />
                  </List.Item>
                  <List.Item className="sentence">
                    <List.Item.Meta
                      title={<h4>{"Date"}</h4>}
                      description={<p>{item.date}</p>}
                    />
                  </List.Item>
                  <List.Item className="sentence">
                    <List.Item.Meta
                      title={<h4>{"Time Start"}</h4>}
                      description={<p>{item.time_start}</p>}
                    />
                  </List.Item>
                  <List.Item className="sentence">
                    <List.Item.Meta
                      title={<h4>{"Time End"}</h4>}
                      description={<p>{item.time_end}</p>}
                    />
                  </List.Item>
                </div>
              );
            }}
          />
        )}
      </div>
    </section>
  );
};

export default MyEvents;
