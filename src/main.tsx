import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.scss';
import IntlProviderWrapper from './shared/hoc/IntlProviderWrapper';
import { persistor, store } from './shared/store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProviderWrapper>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="light"
          />
          <ToastContainer />
        </PersistGate>
      </IntlProviderWrapper>
    </Provider>
  </React.StrictMode>
);
