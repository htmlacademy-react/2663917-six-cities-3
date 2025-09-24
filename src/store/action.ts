import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { OfferDetailed } from '../types/offer-detailed';
import { Comment } from '../types/comment';

export const changeCity = createAction<string>('changeCity');
export const loadOffers = createAction<Offer[]>('loadOffers');
export const loadOffer = createAction<OfferDetailed>('loadOffer');
export const loadOffersNearby = createAction<{ offerId: string; offers: Offer[] }>('loadOffersNearby');
export const loadComments = createAction<{ offerId: string; comments: Comment[] }>('loadComments');
export const loadFavorites = createAction<Offer[]>('loadFavorites');
export const setDataLoadingStatus = createAction<boolean>('setDataLoadingStatus');

