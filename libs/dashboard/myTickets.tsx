import React, { useContext } from "react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { GlobalContext } from "../../e2e/globalContext";
import styles from "../../styles/scss/modules.module.scss";
import coupon from "../../assets/images/cupon.png";

const MyTickets: React.FC = () => {
  const { userData } = useContext(GlobalContext);

  const CoveryTicket = (
    confirmUrl: string,
    eventName: string,
    date: string,
    startTime: string,
    endTime: string
  ) => {
    return (
      <div className="TicketContainer">
        <Image src={coupon} alt="coupon svg" />

        <div className="TicketInfo">
          <div className="text">
            <h4>{eventName}</h4>
            <p>{date}</p>
            <p> from: {startTime}</p>
            <p> to: {endTime}</p>
          </div>
          <div className="qrContainer">
            <QRCodeSVG
              bgColor="#ffa336"
              fgColor="#0286ec"
              style={{ width: "80px" }}
              value={confirmUrl}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="DashboardElementSection">
      <div
        style={{
          width: "100%",
          height: "650px",
          overflow: "scroll",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {userData.tickets ? (
          userData.tickets.map((ticket) => {
            return CoveryTicket(
              `http://www.covery.fun/checkIn?username=${userData.username}&event_id=${ticket.eventID}&secret_hash=${ticket.hash}`,
              "Parker Fest",
              "20 / 6 / 2022",
              "9 am",
              "2 pm"
            );
          })
        ) : (
          <div className={styles.card}>
            <h3>You have no tickets :(</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyTickets;
