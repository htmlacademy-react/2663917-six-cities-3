import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {createSelector} from '@reduxjs/toolkit';

export const getCityName = (state: State): string => state[NameSpace.App].cityName;
export const getError = (state: State): string | null => state[NameSpace.App].error;

export const getAppState = createSelector(
  [(state: State) => state[NameSpace.OffersData].isDataLoading, (state: State) => state[NameSpace.User].authorizationStatus],
  (isDataLoading, authorizationStatus) => ({
    isDataLoading,
    authorizationStatus
  })
);
