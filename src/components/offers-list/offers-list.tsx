import { useState } from 'react';
import { Offers } from '../../types/offer';
import PlaceCard from '../placeCard/placeCard';

type OffersListProps = {
    offers: Offers;
}

function OffersList({offers}: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<number | undefined>(undefined);
  
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard 
        offer={offer}
        key={offer.id} 
        onMouseEnter={(activeOfferId: number) => {
          setActiveOfferId(activeOfferId);
        }}
      />)}
    </div>
  );
}

export default OffersList;
