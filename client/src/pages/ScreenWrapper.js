import React from 'react'
import { Box } from 'rebass'
import { withRouter } from 'react-router-dom'
import AppHeader from '../components/ui/AppHeader'

const ScreenWrapper = ({ history, children, style }) => (
  <Box flexDirection='column' style={{ height: '100%' }}>
    <AppHeader history={history} />
    <div style={{ flex: 1, ...style }}>{children}</div>
  </Box>
)

export default withRouter(ScreenWrapper)
