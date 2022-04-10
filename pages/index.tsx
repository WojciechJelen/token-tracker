import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import { getTokenBalances } from "../api";

const RANDOM_ADDRESS = "0xd54921ccf100cc6a78acbbd4e55fd57c9b50ea7a";

const Home: NextPage = () => {
  useEffect(() => {
    const getBalances = async () => {
      const res = await getTokenBalances(RANDOM_ADDRESS);
      console.log(res);
    };
    getBalances();
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
