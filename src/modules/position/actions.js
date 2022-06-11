import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_ALLPOSITION_INFORMATION = createRequestTypes(
  Types.GET_ALLPOSITION_INFORMATION
);

export const getAllPositionInformtion = (config, data = {}) =>
  createAction(
    GET_ALLPOSITION_INFORMATION.REQUEST,
    {},
    {
      method: "POST",
      url: apiUrl.eHRService.common.position,
      params: data,
      ...config,
    }
  );

export const deletePosition = async (Meeting_id) => {
  return API()
    .post(apiUrl.eHRService.common.position, {
      Option: "Delete",
      Value: Meeting_id ? Meeting_id : "",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "delete success");
      return { status: "success" };
    })
    .catch((error) => {
        console.log(error.response.data.message);
      pushSnackbarAction("error", error.response.data.message);
      return { status: "fail" };
    });
};

export const addPosition = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.position, {
      Position_Name: values.Position_Name ? values.Position_Name : "",
      Option: "Add",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const updatePosition = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.position, {
      Position_ID: values.Position_ID ? values.Position_ID : "",
      Position_Name: values.Position_Name ? values.Position_Name : "",
      Option: "Update",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};
