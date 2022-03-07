import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

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
      pushSnackbarAction("Server Error", "Server Error.");
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
