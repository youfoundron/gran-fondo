import React from 'react'
import { Flex, Box } from 'rebass'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import Label from './Label'
import Header from './Header'
import Fee from './Fee'
import Button from './Button'
import Badge from './Badge'

import map from '../../assets/images/map.jpg'

const LabelWrap = ({ children }) => (
  <Box mb={1}>
    <Label>{children}</Label>
  </Box>
)

const ChallengeDetails = ({
  theme,
  history,
  children,
  challengeType,
  exerciseType,
  name,
  expirationDate,
  distance,
  fee,
  description,
  isSubmitButtonActive,
  isSubmitButtonVisible,
  onClick
}) => (
  <Flex flexDirection='column' style={{ height: '100%' }}>
    <div style={{ height: '100%' }}>
      <Flex
        style={{
          position: 'sticky',
          top: `${theme.uiGlobal.appHeaderLogoHeight +
            theme.uiGlobal.appHeaderLogoMargin * 2}px`,
          backgroundColor: theme.colors.deepBlue,
          boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)'
        }}
      >
        <Box flex={1} p={6}>
          <Label color='#fff'>{`${challengeType} Challenge`}</Label>
          <Header
            fontSize={5}
            color='#fff'
            style={{ marginTop: theme.space[2] }}
          >
            {name}
          </Header>
        </Box>
        <Flex
          px={4}
          py={6}
          justifyContent='flex-end'
          alignItems='flex-end'
          style={{
            width: 'auto',
            paddingLeft: theme.space[6],
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            paddingRight: `${theme.uiGlobal.appLayoutMargin}px`
          }}
        >
          <Fee fee={fee} fontSize={6} style={{ color: '#fff' }} />
        </Flex>
      </Flex>

      <Box>
        <img src={map} alt={map} style={{ width: '100%', height: 'auto' }} />
        <div
          style={{
            margin: `${theme.space[5]}px ${theme.uiGlobal.appLayoutMargin}px`
          }}
        >
          <LabelWrap>Description</LabelWrap>
          {description}
          <p>----------------</p>
          <Badge text={exerciseType} color={theme.colors[exerciseType]} />
          <p>distance: {distance}</p>
          <p>expirationDate: {expirationDate}</p>
        </div>
      </Box>
    </div>

    {isSubmitButtonVisible && (
      <Box
        p={5}
        style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: theme.uiGlobal.appBackground,
          boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Button
          disabled={isSubmitButtonActive}
          onClick={onClick}
          type='primary'
          style={{ padding: theme.space[4], width: '100%' }}
        >
          Confirm and Create
        </Button>
      </Box>
    )}
  </Flex>
)

ChallengeDetails.defaultProps = {
  exerciseType: '',
  name: '',
  description: '',
  expirationDate: '',
  distance: '',
  fee: '',
  isSubmitButtonActive: false,
  isSubmitButtonVisible: true
}

export default withRouter(withTheme(ChallengeDetails))
