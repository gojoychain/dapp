import Web3 from 'web3';

import { PROVIDER } from './config';

const mainnet = new Web3(PROVIDER.MAINNET);
const testnet = new Web3(PROVIDER.TESTNET);

export default {
  mainnet,
  testnet,
};
