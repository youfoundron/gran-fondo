import React from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../store/actions'
import ScreenWrapper from './ScreenWrapper'

const Login = ({ loggedIn, loginUser }) =>
  loggedIn ? (
    <Redirect to='/' />
  ) : (
    <ScreenWrapper loggedIn={loggedIn} style={{ minHeight: '2000px' }}>
      <h1>Login</h1>
      <button onClick={loginUser}>Login to Strava</button>
    </ScreenWrapper>
  )

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
})

const mapDispatchToProps = dispatch => ({
  loginUser: bindActionCreators(actionCreators.loginUser, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
