import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../store/actions'

const Login = ({ loggedIn, loginUser, _loginUser }) => (
  loggedIn
    ? <Redirect to='/' />
    : (
      <div>
        <h1>Login</h1>
        <button onClick={_loginUser}>Login to Strava</button>
      </div>
    )
)

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: bindActionCreators(actionCreators.loginUser, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)