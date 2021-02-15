import { createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import localforage from 'localforage'

import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: localforage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__(),
)