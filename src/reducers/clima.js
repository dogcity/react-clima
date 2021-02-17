import { BUSCAR_SUCCESS, ACTUALIZAR_SUCCESS, DETALLE_SUCCESS, LIMPIAR } from '../constants'

const initialState = {
  ciudades: [],
  selected: null,
}

const climaReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUSCAR_SUCCESS:
      return {
        ...state,
        ciudades: [...state.ciudades, action.payload],
      }
    case ACTUALIZAR_SUCCESS:
      return {
        ...state,
        ciudades: [...action.payload],
      }
    case DETALLE_SUCCESS:
      return {
        ...state,
        select: action.payload,
      }
    case LIMPIAR:
      return initialState
    default:
      return state
  }
}

export default climaReducer
