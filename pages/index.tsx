import type { NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useQueries } from "react-query";
import { useTable } from "react-table";

import { getTokensBalances } from "../api";
import { ethers } from "ethers";

const localStorageKey = "tokensBalances";

const ADDRESSES = [
  "0xd54921ccf100cc6a78acbbd4e55fd57c9b50ea7a",
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
    trackedAddresses.map((address) => {
      return {
        queryKey: ["balances", address],
        queryFn: () => getTokensBalances(address),
        refetchInterval: 15000,
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

  console.log("###results", results);

  const isLoading =
    results.some((resultResponse) => {
      resultResponse.isFetching || resultResponse.isRefetching;
    }) || false;

  const hasError =
    results.some((resultResponse) => {
      resultResponse.error ||
        resultResponse.isError ||
        resultResponse.isRefetchError ||
        resultResponse.isLoadingError;
    }) || false;

  const data = useMemo(() => {
    const data = results.map((resultResponse) => {
      const { data } = resultResponse;
      console.log("###DATA", data);
      return {
        address: data?.address,
        daiBalance: data?.daiBalance?.toString() ?? "",
        usdtBalance: data?.usdtBalance?.toString() ?? "",
        linkBalance: data?.linkBalance?.toString() ?? "",
      };
    });

    return data;
  }, [results]);

  const columns = useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address", // accessor is the "key" in the data
      },
      {
        Header: "DAI Balance",
        accessor: "daiBalance",
      },
      {
        Header: "USDT Balance",
        accessor: "usdtBalance",
      },
      {
        Header: "Link Balance",
        accessor: "linkBalance",
      },
    ],
    []
  );

  /* @ts-ignore */
  const tableInstance = useTable({ columns, data });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Something went wrong...</div>;
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <Head>
        <title>Koii Assignment App</title>
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
        <div>
          {JSON.stringify(trackedAddresses, null, 2)}

          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} key={column.id}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={cell.getCellProps().key}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Home;
