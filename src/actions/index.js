import { all } from 'redux-saga/effects'

import clima from './clima'
import log from './log'

export default function* rootSaga() {
  yield all([clima(), log()])
}
