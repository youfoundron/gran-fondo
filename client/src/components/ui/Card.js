import React from 'react'
import { Card as RCard } from 'rebass'
import { withTheme } from 'styled-components'

const Card = ({ theme, children }) => (
  <RCard
    fontWeight='bold'
    width={[1]}
    bg='#ffffff'
    borderRadius={theme.uiGlobal.borderRadius}
    boxShadow={theme.uiGlobal.boxShadow}
  >
    {children}
  </RCard>
)

export default withTheme(Card)
