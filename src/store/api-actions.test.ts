import { AppThunkDispatch, extractActionsTypes, makeFakeOffer, makeFakeComment, makeFakeUserData } from '../utils/mocks';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOffersAction,
  fetchOfferAction,
  fetchOffersNearbyAction,
  fetchCommentsAction,
  fetchFavoritesAction,
  saveCommentAction,
  changeFavoriteOfferStatusAction,
} from './api-actions';
import { APIRoute } from '../const';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async () => {
      const mockUserData = makeFakeUserData();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUserData);

      await store.dispatch(checkAuthAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const checkAuthActionFulfilled = emittedActions.at(1) as ReturnType<typeof checkAuthAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);

      expect(checkAuthActionFulfilled.payload).toEqual(mockUserData);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "fetchOffersAction.pending", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser = { email: 'test@test.ru', password: '123456' };
      const fakeServerReply = makeFakeUserData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        fetchOffersAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser = { email: 'test@test.ru', password: '123456' };
      const fakeServerReply = makeFakeUserData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReply.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled" when server response 200', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.fulfilled" when server response 200', async () => {
      const mockOffer = makeFakeOffer();
      const offerId = mockOffer.id;
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(200, mockOffer);

      await store.dispatch(fetchOfferAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.rejected" when server response 404', async () => {
      const offerId = 'test-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(404);

      await store.dispatch(fetchOfferAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersNearbyAction', () => {
    it('should dispatch "fetchOffersNearbyAction.pending", "fetchOffersNearbyAction.fulfilled" when server response 200', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      const offerId = 'test-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(200, mockOffers);

      await store.dispatch(fetchOffersNearbyAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersNearbyActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersNearbyAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersNearbyAction.pending.type,
        fetchOffersNearbyAction.fulfilled.type,
      ]);

      expect(fetchOffersNearbyActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersNearbyAction.pending", "fetchOffersNearbyAction.rejected" when server response 400', async () => {
      const offerId = 'test-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(400);

      await store.dispatch(fetchOffersNearbyAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersNearbyAction.pending.type,
        fetchOffersNearbyAction.rejected.type,
      ]);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.fulfilled" when server response 200', async () => {
      const mockComments = [makeFakeComment(), makeFakeComment()];
      const offerId = 'test-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, mockComments);

      await store.dispatch(fetchCommentsAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCommentsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);

      expect(fetchCommentsActionFulfilled.payload).toEqual(mockComments);
    });

    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.rejected" when server response 400', async () => {
      const offerId = 'test-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(400);

      await store.dispatch(fetchCommentsAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.fulfilled" when server response 200', async () => {
      const mockFavorites = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);

      expect(fetchFavoritesActionFulfilled.payload).toEqual(mockFavorites);
    });

    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(400);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('saveCommentAction', () => {
    it('should dispatch "saveCommentAction.pending", "saveCommentAction.fulfilled" when server response 200', async () => {
      const mockComment = makeFakeComment();
      const offerId = 'test-offer-id';
      const commentData = { offerId, comment: 'Test comment', rating: 5 };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(200, mockComment);

      await store.dispatch(saveCommentAction(commentData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const saveCommentActionFulfilled = emittedActions.at(1) as ReturnType<typeof saveCommentAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        saveCommentAction.pending.type,
        saveCommentAction.fulfilled.type,
      ]);

      expect(saveCommentActionFulfilled.payload).toEqual(mockComment);
    });

    it('should dispatch "saveCommentAction.pending", "saveCommentAction.rejected" when server response 400', async () => {
      const offerId = 'test-offer-id';
      const commentData = { offerId, comment: 'Test comment', rating: 5 };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(400);

      await store.dispatch(saveCommentAction(commentData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        saveCommentAction.pending.type,
        saveCommentAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteOfferStatusAction', () => {
    it('should dispatch "changeFavoriteOfferStatusAction.pending", "changeFavoriteOfferStatus", "changeFavoriteOfferStatusAction.fulfilled" when server response 200', async () => {
      const mockOffer = makeFakeOffer();
      const offerId = 'test-offer-id';
      const isFavorite = 1;
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${offerId}/${isFavorite}`).reply(200, mockOffer);

      await store.dispatch(changeFavoriteOfferStatusAction({ offerId, isFavorite }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        changeFavoriteOfferStatusAction.pending.type,
        'OFFERS_DATA/changeFavoriteOfferStatus',
        changeFavoriteOfferStatusAction.fulfilled.type,
      ]);
    });

    it('should dispatch "changeFavoriteOfferStatusAction.pending", "changeFavoriteOfferStatusAction.rejected" when server response 400', async () => {
      const offerId = 'test-offer-id';
      const isFavorite = 1;
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${offerId}/${isFavorite}`).reply(400);

      await store.dispatch(changeFavoriteOfferStatusAction({ offerId, isFavorite }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteOfferStatusAction.pending.type,
        changeFavoriteOfferStatusAction.rejected.type,
      ]);
    });
  });
});

