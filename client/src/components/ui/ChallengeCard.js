import React from 'react'
import { Flex, Box } from 'rebass'
import styled, { withTheme } from 'styled-components'
import Card from './Card'
import Label from './Label'
import Header from './Header'
import Badge from './Badge'
import Fee from './Fee'

import map from '../../assets/images/map.jpg'

const Map = styled.img`
  width: 100%;
  height: auto;
`

const ChallengeCard = ({
  theme,
  image,
  challengeType,
  title,
  exerciseType,
  isHorizontal,
  fee,
  ...props
}) => (
  <Card {...props}>
    <Flex flexDirection={isHorizontal ? 'row' : 'column'}>
      <Box
        style={{
          borderRadius: isHorizontal
            ? `${theme.uiGlobal.borderRadius}px 0 0 ${
              theme.uiGlobal.borderRadius
            }px`
            : `${theme.uiGlobal.borderRadius}px ${
              theme.uiGlobal.borderRadius
            }px 0 0 `,
          width: '200px',
          backgroundImage: `url(${image || map})`,
          backgroundSize: 'cover'
        }}
      />
      <Box p={[20]} flex={1}>
        <Label color={theme.colors.grayLightest}>
          {challengeType} Challenge
        </Label>
        <Header my={[3]}>{title}</Header>
        <Flex justifyContent='space-between'>
          <Box>
            <Badge text={exerciseType} color={theme.colors[exerciseType]} />
          </Box>
          <Box>
            <Fee fee={50} fontSize={[5]} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Card>
)

ChallengeCard.defaultProps = {
  theme: {},
  image: '',
  challengeType: '',
  title: '',
  exerciseType: '', // one of exerciseTypes constant
  isHorizontal: false,
  children: null
}

export default withTheme(ChallengeCard)
