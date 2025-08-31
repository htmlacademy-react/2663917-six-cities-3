import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../Const';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import {HelmetProvider} from 'react-helmet-async';
import { Offers } from '../../types/offer';
import { City } from '../../types/city';
import { useAppDispatch } from '../../hooks';
import { setOffers } from '../../store/action';

type AppProps = {
  offers: Offers;
  cities: City[];
}

function App({offers, cities}: AppProps): JSX.Element {
  useAppDispatch()(setOffers(offers));

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main cities={cities} />}
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <Favorites offers={offers.filter((offer) => offer.isBookmarked)} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<Offer offers={offers} />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
