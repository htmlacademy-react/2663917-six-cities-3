import { City } from './types/city';

export const TIMEOUT_SHOW_ERROR = 2000;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '/404'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const CITY: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  }
};

export enum SortType {
  Popular,
  PriceLowToHigh,
  PriceHighToLow,
  TopRated,
}

export enum APIRoute {
  Offers = '/offers',
  Comments = '/comments',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout'
}

export enum NameSpace {
  OffersData = 'OFFERS_DATA',
  User = 'USER',
  App = 'APP'
}
