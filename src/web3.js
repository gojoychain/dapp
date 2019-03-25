import Web3 from 'web3';

export default window.web3 && new Web3(window.web3.currentProvider);
