import React from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../store/actions'
import { withTheme } from 'styled-components'
import { Flex, Box } from 'rebass'
import ScreenWrapper from './ScreenWrapper'
import HeaderTitleBox from '../components/ui/HeaderTitleBox'
import Label from '../components/ui/Label'
import ChallengeCardGroup from '../components/ui/ChallengeCardGroup'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Header from '../components/ui/Header'
import Button from '../components/ui/Button'

import stravaImage from '../assets/images/running-brush.jpg'
import stravaLogo from '../assets/images/strava-logo.jpg'
import personIcon from '../assets/images/icon-person.jpg'
import lockIcon from '../assets/images/icon-lock.jpg'

import { POPULAR_CHALLENGES } from '../lib/dummyData'

const Login = ({ theme, loggedIn, loginUser }) =>
  loggedIn ? (
    <Redirect to='/' />
  ) : (
    <ScreenWrapper loggedIn={loggedIn}>
      <Flex style={{ flex: 1, height: '100%', width: '100%' }}>
        <Box flex={1}>
          <HeaderTitleBox title='Login to get started' />
          <Box py={50} px={`${theme.uiGlobal.appLayoutMargin}px`}>
            <Box mb={4}>
              <Label>Popular Challenges</Label>
            </Box>
            <ChallengeCardGroup challenges={POPULAR_CHALLENGES} isHorizontal />
          </Box>
        </Box>
        <Box
          width='40%'
          style={{
            backgroundPositon: 'center',
            backgroundImage: `url(${stravaImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: theme.colors.darkBlue
          }}
        >
          <Box m={8}>
            <Header color='#fff' hasBottomBorder fontSize={5}>
              Login with Strava
            </Header>
            <Card>
              <Box p={4}>
                <Box p={5} mb={6} mt={4} style={{ textAlign: 'center' }}>
                  <Box mb={6}>
                    <img
                      src={stravaLogo}
                      alt={stravaLogo}
                      style={{
                        width: '80%',
                        maxWidth: '200px'
                      }}
                    />
                  </Box>
                  <Box my={4}>
                    <Input type='text' title='Username' image={personIcon} />
                  </Box>
                  <Box my={4}>
                    <Input type='password' title='Password' image={lockIcon} />
                  </Box>
                </Box>
                <Button
                  onClick={loginUser}
                  type='primary'
                  style={{ padding: theme.space[4], width: '100%' }}
                >
                  Login to Strava
                </Button>
              </Box>
            </Card>
          </Box>
        </Box>
      </Flex>
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
)(withTheme(Login))
