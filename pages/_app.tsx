import "../styles/scss/globals.scss";
import "../styles/scss/index.scss";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import GlobalNav from "../libs/app/nav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalNav />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
