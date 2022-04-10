import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import { getTokenBalance } from "../api";

const RANDOM_ADDRESS = "0xd54921ccf100cc6a78acbbd4e55fd57c9b50ea7a";

const Home: NextPage = () => {
  useEffect(() => {
    getTokenBalance(RANDOM_ADDRESS);
  }, []);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Koii asssignment app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
    </div>
  );
};

export default Home;
