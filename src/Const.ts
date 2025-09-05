import { City } from './types/city';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITY: City = {
  id: 4,
  name: 'Amsterdam',
  lat: 52.3676,
  lng: 4.9041
};

export const zoom = 12;
