import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { Point } from '../../types/point';
import { City } from '../../types/city';

type MapProps = {
  city: City;
  points: Point[];
  selectedPointId: string | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {city, points, selectedPointId} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPointId !== undefined && point.id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPointId]);

  return <section style={{width: '100%', height: '100%'}} ref={mapRef}></section>;
}

export default Map;
