import React from 'react'
import withNumDistanceChallenges from './withNumDistanceChallenges'

const withDistanceChallenges = Cmp => withNumDistanceChallenges(
  class extends React.Component {
    state = {
      dataKeys: []
    }
    
    componentDidMount () {
      const { drizzle, numDistanceChallenges } = this.props
      const contract = drizzle.contracts.StravaChallengeHub
      const dataKeys = []
      for (let i = 0; i < numDistanceChallenges; i++) {
        dataKeys.push(contract.methods.distanceChallengesById.cacheCall(i))
      }

      this.setState({ dataKeys })
    }

    render () {
      const { StravaChallengeHub } = this.props.drizzleState.contracts;

      const distanceChallenges = this.state.dataKeys.map(dataKey => {
        return (
          StravaChallengeHub.distanceChallengesById[dataKey] &&
          StravaChallengeHub.distanceChallengesById[dataKey].value
        )
      })

      if (distanceChallenges.filter(x => x === undefined).length) {
        return 'Loading...'
      }

      return (
        <Cmp
          {...this.props}
          distanceChallenges={distanceChallenges}
        />
      )
    }
  }
)

export default withDistanceChallenges