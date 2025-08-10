import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import CurrencySymbolResolver from '../../utils/currencySymbolResolver';
import RatingStarsWidthResolver from '../../utils/ratingStarsWidthResolver';

type PlaceCardProps = {
    offer: Offer;
    onMouseEnter: (activeOfferId: number) => void;
}

function PlaceCard({offer, onMouseEnter}: PlaceCardProps): JSX.Element {
  return (
    <article 
      className="cities__card place-card"
      onMouseEnter={() => { onMouseEnter(offer.id) }}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{CurrencySymbolResolver.resolve(offer.currencyCode)}{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;{offer.timeBasedPricingMode}</span>
          </div>
          <button className={`place-card__bookmark-button button${offer.isBookmarked ? ' place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: RatingStarsWidthResolver.resolve(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">Wood and stone place</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
