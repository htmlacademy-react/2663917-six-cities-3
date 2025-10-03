import {Helmet} from 'react-helmet-async';
import ReviewForm from '../../components/review-form/review-form';
import {Link, useNavigate} from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {useParams} from 'react-router-dom';
import {convertToPoints} from '../../utils/offersConverter';
import Map from '../../components/map/map';
import {Point} from '../../types/point';
import OffersList from '../../components/offers-list/offers-list';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCommentsAction, fetchOfferAction, fetchOffersNearbyAction} from '../../store/api-actions';
import {AppRoute} from '../../Const';
import {setResourceNotFound} from '../../store/action';

function Offer(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const allOffersDetailed = useAppSelector((state) => state.offersDetailed);
  const offerDetailed = allOffersDetailed.find((offer) => offer.id === id);
  const isResourceNotFound = useAppSelector((state) => state.isResourceNotFound);
  const navigate = useNavigate();
  useEffect(() => {
    if (isResourceNotFound) {
      navigate(AppRoute.NotFound);
      dispatch(setResourceNotFound(false));
    }
  }, [isResourceNotFound, navigate, dispatch]);
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchOffersNearbyAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [dispatch, id]);
  const offersNearby = useAppSelector((state) =>
    state.offersNearby[id ?? ''] ?? []
  );
  const comments = useAppSelector((state) =>
    state.comments[id ?? ''] ?? []
  );
  const points: Point[] = convertToPoints(offersNearby);
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>(undefined);
  if (id === undefined || !offerDetailed) {
    return null;
  }
  const onActiveChange = (newActiveOfferId: string | undefined) => {
    setActiveOfferId(newActiveOfferId);
  };

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
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="#">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>Premium</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  Beautiful &amp; luxurious studio at great location
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: '80%' }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;120</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">
                    Wi-Fi
                  </li>
                  <li className="offer__inside-item">
                    Washing machine
                  </li>
                  <li className="offer__inside-item">
                    Towels
                  </li>
                  <li className="offer__inside-item">
                    Heating
                  </li>
                  <li className="offer__inside-item">
                    Coffee machine
                  </li>
                  <li className="offer__inside-item">
                    Baby seat
                  </li>
                  <li className="offer__inside-item">
                    Kitchen
                  </li>
                  <li className="offer__inside-item">
                    Dishwasher
                  </li>
                  <li className="offer__inside-item">
                    Cabel TV
                  </li>
                  <li className="offer__inside-item">
                    Fridge
                  </li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {comments.length > 0 && (<h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>)}
                {comments.length > 0 && (<ReviewsList comments={comments} />)}
                <ReviewForm offerId={id} />
              </section>
            </div>
          </div>
          <div className="container" style={{ height: '575px', padding: '0', marginBottom: '50px' }}>
            <Map city={offerDetailed.city} points={points} selectedPointId={activeOfferId} />
          </div>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={offersNearby} onActiveChange={onActiveChange}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
