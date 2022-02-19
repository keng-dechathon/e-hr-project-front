import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";
import store from "../../stores/stores";

export const GET_TEAMBYHOST_INFORMATION = createRequestTypes(
  Types.GET_TEAMBYHOST_INFORMATION
);
export const GET_TIMESHEETBYID_INFORMATION = createRequestTypes(
  Types.GET_TIMESHEETBYID_INFORMATION
);

export const getTeamByHostInformation = (config, data = {}) =>
  createAction(
    GET_TEAMBYHOST_INFORMATION.REQUEST,
    { Option: "Host_Team" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.team,
      params: data,
      ...config,
    }
  );

export const getTimeSheetById = (config, data = {}, Emp_id, Date) =>
  createAction(
    GET_TIMESHEETBYID_INFORMATION.REQUEST,
    { Option: "Show_Time_Sheet_By_Id", Emp_id: Emp_id, Date: Date },
    {
      method: "POST",
      url: apiUrl.eHRService.common.timesheet,
      params: data,
      ...config,
    }
  );
