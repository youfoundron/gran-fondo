import React from 'react'
import { Flex, Box, Text } from 'rebass'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import Label from './Label'
import Header from './Header'
import Fee from './Fee'
import Button from './Button'
import Badge from './Badge'
import { convertFeetToMiles } from '../../lib/helpers'

import map from '../../assets/images/map.jpg'

const LabelAndText = ({ label, text }) => (
  <Box mb={6} style={{ width: '49%' }}>
    <Box mb={1}>
      <Label>{label}</Label>
    </Box>
    <Text>{text}</Text>
  </Box>
)

const Divider = ({ theme }) => (
  <div
    style={{
      margin: `${theme.space[6]}px 0px`,
      borderBottom: '1px solid #ccc'
    }}
  />
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
  isViewingExistingChallenge,
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
          <Box mb={6}>
            <Box mb={1}>
              <Label>Description</Label>
            </Box>
            <Text>{description}</Text>
          </Box>

          <Divider theme={theme} />

          <div style={{ marginBottom: theme.space[6] }}>
            <Badge text={exerciseType} color={theme.colors[exerciseType]} />
          </div>

          <Flex flexDirection='row' flexWrap='wrap'>
            <LabelAndText
              label='Distance'
              text={`${convertFeetToMiles(distance).toFixed(2)} miles`}
            />
            <LabelAndText label='Expiration Date' text={expirationDate} />
            {isViewingExistingChallenge && (
              <React.Fragment>
                <LabelAndText label='Average Grade' text='5.7' />
                <LabelAndText label='Maximum Grade' text='14.2' />
                <LabelAndText label='Total Elevation Gain' text='155.733' />
                <LabelAndText label='Athlete Count' text='3600' />
                <LabelAndText label='Star Count' text='76' />
              </React.Fragment>
            )}
          </Flex>
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
  isSubmitButtonVisible: true,
  isViewingExistingChallenge: false
}

export default withRouter(withTheme(ChallengeDetails))
