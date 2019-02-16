import React from 'react'
import { Text } from 'rebass'
import { withTheme } from 'styled-components'

const Fee = ({ theme, fee, fontSize }) => (
  <Text
    color={theme.colors.grayDarkest}
    fontSize={fontSize}
    style={{ fontFamily: 'Metropolis Extra Light' }}
  >
    ${fee}
  </Text>
)

Fee.defaultProps = {
  fee: '',
  fontSize: []
}

export default withTheme(Fee)
