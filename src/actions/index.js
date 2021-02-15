import { all } from 'redux-saga/effects';

import clima from './clima';

export default function* rootSaga() {
    yield all([
        clima(),
    ])
}
