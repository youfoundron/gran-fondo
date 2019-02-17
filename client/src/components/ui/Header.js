import React from 'react'
import { Heading as RHeading } from 'rebass'
import { withTheme } from 'styled-components'

const Header = ({
  theme,
  children,
  fontFamily,
  fontSize,
  color,
  hasBottomBorder,
  ...props
}) => (
  <RHeading
    {...props}
    fontWeight='bold'
    fontSize={[fontSize]}
    color={color || theme.colors.grayDarkest}
    style={{
      textAlign: 'left',
      fontFamily,
      ...(hasBottomBorder
        ? {
          width: 'auto',
          borderBottom: `4px solid ${theme.colors.darkYellow}`,
          paddingBottom: 10,
          marginBottom: 30
        }
        : {})
    }}
  >
    {children}
  </RHeading>
)

Header.defaultProps = {
  children: null,
  fontSize: 4,
  color: '',
  hasBottomBorder: false,
  fontFamily: 'Metropolis Semi Bold'
}

export default withTheme(Header)
