import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { OfferDetailed } from '../types/offer-detailed';
import { Comment } from '../types/comment';
import { AuthorizationStatus } from '../Const';
import { UserData } from '../types/user-data';

export const changeCity = createAction<string>('changeCity');
export const loadOffers = createAction<Offer[]>('loadOffers');
export const loadOffer = createAction<OfferDetailed>('loadOffer');
export const loadOffersNearby = createAction<{ offerId: string; offers: Offer[] }>('loadOffersNearby');
export const loadComments = createAction<{ offerId: string; comments: Comment[] }>('loadComments');
export const loadFavorites = createAction<Offer[]>('loadFavorites');
export const setDataLoadingStatus = createAction<boolean>('setDataLoadingStatus');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('setAuthorizationStatus');
export const setError = createAction<string | null>('setError');
export const loadUserData = createAction<{userData: UserData | null}>('loadUserData');
