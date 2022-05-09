import type { NextPage } from "next";
import styles from "../../styles/scss/modules.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import cosoimg from "../../assets/images/radarFoto.jpg";

const SearchEventsIndex: NextPage = () => {
  const router = useRouter();
  // const [img, setImg] = useState<any>(cosoimg);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/event_pic/get/623f9f9f8bd1a1cd6e6bf653`,
  //       {
  //         headers: {
  //           AUTH_TOKEN: `${process.env.NEXT_PUBLIC_NOT_BACKEND_TOKEN}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       //handle success
  //       setImg(response.data);
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       //handle error
  //     });
  // }, []);

  return (
    <section
      id="GlobalSection"
      className={`searchEventsIndex ${styles.phoneOptFlex}`}
    >
      {/* <Image
        width={100}
        height={100}
        src={`${process.env.NEXT_PUBLIC_NOT_BACKEND_URL}/resource/event_pic/get/623f9f9f8bd1a1cd6e6bf653`}
        alt="coso"
      /> */}
      <div
        id="byId"
        className={styles.alignCenter}
        onClick={() => router.push("searchEvents/byId")}
      >
        <div className="imgContainer" />
        <div className="textBox">
          <h1>Search event by ID</h1>
          <h3>If you already haven an event ID, you can search it</h3>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            clipRule="evenodd"
            fillRule="evenodd"
          >
            <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
          </svg>
        </div>
      </div>
      <div
        id="radar"
        className={styles.alignCenter}
        onClick={() => router.push("searchEvents/radar")}
      >
        <div className="imgContainer" />
        <div className="textBox">
          <h1>Events Radar</h1>
          <h3>Search and find the nearest events around you</h3>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            clipRule="evenodd"
            fillRule="evenodd"
          >
            <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 2c5.52 0 10 4.481 10 10 0 5.52-4.48 10-10 10-5.519 0-10-4.48-10-10 0-5.519 4.481-10 10-10zm-2 2.252v1.038c-2.89.862-5 3.542-5 6.71 0 3.863 3.137 7 7 7 1.932 0 3.682-.784 4.949-2.051l.706.706c-1.448 1.449-3.448 2.345-5.655 2.345-4.416 0-8-3.585-8-8 0-3.725 2.551-6.859 6-7.748zm0 3.165v1.119c-1.195.692-2 1.984-2 3.464 0 2.208 1.792 4 4 4 1.104 0 2.104-.448 2.828-1.172l.707.707c-.905.904-2.155 1.465-3.535 1.465-2.76 0-5-2.24-5-5 0-2.049 1.235-3.811 3-4.583zm1 2.851v-6.268c0-.265.105-.52.293-.707.187-.188.442-.293.707-.293.265 0 .52.105.707.293.188.187.293.442.293.707v6.268c.598.346 1 .992 1 1.732 0 1.104-.896 2-2 2s-2-.896-2-2c0-.74.402-1.386 1-1.732z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SearchEventsIndex;
