import React from 'react'
import { Flex, Box } from 'rebass'
import { withTheme } from 'styled-components'
import ScreenWrapper from './ScreenWrapper'
import HeaderTitleBox from '../components/ui/HeaderTitleBox'
import ChallengeCard from '../components/ui/ChallengeCard'
import Label from '../components/ui/Label'

import { POPULAR_CHALLENGES } from '../lib/dummyData'

import map from '../assets/images/map.jpg'

const User = ({ theme }) => (
  <ScreenWrapper>
    <Box style={{ flex: 1, height: '100%', width: '100%' }}>
      <HeaderTitleBox title='Your challenges' />
      <Box py={50} px={`${theme.uiGlobal.appLayoutMargin}px`}>
        <Box mb={4}>
          <Label>Recently Added</Label>
        </Box>
        <Flex justifyContent='space-between'>
          <Box width='49%'>
            <ChallengeCard
              image={map}
              challengeType={POPULAR_CHALLENGES[0].challengeType}
              title={POPULAR_CHALLENGES[0].title}
              exerciseType={POPULAR_CHALLENGES[0].exerciseType}
              fee={POPULAR_CHALLENGES[0].fee}
            />
          </Box>
          <Box width='49%'>
            <ChallengeCard
              image={map}
              challengeType={POPULAR_CHALLENGES[0].challengeType}
              title={POPULAR_CHALLENGES[0].title}
              exerciseType={POPULAR_CHALLENGES[0].exerciseType}
              fee={POPULAR_CHALLENGES[0].fee}
            />
          </Box>
        </Flex>
        <Box mb={4} mt={6}>
          <Label>In Progress</Label>
        </Box>
        <Flex justifyContent='space-between'>
          <Box width='24%'>
            <ChallengeCard
              image={map}
              challengeType={POPULAR_CHALLENGES[0].challengeType}
              title={POPULAR_CHALLENGES[0].title}
              exerciseType={POPULAR_CHALLENGES[0].exerciseType}
              fee={POPULAR_CHALLENGES[0].fee}
            />
          </Box>
          <Box width='24%'>
            <ChallengeCard
              image={map}
              challengeType={POPULAR_CHALLENGES[0].challengeType}
              title={POPULAR_CHALLENGES[0].title}
              exerciseType={POPULAR_CHALLENGES[0].exerciseType}
              fee={POPULAR_CHALLENGES[0].fee}
            />
          </Box>
          <Box width='24%'>
            <ChallengeCard
              image={map}
              challengeType={POPULAR_CHALLENGES[0].challengeType}
              title={POPULAR_CHALLENGES[0].title}
              exerciseType={POPULAR_CHALLENGES[0].exerciseType}
              fee={POPULAR_CHALLENGES[0].fee}
            />
          </Box>
          <Box width='24%'>
            <ChallengeCard
              image={map}
              challengeType={POPULAR_CHALLENGES[0].challengeType}
              title={POPULAR_CHALLENGES[0].title}
              exerciseType={POPULAR_CHALLENGES[0].exerciseType}
              fee={POPULAR_CHALLENGES[0].fee}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  </ScreenWrapper>
)

export default withTheme(User)
