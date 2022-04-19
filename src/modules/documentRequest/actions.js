import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";
import store from "../../stores/stores";

export const GET_MYDOCUMENT_INFORMATION = createRequestTypes(
  Types.GET_MYDOCUMENT_INFORMATION
);

export const updateSubmitting = (submitting = "false") =>
  store.dispatch({
    type: "UPDATE_SUBMITTING_STATE",
    submitting: submitting,
  });

export const getMyDocumentRequest = (config, data = {}) =>
  createAction(
    GET_MYDOCUMENT_INFORMATION.REQUEST,
    { Option: "Get_My_Request" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.document,
      params: data,
      ...config,
    }
  );

export const sendDocumentRequest = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.document, {
      Detail: values.detail ? values.detail : "",
      Type_ID: values.type ? values.type : "",
      File: [],
      Option: "Send_request",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "send success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const cancleDocumentRequest = async (Req_id) => {
  return API()
    .post(apiUrl.eHRService.common.document, {
      Req_id: Req_id ? Req_id : "",
      Option: "Canceled_Request_By_Sender",
    })
    .then((response) => {
      pushSnackbarAction("success", "cancle success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const updateDocumentRequest = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.document, {
      Req_id: values.id ? values.id : "",
      Detail: values.detail ? values.detail : "",
      Type_ID: values.type ? values.type : "",
      File: [],
      Option: "Update_Request",
    })
    .then((response) => {
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};
