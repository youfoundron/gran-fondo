import { createStore } from 'redux'

import rootReducer from './reducers'
import initialState from './initialState'

const initializeStore = () => createStore(rootReducer, initialState)

export default initializeStore

