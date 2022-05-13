import "../styles/scss/globals.scss";
import "../styles/scss/index.scss";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import GlobalNav from "../libs/app/nav";
import { GlobalContextProvider } from "../e2e/globalContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div id="AppContainer">
      <GlobalContextProvider>
        <GlobalNav />
        <Component {...pageProps} />
      </GlobalContextProvider>
    </div>
  );
}

export default MyApp;
