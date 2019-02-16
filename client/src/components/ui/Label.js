import React from 'react'
import { Text as RText } from 'rebass'
import { withTheme } from 'styled-components'

const Label = ({ theme, children, color }) => (
  <RText
    fontWeight='bold'
    color={color || theme.colors.deepBlue}
    style={{
      textAlign: 'left',
      fontSize: '0.8rem',
      fontFamily: 'Metropolis Semi Bold',
      textTransform: 'uppercase'
    }}
  >
    {children}
  </RText>
)

Label.defaultProps = {
  children: null
}

export default withTheme(Label)
