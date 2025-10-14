import {createSlice, isRejectedWithValue, PayloadAction} from '@reduxjs/toolkit';
import {fetchOffersAction, fetchOfferAction, fetchOffersNearbyAction, fetchCommentsAction, fetchFavoritesAction, saveCommentAction} from '../api-actions'; // Скоро обновим api-actions
import {NameSpace} from '../../Const';
import {OffersData} from '../../types/state';
import {StatusCodes} from 'http-status-codes';

const initialState: OffersData = {
  offers: [],
  offerDetailed: undefined,
  offersNearby: [],
  comments: [],
  favorites: [],
  isOfferNotFound: false,
  isDataLoading: false
};

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    setResourceNotFound: (state, action: PayloadAction<boolean>) => {
      state.isOfferNotFound = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offerDetailed = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        if (isRejectedWithValue(action) && action.payload === StatusCodes.NOT_FOUND) {
          state.isOfferNotFound = true;
        }
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(saveCommentAction.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const { setResourceNotFound } = offersData.actions;
