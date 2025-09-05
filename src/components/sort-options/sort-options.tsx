import { useState } from 'react';
import { SortType } from '../../Const';

type SortOptionsProps = {
  sortType: SortType | undefined;
  onSortTypeChange: (sortType: SortType) => void;
}

const SORT_OPTIONS = [
  { id: SortType.Popular, label: 'Popular' },
  { id: SortType.PriceLowToHigh, label: 'Price: low to high' },
  { id: SortType.PriceHighToLow, label: 'Price: high to low' },
  { id: SortType.TopRated, label: 'Top rated first' }
];

function SortOptions({sortType, onSortTypeChange}: SortOptionsProps): JSX.Element {  
  const [activeSortType, setActiveSortType] = useState(sortType);
  const [isOpen, setIsOpen] = useState<boolean>(false); 

  const handleSortChange = (sortType: SortType) => {
    setIsOpen(false);
     if (sortType === activeSortType) {
      return;
    }
    setActiveSortType(sortType);
    onSortTypeChange(sortType);
  };

  return (
    <>
      {activeSortType !== undefined && (<form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen(!isOpen)} >
          {SORT_OPTIONS[activeSortType].label}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
          {SORT_OPTIONS.map(({ id, label }) => 
            (
              <li
                key={id}
                className={`places__option ${activeSortType === id ? 'places__option--active' : ''}`}
                tabIndex={0}
                onClick={() => handleSortChange(id)}
              >
                {label}
              </li>
            )
          )}
        </ul>
      </form>)}
    </>
  );
}

export default SortOptions;
