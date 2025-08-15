import { Host } from './host';
import { Review } from './review';
export type Offer = {
    id: number;
    type: 'Room' | 'Apartment';
    name: string;
    description: string[];
    price: number;
    currencyCode: string;
    rating: number;
    lat: number;
    lng: number;
    isBookmarked: boolean;
    isPremium: boolean;
    mainImageSource: string;
    imageSources: string[];
    timeBasedPricingMode: 'Night' | 'Day';
    country: string;
    bedrooms: string;
    occupancy: string;
    amenities: string[];
    host: Host;
    reviews: Review[];
};

export type Offers = Offer[];
