import web3 from '../web3';
import { CHAIN_ID } from '../config';

// TODO: replace mainnet with real address after deployed
const mainnetAddr = '';
const testnetAddr = '0x74D3c11079aF744494a385008996fcABa64a89F4';
const abi = [{"constant": true,"inputs": [],"name": "withdrawInterval","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "withdraw","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "withdrawAmount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "renounceOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "newReceiver","type": "address"}],"name": "setReceiver","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "isOwner","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lastWithdrawBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "receiver","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [{"name": "owner","type": "address"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"},{"indexed": true,"name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "to","type": "address"},{"indexed": false,"name": "amount","type": "uint256"}],"name": "Withdrawal","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "oldReceiver","type": "address"},{"indexed": true,"name": "newReceiver","type": "address"}],"name": "ReceiverSet","type": "event"}]; // eslint-disable-line

let mainnet;
let testnet;

export default () => {
  switch (web3.givenProvider.networkVersion) {
    case CHAIN_ID.MAINNET: {
      if (!mainnet && mainnetAddr) {
        mainnet = new web3.eth.Contract(abi, mainnetAddr);
      }
      return mainnet;
    }
    case CHAIN_ID.TESTNET: {
      if (!testnet && testnetAddr) {
        testnet = new web3.eth.Contract(abi, testnetAddr);
      }
      return testnet;
    }
    default: {
      return undefined;
    }
  }
};
