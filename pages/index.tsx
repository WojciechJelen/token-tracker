import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useQueries } from "react-query";

import { getTokensBalances } from "../api";

const localStorageKey = "tokensBalances";

const RANDOM_ADDRESS = "0xd54921ccf100cc6a78acbbd4e55fd57c9b50ea7a";
const ADDRESSES = [
  RANDOM_ADDRESS,
  "0x6b175474e89094c44da98b954eedeac495271d0f",
  "0x20116b72c7f5ed183060357ac65219bae8f4932b",
];

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [trackedAddresses, setTrackedAddresses] = useState<string[]>([]);

  useEffect(() => {
    const storedAddresses = localStorage.getItem(localStorageKey);
    if (storedAddresses) {
      setTrackedAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  const results = useQueries(
    ADDRESSES.map((address) => {
      return {
        queryKey: ["balances", address],
        queryFn: () => getTokensBalances(address),
        // refetchInterval: 5000,
      };
    })
  );

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setInputValue(event.target.value);
    },
    []
  );

  const onTrackAddress = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const newAdressesList = [...trackedAddresses, inputValue];
      setTrackedAddresses(newAdressesList);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          localStorageKey,
          JSON.stringify(newAdressesList)
        );
      }
      setInputValue("");
    },
    [trackedAddresses, inputValue]
  );

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Koii asssignment app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <label htmlFor="address">address</label>
        <input
          name="address"
          id="address"
          value={inputValue}
          onChange={onInputChange}
        />
        <button onClick={onTrackAddress}>Track address</button>
        <div>{JSON.stringify(trackedAddresses, null, 2)}</div>
      </main>
    </div>
  );
};

export default Home;
