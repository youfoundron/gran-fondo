import React from 'react'
import { Heading as RHeading } from 'rebass'
import { withTheme } from 'styled-components'

const Header = ({ theme, children, fontFamily, fontSize, ...props }) => (
  <RHeading
    {...props}
    fontWeight='bold'
    fontSize={[fontSize]}
    color={theme.colors.grayDarkest}
    style={{
      textAlign: 'left',
      fontFamily
    }}
  >
    {children}
  </RHeading>
)

Header.defaultProps = {
  children: null,
  fontSize: 4,
  fontFamily: 'Metropolis Semi Bold'
}

export default withTheme(Header)
