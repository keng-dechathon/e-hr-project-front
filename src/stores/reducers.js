import { combineReducers } from 'redux'
import layoutReducer from '../modules/layout/reducers'
import accountReducer from '../modules/identity/reducers'
import leaveReducer from '../modules/leave/reducers'
import newsReducer from '../modules/news/reducers'
import timeReducer from '../modules/timeManagement/reducers'
import employeeReducer from '../modules/employeeInfomation/reducers'
export default combineReducers({
   layoutReducer,
   accountReducer,
   leaveReducer,
   newsReducer,
   timeReducer,
   employeeReducer,
})
