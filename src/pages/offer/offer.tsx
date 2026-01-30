import {Helmet} from 'react-helmet-async';
import ReviewForm from '../../components/review-form/review-form';
import {Link, useNavigate} from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {useParams} from 'react-router-dom';
import {convertToPoints} from '../../utils/offersConverter';
import Map from '../../components/map/map';
import {Point} from '../../types/point';
import OffersList from '../../components/offers-list/offers-list';
import {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavoriteOfferStatusAction, fetchOfferPageData} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';
import {setResourceNotFound} from '../../store/offers-data/offers-data';
import {getOfferPageData} from '../../store/offers-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import HeaderUserProfile from '../../components/header-user-profile/header-user-profile';
import RatingStarsWidthResolver from '../../utils/ratingStarsWidthResolver';

const MAX_OFFER_IMAGES = 6;
const MAX_NEARBY_OFFERS = 3;

function Offer() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {offerDetailed, isOfferNotFound, offersNearby, comments} = useAppSelector(getOfferPageData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  useEffect(() => {
    let isMounted = true;

    if (isOfferNotFound && isMounted) {
      navigate(AppRoute.NotFound);
      dispatch(setResourceNotFound(false));
    }

    return () => {
      isMounted = false;
    };
  }, [isOfferNotFound, navigate, dispatch]);
  useEffect(() => {
    let isMounted = true;

    if (id && isMounted) {
      dispatch(fetchOfferPageData(id));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  const points: Point[] = useMemo(() => {
    if (!offerDetailed) {
      return convertToPoints(offersNearby.slice(0, MAX_NEARBY_OFFERS));
    }
    const nearbyPoints = convertToPoints(offersNearby.slice(0, MAX_NEARBY_OFFERS));
    const currentPoint: Point = {
      id: offerDetailed.id,
      latitude: offerDetailed.location.latitude,
      longitude: offerDetailed.location.longitude
    };
    return [currentPoint, ...nearbyPoints];
  }, [offersNearby, offerDetailed]);

  if (id === undefined || !offerDetailed) {
    return null;
  }
  const handleFavoriteClick = () => {
    if (isAuth) {
      dispatch(changeFavoriteOfferStatusAction({
        offerId: offerDetailed.id,
        isFavorite: offerDetailed.isFavorite ? 0 : 1
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  const isButtonActive = isAuth && offerDetailed.isFavorite;
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <HeaderUserProfile />
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerDetailed.images.slice(0, MAX_OFFER_IMAGES).map((img) => (
                <div className="offer__image-wrapper" key={img}>
                  <img className="offer__image" src={img} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerDetailed.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerDetailed.title}
                </h1>
                <button className={`offer__bookmark-button button${isButtonActive ? ' offer__bookmark-button--active' : ''}`} type="button" onClick={handleFavoriteClick}>
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: RatingStarsWidthResolver.resolve(offerDetailed.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerDetailed.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerDetailed.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerDetailed.bedrooms} {offerDetailed.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerDetailed.maxAdults} {offerDetailed.maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerDetailed.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerDetailed.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper${offerDetailed.host.isPro ? ' offer__avatar-wrapper--pro' : ''}`}>
                    <img className="offer__avatar user__avatar" src={offerDetailed.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offerDetailed.host.name}
                  </span>
                  {offerDetailed.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offerDetailed.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {comments.length > 0 && (<h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>)}
                {comments.length > 0 && (<ReviewsList comments={comments} />)}
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={id} />}
              </section>
            </div>
          </div>
          <div className="container" style={{ height: '575px', padding: '0', marginBottom: '50px' }}>
            <Map city={offerDetailed.city} points={points} selectedPointId={offerDetailed.id} />
          </div>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={offersNearby.slice(0, MAX_NEARBY_OFFERS)}
              onActiveChange={() => {}}
              className="near-places__list places__list"
              cardVariant="near-places"
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
