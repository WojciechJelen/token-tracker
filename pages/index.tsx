import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useQueries } from "react-query";

import { getTokensBalances } from "../api";

const RANDOM_ADDRESS = "0xd54921ccf100cc6a78acbbd4e55fd57c9b50ea7a";
const ADDRESSES = [
  RANDOM_ADDRESS,
  "0x6b175474e89094c44da98b954eedeac495271d0f",
  "0x20116b72c7f5ed183060357ac65219bae8f4932b",
];

const Home: NextPage = () => {
  const results = useQueries(
    ADDRESSES.map((address) => {
      return {
        queryKey: ["balances", address],
        queryFn: () => getTokensBalances(address),
        refetchInterval: 5000,
      };
    })
  );

  console.log("###results", results);

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
