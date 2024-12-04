export const darkenHex = (hex: string | undefined, percent: number) => {
  if (hex && percent) {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.floor((num >> 16) * (1 - percent));
    const g = Math.floor(((num >> 8) & 0x00ff) * (1 - percent));
    const b = Math.floor((num & 0x0000ff) * (1 - percent));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }
  return "";
};
