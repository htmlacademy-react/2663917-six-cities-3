import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../Const';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';

type AppProps = {
    placesToStayNumber: number;
}

function App({placesToStayNumber}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main placesToStayNumber={placesToStayNumber} />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Favorites}
          element=<Favorites />
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
  );
}

export default App;
