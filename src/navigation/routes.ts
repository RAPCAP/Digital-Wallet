import { NavigationProp, RouteProp } from '@react-navigation/native';
import { StackScreenProps as DefaultStackScreenProps } from '@react-navigation/stack';

export enum Routes {
  Home = 'Home',

  Dashboard = 'Dashboard',
  Settings = 'Settings',

  ModalAddCard = 'ModalAddCard',
  ModalAddTransaction = 'ModalAddTransaction',
}

type NoAdditionOptions = {} | undefined;

export type ModalAddTransactionParamList = {
  cardIndex: number;
};

export type RouteParamMap = {
  [Routes.Home]: NoAdditionOptions;

  [Routes.Dashboard]: NoAdditionOptions;
  [Routes.Settings]: NoAdditionOptions;

  [Routes.ModalAddCard]: NoAdditionOptions;
  [Routes.ModalAddTransaction]: ModalAddTransactionParamList;
};

export type RoutesParams = NavigationProp<RouteParamMap>;

export type UseRouseParams<Screen extends keyof RouteParamMap> = RouteProp<
  RouteParamMap,
  Screen
>;

export type StackScreenProps = DefaultStackScreenProps<RouteParamMap, Routes>;
