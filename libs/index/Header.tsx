// Libraries
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../../e2e/globalContext";

// Lottie Stuff
import BeerLottieAnimation from "../../assets/lotties/beersLottie.json";
import LottieContainer from "../../components/LottieContainer";

// Styles
import styles from "../../styles/scss/modules.module.scss";

const Header: React.FC = () => {
  const router = useRouter();
  const { loginState } = useContext(GlobalContext);

  return (
    <section className={styles.phoneOptAbsolute} id="HomeSection">
      <div className={styles.spaceItemsVertical} id="HeaderLeftBox">
        <div
          id="h1Titles"
          className={styles.spaceItemsVertical}
          style={{ width: "100%" }}
        >
          <h1>Create and discover events</h1>
          <h1>near you!</h1>
        </div>
        <h3 style={{ margin: "0px 20%" }}>
          The easiest way to pay 💰️ and accept event cover payments 💵
        </h3>
        <div className={styles.spaceItemsHorizontal} style={{ width: "70%" }}>
          <button
            className="GenericButton"
            onClick={() =>
              loginState
                ? router.push("/dashboard")
                : router.push("/logRegister")
            }
          >
            Create Event
          </button>
          <button
            className="GenericButton"
            onClick={() => router.push("/searchEvents")}
          >
            Search Events
          </button>
        </div>
      </div>
      <div id="HeaderRightBox" className={styles.alignCenter}>
        <div className="LottieBox">
          <LottieContainer
            // style={{ transform: "scale(2)" }}
            lottie={BeerLottieAnimation}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
