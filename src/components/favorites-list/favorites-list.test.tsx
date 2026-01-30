import { render, screen } from '@testing-library/react';
import FavoritesList from './favorites-list';
import { withBrowserRouter, withStore } from '../../utils/mock-component';
import { makeFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus, NameSpace } from '../../const';

describe('Component: FavoritesList', () => {
  it('should render correct number of FavoriteOfferCard components', () => {
    const mockOffers = [
      { ...makeFakeOffer(), city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } } },
      { ...makeFakeOffer(), city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } } },
      { ...makeFakeOffer(), city: { name: 'Amsterdam', location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 } } },
    ];

    const { withStoreComponent } = withStore(
      <FavoritesList offers={mockOffers} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const offerCards = container.querySelectorAll('.favorites__card');

    expect(offerCards).toHaveLength(mockOffers.length);
  });

  it('should render empty list when no offers provided', () => {
    const { withStoreComponent } = withStore(
      <FavoritesList offers={[]} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const favoritesList = container.querySelector('.favorites__list');
    const listItems = container.querySelectorAll('.favorites__locations-items');

    expect(favoritesList).toBeInTheDocument();
    expect(listItems).toHaveLength(0);
  });

  it('should group offers by city correctly', () => {
    const mockOffers = [
      { ...makeFakeOffer(), city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } } },
      { ...makeFakeOffer(), city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } } },
      { ...makeFakeOffer(), city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } } },
      { ...makeFakeOffer(), city: { name: 'Amsterdam', location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 } } },
    ];

    const { withStoreComponent } = withStore(
      <FavoritesList offers={mockOffers} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        }
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const cityGroups = container.querySelectorAll('.favorites__locations-items');

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(cityGroups).toHaveLength(2);
  });
});

