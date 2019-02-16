import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, loggedIn, ...restProps }) => (
  <Route
    {...restProps}
    render={props => loggedIn
      ? <Component {...props} />
      : <Redirect to={'/login'} />
    }
  />
)

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
})

export default connect(mapStateToProps)(PrivateRoute)