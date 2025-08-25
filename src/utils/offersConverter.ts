import { Offers } from '../types/offer';

export const convertToPoints = (offers: Offers) => offers.map((offer) => ({
  id: offer.id,
  lat: offer.lat,
  lng: offer.lng
}));
