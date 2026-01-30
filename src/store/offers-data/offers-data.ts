import {createSlice, isRejectedWithValue, PayloadAction} from '@reduxjs/toolkit';
import {fetchOffersAction, fetchOfferAction, fetchOffersNearbyAction, fetchCommentsAction, fetchFavoritesAction, saveCommentAction, logoutAction} from '../api-actions'; // Скоро обновим api-actions
import {NameSpace} from '../../const';
import {OffersData} from '../../types/state';
import {StatusCodes} from 'http-status-codes';
import { OfferDetailed } from '../../types/offer-detailed';

const initialState: OffersData = {
  offers: [],
  offerDetailed: undefined,
  offersNearby: [],
  comments: [],
  favorites: [],
  isOfferNotFound: false,
  isDataLoading: false,
  isCommentSaving: false
};

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    setResourceNotFound: (state, action: PayloadAction<boolean>) => {
      state.isOfferNotFound = action.payload;
    },
    changeFavoriteOfferStatus: (state, action: PayloadAction<OfferDetailed>) => {
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

        const favoritesFromOffers = action.payload.filter((offer) => offer.isFavorite);
        const favoriteIds = new Set(favoritesFromOffers.map((fav) => fav.id));

        // синхронизируем текущее подробное предложение
        if (state.offerDetailed) {
          state.offerDetailed = {
            ...state.offerDetailed,
            isFavorite: favoriteIds.has(state.offerDetailed.id),
          };
        }

        // синхронизируем предложения поблизости
        state.offersNearby = state.offersNearby.map((offer) => ({
          ...offer,
          isFavorite: favoriteIds.has(offer.id),
        }));

        // сохраняем favorites из ответа /offers
        state.favorites = favoritesFromOffers;

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
        const favorites = action.payload;
        const favoriteIds = new Set(favorites.map((fav) => fav.id));

        state.offers = state.offers.map((offer) => ({
          ...offer,
          isFavorite: favoriteIds.has(offer.id)
        }));

        if (state.offerDetailed) {
          state.offerDetailed = {
            ...state.offerDetailed,
            isFavorite: favoriteIds.has(state.offerDetailed.id)
          };
        }

        state.offersNearby = state.offersNearby.map((offer) => ({
          ...offer,
          isFavorite: favoriteIds.has(offer.id)
        }));

        state.favorites = favorites;
      })
      .addCase(saveCommentAction.pending, (state) => {
        state.isCommentSaving = true;
      })
      .addCase(saveCommentAction.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.isCommentSaving = false;
      })
      .addCase(saveCommentAction.rejected, (state) => {
        state.isCommentSaving = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.offers = state.offers.map((offer) => ({
          ...offer,
          isFavorite: false
        }));

        if (state.offerDetailed) {
          state.offerDetailed = {
            ...state.offerDetailed,
            isFavorite: false
          };
        }

        state.offersNearby = state.offersNearby.map((offer) => ({
          ...offer,
          isFavorite: false
        }));

        state.favorites = [];
      });
  },
});

export const { setResourceNotFound, changeFavoriteOfferStatus } = offersData.actions;
