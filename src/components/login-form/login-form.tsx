import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../Const';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

function LoginForm(): JSX.Element {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);
  const loginFormFieldChangeHandle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setLoginFormData({...loginFormData, [name]: value});
  };
  const login = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction({
      email: loginFormData.email,
      password: loginFormData.password
    }));
  };

  return (
    <form className="login__form form" action="#" method="post" onSubmit={login}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input className="login__input form__input" type="email" name="email" value={loginFormData.email} placeholder="Email" required onChange={loginFormFieldChangeHandle} />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input className="login__input form__input" type="password" name="password" value={loginFormData.password} placeholder="Password" required pattern=".*[a-zA-Z].*\d.*|.*\d.*[a-zA-Z].*" onChange={loginFormFieldChangeHandle} />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default LoginForm;
