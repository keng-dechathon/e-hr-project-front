import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { getDateFormat } from "../../utils/miscellaneous";

export const GET_ALLCHECK_INFORMATION = createRequestTypes(
  Types.GET_ALLCHECK_INFORMATION
);
export const GET_TODAYCHECK_INFORMATION = createRequestTypes(
  Types.GET_TODAYCHECK_INFORMATION
);
export const GET_YEARCHECK_INFORMATION = createRequestTypes(
  Types.GET_YEARCHECK_INFORMATION
);
export const GET_ALLLEAVE_INFORMATION = createRequestTypes(
  Types.GET_ALLLEAVE_INFORMATION
);
export const GET_ALLREST_INFORMATION = createRequestTypes(
  Types.GET_ALLREST_INFORMATION
);
export const getAllCheckInformation = (config, data = {}, date, type) =>
  createAction(
    GET_ALLCHECK_INFORMATION.REQUEST,
    {
      Option: "Get_All_Check_List",
      Type: type,
      Date: date,
    },
    {
      method: "POST",
      url: apiUrl.eHRService.common.checkin_checkout,
      params: data,
      ...config,
    }
  );

export const getAllToDayCheckInformation = (config, data = {}) =>
  createAction(
    GET_TODAYCHECK_INFORMATION.REQUEST,
    {
      Option: "Get_All_Check_List",
      Type: "Day",
      Date: getDateFormat(new Date()),
    },
    {
      method: "POST",
      url: apiUrl.eHRService.common.checkin_checkout,
      params: data,
      ...config,
    }
  );

export const getAllYearCheckInformation = (config, data = {}) =>
  createAction(
    GET_YEARCHECK_INFORMATION.REQUEST,
    {
      Option: "Get_All_Check_List",
      Type: "Year",
      Date: getDateFormat(new Date()),
    },
    {
      method: "POST",
      url: apiUrl.eHRService.common.checkin_checkout,
      params: data,
      ...config,
    }
  );

export const getAllLeaveInformation = (config, data = {}) =>
  createAction(
    GET_ALLLEAVE_INFORMATION.REQUEST,
    {
      Option: "Get_All_Leaved_Req",
    },
    {
      method: "POST",
      url: apiUrl.eHRService.common.leave,
      params: data,
      ...config,
    }
  );

  
export const getAllRestOfLeaveInformation = (config, data = {}) =>
createAction(
  GET_ALLREST_INFORMATION.REQUEST,
  {
    Option: "Get_All_Leaved_Count",
  },
  {
    method: "POST",
    url: apiUrl.eHRService.common.leave,
    params: data,
    ...config,
  }
);
