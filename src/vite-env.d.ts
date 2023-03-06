/// <reference types="vite/client" />

declare module "*.svg" {
  const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
  export { ReactComponent };
  export default { ReactComponent };
}
