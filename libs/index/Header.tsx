// Libraries
import React from "react";
import { useRouter } from "next/router";

// Lottie Stuff
import MoneyLottieAnimation from "../../assets/lotties/money-investment.json";
import LottieContainer from "../../components/LottieContainer";

// Styles
import styles from "../../styles/scss/modules.module.scss";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <section className={styles.phoneOptAbsolute}>
      <div className={styles.spaceItemsVertical} id="HeaderLeftBox">
        <h1>Create and discover events near you</h1>
        <h3>The easiest way to pay and accept event cover payments.</h3>
        <div className={styles.spaceItemsHorizontal} style={{ width: "70%" }}>
          <button onClick={() => router.push("/logRegister")}>
            Create Event
          </button>
          <button onClick={() => router.push("/logRegister")}>
            Search Events
          </button>
        </div>
      </div>
      <div id="HeaderRightBox" className={styles.alignCenter}>
        <LottieContainer lottie={MoneyLottieAnimation} />
      </div>
    </section>
  );
};

export default Header;
