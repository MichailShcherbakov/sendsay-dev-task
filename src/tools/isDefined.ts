export function isDefined<TType>(val: TType | undefined): val is TType {
  return val !== undefined;
}
