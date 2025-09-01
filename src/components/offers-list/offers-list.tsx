import { useState } from 'react';
import { Offers } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
    offers: Offers;
    onActiveChange: (activeOfferId: number | undefined) => void;
}

function OffersList({offers, onActiveChange}: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<number | undefined>(undefined);

  return (
    <div className="cities__places-list places__list tabs__content" style={{justifyContent: 'center'}}>
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onSetActive={(offerId: number) => {
            setActiveOfferId(offerId);
            onActiveChange(offerId);
          }}
          onResetActive={() => {
            setActiveOfferId(undefined);
            onActiveChange(undefined);
          }}
        />))}
    </div>
  );
}

export default OffersList;
