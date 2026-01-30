import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitiesList from './cities-list';
import { withStore } from '../../utils/mock-component';
import { NameSpace } from '../../const';
import { extractActionsTypes } from '../../utils/mocks';
import { changeCity } from '../../store/app-process/app-process';

describe('Component: CitiesList', () => {
  const mockCities = [
    { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
    { name: 'Amsterdam', location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 } },
    { name: 'Brussels', location: { latitude: 50.8503, longitude: 4.3517, zoom: 10 } },
  ];

  it('should render correctly with list of cities', () => {
    const { withStoreComponent } = withStore(
      <CitiesList cities={mockCities} />,
      {
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        }
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
  });

  it('should render active class for current city', () => {
    const { withStoreComponent } = withStore(
      <CitiesList cities={mockCities} />,
      {
        [NameSpace.App]: {
          cityName: 'Amsterdam',
          error: null,
        }
      }
    );

    const { container } = render(withStoreComponent);

    const activeItem = container.querySelector('.tabs__item--active');

    expect(activeItem).toBeInTheDocument();
    expect(activeItem!.textContent).toBe('Amsterdam');
  });

  it('should dispatch changeCity action when city is clicked', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <CitiesList cities={mockCities} />,
      {
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        }
      }
    );

    render(withStoreComponent);

    const amsterdamLink = screen.getByText('Amsterdam').closest('div');
    await userEvent.click(amsterdamLink!);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toContain(changeCity.type);
  });

  it('should dispatch changeCity with correct city name', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <CitiesList cities={mockCities} />,
      {
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        }
      }
    );

    render(withStoreComponent);

    const brusselsLink = screen.getByText('Brussels').closest('div');
    await userEvent.click(brusselsLink!);

    const emittedActions = mockStore.getActions();
    const changeCityAction = emittedActions.find((action) => action.type === changeCity.type);

    expect(changeCityAction!.payload).toBe('Brussels');
  });

  it('should render correct number of city items', () => {
    const { withStoreComponent } = withStore(
      <CitiesList cities={mockCities} />,
      {
        [NameSpace.App]: {
          cityName: 'Paris',
          error: null,
        }
      }
    );

    const { container } = render(withStoreComponent);

    const cityItems = container.querySelectorAll('.locations__item-link');

    expect(cityItems).toHaveLength(mockCities.length);
  });
});

