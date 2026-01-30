import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthorizedHeaderUserProfile from './authorized-header-user-profile';
import { withBrowserRouter, withStore } from '../../utils/mock-component';
import { makeFakeOffer, extractActionsTypes } from '../../utils/mocks';
import { APIRoute, NameSpace } from '../../const';
import { logoutAction } from '../../store/api-actions';

describe('Component: AuthorizedHeaderUserProfile', () => {
  it('should render correctly', () => {
    const userEmail = 'test@test.com';
    const userAvatarUrl = 'https://15.design.htmlacademy.pro/avatar.jpg';
    const mockFavorites = [makeFakeOffer(), makeFakeOffer()];

    const { withStoreComponent } = withStore(
      <AuthorizedHeaderUserProfile userEmail={userEmail} userAvatarUrl={userAvatarUrl} />,
      {
        [NameSpace.OffersData]: {
          offers: [],
          offersNearby: [],
          comments: [],
          favorites: mockFavorites,
          isOfferNotFound: false,
          isDataLoading: false,
          isCommentSaving: false
        },
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(userEmail)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(mockFavorites.length.toString())).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });

  it('should dispatch logoutAction when user click "Sign out" button', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <AuthorizedHeaderUserProfile userEmail='test@test.com' userAvatarUrl='https://15.design.htmlacademy.pro/avatar.jpg' />,
      {
        [NameSpace.OffersData]: {
          offers: [],
          offersNearby: [],
          comments: [],
          favorites: [],
          isOfferNotFound: false,
          isDataLoading: false,
          isCommentSaving: false
        },
      }
    );
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([logoutAction.pending.type, logoutAction.fulfilled.type]);
  });
});

