import React from 'react'
import { withRouter } from 'react-router-dom'
import AppHeader from '../components/ui/AppHeader'

const ScreenWrapper = ({ history, children }) => (
  <div flexDirection='column' style={{ height: '100%' }}>
    <AppHeader history={history} />
    <div style={{ flex: 1 }}>{children}</div>
  </div>
)

export default withRouter(ScreenWrapper)
