import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";
import { values } from "lodash";

export const GET_ALLDOCUMENT_INFORMATION = createRequestTypes(
  Types.GET_ALLDOCUMENT_INFORMATION
);
export const GET_ALLDOCUMENT_TYPE = createRequestTypes(
  Types.GET_ALLDOCUMENT_TYPE
);

export const getAllDocumentRequest = (config, data = {}) =>
  createAction(
    GET_ALLDOCUMENT_INFORMATION.REQUEST,
    { Option: "Get_ALL_Requested" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.document,
      params: data,
      ...config,
    }
  );

export const getAllDocumentType = (config, data = {}) =>
  createAction(
    GET_ALLDOCUMENT_TYPE.REQUEST,
    { Option: "Get_All_Document_Type" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.document,
      params: data,
      ...config,
    }
  );

export const responseDocumentManagement = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.document, {
      Req_id: values.id ? values.id : "",
      Remark: values.remark ? values.remark : "",
      Status: values.option ? values.option : "",
      File: values.files[0] ? values.files[0] : {},
      Option: "Respond_request",
    })
    .then((response) => {
      // console.log(response);
      if (values.option === "true")
        pushSnackbarAction("success", "approve success");
      if (values.option === "false")
        pushSnackbarAction("success", "decline success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const addDocumentType = async (name) => {
  return API()
    .post(apiUrl.eHRService.common.document, {
      Type_name: name ? name : "",
      Option: "Add_Document_Type",
    })
    .then((response) => {
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const updateDocumentType = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.document, {
      Type_ID: values.id ? values.id : "",
      Type_name: values.name ? values.name : "",
      Option: "Update_Document_Type",
    })
    .then((response) => {
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", error.response.message);
      return { status: "fail" };
    });
};

export const deleteDocumentType = async (id) => {
  console.log(";da");
  return API()
    .post(apiUrl.eHRService.common.document, {
      Type_ID: id ? id : "",
      Option: "Delete_Document_Type",
    })
    .then((response) => {
      if (response.data.message !== "success")
        pushSnackbarAction("warning", response.data.message);
      else pushSnackbarAction("success", "Delete success");

      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};
