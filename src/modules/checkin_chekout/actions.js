import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_CHECK_INFORMATION = createRequestTypes(
  Types.GET_CHECK_INFORMATION
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

export const checkIn = async () => {
  return API()
    .post(apiUrl.eHRService.common.checkin_checkout, {
      Option: "Check_In",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "check-in success");
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

export const checkOut = async () => {
  return API()
    .post(apiUrl.eHRService.common.checkin_checkout, {
      Option: "Check_Out",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "check-out success");
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
