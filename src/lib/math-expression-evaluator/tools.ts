export type Optional<TType> = TType | undefined;

type PropType = string | number | symbol;

export function hasProp<TObj extends object>(
  obj: TObj,
  prop: PropType,
): prop is keyof TObj {
  return prop in obj;
}
