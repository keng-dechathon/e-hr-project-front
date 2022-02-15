import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_TIMESHEETBYDATE_INFORMATION = createRequestTypes(
  Types.GET_TIMESHEETBYDATE_INFORMATION
);

export const getTimeSheetInformationByDate = (config, data = {}, Date) =>
  createAction(
    GET_TIMESHEETBYDATE_INFORMATION.REQUEST,
    { Option: "Show_Time_Sheet_By_Date", Date: Date },
    {
      method: "POST",
      url: apiUrl.eHRService.common.timesheet,
      params: data,
      ...config,
    }
  );
