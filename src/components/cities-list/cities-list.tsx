import { City } from '../../types/city';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';

type CitiesListProps = {
    cities: City[];
}

function CitiesList({cities}: CitiesListProps): JSX.Element {
  const currentCityId = useAppSelector((state) =>
    state.cityId
  );
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className={`locations__item-link tabs__item${city.id === currentCityId ? ' tabs__item--active' : ''}`} key={city.id}>
          <a className="locations__item-link tabs__item" href="#" onClick={() => dispatch(changeCity(city.id))}>
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
