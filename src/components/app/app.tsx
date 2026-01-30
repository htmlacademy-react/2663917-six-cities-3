import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute } from '../../const';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import {HelmetProvider} from 'react-helmet-async';
import {City} from '../../types/city';
import LoadingScreen from '../../loading-screen';
import {useAppSelector} from '../../hooks';
import {getAppState} from '../../store/app-process/selectors';

type AppProps = {
  cities: City[];
}

function App({cities}: AppProps) {
  const {isDataLoading} = useAppSelector(getAppState);

  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }
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
            element={<Login cities={cities} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<Offer />}
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
