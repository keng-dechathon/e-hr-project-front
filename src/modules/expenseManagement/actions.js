import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_ALLEXPENSE_INFORMATION = createRequestTypes(
  Types.GET_ALLEXPENSE_INFORMATION
);

export const getAllExpenseRequest = (config, data = {}) =>
  createAction(
    GET_ALLEXPENSE_INFORMATION.REQUEST,
    { Option: "Get_ALL_Requested" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.expense,
      params: data,
      ...config,
    }
  );

export const responseExpenseManagement = async (values) => {
  console.log(values.files);
  return API()
    .post(apiUrl.eHRService.common.expense, {
      Req_id: values.id ? values.id : "",
      Remark: values.remark ? values.remark : "",
      Status: values.option ? values.option : "",
      Option: "Response_Request",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "cancle success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};
