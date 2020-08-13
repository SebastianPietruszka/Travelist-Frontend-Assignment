import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OffersList from './views/OffersList';
import OfferDetails from './views/OfferDetails';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <OffersList />
          </Route>
          <Route exact path="/:offerId">
            <OfferDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
