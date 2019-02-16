import React from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../store/actions'
import { withTheme } from 'styled-components'
import { Flex, Box, Button } from 'rebass'
import ScreenWrapper from './ScreenWrapper'
import HeaderTitleBox from '../components/ui/HeaderTitleBox'
import Label from '../components/ui/Label'
import ChallengeCard from '../components/ui/ChallengeCard'

import map from '../assets/images/map.jpg'

import { POPULAR_CHALLENGES } from '../lib/dummyData'

const Login = ({ theme, loggedIn, loginUser }) =>
  loggedIn ? (
    <Redirect to='/' />
  ) : (
    <ScreenWrapper loggedIn={loggedIn}>
      <Flex style={{ flex: 1, height: '100%', width: '100%' }}>
        <Box flex={1}>
          <HeaderTitleBox title='Login to get started' />
          <Box py={50} pl={`${theme.uiGlobal.appLayoutMargin}px`}>
            <Box mb={6}>
              <Label>Popular Challenges</Label>
            </Box>
            <Flex flexDirection='column'>
              {POPULAR_CHALLENGES.map((c, index) => (
                <Box my={2}>
                  <ChallengeCard
                    image={map}
                    challengeType={c.challengeType}
                    title={c.title}
                    exerciseType={c.exerciseType}
                    fee={c.fee}
                    isHorizontal
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
        <Box width='40%'>
          <Button onClick={loginUser}>Login to Strava</Button>
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
