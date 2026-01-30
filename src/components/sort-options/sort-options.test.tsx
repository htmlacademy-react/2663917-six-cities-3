import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortOptions from './sort-options';
import { SortType } from '../../const';

describe('Component: SortOptions', () => {
  const mockOnSortTypeChange = vi.fn();

  it('should render correctly with selected sort type', () => {
    const { container } = render(
      <SortOptions sortType={SortType.Popular} onSortTypeChange={() => {}} />
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    const sortTypeElement = container.querySelector('.places__sorting-type');
    expect(sortTypeElement).toBeInTheDocument();
    expect(sortTypeElement!.textContent).toBe('Popular');
  });

  it('should return null when sortType is undefined', () => {
    const { container } = render(
      <SortOptions sortType={undefined} onSortTypeChange={mockOnSortTypeChange} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should open dropdown when clicking on sort type', async () => {
    const { container } = render(
      <SortOptions sortType={SortType.Popular} onSortTypeChange={mockOnSortTypeChange} />
    );

    const sortTypeElement = container.querySelector('.places__sorting-type');
    await userEvent.click(sortTypeElement!);

    const optionsList = container.querySelector('.places__options--opened');
    expect(optionsList).toBeInTheDocument();
  });

  it('should close dropdown when clicking on sort type again', async () => {
    const { container } = render(
      <SortOptions sortType={SortType.Popular} onSortTypeChange={mockOnSortTypeChange} />
    );

    const sortTypeElement = container.querySelector('.places__sorting-type');

    // Открытие
    await userEvent.click(sortTypeElement!);
    expect(container.querySelector('.places__options--opened')).toBeInTheDocument();

    // Закрытие
    await userEvent.click(sortTypeElement!);
    expect(container.querySelector('.places__options--opened')).not.toBeInTheDocument();
  });

  it('should display all sort options', () => {
    render(
      <SortOptions sortType={SortType.Popular} onSortTypeChange={mockOnSortTypeChange} />
    );

    expect(screen.getAllByText('Popular')).toHaveLength(2);
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  it('should call onSortTypeChange when selecting a different sort option', async () => {
    const { container } = render(
      <SortOptions sortType={SortType.Popular} onSortTypeChange={mockOnSortTypeChange} />
    );

    const sortTypeElement = container.querySelector('.places__sorting-type');
    await userEvent.click(sortTypeElement!);

    const priceLowToHighOption = screen.getByText('Price: low to high');
    await userEvent.click(priceLowToHighOption);

    expect(mockOnSortTypeChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortTypeChange).toHaveBeenCalledWith(SortType.PriceLowToHigh);
  });

  it('should not call onSortTypeChange when selecting the same sort option', async () => {
    mockOnSortTypeChange.mockClear();

    const { container } = render(
      <SortOptions sortType={SortType.Popular} onSortTypeChange={mockOnSortTypeChange} />
    );

    const sortTypeElement = container.querySelector('.places__sorting-type');
    await userEvent.click(sortTypeElement!);

    const popularOption = container.querySelector('.places__option--active');
    await userEvent.click(popularOption!);

    expect(mockOnSortTypeChange).not.toHaveBeenCalled();
  });

  it('should close dropdown after selecting an option', async () => {
    const { container } = render(
      <SortOptions sortType={SortType.Popular} onSortTypeChange={mockOnSortTypeChange} />
    );

    const sortTypeElement = container.querySelector('.places__sorting-type');
    await userEvent.click(sortTypeElement!);

    const priceLowToHighOption = screen.getByText('Price: low to high');
    await userEvent.click(priceLowToHighOption);

    expect(container.querySelector('.places__options--opened')).not.toBeInTheDocument();
  });

  it('should display active class for selected sort option', () => {
    const { container } = render(
      <SortOptions sortType={SortType.PriceHighToLow} onSortTypeChange={mockOnSortTypeChange} />
    );

    const activeOption = container.querySelector('.places__option--active');
    expect(activeOption).toBeInTheDocument();
    expect(activeOption!.textContent).toBe('Price: high to low');
  });
});

