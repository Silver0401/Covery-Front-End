import type { NextPage } from "next";
import LottieContainer from "../../components/LottieContainer";
import styles from "../../styles/scss/modules.module.scss";
import { useRouter } from "next/router";
import ErrorLottie from "../../assets/lotties/ErrorLottie.json";

const ErrorPage: NextPage = () => {
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
        <h1 style={{ textAlign: "center" }}>Error</h1>
        <h2 style={{ textAlign: "center" }}>Purchase Unsuccessfull</h2>
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

export default ErrorPage;
