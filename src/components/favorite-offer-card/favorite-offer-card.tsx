import { Link, useNavigate, generatePath } from 'react-router-dom';
import RatingStarsWidthResolver from '../../utils/ratingStarsWidthResolver';
import { Offer } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteOfferStatusAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus, AppRoute } from '../../const';

type FavoriteOfferCardProps = {
    offer: Offer;
}

function FavoriteOfferCard({offer}: FavoriteOfferCardProps) {
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

  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Offer, { id: offer.id })}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
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

export default FavoriteOfferCard;
