import { internet, datatype, address, lorem, image, name } from 'faker';
import { Offer } from '../types/offer';
import { OfferDetailed } from '../types/offer-detailed';
import { Comment } from '../types/comment';
import { UserData } from '../types/user-data';
import { User } from '../types/user';
import { City } from '../types/city';
import { Location } from '../types/location';
import { OfferType } from '../types/offer-type';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { createAPI } from '../services/api';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeLocation = (): Location => ({
  latitude: datatype.number({ min: -90, max: 90, precision: 0.000001 }),
  longitude: datatype.number({ min: -180, max: 180, precision: 0.000001 }),
  zoom: datatype.number({ min: 10, max: 15 }),
});

export const makeFakeCity = (): City => ({
  name: address.city(),
  location: makeFakeLocation(),
});

const getRandomOfferType = (): OfferType => {
  const types: OfferType[] = ['house', 'room', 'hotel', 'apartment'];
  return types[datatype.number({ min: 0, max: 3 })];
};

export const makeFakeOffer = (): Offer => ({
  id: datatype.uuid(),
  title: lorem.sentence(),
  type: getRandomOfferType(),
  price: datatype.number({ min: 50, max: 500 }),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  previewImage: image.imageUrl(),
});

export const makeFakeOfferDetailed = (): OfferDetailed => ({
  ...makeFakeOffer(),
  description: lorem.paragraphs(),
  bedrooms: datatype.number({ min: 1, max: 5 }),
  goods: Array.from({ length: datatype.number({ min: 1, max: 10 }) }, () => lorem.word()),
  host: {
    name: name.findName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
  },
  images: Array.from({ length: datatype.number({ min: 1, max: 6 }) }, () => image.imageUrl()),
  maxAdults: datatype.number({ min: 1, max: 10 }),
});

export const makeFakeUser = (): User => ({
  name: name.findName(),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
});

export const makeFakeUserData = (): UserData => ({
  email: internet.email(),
  token: datatype.uuid(),
  name: name.findName(),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
});

export const makeFakeComment = (): Comment => ({
  id: datatype.number(),
  date: datatype.datetime().toISOString(),
  user: makeFakeUser(),
  comment: lorem.paragraph(),
  rating: datatype.number({ min: 1, max: 5 }),
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
