import axios from 'axios'

const apiUrlBase = 'http://api.openweathermap.org/data/2.5/weather'
const apiKey = 'a0cc927b2970bd5ae73fc82d8a021125'
const BUSCAR = 'BUSCAR'
const ACTUALIZAR = 'ACTUALIZAR'
const DETALLE = 'DETALLE'

const busqueda = payload => ({
    type: BUSCAR,
    payload,
})
const actualizacion = payload => ({
    type: ACTUALIZAR,
    payload,
})
const detalle = payload => ({
    type: DETALLE,
    payload,
})

export const buscar = nombreCiudad => (dispatch, getState) => {
    const { climaReducer: { ciudades } } = getState()
    const isExist = ciudades.find(({ name }) => name.toLowerCase() === nombreCiudad.toLowerCase())
    if(isExist) return
    const url = `${apiUrlBase}?q=${nombreCiudad}&units=metric&lang=es&appid=${apiKey}`
    axios(url)
        .then(response => dispatch(busqueda(response.data)))
        .catch(error => console.log('ERROR ACTION/BUSCAR', error))
}

export const actualizar = id => (dispatch, getState) => {
    const { climaReducer: { ciudades } } = getState()
    const ciudad = ciudades[id].name
    if(!ciudad) return
    const url = `${apiUrlBase}?q=${ciudad}&units=metric&lang=es&appid=${apiKey}`
    axios(url)
        .then(response => {
            ciudades[id] = response.data
            dispatch(actualizacion(ciudades))
        })
        .catch(error => console.log('ERROR ACTION/ACTUALIZAR', error))
}

export const detalleId = id => (dispatch, getState) => {
    const { climaReducer: { ciudades } } = getState()
    const ciudad = {
        ...ciudades[id],
        id,
    }
    if(!ciudad) return
    dispatch(detalle(ciudad))
}