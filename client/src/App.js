import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path='/login' exact={true} component={Login} />
            <PrivateRoute path='/' exact={true} component={Home} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
