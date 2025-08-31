import {createReducer} from '@reduxjs/toolkit';
import { changeCity, setOffers } from './action';
import { Offer } from '../types/offer';

const initialState = {
  cityId: 1,
  offers: [] as Offer[],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityId = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
