import {Link} from 'react-router-dom';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import {Point} from '../../types/point';
import {useState} from 'react';
import {convertToPoints} from '../../utils/offersConverter';
import CitiesList from '../../components/cities-list/cities-list';
import {City} from '../../types/city';
import {useAppSelector} from '../../hooks';
import SortOptions from '../../components/sort-options/sort-options';
import {SortType} from '../../Const';
import {sortOffers} from '../../utils/sortOffers';
import {getCityName} from '../../store/app-process/selectors';
import {getOffers} from '../../store/offers-data/selectors';
import MainEmpty from '../main-empty/main-empty';
import HeaderUserProfile from '../../components/header-user-profile/header-user-profile';

type MainProps = {
    cities: City[];
}

function Main({cities}: MainProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>(undefined);
  const [sortType, setSortType] = useState<number | undefined>(SortType.Popular);
  const onActiveChange = (offerId: string | undefined) => {
    setActiveOfferId(offerId);
  };
  const allOffers = useAppSelector(getOffers);
  const currentCityName = useAppSelector(getCityName);
  const city = cities.filter((c) => c.name === currentCityName)[0];
  const offers = allOffers.filter((offer) => offer.city.name === currentCityName);
  if (offers.length === 0) {
    return <MainEmpty cities={cities} />;
  }
  const sortedOffers = sortOffers(offers, sortType);
  const points: Point[] = convertToPoints(offers);
  const onSortTypeChange = (newSortType: SortType) => {
    setSortType(newSortType);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="#">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <HeaderUserProfile />
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city.name}</b>
              <SortOptions sortType={sortType} onSortTypeChange={onSortTypeChange} />
              <OffersList offers={sortedOffers} onActiveChange={onActiveChange} />
            </section>
            <div className="cities__right-section">
              <Map city={city} points={points} selectedPointId={activeOfferId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
