import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute } from '../../Const';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import {HelmetProvider} from 'react-helmet-async';
import {City} from '../../types/city';
import LoadingScreen from '../../loading-screen';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {getAppState} from '../../store/app-process/selectors';
import {fetchFavoritesAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {AuthorizationStatus} from '../../Const';

type AppProps = {
  cities: City[];
}

function App({cities}: AppProps): JSX.Element {
  const {isDataLoading, authorizationStatus} = useAppSelector(getAppState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, authorizationStatus]);

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
            element={<Login />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
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
