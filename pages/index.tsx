import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useQueries } from "react-query";

import { getTokensBalances } from "../api";
import Modal from "../components/Modal";
import { Table } from "../components/Table";
import { ThemeSwitcherContext } from "../context/themeSwitcherContext";
import { TOKENS_BALANCES_STORAGE_KEY } from "../constants";
import {
  StyledActyionsWrapper,
  StyledButton,
  StyledContainer,
  StyledInput,
  StyledMain,
  StyledNavbar,
  StyledTableWrapper,
  StyledThemeSwitchButton,
  StyledWarning,
} from "../styled";
import { formatDai, formatLink, formatUsdt } from "../utils";
import { ethers } from "ethers";

const ADDRESSES = [
  "0xd54921ccf100cc6a78acbbd4e55fd57c9b50ea7a",
  "0x6b175474e89094c44da98b954eedeac495271d0f",
  "0x20116b72c7f5ed183060357ac65219bae8f4932b",
];

const Home: NextPage = () => {
  const { setDarkMode, isDark } = useContext(ThemeSwitcherContext);
  const [inputValue, setInputValue] = useState("");
  const [trackedAddresses, setTrackedAddresses] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [warningMessage, setWarning] = useState<string | null>(null);

  useEffect(() => {
    /**
     * @description
     * That was the only way to read from cache
     * Abtracting local storage functionalities to a separate hook and orchestrating it with useState
     * was impossible, because it was not possible to read from storage on the server side and
     * that would cause content mismatch during SSR
     */
    const storedAddresses = localStorage.getItem(TOKENS_BALANCES_STORAGE_KEY);
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

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setWarning(null);
    setInputValue("");
  }, []);

  const switchDarkMode = useCallback(() => {
    setDarkMode(!isDark);
  }, [isDark, setDarkMode]);

  const onTrackAddress = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      try {
        ethers.utils.getAddress(inputValue);
      } catch (error) {
        console.log(error);
        setWarning("Invalid address");
        return;
      }

      if (trackedAddresses.find((address) => address === inputValue)) {
        setWarning("Address already tracked");
        return;
      }

      setWarning(null);

      const newAdressesList = [...trackedAddresses, inputValue];
      setTrackedAddresses(newAdressesList);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          TOKENS_BALANCES_STORAGE_KEY,
          JSON.stringify(newAdressesList)
        );
      }
      setInputValue("");
      setShowModal(false);
    },
    [trackedAddresses, inputValue]
  );

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

      return {
        address: data?.address,
        daiBalance: formatDai(data?.daiBalance) ?? "",
        usdtBalance: formatUsdt(data?.usdtBalance) ?? "",
        linkBalance: formatLink(data?.linkBalance) ?? "",
      };
    });

    return data;
  }, [results]);

  const columns = useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address",
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      <Head>
        <title>Koii Assignment App</title>
        <meta name="description" content="Koii asssignment app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledMain>
        <StyledNavbar>
          <StyledThemeSwitchButton onClick={switchDarkMode}>
            {`Switch to ${isDark ? "light" : "dark"} ${isDark ? "🌙" : "🌞"}`}
          </StyledThemeSwitchButton>
        </StyledNavbar>
        <StyledContainer>
          <StyledButton onClick={handleOpenModal}>Add address</StyledButton>
          <StyledTableWrapper>
            <Table columns={columns} data={data} />
          </StyledTableWrapper>
        </StyledContainer>
      </StyledMain>

      <Modal
        onClose={handleCloseModal}
        show={showModal}
        title="Add address to track balances"
      >
        <StyledWarning>{warningMessage}</StyledWarning>
        <StyledInput
          name="address"
          id="address"
          value={inputValue}
          onChange={onInputChange}
        />
        <StyledActyionsWrapper>
          <StyledButton onClick={onTrackAddress}>Track address</StyledButton>
        </StyledActyionsWrapper>
      </Modal>
    </div>
  );
};

export default Home;
