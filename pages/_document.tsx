import Document, { Html, Head, Main, NextScript } from "next/document";
import InitLoader from "../components/InitLoader";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Create or discover parties around you; the easiest way to pay and accept cover payments."
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <link
            href="https://fonts.googleapis.com/css2?family=Bungee&family=Fredoka+One&family=Indie+Flower&family=Mali&family=Montserrat+Alternates&family=Permanent+Marker&family=Poiret+One&family=Righteous&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        </Head>
        <body>
          <InitLoader />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
