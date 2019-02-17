import React from 'react'
import { Box } from 'rebass'
import { withRouter } from 'react-router-dom'
import AppHeader from '../components/ui/AppHeader'

const ScreenWrapper = ({ history, children }) => (
  <Box flexDirection='column' style={{ height: '100%' }}>
    <AppHeader history={history} />
    <div style={{ flex: 1, height: '100%' }}>{children}</div>
  </Box>
)

export default withRouter(ScreenWrapper)
