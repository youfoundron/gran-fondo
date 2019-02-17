import React from 'react'
import { Flex, Box } from 'rebass'
import { withTheme } from 'styled-components'
import Header from './Header'

const HeaderTitleBox = ({ theme, title, alignment, style }) => {
  let justifyContent
  switch (alignment) {
    case 'center':
      justifyContent = 'center'
      break
    case 'right':
      justifyContent = 'flex-end'
      break
    default:
      justifyContent = 'flex-start'
      break
  }

  return (
    <Flex
      style={{
        paddingTop: '50px',
        paddingLeft: `${theme.uiGlobal.appLayoutMargin}px`,
        paddingRight: `${theme.uiGlobal.appLayoutMargin}px`,
        backgroundColor: '#fff',
        justifyContent,
        ...style
      }}
    >
      <Box
        style={{
          width: 'auto',
          borderBottom: `4px solid ${theme.colors.lightYellow}`
        }}
      >
        <Header pb={4} fontFamily='Metropolis Thin' fontSize={5}>
          {title}
        </Header>
      </Box>
    </Flex>
  )
}

HeaderTitleBox.defaultProps = {
  title: '',
  alignment: 'left',
  style: {}
}

export default withTheme(HeaderTitleBox)
