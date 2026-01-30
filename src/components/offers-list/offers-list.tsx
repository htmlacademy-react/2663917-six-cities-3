import {memo, useCallback} from 'react';
import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offers;
  onActiveChange: (activeOfferId: string | undefined) => void;
  className?: string;
  cardVariant?: 'cities' | 'near-places';
  hoveredOfferId?: string | undefined;
}

function OffersList({offers, onActiveChange, className, cardVariant = 'cities', hoveredOfferId}: OffersListProps) {
  const handleSetActive = useCallback((offerId: string) => {
    onActiveChange(offerId);
  }, [onActiveChange]);

  const handleResetActive = useCallback(() => {
    onActiveChange(undefined);
  }, [onActiveChange]);

  const listClassName = className ?? 'cities__places-list places__list tabs__content';

  return (
    <div className={listClassName} style={{justifyContent: 'center'}}>
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          cardVariant={cardVariant}
          onSetActive={handleSetActive}
          onResetActive={handleResetActive}
          isHovered={hoveredOfferId === offer.id}
        />))}
    </div>
  );
}

const MemoizedOffersList = memo(OffersList);
export default MemoizedOffersList;
