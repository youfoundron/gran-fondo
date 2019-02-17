import React from 'react'
import withNumSegmentChallenges from './withNumSegmentChallenges'

const withSegmentChallenges = Cmp => withNumSegmentChallenges(
  class extends React.Component {
    state = {
      dataKeys: []
    }
    
    componentDidMount () {
      const { drizzle, numSegmentChallenges } = this.props
      const contract = drizzle.contracts.StravaChallengeHub
      const dataKeys = []
      for (let i = 0; i < numSegmentChallenges; i++) {
        dataKeys.push(contract.methods.segmentChallengesById.cacheCall(i))
      }

      this.setState({ dataKeys })
    }

    render () {
      const { StravaChallengeHub } = this.props.drizzleState.contracts;

      const segmentChallenges = this.state.dataKeys.map(dataKey => {
        return (
          StravaChallengeHub.segmentChallengesById[dataKey] &&
          StravaChallengeHub.segmentChallengesById[dataKey].value
        )
      })

      if (segmentChallenges.filter(x => x == undefined).length) {
        return 'Loading...'
      }

      return (
        <Cmp
          {...this.props}
          segmentChallenges={segmentChallenges}
        />
      )
    }
  }
)

export default withSegmentChallenges