import axios, {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Offer} from '../types/offer.js';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {OfferDetailed} from '../types/offer-detailed';
import {Comment} from '../types/comment';
import {dropToken, saveToken} from '../services/token';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {StatusCodes} from 'http-status-codes';
import {CommentDto} from '../types/comment-dto.js';
import {setError} from './app-process/app-process';
import {changeFavoriteOfferStatus} from './offers-data/offers-data';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<OfferDetailed, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffer',
  async (offerId, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<OfferDetailed>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.NOT_FOUND) {
        return rejectWithValue(StatusCodes.NOT_FOUND);
      }
      throw error;
    }
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffersNearby',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  },
);

export const fetchOfferPageData = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOfferPageData',
  async (offerId, {dispatch}) => {
    await Promise.all([
      dispatch(fetchOfferAction(offerId)),
      dispatch(fetchOffersNearbyAction(offerId)),
      dispatch(fetchCommentsAction(offerId))
    ]);
  },
);

export const fetchFavoritesAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Favorites}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData | null, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  rejectValue: number;
}>(
  'checkAuth',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED) {
        dropToken();
        return rejectWithValue(StatusCodes.UNAUTHORIZED);
      }
      throw error;
    }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({email, password}, {extra: api, dispatch}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(fetchOffersAction());
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  (_arg, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const saveCommentAction = createAsyncThunk<Comment, CommentDto & { offerId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'saveComment',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    return data;
  },
);

export const changeFavoriteOfferStatusAction = createAsyncThunk<void, {offerId: string; isFavorite: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'changeFavoriteOfferStatusAction',
  async ({offerId, isFavorite}, {extra: api, dispatch}) => {
    const {data} = await api.post<OfferDetailed>(`${APIRoute.Favorites}/${offerId}/${isFavorite}`, {offerId, isFavorite});
    dispatch(changeFavoriteOfferStatus(data));
  },
);
