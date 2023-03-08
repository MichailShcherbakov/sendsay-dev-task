export function isFunc(maybeFn: unknown): maybeFn is CallableFunction {
  return typeof maybeFn === "function";
}
