import { render, screen } from '@testing-library/react';
import App from './app';
import { withStore } from '../../utils/mock-component';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { extractActionsTypes } from '../../utils/mocks';
import { fetchFavoritesAction } from '../../store/api-actions';
import { cities } from '../../mocks/cities';

// Мокаем страницы, чтобы тестировать только роутинг
vi.mock('../../pages/main/main', () => ({
  default: () => <div>Main page</div>
}));

vi.mock('../../pages/login/login', () => ({
  default: () => <div>Login page</div>
}));

vi.mock('../../pages/favorites/favorites', () => ({
  default: () => <div>Favorites page</div>
}));

vi.mock('../../pages/offer/offer', () => ({
  default: () => <div>Offer page</div>
}));

vi.mock('../../pages/not-found/not-found', () => ({
  default: () => <div>Not found page</div>
}));

vi.mock('../../loading-screen', () => ({
  default: () => <div>Loading screen</div>
}));

describe('Component: App', () => {
  beforeEach(() => {
    // Очищаем историю перед каждым тестом
    window.history.pushState({}, '', '/');
  });

  it('should render LoadingScreen when data is loading', () => {
    const { withStoreComponent } = withStore(
      <App cities={cities} />,
      {
        [NameSpace.OffersData]: {
          offers: [],
          offersNearby: [],
          comments: [],
          favorites: [],
          isOfferNotFound: false,
          isDataLoading: true,
          isCommentSaving: false
        },
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Loading screen')).toBeInTheDocument();
  });

  it('should render Main page on root route', () => {
    window.history.pushState({}, '', AppRoute.Main);

    const { withStoreComponent } = withStore(
      <App cities={cities} />,
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
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('should render Login page on login route', () => {
    window.history.pushState({}, '', AppRoute.Login);

    const { withStoreComponent } = withStore(
      <App cities={cities} />,
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
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should render Favorites page on favorites route when user is authorized', () => {
    window.history.pushState({}, '', AppRoute.Favorites);

    const { withStoreComponent } = withStore(
      <App cities={cities} />,
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
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        },
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Favorites page')).toBeInTheDocument();
  });

  it('should redirect to Login page when accessing favorites route without authorization', () => {
    window.history.pushState({}, '', AppRoute.Favorites);

    const { withStoreComponent } = withStore(
      <App cities={cities} />,
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
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Favorites page')).not.toBeInTheDocument();
  });

  it('should render NotFound page on unknown route', () => {
    window.history.pushState({}, '', '/unknown-route');

    const { withStoreComponent } = withStore(
      <App cities={cities} />,
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
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });

  it('should not dispatch fetchFavoritesAction when user is not authorized', () => {
    window.history.pushState({}, '', AppRoute.Main);

    const { withStoreComponent, mockStore } = withStore(
      <App cities={cities} />,
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
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        },
      }
    );

    render(withStoreComponent);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).not.toContain(fetchFavoritesAction.pending.type);
  });
});
