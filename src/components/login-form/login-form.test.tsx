import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './login-form';
import { withBrowserRouter, withStore } from '../../utils/mock-component';
import { APIRoute, AppRoute, AuthorizationStatus, NameSpace } from '../../Const';
import { extractActionsTypes, makeFakeUserData } from '../../utils/mocks';
import { loginAction } from '../../store/api-actions';

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

  it('should dispatch loginAction when form is submitted', async () => {
    const fakeUser = { email: 'test@test.ru', password: '123456' };
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

    const preparedComponent = withBrowserRouter(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(screen.getByPlaceholderText(/email/i), fakeUser.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), fakeUser.password);
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type,
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
    const expectedPassword = '123456';

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


