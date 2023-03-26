import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.scss';
import IntlProviderWrapper from './shared/hoc/IntlProviderWrapper';
import { store } from './shared/store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProviderWrapper>
        <App />
      </IntlProviderWrapper>
    </Provider>
  </React.StrictMode>
);
