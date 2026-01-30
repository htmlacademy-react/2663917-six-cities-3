import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { userProcess } from './user-process/user-process';
import { offersData } from './offers-data/offers-data';
import { appProcess } from './app-process/app-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.OffersData]: offersData.reducer,
  [NameSpace.App]: appProcess.reducer,
});
