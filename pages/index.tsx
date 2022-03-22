import type { NextPage } from "next";
import Head from "next/head";

// Library Pages
import Header from "../libs/index/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Covery</title>
        <meta
          name="description"
          content="Create or discover parties around you; the easiest way to pay and accept cover payments."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  );
};

export default Home;
