import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import Alerts from './components/layouts/Alerts';
import AuthState from './contexts/auth/AuthState';
import AlertState from './contexts/alert/AlertState';
import ContactState from './contexts/contact/ContactState';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <ContactState> 
          <BrowserRouter>
            <Navbar />
            <Alerts />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/Login' component={Login} />
            </Switch>
          </BrowserRouter>
        </ContactState>
      </AlertState>
    </AuthState>
  );
}

export default App;
