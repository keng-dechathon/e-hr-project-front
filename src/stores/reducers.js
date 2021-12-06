import { combineReducers } from 'redux'
import layoutReducer from '../modules/layout/reducers'
import accountReducer from '../modules/identity/reducers'

export default combineReducers({
   layoutReducer,
   accountReducer,
})
