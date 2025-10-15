import {createSlice, isRejectedWithValue, PayloadAction} from '@reduxjs/toolkit';
import {fetchOffersAction, fetchOfferAction, fetchOffersNearbyAction, fetchCommentsAction, fetchFavoritesAction, saveCommentAction} from '../api-actions'; // Скоро обновим api-actions
import {NameSpace} from '../../Const';
import {OffersData} from '../../types/state';
import {StatusCodes} from 'http-status-codes';
import {Offer} from '../../types/offer';

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
    changeFavoriteOfferStatus: (state, action: PayloadAction<Offer>) => {
      const index = state.offers.findIndex((o) => o.id === action.payload.id);
      state.offers[index] = action.payload;

      if (state.offerDetailed && state.offerDetailed.id === action.payload.id) {
        state.offerDetailed = action.payload;
      }

      const offersNearbyIndex = state.offersNearby.findIndex((o) => o.id === action.payload.id);
      if (offersNearbyIndex !== -1) {
        state.offersNearby[offersNearbyIndex] = action.payload;
      }

      if (action.payload.isFavorite) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload.id);
      }
    }
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

export const { setResourceNotFound, changeFavoriteOfferStatus } = offersData.actions;
