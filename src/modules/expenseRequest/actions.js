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
  return API()
    .post(apiUrl.eHRService.common.expense, {
      Emp_id: values.Emp_id ? values.Emp_id : "",
      Detail: values.Detail ? values.Detail : "",
      File: values.File ? values.File : "",
      // Status: values.Status ? values.Status : "",
      Remark: values.Remark ? values.Remark : "",
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
      Option: "Canceled_Request",
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