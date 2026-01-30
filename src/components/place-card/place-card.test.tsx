import { render, screen, fireEvent } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import PlaceCard from './place-card';
import { withBrowserRouter, withStore } from '../../utils/mock-component';
import { makeFakeOffer, extractActionsTypes } from '../../utils/mocks';
import { AuthorizationStatus, NameSpace, APIRoute, AppRoute } from '../../const';
import { changeFavoriteOfferStatusAction } from '../../store/api-actions';

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();
    const mockOnSetActive = vi.fn();
    const mockOnResetActive = vi.fn();

    const { withStoreComponent } = withStore(
      <PlaceCard offer={mockOffer} onSetActive={mockOnSetActive} onResetActive={mockOnResetActive} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toBeInTheDocument();
  });

  it('should render premium mark when offer is premium', () => {
    const mockOffer = { ...makeFakeOffer(), isPremium: true };
    const mockOnSetActive = vi.fn();
    const mockOnResetActive = vi.fn();

    const { withStoreComponent } = withStore(
      <PlaceCard offer={mockOffer} onSetActive={mockOnSetActive} onResetActive={mockOnResetActive} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render active bookmark button when user is authorized and offer is favorite', () => {
    const mockOffer = { ...makeFakeOffer(), isFavorite: true };
    const mockOnSetActive = vi.fn();
    const mockOnResetActive = vi.fn();

    const { withStoreComponent } = withStore(
      <PlaceCard offer={mockOffer} onSetActive={mockOnSetActive} onResetActive={mockOnResetActive} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const bookmarkButton = container.querySelector('.place-card__bookmark-button');

    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('should render inactive bookmark button when offer is not favorite', () => {
    const mockOffer = { ...makeFakeOffer(), isFavorite: false };
    const mockOnSetActive = vi.fn();
    const mockOnResetActive = vi.fn();

    const { withStoreComponent } = withStore(
      <PlaceCard offer={mockOffer} onSetActive={mockOnSetActive} onResetActive={mockOnResetActive} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const bookmarkButton = container.querySelector('.place-card__bookmark-button');

    expect(bookmarkButton).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should render inactive bookmark button when user is not authorized', () => {
    const mockOffer = { ...makeFakeOffer(), isFavorite: true };
    const mockOnSetActive = vi.fn();
    const mockOnResetActive = vi.fn();

    const { withStoreComponent } = withStore(
      <PlaceCard offer={mockOffer} onSetActive={mockOnSetActive} onResetActive={mockOnResetActive} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const bookmarkButton = container.querySelector('.place-card__bookmark-button');

    expect(bookmarkButton).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should dispatch changeFavoriteOfferStatusAction when authorized user clicks bookmark button', async () => {
    const mockOffer = { ...makeFakeOffer(), isFavorite: false };
    const mockOnSetActive = vi.fn();
    const mockOnResetActive = vi.fn();

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <PlaceCard offer={mockOffer} onSetActive={mockOnSetActive} onResetActive={mockOnResetActive} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        }
      }
    );

    mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${mockOffer.id}/1`).reply(200, { ...mockOffer, isFavorite: true });

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const bookmarkButton = container.querySelector('.place-card__bookmark-button');
    if (bookmarkButton) {
      await userEvent.click(bookmarkButton);
    }

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toContain(changeFavoriteOfferStatusAction.pending.type);
  });

  it('should redirect to login page when unauthorized user clicks bookmark button', async () => {
    const mockOffer = { ...makeFakeOffer(), isFavorite: false };
    const mockOnSetActive = vi.fn();
    const mockOnResetActive = vi.fn();
    const expectedText = 'Login page';

    const { withStoreComponent } = withStore(
      <Routes>
        <Route
          path={AppRoute.Main}
          element={ <PlaceCard offer={mockOffer} onSetActive={mockOnSetActive} onResetActive={mockOnResetActive} /> }
        />
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
      </Routes>,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const bookmarkButton = container.querySelector('.place-card__bookmark-button');
    await userEvent.click(bookmarkButton!);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should call onSetActive when mouse enters card and onResetActive when mouse leaves', () => {
    const mockOffer = makeFakeOffer();
    const mockOnSetActive = vi.fn();
    const mockOnResetActive = vi.fn();

    const { withStoreComponent } = withStore(
      <PlaceCard offer={mockOffer} onSetActive={mockOnSetActive} onResetActive={mockOnResetActive} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const articleElement = container.querySelector('.cities__card');

    if (articleElement) {
      fireEvent.mouseEnter(articleElement);
      expect(mockOnSetActive).toBeCalledTimes(1);
      expect(mockOnSetActive).toBeCalledWith(mockOffer.id);

      fireEvent.mouseLeave(articleElement);
      expect(mockOnResetActive).toBeCalledTimes(1);
    }
  });
});

