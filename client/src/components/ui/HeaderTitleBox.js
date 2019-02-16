import React from 'react'
import { Flex, Box } from 'rebass'
import { withTheme } from 'styled-components'
import Header from './Header'

const HeaderTitleBox = ({ theme, title }) => (
  <Flex
    style={{
      paddingTop: '40px',
      paddingLeft: `${theme.uiGlobal.appLayoutMargin}px`,
      backgroundColor: '#fff'
    }}
  >
    <Box
      style={{
        width: 'auto',
        borderBottom: `4px solid ${theme.colors.lightYellow}`
      }}
    >
      <Header pb={4}>{title}</Header>
    </Box>
  </Flex>
)

HeaderTitleBox.defaultProps = {
  title: ''
}

export default withTheme(HeaderTitleBox)
