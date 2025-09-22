import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { cities } from './mocks/cities';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction } from './store/api-actions';

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App cities={cities} />
    </Provider>
  </React.StrictMode>
);
