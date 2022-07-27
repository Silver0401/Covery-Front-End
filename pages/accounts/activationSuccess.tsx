import { useContext } from "react";
import type { NextPage } from "next";
// import styles from "../../styles/scss/mmodules.module.scss";
import styles from "../../styles/scss/modules.module.scss";
import { GlobalContext } from "../../e2e/globalContext";
import SuccessLottie from "../../assets/lotties/SuccessLottie.json";
import LottieContainer from "../../components/LottieContainer";

const activationSuccess: NextPage = () => {
  const { userData } = useContext(GlobalContext);

  return (
    <div id="GlobalSection" className={styles.phoneOptFlex}>
      <div className={styles.alignCenter}>
        <LottieContainer
          lottie={SuccessLottie}
          style={{ transform: "scale(1)" }}
        />
      </div>
      <div className={styles.spaceItemsVertical}>
        <h2 style={{ textAlign: "center", color: "#41ef99" }}>Success!</h2>
        <h3 style={{ textAlign: "center" }}>
          {"Your account is now activated"} {userData.username}
          {
            ".You can now create events and obtain money from their ticket sales"
          }{" "}
        </h3>
      </div>
    </div>
  );
};

export default activationSuccess;
