import React from 'react'
import { Flex, Box } from 'rebass'
import styled, { withTheme } from 'styled-components'
import Label from './Label'

const ICON_SIZE = 20
const INPUT_HEIGHT = 34

const InputBox = styled.input`
  border: none;
  width: calc(100% - 20px);
  padding-left: 10px;
  padding-right: 10px;
  line-height: ${INPUT_HEIGHT}px;
`

const Input = ({ theme, type, title, image, value, onChange, handleBlur }) => (
  <Flex
    alignItems='flex-end'
    style={{
      borderBottom: '1px solid #ddd'
    }}
  >
    <Box style={{ marginBottom: '5px' }}>
      <Label>{title}</Label>
    </Box>
    <Box flex={1} mx={3}>
      <InputBox
        type={type}
        value={value}
        onChange={onChange}
        handleBlur={handleBlur}
        style={{
          fontSize: '16px',
          outline: 'none',
          color: '#666',
          fontFamily: 'Metropolis Regular',
          backgroundColor: 'transparent'
        }}
      />
    </Box>
    <div
      style={{
        width: `${ICON_SIZE + 10}px`,
        height: `${ICON_SIZE}px`,
        backgroundSize: `${ICON_SIZE}px ${ICON_SIZE}px`,
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat'
      }}
    />
  </Flex>
)

Input.defaultProps = {
  type: 'text',
  title: '',
  image: ''
}

export default withTheme(Input)
