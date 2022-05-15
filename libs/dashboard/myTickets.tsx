import React from "react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import coupon from "../../assets/images/cupon.png";

const MyTickets: React.FC = () => {
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
        {CoveryTicket(
          "https://reactjs.org/",
          "Parker Fest",
          "20 / 6 / 2022",
          "9 am",
          "2 pm"
        )}
        {CoveryTicket(
          "https://reactjs.org/",
          "Parker Fest",
          "20 / 6 / 2022",
          "9 am",
          "2 pm"
        )}
        {CoveryTicket(
          "https://reactjs.org/",
          "Parker Fest",
          "20 / 6 / 2022",
          "9 am",
          "2 pm"
        )}
        {CoveryTicket(
          "https://reactjs.org/",
          "Parker Fest",
          "20 / 6 / 2022",
          "9 am",
          "2 pm"
        )}
      </div>
    </section>
  );
};

export default MyTickets;
