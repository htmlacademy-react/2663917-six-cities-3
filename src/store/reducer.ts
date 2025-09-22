import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { changeCity, loadComments, loadFavorites, loadOffer, loadOffers, loadOffersNearby } from './action';
import { Offer } from '../types/offer';
import { OfferDetailed } from '../types/offer-detailed';
import { Comment } from '../types/comment';

const initialState = {
  cityName: 'Paris',
  offers: [] as Offer[],
  offersDetailed: [] as OfferDetailed[],
  offersNearby: {} as Record<string, Offer[]>,
  comments: {} as Record<string, Comment[]>,
  favorites: [] as Offer[],
  isDataLoading: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      const newOffer = action.payload;
      const existingOfferIndex = state.offersDetailed.findIndex(
        (offer) => offer.id === newOffer.id
      );
      if (existingOfferIndex !== -1) {
        state.offersDetailed[existingOfferIndex] = newOffer;
      } else {
        state.offersDetailed.push(newOffer);
      }
    })
    .addCase(loadOffersNearby, (state, action: PayloadAction<{ offerId: string; offers: Offer[] }>) => {
      const { offerId, offers } = action.payload;
      state.offersNearby[offerId] = offers;
    })
    .addCase(loadComments, (state, action: PayloadAction<{ offerId: string; comments: Comment[] }>) => {
      const { offerId, comments } = action.payload;
      state.comments[offerId] = comments;
    })
    .addCase(loadFavorites, (state, action: PayloadAction<Offer[]>) => {
      state.favorites = action.payload;
    });
});
