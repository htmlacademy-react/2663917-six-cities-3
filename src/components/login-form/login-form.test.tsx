import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './login-form';
import { withBrowserRouter, withStore } from '../../utils/mock-component';
import { APIRoute, AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { extractActionsTypes, makeFakeUserData } from '../../utils/mocks';
import { loginAction, fetchOffersAction } from '../../store/api-actions';

describe('Component: LoginForm', () => {
  it('should render email and password inputs and submit button', () => {
    const { withStoreComponent } = withStore(
      <LoginForm />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should dispatch loginAction and fetchOffersAction when form is submitted', async () => {
    const fakeUser = { email: 'test@test.ru', password: 'a1b2c3' };
    const fakeServerReply = makeFakeUserData();

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <LoginForm />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
      }
    );

    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(screen.getByPlaceholderText(/email/i), fakeUser.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), fakeUser.password);
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Ждем завершения всех асинхронных действий
    await new Promise((resolve) => setTimeout(resolve, 100));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      loginAction.pending.type,
      fetchOffersAction.pending.type,
      loginAction.fulfilled.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it('should redirect to main page when user is authorized', () => {
    const expectedText = 'Main page';
    const { withStoreComponent } = withStore(
      (
        <Routes>
          <Route path={AppRoute.Login} element={<LoginForm />} />
          <Route path={AppRoute.Main} element={<span>{expectedText}</span>} />
        </Routes>
      ),
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        },
      }
    );

    render(
      <MemoryRouter initialEntries={[AppRoute.Login]}>
        {withStoreComponent}
      </MemoryRouter>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when user enters login and password', async () => {
    const expectedEmail = 'test@test.ru';
    const expectedPassword = 'a1b2c3';

    const { withStoreComponent } = withStore(
      <LoginForm />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        },
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(screen.getByPlaceholderText('Email'), expectedEmail);
    await userEvent.type(screen.getByPlaceholderText('Password'), expectedPassword);

    expect(screen.getByDisplayValue(expectedEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPassword)).toBeInTheDocument();
  });
});


