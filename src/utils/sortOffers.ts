import { SortType } from '../const';
import { Offer } from '../types/offer';

export function sortOffers(offers: Offer[], sortType: SortType | undefined): Offer[] {
  const sortedOffers = [...offers];

  switch (sortType) {
    case SortType.PriceLowToHigh:
      sortedOffers.sort((a, b) => a.price - b.price);
      break;

    case SortType.PriceHighToLow:
      sortedOffers.sort((a, b) => b.price - a.price);
      break;

    case SortType.TopRated:
      sortedOffers.sort((a, b) => b.rating - a.rating);
      break;

    case SortType.Popular:
    default:
      return [...offers];
  }

  return sortedOffers;
}
