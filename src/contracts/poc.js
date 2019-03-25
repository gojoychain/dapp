import web3 from '../web3';
import { NETWORK } from '../constants';

// const mainnetAddr = '';
const testnetAddr = '0x773a94cD164eb9e266a409EC15d829DC3d81eE2d';
const abi = [{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"interval"}],"name":"withdrawInterval","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"success"}],"name":"withdraw","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"amount"}],"name":"withdrawAmount","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"renounceOwnership","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":""}],"name":"owner","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"isOwner","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"lastBlock"}],"name":"lastWithdrawBlock","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner"}],"constant":false},{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[{"type":"address","name":"owner"}]},{"type":"fallback","stateMutability":"payable","payable":true},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","indexed":true},{"type":"address","name":"newOwner","indexed":true}],"anonymous":false},{"type":"event","name":"Withdrawal","inputs":[{"type":"address","name":"to","indexed":true},{"type":"uint256","name":"amount","indexed":false}],"anonymous":false}]; // eslint-disable-line

// let mainnet;
let testnet;

export default (network) => {
  switch (network) {
    case NETWORK.MAINNET: {
      throw Error('Mainnet contract not deployed yet.');
      // TODO: uncomment when mainnet is deployed
      // if (!mainnet) {
      //   mainnet = new web3.mainnet.eth.Contract(abi, mainnetAddr);
      // }
      // return mainnet;
    }
    case NETWORK.TESTNET: {
      if (!testnet) {
        testnet = new web3.testnet.eth.Contract(abi, testnetAddr);
      }
      return testnet;
    }
    default: {
      throw Error(`Invalid network: ${network}`);
    }
  }
};
