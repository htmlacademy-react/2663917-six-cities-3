import { render, screen } from '@testing-library/react';
import Map from './map';
import { CITY } from '../../const';
import { Point } from '../../types/point';

describe('Component: Map', () => {
  const points: Point[] = [
    { id: '1', latitude: 52.370216, longitude: 4.895168 },
    { id: '2', latitude: 52.369553, longitude: 4.853096 },
  ];

  it('should render map container', () => {
    render(<Map city={CITY} points={points} selectedPointId={undefined} />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
