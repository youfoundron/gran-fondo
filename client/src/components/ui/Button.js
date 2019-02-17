import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Button as RButton } from 'rebass'
import { shadeColor } from '../../lib/helpers'

const ButtonStyled = styled(RButton)`
  text-transform: uppercase;
  font-family: 'Metropolis Semi Bold';
  cursor: pointer;
  fontsize: ${p => p.fontSize}px;
  line-height: 1rem;
  box-shadow: ${({ theme }) => theme.uiGlobal.boxShadow};
  outline: none;
  opacity: ${p => (p.disabled ? 0.5 : 1)}
  pointer-events: ${p => (p.disabled ? 'none' : 'auto')}
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

const Button = ({
  theme,
  children,
  type,
  onClick,
  isRounded,
  fontSize,
  disabled,
  style
}) => (
  <ButtonStyled
    type={type}
    style={style}
    onClick={onClick}
    fontSize={fontSize}
    disabled={disabled}
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
  fontSize: 14,
  disabled: false,
  style: {}
}

export default withTheme(Button)
