import type { NextPage } from "next";
import Head from "next/head";

// Library Pages
import Header from "../libs/index/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Covery | Home Page</title>
        <meta
          name="description"
          content="Create or discover parties around you; the easiest way to pay and accept cover payments."
        />
      </Head>
      <Header />
    </>
  );
};

export default Home;
