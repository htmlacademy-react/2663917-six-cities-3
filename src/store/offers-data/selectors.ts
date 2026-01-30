import {NameSpace} from '../../const';
import {Offer} from '../../types/offer';
import {OfferDetailed} from '../../types/offer-detailed';
import {State} from '../../types/state';
import {Comment} from '../../types/comment';
import {createSelector} from '@reduxjs/toolkit';

export const getIsDataLoading = (state: State): boolean => state[NameSpace.OffersData].isDataLoading;
export const getFavorites = (state: State): Offer[] => state[NameSpace.OffersData].favorites;
export const getOffers = (state: State): Offer[] => state[NameSpace.OffersData].offers;
export const getOfferDetailed = (state: State): OfferDetailed | undefined => state[NameSpace.OffersData].offerDetailed;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.OffersData].offersNearby;
export const getIsOfferNotFound = (state: State): boolean => state[NameSpace.OffersData].isOfferNotFound;
export const getComments = (state: State): Comment[] => state[NameSpace.OffersData].comments;
export const getIsCommentSaving = (state: State): boolean => state[NameSpace.OffersData].isCommentSaving;

export const getOffersByCity = createSelector(
  [getOffers, (state: State) => state[NameSpace.App].cityName],
  (offers, cityName) => offers.filter((offer) => offer.city.name === cityName)
);

export const getOfferPageData = createSelector(
  [getOfferDetailed, getIsOfferNotFound, getOffersNearby, getComments],
  (offerDetailed, isOfferNotFound, offersNearby, comments) => ({
    offerDetailed,
    isOfferNotFound,
    offersNearby,
    comments
  })
);
