import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { AppThunkDispatch } from './mocks';
import { ReactElement } from 'react';

export function withBrowserRouter(component: ReactElement) {
  return (
    <BrowserRouter>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </BrowserRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: ReactElement,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
