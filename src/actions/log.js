import { call, put, takeLatest } from 'redux-saga/effects'

import socket from '../socket'
import { ADD_QUEUE_ACTION, ADD_QUEUE_ACTION_SUCCESS } from '../constants'

function* sendLog({ payload }) {
  try {
    yield call(socket.register, payload)
    yield put({ type: ADD_QUEUE_ACTION_SUCCESS, payload })
  } catch (error) {
    console.log('ERROR SAGA/LOG', error)
  }
}

// watchers
export default function* log() {
  yield takeLatest(ADD_QUEUE_ACTION, sendLog)
}
