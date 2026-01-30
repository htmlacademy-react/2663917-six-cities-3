import { render, screen } from '@testing-library/react';
import HeaderUserProfile from './header-user-profile';
import { withBrowserRouter, withStore } from '../../utils/mock-component';
import { makeFakeUserData } from '../../utils/mocks';
import { AuthorizationStatus, NameSpace } from '../../const';

describe('Component: HeaderUserProfile', () => {
  it('should render AnonymousHeaderUserProfile when user is not authorized', () => {
    const { withStoreComponent } = withStore(
      <HeaderUserProfile />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render AuthorizedHeaderUserProfile when user is authorized', () => {
    const mockUserData = makeFakeUserData();

    const { withStoreComponent } = withStore(
      <HeaderUserProfile />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: mockUserData,
        },
        [NameSpace.OffersData]: {
          offers: [],
          offersNearby: [],
          comments: [],
          favorites: [],
          isOfferNotFound: false,
          isDataLoading: false,
          isCommentSaving: false
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should not render AuthorizedHeaderUserProfile when user is authorized but userData is null', () => {
    const { withStoreComponent } = withStore(
      <HeaderUserProfile />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should render nav element with correct class', () => {
    const { withStoreComponent } = withStore(
      <HeaderUserProfile />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const navElement = container.querySelector('.header__nav');

    expect(navElement).toBeInTheDocument();
  });
});

