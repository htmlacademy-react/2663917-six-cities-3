import {NameSpace} from '../../Const';
import {Offer} from '../../types/offer';
import {State} from '../../types/state';
import {Comment} from '../../types/comment';

export const getIsDataLoading = (state: State): boolean => state[NameSpace.OffersData].isDataLoading;
export const getFavorites = (state: State): Offer[] => state[NameSpace.OffersData].favorites;
export const getOffers = (state: State): Offer[] => state[NameSpace.OffersData].offers;
export const getOfferDetailed = (state: State): Offer | undefined => state[NameSpace.OffersData].offerDetailed;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.OffersData].offersNearby;
export const getIsOfferNotFound = (state: State): boolean => state[NameSpace.OffersData].isOfferNotFound;
export const getComments = (state: State): Comment[] => state[NameSpace.OffersData].comments;
