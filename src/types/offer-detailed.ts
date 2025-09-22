import { City } from './city';
import { Host } from './host';
import { Location } from './location';

export type OfferDetailed = {
    id: string;
    title: string;
    type: 'house' | 'room' | 'hotel' | 'apartment';
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
    description: string;
    bedrooms: number;
    goods: string[];
    host: Host;
    images: string[];
    maxAdults: number;
};
