import React from 'react'
import { withTheme } from 'styled-components'
import AppHeader from '../components/ui/AppHeader'

const ScreenWrapper = ({ theme, children }) => (
  <div flexDirection='column' style={{ height: '100%' }}>
    <AppHeader />
    <div style={{ flex: 1 }}>{children}</div>
  </div>
)

export default withTheme(ScreenWrapper)
