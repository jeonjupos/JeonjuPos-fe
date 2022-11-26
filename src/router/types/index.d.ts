export interface RouteMeta {
  [key: string]: any;
}
export interface Route {
  path: string;
  element?: JSX.Element;
  meta?: RouteMeta;
}
