import React from 'react'
import { Text } from 'rebass'
import { withTheme } from 'styled-components'

const Badge = ({ theme, text, color }) => (
  <div
    width='auto'
    style={{
      borderRadius: '3px',
      padding: '3px 4px',
      backgroundColor: color || theme.colors.grayDarkest
    }}
  >
    <Text color='#fff' fontSize={[1]} fontWeight='bold'>
      {text}
    </Text>
  </div>
)

Badge.defaultProps = {
  text: '',
  color: ''
}

export default withTheme(Badge)
