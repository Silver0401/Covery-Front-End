import type { NextPage } from "next";
import Head from "next/head";
import { Grommet } from "grommet";

const Home: NextPage = () => {
  const theme = {
    global: {
      font: {
        family: "Roboto",
        size: "18px",
        height: "20px",
      },
    },
  };

  return (
    <Grommet theme={theme}>
      <Head>
        <title>Covery</title>
        <meta
          name="description"
          content="Create or discover parties around you; the easiest way to pay and accept cover payments."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Pene
    </Grommet>
  );
};

export default Home;
