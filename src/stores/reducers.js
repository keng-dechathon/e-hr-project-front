import { combineReducers } from "redux";
import layoutReducer from "../modules/layout/reducers";
import accountReducer from "../modules/identity/reducers";
import leaveReducer from "../modules/leaveRequest/reducers";
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
import timeSheetViewerReducer from "../modules/timeSheetViewer/reducers"
import leaveManagementReducer from "../modules/leaveManagement/reducers"
import checkin_checkoutReducer from "../modules/checkin_chekout/reducers"
import reportReducer from "../modules/report/reducers"
import expenseRequestReducer from "../modules/expenseRequest/reducers"
import expenseManagementReducer from "../modules/expenseManagement/reducers"
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
  timeSheetViewerReducer,
  leaveManagementReducer,
  checkin_checkoutReducer,
  reportReducer,
  expenseRequestReducer,
  expenseManagementReducer,
});
