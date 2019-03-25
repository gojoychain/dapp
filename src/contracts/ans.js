import web3 from '../web3';
import { NETWORK } from '../constants';

const mainnetAddr = '0xba3De7e5C189E7009eB36896617416F0b580cCA8';
const testnetAddr = '0x7f5931781a2206317fa366a99a9e985d4f9dd970';
const abi = [{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"success"}],"name":"assignName","inputs":[{"type":"string","name":"name"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"setStorageAddress","inputs":[{"type":"address","name":"addr"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"renounceOwnership","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":""}],"name":"owner","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"isOwner","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint8","name":"limit"}],"name":"getMinLimit","inputs":[{"type":"address","name":"addr"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"success"}],"name":"setMinLimit","inputs":[{"type":"address","name":"addr"},{"type":"uint8","name":"minLimit"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"resolved"}],"name":"resolveName","inputs":[{"type":"string","name":"name"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"success"}],"name":"renounceStorageOwnership","inputs":[],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"success"}],"name":"transferStorageOwnership","inputs":[{"type":"address","name":"newOwner"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner"}],"constant":false},{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[{"type":"address","name":"owner"}]},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","indexed":true},{"type":"address","name":"newOwner","indexed":true}],"anonymous":false}]; // eslint-disable-line

let mainnet;
let testnet;

export default (network) => {
  switch (network) {
    case NETWORK.MAINNET: {
      if (!mainnet) {
        mainnet = new web3.mainnet.eth.Contract(abi, mainnetAddr);
      }
      return mainnet;
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
