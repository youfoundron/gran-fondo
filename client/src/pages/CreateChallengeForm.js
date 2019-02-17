import React from 'react'
import m from 'moment'
import { Formik } from 'formik'
import { compose } from 'redux'
import { Flex, Box } from 'rebass'
import { withTheme } from 'styled-components'
import ScreenWrapper from './ScreenWrapper'
import HeaderTitleBox from '../components/ui/HeaderTitleBox'
import Input from '../components/ui/Input'
import ChallengeDetails from '../components/ui/ChallengeDetails'
import withDrizzleContext from '../components/contractDataProviders/withDrizzleContext'
import { capitalizeFirstLetter } from '../lib/helpers'
import { exerciseType } from '../lib/constants'

class CreateChallengeForm extends React.Component {
  constructor () {
    super()

    this.state = {
      exerciseType: 'Bike',
      // exerciseType: '',
      // name: '',
      // description: '',
      // expirationDate: '',
      // distance: '',
      // fee: ''
      name: 'Some cool name for an event',
      description:
        'Uhuh Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure laudantium, quod quos tempora rem non quia quibusdam est reiciendis, cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto harum!',
      expirationDate: '1552885345',
      distance: '105600',
      fee: '120'
    }
  }

  onChangeInput = (input, e) =>
    this.setState({ [input]: e.currentTarget.value })

  render () {
    const { theme } = this.props
    const { type } = this.props.match.params

    const exerciseTypes = Object.values(exerciseType)
    const challengeType = capitalizeFirstLetter(type)
    const formFieldValues = Object.values(this.state)
    const areAnyFormFieldsEmpty = formFieldValues.includes('')

    return (
      <ScreenWrapper>
        <Flex style={{ flex: 1, height: '100%', width: '100%' }}>
          <Box
            flex={1}
            style={{
              position: 'relative',
              zIndex: 3,
              height: '100%',
              backgroundColor: '#fff'
            }}
          >
            <HeaderTitleBox title={`Create A ${challengeType} Challenge`} />
            <Formik
              initialValues={{
                
              }}
              onSubmit={(values, actions) => {
                console.log({ values })
                // setTimeout(() => {
                //   alert(JSON.stringify(values, null, 2));
                //   actions.setSubmitting(false);
                // }, 1000);
              }}
              render={props => (
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
                          name='activityType'
                          style={{ marginRight: '5px' }}
                          checked={this.state.exerciseType === t}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.activityType}
                        />
                        {t}
                      </label>
                    ))}
                  </Box>
                  <Box my={6}>
                    <Input
                      type='text'
                      name='name'
                      title='Name'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                    />
                  </Box>
                  <Box my={6}>
                    <Input
                      type='text'
                      name='description'
                      title='Description'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.description}
                    />
                  </Box>
                  <Box my={6}>
                    <Input
                      type='text'
                      name='entryFee'
                      title='Entry Fee (ETH)'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.entryFee}
                    />
                  </Box>
                  <Box my={6}>
                    <Input
                      type='text'
                      name='expireTime'
                      title='Expiration Date/Time'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.expireTime}
                    />
                  </Box>
                  <Box my={6}>
                    <Input
                      type='text'
                      name='timeToBeat'
                      title='Expiration Date/Time'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.timeToBeat}
                    />
                  </Box>
                  <Box my={6}>
                    <Input
                      type='text'
                      name='segmentId'
                      title='Segment ID'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.segmentId}
                    />
                  </Box>
                </Box>
              )}
            />
          </Box>
            {/* <Box py={50} px={`${theme.uiGlobal.appLayoutMargin}px`}>
              <Box my={4}>
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
                      onChange={e => this.onChangeInput('exerciseType', e)}
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
                  value={this.state.name}
                  onChange={e => this.onChangeInput('name', e)}
                />
              </Box>
              <Box my={6}>
                <Input
                  type='text'
                  title='Description'
                  value={this.state.description}
                  onChange={e => this.onChangeInput('description', e)}
                />
              </Box>
              <Box my={6}>
                <Input
                  type='text'
                  title='Expiration Date/Time'
                  value={this.state.expirationDate}
                  onChange={e => this.onChangeInput('expirationDate', e)}
                />
              </Box>
              <Box my={6}>
                <Input
                  type='text'
                  title='Distance'
                  value={this.state.distance}
                  onChange={e => this.onChangeInput('distance', e)}
                />
              </Box>
              <Box my={6}>
                <Input
                  type='text'
                  title='Entry Fee $'
                  value={this.state.fee}
                  onChange={e => this.onChangeInput('fee', e)}
                />
              </Box>
            </Box>
          </Box> */}
          <Box flex={1}>
            <ChallengeDetails
              exerciseType={
                this.state.exerciseType || 'Select an exercise type'
              }
              challengeType={challengeType}
              name={this.state.name || 'Name the challenge'}
              description={
                this.state.description || 'Add a description for this challenge'
              }
              expirationDate={this.state.expirationDate || ''}
              distance={this.state.distance || 'Add a distance'}
              fee={this.state.fee || '0'}
              isSubmitButtonActive={areAnyFormFieldsEmpty}
            />
          </Box>
        </Flex>
      </ScreenWrapper>
    )
  }
}

export default compose(
  withTheme,
  withDrizzleContext
)(CreateChallengeForm)
