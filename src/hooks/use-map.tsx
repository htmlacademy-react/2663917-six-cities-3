import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { City } from '../types/city';
import { Map, TileLayer } from 'leaflet';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);
  const mapInstanceRef = useRef<Map | null>(null);
  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);
      setMap(instance);
      mapInstanceRef.current = instance;
      isRenderedRef.current = true;
    } else if (map !== null) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, mapRef, city]);

  useEffect(() => () => {
    mapInstanceRef.current?.remove();
    isRenderedRef.current = false;
    setMap(null);
  }, []);

  return map;
}

export default useMap;
