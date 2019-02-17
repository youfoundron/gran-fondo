import React from 'react'
import { Text } from 'rebass'
import { withTheme } from 'styled-components'

const Badge = ({ theme, text, color }) => (
  <div
    style={{
      display: 'inline-block',
      width: 'auto',
      borderRadius: '3px',
      padding: '4px 6px',
      textTransform: 'uppercase',
      fontFamily: 'Metropolis Semi Bold',
      backgroundColor: color || theme.colors.grayDarkest
    }}
  >
    <Text
      color='#fff'
      fontSize={1}
      fontWeight='bold'
      style={{ lineHeight: '1rem' }}
    >
      {text}
    </Text>
  </div>
)

Badge.defaultProps = {
  text: '',
  color: ''
}

export default withTheme(Badge)
