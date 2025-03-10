export interface INumberFormatOptions {
  decimals?: number;
  decimalsMin?: number;
  decimalsMax?: number;
  stripDecimalsIfInteger?: boolean;
  currency?: any;
  useSeparator?: boolean;
}

export default function numberFormat(
  value: number,
  options?: INumberFormatOptions
) {
  const opts = Object.assign(
    {
      decimals: undefined,
      decimalsMin: 0,
      decimalsMax: 5,
      stripDecimalsIfInteger: true,
      currency: false,
      useSeparator: true,
    },
    options
  );

  opts.currency =
    typeof opts.currency === 'boolean' && opts.currency
      ? 'EUR'
      : opts.currency || false;

  return new Intl.NumberFormat('it-IT', {
    style: opts.currency ? 'currency' : 'decimal',
    currency: opts.currency || undefined,
    minimumFractionDigits: opts.decimals || opts.decimalsMin || undefined,
    maximumFractionDigits: opts.decimals || opts.decimalsMax || undefined,
    useGrouping: opts.useSeparator,
    // trailingZeroDisplay: opts.stripDecimalsIfInteger
    //   ? "stripIfInteger"
    //   : undefined,
  }).format(value);
}
