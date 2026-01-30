import {Link} from 'react-router-dom';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import {Point} from '../../types/point';
import {useState, useCallback, useMemo} from 'react';
import {convertToPoints} from '../../utils/offersConverter';
import CitiesList from '../../components/cities-list/cities-list';
import {City} from '../../types/city';
import {useAppSelector} from '../../hooks';
import {getOffersByCity} from '../../store/offers-data/selectors';
import {getCityName} from '../../store/app-process/selectors';
import SortOptions from '../../components/sort-options/sort-options';
import {SortType} from '../../const';
import {sortOffers} from '../../utils/sortOffers';
import HeaderUserProfile from '../../components/header-user-profile/header-user-profile';
import MainEmpty from '../../components/main-empty/main-empty';

type MainProps = {
    cities: City[];
}

function Main({cities}: MainProps) {
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>(undefined);
  const [hoveredOfferId, setHoveredOfferId] = useState<string | undefined>(undefined);
  const [sortType, setSortType] = useState<number | undefined>(SortType.Popular);
  const onActiveChange = useCallback((offerId: string | undefined) => {
    setActiveOfferId(offerId);
  }, []);
  const onMarkerHover = useCallback((offerId: string | undefined) => {
    setHoveredOfferId(offerId);
  }, []);
  const onSortTypeChange = useCallback((newSortType: SortType) => {
    setSortType(newSortType);
  }, []);
  const offers = useAppSelector(getOffersByCity);
  const currentCityName = useAppSelector(getCityName);
  const city = useMemo(() => cities.filter((c) => c.name === currentCityName)[0], [cities, currentCityName]);
  const sortedOffers = useMemo(() =>
    sortOffers(offers, sortType),
  [offers, sortType]
  );
  const points: Point[] = convertToPoints(offers);
  const isEmpty = offers.length === 0;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <HeaderUserProfile />
          </div>
        </div>
      </header>
      <main className={`page__main page__main--index${isEmpty ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities} />
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container container${isEmpty ? ' cities__places-container--empty' : ''}`}>
            {isEmpty ? (
              <MainEmpty currentCityName={currentCityName} />
            ) : (
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} {offers.length === 1 ? 'place' : 'places'} to stay in {city.name}</b>
                  <SortOptions sortType={sortType} onSortTypeChange={onSortTypeChange} />
                  <OffersList offers={sortedOffers} onActiveChange={onActiveChange} hoveredOfferId={hoveredOfferId} />
                </section>
                <div className="cities__right-section">
                  <Map city={city} points={points} selectedPointId={activeOfferId} onMarkerHover={onMarkerHover} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
