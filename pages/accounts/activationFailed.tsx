import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/scss/modules.module.scss";
import ErrorLottie from "../../assets/lotties/ErrorLottie.json";
import LottieContainer from "../../components/LottieContainer";

const activationSuccess: NextPage = () => {
  const router = useRouter();

  return (
    <div id="GlobalSection" className={styles.phoneOptFlex}>
      <div className={styles.alignCenter}>
        <LottieContainer
          lottie={ErrorLottie}
          style={{ transform: "scale(6)" }}
        />
      </div>
      <div className={styles.spaceItemsVertical}>
        <h1 style={{ textAlign: "center" }}>Failed</h1>
        <h2 style={{ textAlign: "center" }}>Account could not be activated</h2>
        <h3
          style={{
            textAlign: "center",
            textDecoration: "underline 4px solid #5eb2b6",
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          Click here to go back to the home page
        </h3>
      </div>
    </div>
  );
};

export default activationSuccess;
