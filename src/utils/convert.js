import web3 from '../web3';

export const toLowestDenom = (value, decimals) => {
  if (!value || !decimals) {
    return '';
  }

  return web3.utils.toBN(value)
    .mul(web3.utils.toBN(10).pow(web3.utils.toBN(decimals)))
    .toString(10);
};
