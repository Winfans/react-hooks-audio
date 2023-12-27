import { ReactElement } from 'react';

export interface AppRoute {
  path: string;
  name: string;
  component?: ReactElement;
  routes?: AppRoutes;
}

export type AppRoutes = Array<AppRoute>;

export interface AppRouteConfig {
  route: AppRoute;
}
