import {Helmet} from 'react-helmet-async';
import FavoritesList from '../../components/favorites-list/favorites-list';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchFavoritesAction} from '../../store/api-actions';
import {getFavorites} from '../../store/offers-data/selectors';
import HeaderUserProfile from '../../components/header-user-profile/header-user-profile';

function Favorites(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (favoriteOffers.length === 0) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, favoriteOffers.length]);

  return (
    <div className="page">
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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={favoriteOffers} />
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
