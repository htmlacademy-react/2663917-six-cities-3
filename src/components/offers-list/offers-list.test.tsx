import { render, fireEvent } from '@testing-library/react';
import OffersList from './offers-list';
import { withBrowserRouter, withStore } from '../../utils/mock-component';
import { makeFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus, NameSpace } from '../../const';

describe('Component: OffersList', () => {
  it('should render correct number of PlaceCard components', () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    const { withStoreComponent } = withStore(
      <OffersList offers={mockOffers} onActiveChange={()=>{}} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const offerCards = container.querySelectorAll('.cities__card');

    expect(offerCards).toHaveLength(mockOffers.length);
  });

  it('should render empty list when no offers provided', () => {
    const { withStoreComponent } = withStore(
      <OffersList offers={[]} onActiveChange={() => {}} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const offersList = container.querySelector('.cities__places-list');
    const offerCards = container.querySelectorAll('.cities__card');

    expect(offersList).toBeInTheDocument();
    expect(offerCards).toHaveLength(0);
  });

  it('should call onActiveChange with offer id on mouse enter and undefined on mouse leave', () => {
    const mockOffer = makeFakeOffer();
    const mockOnActiveChange = vi.fn();

    const { withStoreComponent } = withStore(
      <OffersList offers={[mockOffer]} onActiveChange={mockOnActiveChange} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        },
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const offerCard = container.querySelector('.cities__card');
    fireEvent.mouseEnter(offerCard!);
    expect(mockOnActiveChange).toHaveBeenCalledWith(mockOffer.id);

    fireEvent.mouseLeave(offerCard!);
    expect(mockOnActiveChange).toHaveBeenCalledWith(undefined);
  });
});


