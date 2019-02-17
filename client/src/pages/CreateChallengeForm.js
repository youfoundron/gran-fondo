import React from 'react'
import { Flex, Box } from 'rebass'
import { withTheme } from 'styled-components'
import ScreenWrapper from './ScreenWrapper'
import HeaderTitleBox from '../components/ui/HeaderTitleBox'
import Input from '../components/ui/Input'
import ChallengeDetails from '../components/ui/ChallengeDetails'
import { capitalizeFirstLetter } from '../lib/helpers'
import { exerciseType } from '../lib/constants'

class CreateChallengeForm extends React.Component {
  constructor () {
    super()

    this.state = {
      exerciseType: 'Swim',
      name: 'Some cool name for an event',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure laudantium, quod quos tempora rem non quia quibusdam est reiciendis, cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto harum!',
      expirationDate: '1552885345',
      distance: '105600',
      fee: '120'
    }
  }

  onSelectInput = (input, e) =>
    this.setState({ [input]: e.currentTarget.value })

  render () {
    const { theme } = this.props
    const { type } = this.props.match.params

    const exerciseTypes = Object.values(exerciseType)
    const challengeType = capitalizeFirstLetter(type)

    return (
      <ScreenWrapper>
        <Flex style={{ flex: 1, height: '100%', width: '100%' }}>
          <Box flex={1} style={{ backgroundColor: '#fff' }}>
            <HeaderTitleBox title={`Create A ${challengeType} Challenge`} />
            <Box py={50} px={`${theme.uiGlobal.appLayoutMargin}px`}>
              <Box my={6}>
                {exerciseTypes.map((t, index) => (
                  <label
                    key={index}
                    style={{
                      marginRight: '15px',
                      fontFamily: 'Metropolis Semi Bold'
                    }}
                  >
                    <input
                      type='radio'
                      name={t}
                      value={t}
                      checked={this.state.exerciseType === t}
                      onChange={e => this.onSelectInput('exerciseType', e)}
                      style={{ marginRight: '5px' }}
                    />
                    {t}
                  </label>
                ))}
              </Box>
              <Box my={6}>
                <Input
                  type='text'
                  title='Name'
                  onChange={e => this.onSelectInput('name', e)}
                />
              </Box>
              <Box my={6}>
                <Input
                  type='text'
                  title='Description'
                  onChange={e => this.onSelectInput('description', e)}
                />
              </Box>
              <Box my={6}>
                <Input
                  type='text'
                  title='Expiration Date/Time'
                  onChange={e => this.onSelectInput('expirationDate', e)}
                />
              </Box>
              <Box my={6}>
                <Input
                  type='text'
                  title='Distance'
                  onChange={e => this.onSelectInput('distance', e)}
                />
              </Box>
              <Box my={6}>
                <Input
                  type='text'
                  title='Entry Fee $'
                  onChange={e => this.onSelectInput('fee', e)}
                />
              </Box>
            </Box>
          </Box>
          <Box flex={1}>
            <ChallengeDetails exerciseType={this.state.exerciseType} />
          </Box>
        </Flex>
      </ScreenWrapper>
    )
  }
}

export default withTheme(CreateChallengeForm)
