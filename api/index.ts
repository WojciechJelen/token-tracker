import { contractFactory } from "../utils";
import { DAI_ADDRESS, USDT_ADDRESS, LINK_ADDRESS } from "../constants";
import { AddressBalances } from "../types";

export const getTokenBalances = async (
  address: string
): Promise<AddressBalances> => {
  const daiContract = contractFactory(DAI_ADDRESS);
  const usdtContract = contractFactory(USDT_ADDRESS);
  const linkContract = contractFactory(LINK_ADDRESS);

  const [daiBalance, linkBalance, usdtBalance] = await Promise.all([
    daiContract.balanceOf(address),
    linkContract.balanceOf(address),
    usdtContract.balanceOf(address),
  ]);

  return {
    address,
    daiBalance,
    linkBalance,
    usdtBalance,
  };
};
