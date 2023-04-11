import { createBrowserHistory } from 'history';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import './App.scss';
import Navigation from './Navigation';
import ScrollToTop from './shared/hooks/ScrollToTop';

export const history = createBrowserHistory();

const CustomRouter = ({ history, ...props }: any) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

function App() {
  useEffect(() => {
    window.addEventListener('load', () => {
      localStorage.removeItem('access_token');
    });
  }, []);
  return (
    <div className="App">
      <CustomRouter history={history}>
        <ScrollToTop />
        <Navigation />
      </CustomRouter>
    </div>
  );
}

export default App;
