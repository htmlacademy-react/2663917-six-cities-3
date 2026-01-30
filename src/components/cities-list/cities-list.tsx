import {City} from '../../types/city';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCityName} from '../../store/app-process/selectors';
import {changeCity} from '../../store/app-process/app-process';
import './cities-list.css';

type CitiesListProps = {
    cities: City[];
}

function CitiesList({cities}: CitiesListProps) {
  const currentCityName = useAppSelector(getCityName);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city.name}>
          <div className={`locations__item-link tabs__item${city.name === currentCityName ? ' tabs__item--active' : ''}`} onClick={() => dispatch(changeCity(city.name))}>
            <span>{city.name}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
