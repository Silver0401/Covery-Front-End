import React, { useContext, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { GlobalContext } from "../../e2e/globalContext";
import styles from "../../styles/scss/modules.module.scss";
import CoveryLogo from "../../assets/images/CoveryLogo.png";
import LoadingAnimation from "../../components/LoadingAnimation";
import axios from "axios";

const MyTickets: React.FC = () => {
  const { userData } = useContext(GlobalContext);
  const [fetchingTickets, setFetchingTickets] = useState<boolean>(true);
  const [eventData, setEventData] = useState<any>({
    name: "awaiting..",
    date: "awaiting..",
    time_start: "awaiting..",
    time_en: "awaiting..",
  });

  const CoveryTicket = (
    confirmUrl: string,
    eventName: string,
    date: string,
    startTime: string,
    endTime: string,
    place: string,
    imgUrl: string | undefined,
    ticketIndex: string
  ) => {
    return (
      <div className="TicketContainer">
        <div className="coveryLogoSvgTicket">
          <Image src={CoveryLogo} alt="CoveryLogo" />
        </div>
        <div className="ticketIndexContainer">
          <p>{ticketIndex}</p>
        </div>

        <div className="TicketInfo">
          <div className="text1">
            <h4
              style={{
                fontSize: "1rem",
                textDecoration: "underline 2px #0286ec",
              }}
            >
              {eventName}
            </h4>
            <p> place: {place}</p>
          </div>
          <div className="text2">
            <p> date: {date}</p>
            <p> from: {startTime}</p>
            <p> to: {endTime}</p>
          </div>
        </div>
        <div className="imagesContainer">
          <div className="qrContainer">
            <QRCodeSVG
              bgColor="white"
              fgColor="#0286ec"
              style={{ width: "100px" }}
              value={confirmUrl}
            />
            <p>{"www.covery.fun"}</p>
          </div>
          {imgUrl && (
            <div className="eventImgContainer">
              <img src={imgUrl} alt="coso" />
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const FetchTickets = async () => {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/queries/filter_events`,
          { _id: userData.tickets && userData.tickets[2].eventID },
          {
            headers: {
              AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
            },
          }
        )
        .then((res) => {
          setEventData(res.data[0]);
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });

      setFetchingTickets(false);
    };

    FetchTickets();
  }, []);

  return fetchingTickets ? (
    <LoadingAnimation loadingText="Loading your tickets..." />
  ) : (
    <section id="DashboardElementSection">
      <div
        className="DashbaordSectionContainer"
        style={{
          width: "100%",
          overflow: "scroll",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {userData.tickets ? (
          userData.tickets.map((ticket, index) => {
            return CoveryTicket(
              `https://www.covery.fun/checkIn?username=${userData.username}&event_id=${ticket.eventID}&secret_hash=${ticket.hash}`,
              eventData.name,
              eventData.date,
              eventData.time_start,
              eventData.time_end,
              eventData.location_url,
              eventData.eventpic,
              `${index}`
            );
          })
        ) : (
          <div
            className={`${styles.card} ${styles.fillSpace} ${styles.spaceItemsVertical}`}
            style={{ height: "90%" }}
          >
            <h4>{"You have no tickets"}</h4>
            <h2>{":("}</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyTickets;
