import { City } from './city';
import { Location } from './location';
import { OfferType } from './offer-type';

export type Offer = {
    id: string;
    title: string;
    type: OfferType;
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
};

export type Offers = Offer[];
