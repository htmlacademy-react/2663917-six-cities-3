import {City} from '../../types/city';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCityName} from '../../store/app-process/selectors';
import {changeCity} from '../../store/app-process/app-process';

type CitiesListProps = {
    cities: City[];
}

function CitiesList({cities}: CitiesListProps): JSX.Element {
  const currentCityName = useAppSelector(getCityName);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className={`locations__item-link tabs__item${city.name === currentCityName ? ' tabs__item--active' : ''}`} key={city.name}>
          <a className="locations__item-link tabs__item" href="#" onClick={() => dispatch(changeCity(city.name))}>
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
