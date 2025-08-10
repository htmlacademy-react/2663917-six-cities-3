import { Link } from 'react-router-dom';
import { Offers } from '../../types/offer';
import FavoriteOfferCard from '../favorite-offer-card/favorite-offer-card';

type FavoritesListProps = {
    offers: Offers;
}

function FavoritesList({offers}: FavoritesListProps): JSX.Element {
  const groupByCountry = (offers: Offers): Record<string, Offers> => {
    return offers.reduce((acc, offer) => {
      const country = offer.country;
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(offer);
      return acc;
    }, {} as Record<string, Offers>);
  }
  
  return (
    <ul className="favorites__list">
      {Object.entries(groupByCountry(offers)).map(([country, offers]) => (
        <li className="favorites__locations-items" key={country}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{country}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {offers.map((offer) => <FavoriteOfferCard offer={offer} key={offer.id} />)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
