import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_CHECK_INFORMATION = createRequestTypes(
  Types.GET_CHECK_INFORMATION
);
export const GET_YEARCHECK_INFORMATION = createRequestTypes(
  Types.GET_YEARCHECK_INFORMATION
);
export const getCheckInformation = (config, data = {}, Type, Emp_id, Date) =>
  createAction(
    GET_CHECK_INFORMATION.REQUEST,
    {
      Option: "Get_Check_List_Show_Emp_id",
      Type: Type,
      Emp_id: Emp_id,
      Date: Date,
    },
    {
      method: "POST",
      url: apiUrl.eHRService.common.checkin_checkout,
      params: data,
      ...config,
    }
  );

export const getYearCheckInformation = (config, data = {}, Emp_id, Date) =>
  createAction(
    GET_YEARCHECK_INFORMATION.REQUEST,
    {
      Option: "Get_Check_List_Show_Emp_id",
      Type: "Year",
      Emp_id: Emp_id,
      Date: Date,
    },
    {
      method: "POST",
      url: apiUrl.eHRService.common.checkin_checkout,
      params: data,
      ...config,
    }
  );

export const checkIn = async () => {
  return API()
    .post(apiUrl.eHRService.common.checkin_checkout, {
      Option: "Check_In",
    })
    .then((response) => {
      pushSnackbarAction("success", response.data.Message);
      return { status: "success" };
    })
    .catch((error) => {
      try {
        let status = error.response.status;
        if (status === 404) {
          pushSnackbarAction("error", error.response.data.Message);
        }
        if (status === 400) {
          pushSnackbarAction("warning", error.response.data.Message);
        }
      } catch (e) {
        pushSnackbarAction("error", "Server error");
      }
      return { status: "fail" };
    });
};

export const checkOut = async (id) => {
  return API()
    .post(apiUrl.eHRService.common.checkin_checkout, {
      Option: "Check_Out",
      Checkin_id: id,
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", response.data.Message);
      return { status: "success" };
    })
    .catch((error) => {
      try {
        let status = error.response.status;
        if (status === 404) {
          pushSnackbarAction("error", error.response.data.Message);
        }
      } catch (e) {
        pushSnackbarAction("error", "Server error");
      }
      return { status: "fail" };
    });
};
