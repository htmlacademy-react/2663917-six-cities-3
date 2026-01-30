import {AuthorizationStatus} from '../const';
import {store} from '../store';
import {Offer} from './offer';
import {OfferDetailed} from './offer-detailed';
import {UserData} from './user-data';
import {Comment} from '../types/comment';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type OffersData = {
  offers: Offer[];
  offerDetailed?: OfferDetailed;
  offersNearby: Offer[];
  comments: Comment[];
  favorites: Offer[];
  isOfferNotFound: boolean;
  isDataLoading: boolean;
  isCommentSaving: boolean;
}

export type AppProcess = {
  cityName: string;
  error: string | null;
}
