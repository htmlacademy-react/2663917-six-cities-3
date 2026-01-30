import {createSlice, isRejectedWithValue} from '@reduxjs/toolkit';
import {UserProcess} from '../../types/state';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import { AuthorizationStatus, NameSpace } from '../../const';
import { StatusCodes } from 'http-status-codes';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userData: null
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        if (isRejectedWithValue(action) && action.payload === StatusCodes.UNAUTHORIZED) {
          state.authorizationStatus = AuthorizationStatus.NoAuth;
          state.userData = null;
        }
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      });
  }
});
