import { contractFactory } from "../utils";
import { DAI_ADDRESS } from "../constants";

export const getTokenBalance = async (address?: string) => {
  const daiContract = contractFactory(DAI_ADDRESS);
  console.log(daiContract);
  // TODO: use ethers.js to get token balance
};
