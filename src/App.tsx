import { createBrowserHistory } from 'history';
import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import './App.scss';
import Navigation from './Navigation';

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
  return (
    <div className="App">
      <CustomRouter history={history}>
        <Navigation />
      </CustomRouter>
    </div>
  );
}

export default App;
