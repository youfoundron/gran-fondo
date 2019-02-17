import React from 'react'
import withDrizzleContext from './withDrizzleContext'
import { challengeTypeInts } from '../../lib/constants'

const withNumDistanceChallenges = Cmp => withDrizzleContext(
  class extends React.Component {
    state = {
      dataKey: null
    }
    
    componentDidMount () {
      const { drizzle } = this.props
      const contract = drizzle.contracts.StravaChallengeHub
      const dataKey = contract.methods.challengeManager.cacheCall(challengeTypeInts.DISTANCE)

      this.setState({ dataKey })
    }

    render () {
      const { StravaChallengeHub } = this.props.drizzleState.contracts;
      const numDistanceChallenges = (
        StravaChallengeHub.challengeManager[this.state.dataKey] &&
        StravaChallengeHub.challengeManager[this.state.dataKey].value
      )

      if (numDistanceChallenges == undefined) {
        return 'Loading...'
      }

      return (
        <Cmp
          {...this.props}
          numDistanceChallenges={numDistanceChallenges}
        />
      )
    }
  }
)

export default withNumDistanceChallenges