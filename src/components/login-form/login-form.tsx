import {FormEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    let isMounted = true;

    if (authorizationStatus === AuthorizationStatus.Auth && isMounted) {
      navigate(AppRoute.Main);
    }

    return () => {
      isMounted = false;
    };
  }, [authorizationStatus, navigate]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    dispatch(loginAction({
      email,
      password
    }));
  };

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input className="login__input form__input" type="password" name="password" placeholder="Password" required pattern=".*[a-zA-Z].*\d.*|.*\d.*[a-zA-Z].*" />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default LoginForm;
