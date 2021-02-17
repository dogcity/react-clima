import { combineReducers } from 'redux'

import climaReducer from './clima'
import logReducer from './log'

export default combineReducers({
  climaReducer,
  logReducer,
})
