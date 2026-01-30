import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppProcess} from '../../types/state';
import {NameSpace} from '../../const';

const initialState: AppProcess = {
  cityName: 'Paris',
  error: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: {},
});

export const { changeCity, setError } = appProcess.actions;
