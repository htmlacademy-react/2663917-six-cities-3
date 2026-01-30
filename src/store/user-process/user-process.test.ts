import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';
import { AuthorizationStatus } from '../../const';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    };

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('checkAuthAction', () => {
    it('should set "Unknown" with "checkAuthAction.pending"', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null
      };

      const result = userProcess.reducer(
        initialState,
        checkAuthAction.pending('', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "Auth" and user data with "checkAuthAction.fulfilled"', () => {
      const mockUserData = makeFakeUserData();
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: mockUserData
      };

      const result = userProcess.reducer(
        undefined,
        checkAuthAction.fulfilled(mockUserData, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "NoAuth" and clear user data with "checkAuthAction.rejected" when status is 401', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData()
      };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      };

      const result = userProcess.reducer(
        initialState,
        {
          type: checkAuthAction.rejected.type,
          payload: 401,
          error: { name: '', message: '' },
          meta: { rejectedWithValue: true, arg: undefined, requestId: '', requestStatus: 'rejected' as const }
        }
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('loginAction', () => {
    it('should set "Auth" and user data with "loginAction.fulfilled"', () => {
      const mockUserData = makeFakeUserData();
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: mockUserData
      };

      const result = userProcess.reducer(
        undefined,
        loginAction.fulfilled(mockUserData, '', { email: '', password: '' })
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "NoAuth" and clear user data with "loginAction.rejected"', () => {
      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      };

      const result = userProcess.reducer(
        undefined,
        loginAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('logoutAction', () => {
    it('should set "NoAuth" and clear user data with "logoutAction.fulfilled"', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData()
      };

      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      };

      const result = userProcess.reducer(initialState, logoutAction.fulfilled);

      expect(result).toEqual(expectedState);
    });

    it('should set "NoAuth" and clear user data with "logoutAction.rejected"', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData()
      };

      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      };

      const result = userProcess.reducer(initialState, logoutAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });
});

