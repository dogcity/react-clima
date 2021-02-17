import {
  ADD_QUEUE_ACTION_SUCCESS,
  ADD_QUEUE_ACTION,
  BUSCAR_SUCCESS,
  ACTUALIZAR_SUCCESS,
  DETALLE,
  DETALLE_SUCCESS,
} from './constants'

const omit = [
  BUSCAR_SUCCESS,
  ACTUALIZAR_SUCCESS,
  DETALLE,
  DETALLE_SUCCESS,
  ADD_QUEUE_ACTION,
  'persist/PERSIST',
  'persist/REHYDRATE',
  ADD_QUEUE_ACTION_SUCCESS,
]

const actionLogger = ({ dispatch }) => (next) => (action) => {
  next(action)
  if (!omit.includes(action.type)) {
    dispatch({
      type: ADD_QUEUE_ACTION,
      payload: action,
    })
  }
}

export default { actionLogger }
