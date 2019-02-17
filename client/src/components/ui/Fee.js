import React from 'react'
import { Text } from 'rebass'
import { withTheme } from 'styled-components'

const Fee = ({ theme, fee, fontSize, style }) => (
  <Text
    color={theme.colors.grayDarkest}
    fontSize={fontSize}
    style={{ fontFamily: 'Metropolis Extra Light', ...style }}
  >
    ${fee}
  </Text>
)

Fee.defaultProps = {
  fee: '',
  fontSize: [],
  style: {}
}

export default withTheme(Fee)
