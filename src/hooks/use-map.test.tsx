import { renderHook } from '@testing-library/react';
import { MutableRefObject } from 'react';
import useMap from './use-map';
import { Map } from 'leaflet';
import { City } from '../types/city';

const mockSetView = vi.fn();
const mockAddLayer = vi.fn();
const mockRemove = vi.fn();
vi.mock('leaflet', () => ({
  Map: vi.fn(() => ({
    setView: mockSetView,
    addLayer: mockAddLayer,
    remove: mockRemove,
  })),
  TileLayer: vi.fn(),
}));

const makeFakeCity = (): City => ({
  name: 'Paris',
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 10,
  },
});

describe('Hook: useMap', () => {
  beforeEach(() => {
    mockSetView.mockClear();
    mockAddLayer.mockClear();
    mockRemove.mockClear();
    (Map as unknown as ReturnType<typeof vi.fn>).mockClear();
  });

  it('should return null when mapRef.current is null', () => {
    const fakeCity = makeFakeCity();
    const mapRef: MutableRefObject<HTMLElement | null> = {
      current: null,
    };

    const { result } = renderHook(() => useMap(mapRef, fakeCity));

    expect(result.current).toBeNull();
  });

  it('should create Map instance with correct parameters', () => {
    const fakeCity = makeFakeCity();
    const mapRef: MutableRefObject<HTMLElement | null> = {
      current: document.createElement('div'),
    };

    renderHook(() => useMap(mapRef, fakeCity));

    expect(Map).toHaveBeenCalledWith(mapRef.current, {
      center: {
        lat: fakeCity.location.latitude,
        lng: fakeCity.location.longitude,
      },
      zoom: fakeCity.location.zoom,
    });
  });

  it('should return Map instance after initialization', () => {
    const fakeCity = makeFakeCity();
    const mapRef: MutableRefObject<HTMLElement | null> = {
      current: document.createElement('div'),
    };

    const { result } = renderHook(() => useMap(mapRef, fakeCity));

    expect(result.current).not.toBeNull();
    expect(result.current).toHaveProperty('setView');
    expect(result.current).toHaveProperty('addLayer');
  });

  it('should call setView when city changes', () => {
    const fakeCity = makeFakeCity();
    const newCity: City = {
      name: 'Amsterdam',
      location: {
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 12,
      },
    };
    const mapRef: MutableRefObject<HTMLElement | null> = {
      current: document.createElement('div'),
    };

    const { rerender } = renderHook(
      ({ city }) => useMap(mapRef, city),
      {
        initialProps: { city: fakeCity },
      }
    );

    // После инициализации setView вызывается один раз
    expect(mockSetView).toHaveBeenCalledTimes(1);

    // При изменении города setView вызывается еще раз
    rerender({ city: newCity });

    expect(mockSetView).toHaveBeenCalledTimes(2);
    expect(mockSetView).toHaveBeenLastCalledWith(
      [newCity.location.latitude, newCity.location.longitude],
      newCity.location.zoom
    );
  });
});
