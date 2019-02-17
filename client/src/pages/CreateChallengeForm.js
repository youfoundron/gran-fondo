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
      name: 'Some cool name for an event',
      description:
        'Uhuh Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure laudantium, quod quos tempora rem non quia quibusdam est reiciendis, cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto harum!',
      expirationDate: '1552885345',
      distance: '105600',
      fee: '120'
    }
  }

  render () {
    const { theme } = this.props
    const { type } = this.props.match.params

    return (
      <ScreenWrapper>
        <Formik
          initialValues={{
            exerciseType: 'Bike',
            name: 'Hawk Hill Summit',
            description: 'Bike like hell!',
            fee: '0.5',
            expirationDate: String(m().add(m.duration(1, 'week')).unix()),
            timeToBeat: String(m.duration(10, 'minutes').asSeconds()),
            segmentId: '52271403536'
          }}
          onSubmit={(values, actions) => {
            console.log({ values })

            
          }}
          render={props => {
            const exerciseTypes = Object.values(exerciseType)
            const challengeType = capitalizeFirstLetter(type)
            const formFieldValues = Object.values(props.values)
            const areAnyFormFieldsEmpty = formFieldValues.includes('')
        
            return (
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
                          checked={props.values.exerciseType === t}
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
                      name='fee'
                      title='Entry Fee (ETH)'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.fee}
                    />
                  </Box>
                  <Box my={6}>
                    <Input
                      type='text'
                      name='expirationDate'
                      title='Expiration Date/Time'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.expirationDate}
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
          </Box>
          <Box flex={1}>
            <ChallengeDetails
              onClick={() => {
                props.submitForm()
              }}
              exerciseType={
                props.values.exerciseType || 'Select an exercise type'
              }
              challengeType={challengeType}
              name={props.values.name || 'Name the challenge'}
              description={
                props.values.description || 'Add a description for this challenge'
              }
              expirationDate={props.values.expirationDate || ''}
              distance={props.values.distance || 'Add a distance'}
              fee={props.values.fee || '0'}
              isSubmitButtonActive={areAnyFormFieldsEmpty}
            />
          </Box>
        </Flex>
                      )
                    }}
              />
      </ScreenWrapper>
    )
  }
}

export default compose(
  withTheme,
  withDrizzleContext
)(CreateChallengeForm)
