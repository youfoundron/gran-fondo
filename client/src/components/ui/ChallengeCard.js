import React from 'react'
import { Flex, Box } from 'rebass'
import { withTheme } from 'styled-components'
import Card from './Card'
import Label from './Label'
import Header from './Header'
import Badge from './Badge'
import Fee from './Fee'
import Button from './Button'

import map from '../../assets/images/map.jpg'

const ChallengeCard = ({
  theme,
  image,
  challengeType,
  title,
  exerciseType,
  isHorizontal,
  fee,
  hasJoinButton,
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
          ...(isHorizontal
            ? { width: '200px' }
            : { height: '200px', width: '100%' }),
          backgroundImage: `url(${image || map})`,
          backgroundSize: 'cover'
        }}
      />
      <Flex
        p={[20]}
        flex={1}
        style={{ minHeight: '180px' }}
        flexDirection='column'
        justifyContent='space-between'
      >
        <Flex justifyContent='space-between'>
          <Box pr={2}>
            <Label color={theme.colors.grayLightest}>
              {challengeType} Challenge
            </Label>
            <Header mt={2}>{title}</Header>
          </Box>
          {hasJoinButton && (
            <Box>
              <Button
                onClick={() => null}
                type='primary'
                style={{ padding: theme.space[2] }}
              >
                Join
              </Button>
            </Box>
          )}
        </Flex>
        <Flex justifyContent='space-between'>
          <Box>
            <Badge text={exerciseType} color={theme.colors[exerciseType]} />
          </Box>
          <Box>
            <Fee fee={fee} fontSize={[5]} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  </Card>
)

ChallengeCard.defaultProps = {
  theme: {},
  image: '',
  challengeType: '',
  title: '',
  fee: '',
  exerciseType: '', // one of exerciseTypes constant
  isHorizontal: false,
  children: null,
  hasJoinButton: false
}

export default withTheme(ChallengeCard)
