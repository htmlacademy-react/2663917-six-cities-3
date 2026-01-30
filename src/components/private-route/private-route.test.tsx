import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { withStore, withBrowserRouter } from '../../utils/mock-component';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';

describe('Component: PrivateRoute', () => {
  it('should render children when user is authorized', () => {
    const expectedText = 'Protected content';

    const { withStoreComponent } = withStore(
      (
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <span>{expectedText}</span>
              </PrivateRoute>
            }
          />
        </Routes>
      ),
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        },
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should redirect to login page when user is not authorized', () => {
    const protectedContentText = 'Protected content';
    const loginPageText = 'Login page';

    const { withStoreComponent } = withStore(
      (
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <span>{protectedContentText}</span>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<span>{loginPageText}</span>} />
        </Routes>
      ),
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    render(preparedComponent);

    expect(screen.queryByText(protectedContentText)).not.toBeInTheDocument();
    expect(screen.getByText(loginPageText)).toBeInTheDocument();
  });
});

