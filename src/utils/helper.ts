export default class Helper {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  static toCurrency = (amount: number, currency: string) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: (amount / 100) % 1 === 0 ? 0 : 2,
  }).format(
    amount / 100,
  ).replace(/^(\D+)/, '$1 ');
}
