import React from 'react'
import { Flex, Box, Text } from 'rebass'
import { withTheme } from 'styled-components'
import ScreenWrapper from './ScreenWrapper'
import ChallengeCardGroup from '../components/ui/ChallengeCardGroup'
import Label from '../components/ui/Label'
import { exerciseType, challengeType } from '../lib/constants'

import { POPULAR_CHALLENGES } from '../lib/dummyData'
import theme from '../lib/theme'

const SHOW_ALL = 'Show All'

const Filters = ({ filters, selected, label, style }) => (
  <Box style={style}>
    <Box pl={2} pb={3}>
      <Label color='#aaa'>{label}</Label>
    </Box>
    <Flex pr={4} style={{ borderTop: '1px solid #ddd' }}>
      {filters.map((t, index) => (
        <Box
          py={4}
          mx={3}
          style={{
            fontFamily: 'Metropolis Semi Bold',
            color: t === selected ? 'inherit' : '#aaa',
            borderBottom: `4px solid ${
              t === selected ? theme.colors.darkYellow : '#fff'
            }`
          }}
        >
          <Text
            key={index}
            style={{ whiteSpace: 'nowrap' }}
            // onClick={() => this.setState({ challengeFilter: t })}
          >
            {t}
          </Text>
        </Box>
      ))}
    </Flex>
  </Box>
)

class Home extends React.Component {
  constructor () {
    super()

    this.state = {
      challengeFilter: SHOW_ALL,
      exerciseFilter: SHOW_ALL
    }
  }

  render () {
    const { theme } = this.props
    const exerciseTypes = Object.values(exerciseType)
    const challengeTypes = Object.values(challengeType)

    // const popularChallengesFiltered =
    //   this.state.challengeFilter === SHOW_ALL
    //     ? POPULAR_CHALLENGES
    //     : POPULAR_CHALLENGES.filter(
    //       t => t.challengeType === this.state.challengeFilter
    //     ).filter(t => t.exerciseType === this.state.exerciseFilter)

    return (
      <ScreenWrapper>
        <Flex
          px={theme.uiGlobal.appLayoutMargin}
          pt={theme.space[7]}
          style={{ backgroundColor: '#fff' }}
        >
          <Filters
            label='Challenge Type'
            filters={[SHOW_ALL, ...challengeTypes]}
            selected={this.state.challengeFilter}
            style={{ flex: 0 }}
          />
          <Filters
            label='Exercise Type'
            filters={[SHOW_ALL, ...exerciseTypes]}
            selected={this.state.exerciseFilter}
            style={{ flex: 1 }}
          />
        </Flex>
        <Box py={50} px={theme.uiGlobal.appLayoutMargin}>
          <ChallengeCardGroup
            challenges={[...POPULAR_CHALLENGES, ...POPULAR_CHALLENGES]}
            columns={2}
            isHorizontal
          />
        </Box>
      </ScreenWrapper>
    )
  }
}

export default withTheme(Home)
