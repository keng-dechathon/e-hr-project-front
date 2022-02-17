import { combineReducers } from "redux";
import layoutReducer from "../modules/layout/reducers";
import accountReducer from "../modules/identity/reducers";
import leaveReducer from "../modules/leave/reducers";
import newsReducer from "../modules/news/reducers";
import timeReducer from "../modules/timeManagement/reducers";
import employeeReducer from "../modules/employeeInfomation/reducers";
import teamReducer from "../modules/team/reducers";
import leaveTypeReducer from "../modules/leaveType/reducers";
import positionReducer from "../modules/position/reducers";
import companyReducer from "../modules/company/reducers";
import roleReducer from "../modules/userRole/reducers";
import meetReducer from "../modules/meeting/reducers";
import timesheetReducer from "../modules/timeSheetRecord/reducers";
import timeSheetMngReducer from "../modules/timeSheetManagement/reducers"

export default combineReducers({
  layoutReducer,
  accountReducer,
  leaveReducer,
  newsReducer,
  timeReducer,
  employeeReducer,
  teamReducer,
  leaveTypeReducer,
  positionReducer,
  companyReducer,
  roleReducer,
  meetReducer,
  timesheetReducer,
  timeSheetMngReducer,
});
