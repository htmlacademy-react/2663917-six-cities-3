import {AuthorizationStatus, NameSpace} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user-data';
import {createSelector} from '@reduxjs/toolkit';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State): UserData | null => state[NameSpace.User].userData;

export const getAuthState = createSelector(
  [getAuthorizationStatus, getUserData],
  (authorizationStatus, userData) => ({
    authorizationStatus,
    userData,
    isAuth: authorizationStatus === AuthorizationStatus.Auth,
    isNoAuth: authorizationStatus === AuthorizationStatus.NoAuth
  })
);
