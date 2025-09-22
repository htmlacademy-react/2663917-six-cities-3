import { Offer } from '../types/offer';

export const convertToPoints = (offers: Offer[]) => offers.map((offer) => ({
  id: offer.id,
  latitude: offer.location.latitude,
  longitude: offer.location.longitude
}));
