import React from 'react'
import { Flex, Box } from 'rebass'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import Label from './Label'
import Header from './Header'
import Fee from './Fee'
import Button from './Button'

import map from '../../assets/images/map.jpg'

const ChallengeDetails = ({
  theme,
  history,
  children,
  challengeType,
  title,
  fee,
  description
  // fontFamily,
  // fontSize,
  // color,
  // hasBottomBorder,
  // style,
  // ...props
}) => (
  <div>
    <Flex
      style={{
        position: 'sticky',
        top: `${theme.uiGlobal.appHeaderLogoHeight +
          theme.uiGlobal.appHeaderLogoMargin * 2}px`,
        backgroundColor: theme.colors.deepBlue
      }}
    >
      <Box>
        <Label>{`${challengeType} Challenge`}</Label>
        <Header>{title}</Header>
      </Box>
      <Box>
        <Fee fee={fee} fontSize={5} />
      </Box>
    </Flex>
    <Box>
      <img src={map} alt={map} style={{ width: '100%', height: 'auto' }} />
      <p>{description}</p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
        laudantium, quod quos tempora rem non quia quibusdam est reiciendis,
        cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto
        harum!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
        laudantium, quod quos tempora rem non quia quibusdam est reiciendis,
        cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto
        harum!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
        laudantium, quod quos tempora rem non quia quibusdam est reiciendis,
        cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto
        harum!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
        laudantium, quod quos tempora rem non quia quibusdam est reiciendis,
        cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto
        harum!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
        laudantium, quod quos tempora rem non quia quibusdam est reiciendis,
        cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto
        harum!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
        laudantium, quod quos tempora rem non quia quibusdam est reiciendis,
        cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto
        harum!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
        laudantium, quod quos tempora rem non quia quibusdam est reiciendis,
        cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto
        harum!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
        laudantium, quod quos tempora rem non quia quibusdam est reiciendis,
        cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto
        harum!
      </p>
    </Box>
    <Box style={{ position: 'sticky', bottom: 0 }}>
      <Button
        onClick={() => history.push('/challengeDetails')}
        type='primary'
        style={{ padding: theme.space[4], width: '100%' }}
      >
        Login to Strava
      </Button>
    </Box>
  </div>
)

ChallengeDetails.defaultProps = {
  // children: null,
  // fontSize: 4,
  // color: '',
  // hasBottomBorder: false,
  // fontFamily: 'Metropolis Semi Bold',
  // style: {}
}

export default withRouter(withTheme(ChallengeDetails))
