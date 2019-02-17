import React from 'react'
import { Flex, Box } from 'rebass'
import { withTheme } from 'styled-components'
import ScreenWrapper from './ScreenWrapper'
import ChallengeDetails from '../components/ui/ChallengeDetails'
import Label from '../components/ui/Label'
import UserCard from '../components/ui/UserCard'

import { CHALLENGE_SINGLE, USERS } from '../lib/dummyData'

import image1 from '../assets/images/girlie.jpg'
import image2 from '../assets/images/guy-in-hat.jpg'
import image3 from '../assets/images/women.jpg'
import image4 from '../assets/images/guy-outside.jpg'

const ChallengeSingle = ({ theme }) => (
  <ScreenWrapper>
    <Flex style={{ flex: 1, height: '100%', width: '100%' }}>
      <Box
        flex={1}
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          backgroundColor: '#fff'
        }}
      >
        <ChallengeDetails
          exerciseType={
            CHALLENGE_SINGLE.exerciseType || 'Select an exercise type'
          }
          challengeType={CHALLENGE_SINGLE.challengeType}
          name={CHALLENGE_SINGLE.name || 'Name the challenge'}
          description={
            CHALLENGE_SINGLE.description ||
            'Add a description for this challenge'
          }
          expirationDate={CHALLENGE_SINGLE.expirationDate || ''}
          distance={CHALLENGE_SINGLE.distance || 'Add a distance'}
          fee={CHALLENGE_SINGLE.fee || '0'}
          isSubmitButtonVisible={false}
          isViewingExistingChallenge
        />
      </Box>
      <Box width='40%'>
        <Box py={50} px={`${theme.uiGlobal.appLayoutMargin}px`}>
          <Label>5 Participants</Label>
          <Box py={5}>
            <Box my={4}>
              <UserCard
                name={USERS[0].name}
                location={USERS[0].location}
                image={image1}
              />
            </Box>
            <Box my={4}>
              <UserCard
                name={USERS[1].name}
                location={USERS[1].location}
                image={image2}
              />
            </Box>
            <Box my={4}>
              <UserCard
                name={USERS[2].name}
                location={USERS[2].location}
                image={image4}
              />
            </Box>
            <Box my={4}>
              <UserCard
                name={USERS[3].name}
                location={USERS[3].location}
                image={image3}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  </ScreenWrapper>
)

export default withTheme(ChallengeSingle)
