import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/login-form/login-form';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/app-process/app-process';
import { City } from '../../types/city';
import './login.css';

type LoginProps = {
  cities: City[];
}

function Login({cities}: LoginProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const randomCity = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  }, [cities]);

  const handleCityClick = () => {
    dispatch(changeCity(randomCity.name));
    navigate('/');
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <div className="locations__item-link" onClick={handleCityClick}>
                <span>{randomCity.name}</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
