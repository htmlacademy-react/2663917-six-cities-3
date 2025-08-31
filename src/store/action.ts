import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const changeCity = createAction<number>('changeCity');
export const setOffers = createAction<Offer[]>('setOffers');
