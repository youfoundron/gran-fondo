import React from 'react'
import { Flex, Box, Text } from 'rebass'
import { withTheme } from 'styled-components'
import Card from './Card'
import Header from './Header'

import icon from '../../assets/images/icon-marker.jpg'

const UserCard = ({ theme, name, location, image }) => (
  <Card>
    <Flex>
      <Box
        style={{
          width: '140px',
          borderRadius: `${theme.uiGlobal.borderRadius}px 0px 0px ${
            theme.uiGlobal.borderRadius
          }px`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat'
        }}
      />
      <Box style={{ padding: '30px' }}>
        <Header mb={1} color={theme.colors.linkBlue} fontSize={4}>
          {name}
        </Header>
        <Flex>
          <Box>
            <Text color='#888' style={{ whiteSpace: 'nowrap' }}>
              {location}
            </Text>
          </Box>
          <Box ml={2}>
            <img
              src={icon}
              alt={icon}
              style={{ float: 'left', width: '12px', height: 'auto' }}
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Card>
)

UserCard.defaultProps = {
  name: '',
  location: '',
  image: ''
}

export default withTheme(UserCard)
