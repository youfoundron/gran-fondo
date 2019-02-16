import React, { Component } from 'react'
<<<<<<< Updated upstream
import { ThemeProvider } from 'styled-components'
import ContractState from './components/ContractState.js'
// import withTheme from './components/hoc/with-theme'
import './App.css'
import ChallengeCard from './components/ui/ChallengeCard'
import theme from './lib/theme'

import { challengeType, exerciseType } from './lib/constants'

class App extends Component {
  state = { loading: true, drizzleState: null }

  componentDidMount () {
    const { drizzle } = this.props

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState()

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState })
      }
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    if (this.state.loading) {
      return 'Loading Drizzle'
    }

    return (
      <ThemeProvider theme={theme}>
        <div
          className='App'
          style={{
            minHeight: '1000px',
            padding: '40px',
            backgroundColor: theme.uiGlobal.appBackground
          }}
        >
          <ChallengeCard
            exerciseType={exerciseType.BIKE}
            challengeType={challengeType.SEGMENT}
            title='2 Mile Uphill Bike Route'
          >
            Yep
          </ChallengeCard>
          {/* <ContractState
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        /> */}
        </div>
      </ThemeProvider>
=======
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Home from './pages/Home'
import User from './pages/User'
import CreateChallengeSelectType from './pages/CreateChallengeSelectType'
import CreateChallengeForm from './pages/CreateChallengeForm'
import ChallengeDetails from './pages/ChallengeDetails'
import './App.css'

class App extends Component {
  render () {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path='/login' exact component={Login} />
            <PrivateRoute path='/' exact component={Home} />
            <PrivateRoute path='/user' component={User} />
            <PrivateRoute
              path='/create'
              component={CreateChallengeSelectType}
            />
            <PrivateRoute
              path='/create/:type(segment|distance)'
              component={CreateChallengeForm}
            />
            <PrivateRoute
              path='/:type(segment|distance)/:challengeId'
              component={ChallengeDetails}
            />
          </Switch>
        </Layout>
      </Router>
>>>>>>> Stashed changes
    )
  }
}

export default App
