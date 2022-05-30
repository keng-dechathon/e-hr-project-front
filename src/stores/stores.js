import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './sagas'


let middlewares
const sagaMiddleware = createSagaMiddleware()

if (global.window && global.window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.React_App_ENV !== 'production') {
  middlewares = compose(
    applyMiddleware(sagaMiddleware),
    global.window.__REDUX_DEVTOOLS_EXTENSION__ && global.window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  middlewares = compose(
    applyMiddleware(sagaMiddleware),
  )
}

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
    // set state to undefined set for default or intialstate
  }
  return reducers(state, action)
}

const store = createStore(
  rootReducer,
  middlewares
)
sagaMiddleware.run(rootSaga)
// return store

export default store