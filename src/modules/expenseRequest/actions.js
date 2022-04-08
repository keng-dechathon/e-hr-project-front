import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_MYEXPENSE_INFORMATION = createRequestTypes(
  Types.GET_MYEXPENSE_INFORMATION
);

export const getMyExpenseRequest = (config, data = {}) =>
  createAction(
    GET_MYEXPENSE_INFORMATION.REQUEST,
    { Option: "Get_My_Request" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.expense,
      params: data,
      ...config,
    }
  );

export const sendExpenseRequest = async (values) => {
  console.log(values.files);
  return API()
    .post(apiUrl.eHRService.common.expense, {
      Detail: values.detail ? values.detail : "",
      File: values.files ? values.files : [],
      Option: "Send_Request",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "send success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};

export const cancleExpenseRequest = async (Req_id) => {
  return API()
    .post(apiUrl.eHRService.common.expense, {
      Req_id: Req_id ? Req_id : "",
      Option: "Canceled_Request_By_Sender",
    })
    .then((response) => {
      pushSnackbarAction("success", "cancle success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};

export const updateExpenseRequest = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.expense, {
      Req_id: values.id ? values.id : "",
      Detail: values.detail ? values.detail : "",
      File: values.files ? values.files : [],
      Option: "Update_Request",
    })
    .then((response) => {
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};
