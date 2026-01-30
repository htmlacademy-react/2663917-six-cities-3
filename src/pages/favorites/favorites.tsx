import {Helmet} from 'react-helmet-async';
import FavoritesList from '../../components/favorites-list/favorites-list';
import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {getFavorites} from '../../store/offers-data/selectors';
import HeaderUserProfile from '../../components/header-user-profile/header-user-profile';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import {fetchFavoritesAction} from '../../store/api-actions';
import {useEffect} from 'react';

function Favorites() {
  const favoriteOffers = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();
  const isEmpty = favoriteOffers.length === 0;

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  return (
    <div className={`page${isEmpty ? ' page--favorites-empty' : ''}`}>
      <Helmet>
        <title>6 cities: favorites</title>
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

      <main className={`page__main page__main--favorites${isEmpty ? ' page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <section className={`favorites${isEmpty ? ' favorites--empty' : ''}`}>
            {isEmpty ? (
              <FavoritesEmpty />
            ) : (
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <FavoritesList offers={favoriteOffers} />
              </>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
