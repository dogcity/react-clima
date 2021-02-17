import { createStore, compose, applyMiddleware } from 'redux'
import sagas from 'redux-saga'
import { persistReducer, persistStore, createMigrate } from 'redux-persist'
import localforage from 'localforage'

import rootSaga from './actions'
import rootReducer from './reducers'
import migrations from './migrations'
import middleware from './middleware'

const sagaMiddleware = sagas()
const persistConfig = {
  key: 'root',
  storage: localforage,
  version: 1,
  migrate: createMigrate(migrations, { debug: true }),
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = {
  ...createStore(
    persistedReducer,
    compose(
      applyMiddleware(middleware.actionLogger, sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  ),
  runSaga: sagaMiddleware.run(rootSaga),
}
export const persistore = persistStore(store)
