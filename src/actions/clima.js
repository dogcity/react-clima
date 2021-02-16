import { put, call, takeLatest, select } from 'redux-saga/effects'

import apiCall from '../api'
import { BUSCAR, BUSCAR_SUCCESS, ACTUALIZAR, ACTUALIZAR_SUCCESS, DETALLE, DETALLE_SUCCESS } from '../constants'
import { getCiudades } from '../selectors/clima'

const apiUrlBase = 'http://api.openweathermap.org/data/2.5/weather'
const apiKey = 'a0cc927b2970bd5ae73fc82d8a021125'
const apiConf = {
  units: 'metric',
  lang: 'es',
  appid: apiKey,
}

function* buscar({ payload }) {
  try {
    const ciudades = yield select(getCiudades)
    const isExist = ciudades.find(({ name }) => name.toLowerCase() === payload.toLowerCase())
    if (isExist) return
    const params = {
      q: payload,
      ...apiConf,
    }
    const response = yield call(apiCall, apiUrlBase, { params })
    yield put({ type: BUSCAR_SUCCESS, payload: response })
  } catch (error) {
    console.log('ERROR SAGA/BUSCAR', error)
  }
}

function* actualizar({ payload }) {
  try {
    const ciudades = yield select(getCiudades)
    const ciudad = ciudades[payload].name
    if (!ciudad) return
    const params = {
      ...apiConf,
      q: ciudad,
    }
    const response = yield call(apiCall, apiUrlBase, { params })
    ciudades[payload] = response
    yield put({ type: ACTUALIZAR_SUCCESS, payload: ciudades })
  } catch (error) {
    console.log('ERROR SAGA/ACTUALIZAR', error)
  }
}

function* detalle({ payload }) {
  try {
    const ciudades = yield select(getCiudades)
    const ciudad = {
      ...ciudades[payload],
      id: payload,
    }
    if (!ciudad) return
    yield put({ type: DETALLE_SUCCESS, payload: ciudad })
  } catch (error) {
    console.log('ERROR SAGA/DETALLE', error)
  }
}

// watchers
export default function* clima() {
  yield takeLatest(BUSCAR, buscar)
  yield takeLatest(ACTUALIZAR, actualizar)
  yield takeLatest(DETALLE, detalle)
}
