import React from 'react'
import AppHeader from '../components/ui/AppHeader'

const ScreenWrapper = ({ children }) => {
  return (
    <div>
      <AppHeader />
      {children}
    </div>
  )
}

export default ScreenWrapper
