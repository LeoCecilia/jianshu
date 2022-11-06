export function readableNumber(value: number = 0) {
  return value.toString().replace(/(\d)(?=(\d{3})+(\.\d+)?$)/g, "$1,");
}

export function formatNumber(num: number = 0) {
  return num >= 1e3 ? (num / 1e3).toFixed(1) + "k" : num;
}
