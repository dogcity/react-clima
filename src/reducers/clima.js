const initialState = {
    ciudades: [],
    selected: null,
}

const climaReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUSCAR':
            return {
                ...state,
                ciudades: [
                    ...state.ciudades,
                    action.payload,
                ],
            }
        case 'ACTUALIZAR':
            return {
                ...state,
                ciudades: [
                    ...action.payload,
                ],
            }
        case 'DETALLE':
            return {
                ...state,
                selected: action.payload,
            }
        case 'LIMPIAR':
            return initialState
        default:
            return state
    }
}

export default climaReducer