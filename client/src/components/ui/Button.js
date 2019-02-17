import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Button as RButton } from 'rebass'
import { shadeColor } from '../../lib/helpers'

const ButtonStyled = styled(RButton)`
  text-transform: uppercase;
  font-family: 'Metropolis Semi Bold';
  cursor: pointer;
  transition: all 0.25s ease;

  ${p => {
    if (p.type === 'primary') {
      return `
      color:  ${p.theme.colors.grayDarker};
      background-color: ${p.theme.colors.darkYellow};

      &:hover {
        background-color: ${shadeColor(p.theme.colors.darkYellow, 0.3)};
      }
    `
    }
  }}
`

const Button = ({ theme, children, type, onClick, style }) => (
  <ButtonStyled type={type} style={style} onClick={onClick}>
    {children}
  </ButtonStyled>
)

Button.defaultProps = {
  children: null,
  type: '',
  onClick: '',
  style: {}
}

export default withTheme(Button)
