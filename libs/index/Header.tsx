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
        <h1>Create and discover events near you</h1>
        <h3>The easiest way to pay and accept event cover payments.</h3>
        <div className={styles.spaceItemsHorizontal} style={{ width: "70%" }}>
          <button
            onClick={() =>
              loginState
                ? router.push("/dashboard")
                : router.push("/logRegister")
            }
          >
            Create Event
          </button>
          <button onClick={() => router.push("/searchEvents")}>
            Search Events
          </button>
        </div>
      </div>
      <div id="HeaderRightBox" className={styles.alignCenter}>
        <LottieContainer
          style={{ transform: "scale(2)" }}
          lottie={BeerLottieAnimation}
        />
      </div>
    </section>
  );
};

export default Header;
