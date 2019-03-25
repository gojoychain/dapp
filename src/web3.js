import Web3 from 'web3';

// import { PROVIDER } from './config';
// import { NETWORK } from './constants';

// const mainnet = new Web3(PROVIDER.MAINNET);
// const testnet = new Web3(PROVIDER.TESTNET);

// export default (network) => {
//   if (network === NETWORK.MAINNET) return mainnet;
//   if (network === NETWORK.TESTNET) return testnet;
//   return undefined;
// };

export default window.web3 && new Web3(window.web3.currentProvider);
