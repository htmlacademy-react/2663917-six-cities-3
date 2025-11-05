import {makeFakeOffer, makeFakeComment} from '../../utils/mocks';
import {fetchOffersAction, fetchOfferAction, fetchOffersNearbyAction, fetchCommentsAction, fetchFavoritesAction, saveCommentAction, logoutAction} from '../api-actions';
import {offersData, setResourceNotFound, changeFavoriteOfferStatus} from './offers-data';

describe('OffersData Slice', () => {
  describe('Basic reducers', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offers: [],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offers: [],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should set "isOfferNotFound" to true with "setResourceNotFound" action', () => {
      const expectedState = {
        offers: [],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOfferNotFound: true,
        isDataLoading: false
      };

      const result = offersData.reducer(undefined, setResourceNotFound(true));

      expect(result).toEqual(expectedState);
    });

    it('should set "isOfferNotFound" to false with "setResourceNotFound" action', () => {
      const initialState = {
        offers: [],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOfferNotFound: true,
        isDataLoading: false
      };

      const expectedState = {
        ...initialState,
        isOfferNotFound: false
      };

      const result = offersData.reducer(initialState, setResourceNotFound(false));

      expect(result).toEqual(expectedState);
    });

    it('should update offer and add to favorites with "changeFavoriteOfferStatus" action', () => {
      const mockOffer = makeFakeOffer();
      mockOffer.isFavorite = false;
      const updatedOffer = { ...mockOffer, isFavorite: true };

      const initialState = {
        offers: [mockOffer],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(initialState, changeFavoriteOfferStatus(updatedOffer));

      expect(result.offers[0]).toEqual(updatedOffer);
      expect(result.favorites).toHaveLength(1);
      expect(result.favorites[0]).toEqual(updatedOffer);
    });

    it('should update offer and remove from favorites with "changeFavoriteOfferStatus" action', () => {
      const mockOffer = makeFakeOffer();
      mockOffer.isFavorite = true;
      const updatedOffer = { ...mockOffer, isFavorite: false };

      const initialState = {
        offers: [mockOffer],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [mockOffer],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(initialState, changeFavoriteOfferStatus(updatedOffer));

      expect(result.offers[0]).toEqual(updatedOffer);
      expect(result.favorites).toHaveLength(0);
    });

    it('should update offerDetailed and offersNearby when setting isFavorite to true with "changeFavoriteOfferStatus" action', () => {
      const mockOffer = makeFakeOffer();
      mockOffer.isFavorite = false;
      const updatedOffer = { ...mockOffer, isFavorite: true };

      const initialState = {
        offers: [mockOffer],
        offerDetailed: mockOffer,
        offersNearby: [mockOffer],
        comments: [],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(initialState, changeFavoriteOfferStatus(updatedOffer));

      expect(result.offers[0]).toEqual(updatedOffer);
      expect(result.offerDetailed).toEqual(updatedOffer);
      expect(result.offersNearby[0]).toEqual(updatedOffer);
      expect(result.favorites).toHaveLength(1);
      expect(result.favorites[0]).toEqual(updatedOffer);
    });

    it('should update offerDetailed and offersNearby when setting isFavorite to false with "changeFavoriteOfferStatus" action', () => {
      const mockOffer = makeFakeOffer();
      mockOffer.isFavorite = true;
      const updatedOffer = { ...mockOffer, isFavorite: false };

      const initialState = {
        offers: [mockOffer],
        offerDetailed: mockOffer,
        offersNearby: [mockOffer],
        comments: [],
        favorites: [mockOffer],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(initialState, changeFavoriteOfferStatus(updatedOffer));

      expect(result.offers[0]).toEqual(updatedOffer);
      expect(result.offerDetailed).toEqual(updatedOffer);
      expect(result.offersNearby[0]).toEqual(updatedOffer);
      expect(result.favorites).toHaveLength(0);
    });
  });

  describe('fetchOffersAction', () => {
    it('should set "isDataLoading" to true with "fetchOffersAction.pending"', () => {
      const expectedState = {
        offers: [],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: true
      };

      const result = offersData.reducer(undefined, fetchOffersAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "offers" to array with offers, "isDataLoading" to false with "fetchOffersAction.fulfilled"', () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      const expectedState = {
        offers: mockOffers,
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(
        undefined,
        fetchOffersAction.fulfilled(mockOffers, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "isDataLoading" to false with "fetchOffersAction.rejected"', () => {
      const expectedState = {
        offers: [],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(undefined, fetchOffersAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchOfferAction', () => {
    it('should set "offerDetailed" with "fetchOfferAction.fulfilled"', () => {
      const mockOffer = makeFakeOffer();

      const result = offersData.reducer(
        undefined,
        fetchOfferAction.fulfilled(mockOffer, '', '')
      );

      expect(result.offerDetailed).toEqual(mockOffer);
    });

    it('should set "isOfferNotFound" to "true" with "fetchOfferAction.rejected" when status is 404', () => {
      const result = offersData.reducer(
        undefined,
        {
          type: fetchOfferAction.rejected,
          payload: 404,
          meta: { rejectedWithValue: true, requestId: '', requestStatus: 'rejected' }
        }
      );

      expect(result.isOfferNotFound).toBe(true);
    });

    it('should not change state with "fetchOfferAction.rejected" when status is not 404', () => {
      const initialState = {
        offers: [],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(
        initialState,
        {
          type: fetchOfferAction.rejected,
          payload: 500,
          meta: { rejectedWithValue: true, requestId: '', requestStatus: 'rejected' }
        }
      );

      expect(result).toEqual(initialState);
    });
  });

  describe('fetchOffersNearbyAction', () => {
    it('should set "offersNearby" with "fetchOffersNearbyAction.fulfilled"', () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];

      const result = offersData.reducer(
        undefined,
        fetchOffersNearbyAction.fulfilled(mockOffers, '', '')
      );

      expect(result.offersNearby).toEqual(mockOffers);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should set "comments" with "fetchCommentsAction.fulfilled"', () => {
      const mockComments = [makeFakeComment(), makeFakeComment()];

      const result = offersData.reducer(
        undefined,
        fetchCommentsAction.fulfilled(mockComments, '', '')
      );

      expect(result.comments).toEqual(mockComments);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should set "favorites" and update "isFavorite" in offers with "fetchFavoritesAction.fulfilled"', () => {
      const offer1 = makeFakeOffer();
      const offer2 = makeFakeOffer();
      offer1.isFavorite = true;

      const initialState = {
        offers: [
          { ...offer1, isFavorite: false },
          { ...offer2, isFavorite: false }
        ],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const favoriteOffersFromServer = [offer1];

      const result = offersData.reducer(
        initialState,
        fetchFavoritesAction.fulfilled(favoriteOffersFromServer, '', undefined)
      );

      expect(result.offers[0].isFavorite).toBe(true);
      expect(result.offers[1].isFavorite).toBe(false);
      expect(result.favorites).toEqual(favoriteOffersFromServer);
    });

    it('should update "isFavorite" in offerDetailed with "fetchFavoritesAction.fulfilled"', () => {
      const offer1 = makeFakeOffer();
      const offer2 = makeFakeOffer();
      offer1.isFavorite = true;

      const initialState = {
        offers: [
          { ...offer1, isFavorite: false },
          { ...offer2, isFavorite: true }
        ],
        offerDetailed: { ...offer2, isFavorite: true },
        offersNearby: [],
        comments: [],
        favorites: [offer2],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const favoriteOffersFromServer = [offer1];

      const result = offersData.reducer(
        initialState,
        fetchFavoritesAction.fulfilled(favoriteOffersFromServer, '', undefined)
      );

      expect(result.offerDetailed?.isFavorite).toBe(false);
    });

    it('should update "isFavorite" in offersNearby with "fetchFavoritesAction.fulfilled"', () => {
      const offer1 = makeFakeOffer();
      const offer2 = makeFakeOffer();
      const offer3 = makeFakeOffer();
      offer2.isFavorite = true;

      const initialState = {
        offers: [
          { ...offer1, isFavorite: false },
          { ...offer2, isFavorite: false },
          { ...offer3, isFavorite: false }
        ],
        offerDetailed: { ...offer1, isFavorite: false },
        offersNearby: [
          { ...offer2, isFavorite: false },
          { ...offer3, isFavorite: false }
        ],
        comments: [],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const favoriteOffersFromServer = [offer2];

      const result = offersData.reducer(
        initialState,
        fetchFavoritesAction.fulfilled(favoriteOffersFromServer, '', undefined)
      );

      expect(result.offersNearby[0].isFavorite).toBe(true);
      expect(result.offersNearby[1].isFavorite).toBe(false);
    });

    it('should update "isFavorite" in all collections with "fetchFavoritesAction.fulfilled"', () => {
      const offer1 = makeFakeOffer();
      const offer2 = makeFakeOffer();
      const offer3 = makeFakeOffer();
      const offer4 = makeFakeOffer();
      offer2.isFavorite = true;
      offer3.isFavorite = true;

      const initialState = {
        offers: [
          { ...offer1, isFavorite: true },
          { ...offer2, isFavorite: false },
          { ...offer3, isFavorite: true },
          { ...offer4, isFavorite: false }
        ],
        offerDetailed: { ...offer3, isFavorite: true },
        offersNearby: [
          { ...offer1, isFavorite: true },
          { ...offer4, isFavorite: false }
        ],
        comments: [],
        favorites: [offer1, offer3],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const favoriteOffersFromServer = [offer2, offer3];

      const result = offersData.reducer(
        initialState,
        fetchFavoritesAction.fulfilled(favoriteOffersFromServer, '', undefined)
      );

      expect(result.favorites).toEqual(favoriteOffersFromServer);
      expect(result.offers[0].isFavorite).toBe(false);
      expect(result.offers[1].isFavorite).toBe(true);
      expect(result.offers[2].isFavorite).toBe(true);
      expect(result.offers[3].isFavorite).toBe(false);
      expect(result.offerDetailed?.isFavorite).toBe(true);
      expect(result.offersNearby[0].isFavorite).toBe(false);
      expect(result.offersNearby[1].isFavorite).toBe(false);
    });
  });

  describe('saveCommentAction', () => {
    it('should add comment to "comments" with "saveCommentAction.fulfilled"', () => {
      const existingComment = makeFakeComment();
      const newComment = makeFakeComment();

      const initialState = {
        offers: [],
        offerDetailed: undefined,
        offersNearby: [],
        comments: [existingComment],
        favorites: [],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(
        initialState,
        saveCommentAction.fulfilled(newComment, '', { offerId: '1', comment: '', rating: 5 })
      );

      expect(result.comments).toHaveLength(2);
      expect(result.comments[1]).toEqual(newComment);
    });
  });

  describe('logoutAction', () => {
    it('should clear all favorites and set isFavorite to false with "logoutAction.fulfilled"', () => {
      const offer1 = makeFakeOffer();
      const offer2 = makeFakeOffer();
      offer1.isFavorite = true;
      offer2.isFavorite = true;

      const initialState = {
        offers: [offer1, offer2],
        offerDetailed: offer1,
        offersNearby: [offer2],
        comments: [],
        favorites: [offer1, offer2],
        isOfferNotFound: false,
        isDataLoading: false
      };

      const result = offersData.reducer(initialState, logoutAction.fulfilled);

      expect(result.offers[0].isFavorite).toBe(false);
      expect(result.offers[1].isFavorite).toBe(false);
      expect(result.offerDetailed?.isFavorite).toBe(false);
      expect(result.offersNearby[0].isFavorite).toBe(false);
      expect(result.favorites).toHaveLength(0);
    });
  });
});

