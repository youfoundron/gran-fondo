import { actionTypes } from './actions'
import initialState from './initialState'

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return Object.assign({}, state, { loggedIn: true })
    default:
      return state
  }
}

export default rootReducer