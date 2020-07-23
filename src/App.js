import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Callback from './pages/Callback';

import setAuthHeader from './lib/setAuthHeader';

if (localStorage.token) {
  setAuthHeader(localStorage.token);
}

const App = () => {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/callback" component={Callback} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
