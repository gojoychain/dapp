export const addressesEqual = (addr1, addr2) => {
  if (!addr1 || !addr2) return false;
  return addr1.toLowerCase() === addr2.toLowerCase();
};
