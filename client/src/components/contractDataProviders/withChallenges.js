import React from 'react'
import { compose } from 'redux'
import withSegmentChallenges from './withSegmentChallenges'
import withDistanceChallenges from './withDistanceChallenges'

const withChallenges = Cmp => compose(
  withSegmentChallenges,
  withDistanceChallenges
)(props => <Cmp {...props} />)

export default withChallenges