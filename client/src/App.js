import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/User';
import CreateChallengeSelectType from './pages/CreateChallengeSelectType';
import CreateChallengeForm from './pages/CreateChallengeForm';
import ChallengeDetails from './pages/ChallengeDetails';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path='/login' exact={true} component={Login} />
            <PrivateRoute path='/' exact={true} component={Home} />
            <PrivateRoute path='/user' component={User} />
            <PrivateRoute path='/create' component={CreateChallengeSelectType} />
            <PrivateRoute path='/create/:type(segment|distance)' component={CreateChallengeForm} />
            <PrivateRoute path='/:type(segment|distance)/:challengeId' component={ChallengeDetails} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
