import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Button as RButton } from 'rebass'
import { shadeColor } from '../../lib/helpers'

const ButtonStyled = styled(RButton)`
  text-transform: uppercase;
  font-family: 'Metropolis Semi Bold';
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.uiGlobal.boxShadow};
  transition: all 0.25s ease;

  ${p => {
    if (p.type === 'primary') {
      return `
      color: ${p.theme.colors.grayDarker};
      background-color: ${p.theme.colors.darkYellow};

      &:hover {
        background-color: ${shadeColor(p.theme.colors.darkYellow, 0.3)};
      }
    `
    }
    if (p.type === 'secondary') {
      return `
      color: #fff;
      background-color: ${p.theme.colors.linkBlue};
      
      &:hover {
        background-color: ${shadeColor(p.theme.colors.linkBlue, -0.2)};
      }
      `
    }
  }}
`

const Button = ({ theme, children, type, onClick, isRounded, style }) => (
  <ButtonStyled
    type={type}
    style={style}
    onClick={onClick}
    borderRadius={isRounded ? '100px' : '6px'}
  >
    {children}
  </ButtonStyled>
)

Button.defaultProps = {
  children: null,
  type: '',
  onClick: '',
  isRounded: false,
  style: {}
}

export default withTheme(Button)
