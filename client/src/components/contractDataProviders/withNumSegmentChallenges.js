import React from 'react'
import withDrizzleContext from './withDrizzleContext'
import { challengeTypeInts } from '../../lib/constants'

const withNumSegmentChallenges = Cmp => withDrizzleContext(
  class extends React.Component {
    state = {
      dataKey: null
    }
    
    componentDidMount () {
      const { drizzle } = this.props
      const contract = drizzle.contracts.StravaChallengeHub
      const dataKey = contract.methods.challengeManager.cacheCall(challengeTypeInts.SEGMENT)

      this.setState({ dataKey })
    }

    render () {
      const { StravaChallengeHub } = this.props.drizzleState.contracts;
      const numSegmentChallenges = (
        StravaChallengeHub.challengeManager[this.state.dataKey] &&
        StravaChallengeHub.challengeManager[this.state.dataKey].value
      )

      if (numSegmentChallenges == undefined) {
        return 'Loading...'
      }

      return (
        <Cmp
          {...this.props}
          numSegmentChallenges={numSegmentChallenges}
        />
      )
    }
  }
)

export default withNumSegmentChallenges