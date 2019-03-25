import web3 from '../web3';
import { CHAIN_ID } from '../config';

// TODO: replace mainnet with real address after deployed
const mainnetAddr = '0x9a2eDef674950D2c7a070C7C127ccB1491738668';
const testnetAddr = '0x9a2eDef674950D2c7a070C7C127ccB1491738668';
const abi = [{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"interval"}],"name":"withdrawInterval","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"success"}],"name":"withdraw","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"amount"}],"name":"withdrawAmount","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"renounceOwnership","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":""}],"name":"owner","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"isOwner","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"lastBlock"}],"name":"lastWithdrawBlock","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint8","name":"counter"}],"name":"withdrawCounter","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner"}],"constant":false},{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[{"type":"address","name":"owner"}]},{"type":"fallback","stateMutability":"payable","payable":true},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","indexed":true},{"type":"address","name":"newOwner","indexed":true}],"anonymous":false},{"type":"event","name":"Withdrawal","inputs":[{"type":"address","name":"to","indexed":true},{"type":"uint256","name":"amount","indexed":false}],"anonymous":false}]; // eslint-disable-line

let mainnet;
let testnet;

export default () => {
  switch (web3.givenProvider.networkVersion) {
    case CHAIN_ID.MAINNET: {
      if (!mainnet) {
        mainnet = new web3.eth.Contract(abi, mainnetAddr);
      }
      return mainnet;
    }
    case CHAIN_ID.TESTNET: {
      if (!testnet) {
        testnet = new web3.eth.Contract(abi, testnetAddr);
      }
      return testnet;
    }
    default: {
      return undefined;
    }
  }
};
