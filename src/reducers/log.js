import { ADD_QUEUE_ACTION_SUCCESS, LIMPIAR } from '../constants'

const initialState = []

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUEUE_ACTION_SUCCESS:
      return [...state, action.payload]
    case LIMPIAR:
      return initialState
    default:
      return state
  }
}

export default logReducer
