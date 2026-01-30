import {Link, useNavigate, generatePath} from 'react-router-dom';
import {Offer} from '../../types/offer';
import RatingStarsWidthResolver from '../../utils/ratingStarsWidthResolver';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavoriteOfferStatusAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AuthorizationStatus, AppRoute} from '../../const';
import {memo} from 'react';

import './place-card.css';

type PlaceCardProps = {
  offer: Offer;
  onSetActive: (activeOfferId: string) => void;
  onResetActive: () => void;
  cardVariant?: 'cities' | 'near-places';
  isHovered?: boolean;
}

function PlaceCard({offer, onSetActive, onResetActive, cardVariant = 'cities', isHovered = false}: PlaceCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleFavoriteClick = () => {
    if (isAuth) {
      dispatch(changeFavoriteOfferStatusAction({
        offerId: offer.id,
        isFavorite: offer.isFavorite ? 0 : 1
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  const isButtonActive = isAuth && offer.isFavorite;

  const cardClass = `${cardVariant}__card place-card${isHovered ? ' place-card--hovered' : ''}`;
  const imageWrapperClass = `${cardVariant}__image-wrapper place-card__image-wrapper`;

  return (
    <article
      className={cardClass}
      onMouseEnter={() => {
        onSetActive(offer.id);
      }}
      onMouseLeave={() => {
        onResetActive();
      }}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={generatePath(AppRoute.Offer, { id: offer.id })}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button${isButtonActive ? ' place-card__bookmark-button--active' : ''}`} type="button" onClick={handleFavoriteClick}>
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
          <Link to={generatePath(AppRoute.Offer, { id: offer.id })}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const MemoizedPlaceCard = memo(PlaceCard);
export default MemoizedPlaceCard;
