import { appProcess, changeCity, setError } from './app-process';

describe('AppProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { cityName: 'Paris', error: null };
    const result = appProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { cityName: 'Paris', error: null };

    const result = appProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city with "changeCity" action', () => {
    const initialState = { cityName: 'Paris', error: null };
    const expectedCity = 'Amsterdam';

    const result = appProcess.reducer(initialState, changeCity(expectedCity));

    expect(result.cityName).toBe(expectedCity);
  });

  it('should set error with "setError" action', () => {
    const initialState = { cityName: 'Paris', error: null };
    const expectedError = 'Something went wrong';

    const result = appProcess.reducer(initialState, setError(expectedError));

    expect(result.error).toBe(expectedError);
  });

  it('should clear error with "setError" action when null is passed', () => {
    const initialState = { cityName: 'Paris', error: 'Some error' };

    const result = appProcess.reducer(initialState, setError(null));

    expect(result.error).toBeNull();
  });
});
