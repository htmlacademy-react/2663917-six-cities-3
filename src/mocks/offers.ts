import { Offers } from '../types/offer';

export const offers: Offers = [
  {
    id: 1,
    type: 'Apartment',
    name: 'Beautiful & luxurious apartment at great location',
    price: 120,
    currencyCode: 'euro',
    rating: 4.8,
    lat: 52.3909553943508,
    lng: 4.85309666406198,
    isBookmarked: true,
    isPremium: true,
    mainImageSource: 'img/apartment-01.jpg',
    imageSources: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg'
    ],
    timeBasedPricingMode: 'Night',
    country: 'Amsterdam',
    bedrooms: '3 Bedrooms',
    occupancy: 'Max 4 adults',
    amenities: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Fridge',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
      'Towels',
      'Baby seat',
      'Cabel TV'
    ],
    host: {
      name: 'Angelina',
      status: 'Pro',
      imageSource: 'img/avatar-angelina.jpg'
    },
    reviews: [{
      reviewerName: 'Max',
      review: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      date: 'April 2019',
      rating: 4,
      imageSource: 'img/avatar-max.jpg'
    }],
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.'
    ]
  },
  {
    id: 2,
    type: 'Room',
    name: 'Wood and stone place',
    price: 80,
    lat:52.3609553943508,
    lng: 4.85309666406198,
    currencyCode: 'euro',
    rating: 3.2,
    isBookmarked: true,
    isPremium: false,
    mainImageSource: 'img/room.jpg',
    imageSources: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg'
    ],
    timeBasedPricingMode: 'Night',
    country: 'Amsterdam',
    bedrooms: '4 Bedrooms',
    occupancy: 'Max 6 adults',
    amenities: [
      'Air conditioning',
      'Balcony',
      'Microwave',
      'Oven',
      'Iron',
      'Hair dryer',
      'Safe',
      'Parking',
      'Elevator',
      'Ironing board'
    ],
    host: {
      name: 'Max',
      status: '',
      imageSource: 'img/avatar-max.jpg'
    },
    reviews: [{
      reviewerName: 'Marina',
      review: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      date: 'April 2020',
      rating: 5,
      imageSource: 'img/avatar-angelina.jpg'
    },
    {
      reviewerName: 'Ann',
      review: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      date: 'May 2021',
      rating: 3,
      imageSource: 'img/avatar-angelina.jpg'
    }],
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.'
    ]
  },
  {
    id: 3,
    type: 'Apartment',
    name: 'Canal View Prinsengracht',
    price: 132,
    lat: 52.3909553943508,
    lng: 4.929309666406198,
    currencyCode: 'euro',
    rating: 4.1,
    isBookmarked: false,
    isPremium: false,
    mainImageSource: 'img/apartment-02.jpg',
    imageSources: [
      'img/apartment-02.jpg',
      'apartment-small-03.jpg',
      'apartment-small-04.jpg'
    ],
    timeBasedPricingMode: 'Night',
    country: 'Amsterdam',
    bedrooms: '3 Bedrooms',
    occupancy: 'Max 4 adults',
    amenities: [
      'High-speed internet',
      'Smart TV',
      'Toaster',
      'Desk',
      'Closet',
      'Fire extinguisher',
      'Private entrance',
      'Smoke detector',
      'Pool access',
      'Gym access'
    ],
    host: {
      name: 'Olivia',
      status: '',
      imageSource: 'img/avatar-angelina.jpg'
    },
    reviews: [{
      reviewerName: 'John',
      review: 'A charming and peaceful retreat overlooking the iconic Prinsengracht canal. The historic 18th-century building, with its classic green facade, perfectly captures the timeless beauty and serene atmosphere of Amsterdam’s waterways.',
      date: 'April 2019',
      rating: 4,
      imageSource: 'img/avatar-max.jpg'
    },
    {
      reviewerName: 'Emma',
      review: 'Nestled along the tranquil waters of Prinsengracht, this elegant apartment offers a perfect blend of historic charm and modern comfort.',
      date: 'June 2020',
      rating: 5,
      imageSource: 'img/avatar-angelina.jpg'
    }],
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.'
    ]
  },
  {
    id: 4,
    type: 'Room',
    name: 'White castle',
    price: 180,
    lat: 52.3809553943508,
    lng: 4.939309666406198,
    currencyCode: 'euro',
    rating: 5,
    isBookmarked: true,
    isPremium: true,
    mainImageSource: 'img/apartment-small-04.jpg',
    imageSources: [
      'img/apartment-small-04.jpg',
      'img/apartment-small-03.jpg'
    ],
    timeBasedPricingMode: 'Night',
    country: 'Colonge',
    bedrooms: '1 Bedroom',
    occupancy: 'Max 2 adults',
    amenities: [
      'BBQ grill',
      'Safe',
      'Sofa bed',
      'Linens',
      'Balcony furniture',
      'Outdoor dining area',
      'Cleaning products',
      'Fridge',
      'Hair dryer',
      'Blackout curtains'
    ],
    host: {
      name: 'David',
      status: 'Pro',
      imageSource: 'img/avatar-max.jpg'
    },
    reviews: [{
      reviewerName: 'Sarah',
      review: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      date: 'April 2019',
      rating: 5,
      imageSource: 'img/avatar-angelina.jpg'
    }],
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.'
    ]
  }
];
