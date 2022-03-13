import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import admin from './reducers/admin'

const reducer = combineReducers({admin})
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(logger)
  )
)

export default store
