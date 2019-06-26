import { isUndefined, isNull } from 'lodash';

export const addressesEqual = (addr1, addr2) => {
  if (!addr1 || !addr2) return false;
  return addr1.toLowerCase() === addr2.toLowerCase();
};

export const toDecimalString = amt => (isUndefined(amt) || isNull(amt)
  ? '0'
  : amt.toString(10));
