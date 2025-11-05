import { internet, datatype, address, lorem, image, name } from 'faker';
import { Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { UserData } from '../types/user-data';
import { User } from '../types/user';
import { City } from '../types/city';
import { Location } from '../types/location';

export const makeFakeLocation = (): Location => ({
  latitude: datatype.number({ min: -90, max: 90, precision: 0.000001 }),
  longitude: datatype.number({ min: -180, max: 180, precision: 0.000001 }),
  zoom: datatype.number({ min: 10, max: 15 }),
});

export const makeFakeCity = (): City => ({
  name: address.city(),
  location: makeFakeLocation(),
});

export const makeFakeOffer = (): Offer => ({
  id: datatype.uuid(),
  title: lorem.sentence(),
  type: datatype.number({ min: 0, max: 3 }) === 0 ? 'house' : 
    datatype.number({ min: 0, max: 3 }) === 1 ? 'room' : 
    datatype.number({ min: 0, max: 3 }) === 2 ? 'hotel' : 'apartment',
  price: datatype.number({ min: 50, max: 500 }),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  previewImage: image.imageUrl(),
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

