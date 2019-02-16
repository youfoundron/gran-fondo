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
  fee
}) => (
  <Card>
    <Map src={image || map} alt={image} />
    <Box p={[20]}>
      <Label color={theme.colors.grayLightest}>{challengeType} Challenge</Label>
      <Header my={[3]}>{title}</Header>
      <Flex justifyContent='space-between'>
        <Box>
          <Badge text={exerciseType} color={theme.colors[exerciseType]} />
        </Box>
        <Box>
          <Fee fee={50} fontSize={[5]} />
        </Box>
      </Flex>

      {/* <p>{isHorizontal ? 'Horizontal' : 'Vertical'}</p> */}
    </Box>
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
