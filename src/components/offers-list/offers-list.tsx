import {useState, memo} from 'react';
import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
    offers: Offers;
    onActiveChange: (activeOfferId: string | undefined) => void;
}

function OffersList({offers, onActiveChange}: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | undefined>(undefined);

  return (
    <div className="cities__places-list places__list tabs__content" style={{justifyContent: 'center'}}>
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onSetActive={(offerId: string) => {
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

export default memo(OffersList);
