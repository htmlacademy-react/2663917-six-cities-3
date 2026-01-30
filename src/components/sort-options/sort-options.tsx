import { useState, memo } from 'react';
import { SortType } from '../../const';

type SortOptionsProps = {
  sortType: SortType | undefined;
  onSortTypeChange: (sortType: SortType) => void;
}

const SORT_OPTIONS = [
  { id: SortType.Popular, label: 'Popular' },
  { id: SortType.PriceLowToHigh, label: 'Price: low to high' },
  { id: SortType.PriceHighToLow, label: 'Price: high to low' },
  { id: SortType.TopRated, label: 'Top rated first' }
] as const;

function SortOptions({sortType, onSortTypeChange}: SortOptionsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSortChange = (newSortType: SortType) => {
    setIsOpen(false);
    if (newSortType === sortType) {
      return;
    }
    onSortTypeChange(newSortType);
  };

  if (sortType === undefined) {
    return null;
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen(!isOpen)} >
        {SORT_OPTIONS[sortType].label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map(({ id, label }) =>
          (
            <li
              key={id}
              className={`places__option ${sortType === id ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleSortChange(id)}
            >
              {label}
            </li>
          )
        )}
      </ul>
    </form>
  );
}

const MemoizedSortOptions = memo(SortOptions);
export default MemoizedSortOptions;
