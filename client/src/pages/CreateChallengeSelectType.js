import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { Flex, Box, Text } from 'rebass'
import ScreenWrapper from './ScreenWrapper'
import HeaderTitleBox from '../components/ui/HeaderTitleBox'
import Card from '../components/ui/Card'
import Header from '../components/ui/Header'
import Button from '../components/ui/Button'

import runningImage from '../assets/images/runners-beach.jpg'
import bikingImage from '../assets/images/bike-women.jpg'

const CreateBox = ({
  theme,
  history,
  title,
  description,
  btnText,
  route,
  image
}) => (
  <Box style={{ width: '400px' }}>
    <Card cardImage={image}>
      <Box px={5} pt={6} pb={5} style={{ textAlign: 'center' }}>
        <Header style={{ textAlign: 'center', marginBottom: '15px' }}>
          {title}
        </Header>
        <Text>{description}</Text>
      </Box>
      <Box p={2}>
        <Button
          type='primary'
          fontSize={13}
          style={{ padding: theme.space[4], width: '100%' }}
          onClick={() => history.push(route)}
        >
          {btnText}
        </Button>
      </Box>
    </Card>
  </Box>
)

const CreateChallengeSelectType = ({ theme, history }) => (
  <ScreenWrapper>
    <HeaderTitleBox
      title='Create a New Challenge'
      alignment='center'
      style={{ paddingTop: '100px' }}
    />
    <Flex
      py={8}
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CreateBox
        title='Go For Distance'
        btnText='Create Distance Challenge'
        route='/createForm/distance'
        description='Challenge yourself to complete a specified distance in the required time'
        image={runningImage}
        theme={theme}
        history={history}
      />
      <Box mx={4}>
        <Header>OR</Header>
      </Box>
      <CreateBox
        title='Complete A Segment'
        btnText='Create Segment Challenge'
        route='/createForm/segment'
        description='Challenge yourself to beat a time within a given segment or distance'
        image={bikingImage}
        theme={theme}
        history={history}
      />
    </Flex>
  </ScreenWrapper>
)

export default withTheme(withRouter(CreateChallengeSelectType))
