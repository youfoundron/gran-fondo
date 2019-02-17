import React from 'react'
import { Flex, Box } from 'rebass'
import { withTheme } from 'styled-components'
import ChallengeCard from './ChallengeCard'

import map from '../../assets/images/map.jpg'

const ChallengeCardGroup = ({ theme, challenges, columns, isHorizontal }) => {
  let columnWidth
  switch (columns) {
    case 3:
      columnWidth = '32%'
      break
    case 2:
      columnWidth = '49%'
      break
    default:
      columnWidth = '100%'
      break
  }

  return (
    <Flex
      flexWrap={columns >= 2 ? 'wrap' : 'nowrap'}
      flexDirection={columns >= 2 ? 'row' : 'column'}
      justifyContent='space-between'
    >
      {challenges.map((c, index) => (
        <Box my={2} style={{ width: columnWidth }}>
          <ChallengeCard
            image={map}
            challengeType={c.challengeType}
            title={c.title}
            exerciseType={c.exerciseType}
            fee={c.fee}
            isHorizontal={isHorizontal}
          />
        </Box>
      ))}
    </Flex>
  )
}

ChallengeCardGroup.defaultProps = {
  theme: {},
  challenges: '',
  columns: 1,
  isHorizontal: false
}

export default withTheme(ChallengeCardGroup)
