import { ethers } from "ethers";
import { ALCHEMY_URL } from "../constants";
import { minimalERC20ABI } from "../abi";

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL);

export const contractFactory = (address: string) => {
  return new ethers.Contract(address, minimalERC20ABI, provider);
};

export const formatUnit = (amount: ethers.BigNumberish) => {
  if (!amount) {
    return "0";
  }
  return ethers.utils.formatUnits(amount, 6);
};
