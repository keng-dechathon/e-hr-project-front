import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_ALLCOMPANY_INFORMATION = createRequestTypes(
  Types.GET_ALLCOMPANY_INFORMATION
);

export const getAllCompanyInformtion = (config, data = {}) =>
  createAction(
    GET_ALLCOMPANY_INFORMATION.REQUEST,
    {},
    {
      method: "POST",
      url: apiUrl.eHRService.common.company,
      params: data,
      ...config,
    }
  );

export const deleteCompany = async (Meeting_id) => {
  return API()
    .post(apiUrl.eHRService.common.company, {
      Option: "Delete",
      Value: Meeting_id ? Meeting_id : "",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "delete success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", error.response.data.message);
      return { status: "fail" };
    });
};

export const addCompany = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.company, {
      Company_Name: values.Company_Name ? values.Company_Name : "",
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

export const updateCompany = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.company, {
      Comp_ID: values.Comp_ID ? values.Comp_ID : "",
      Company_Name: values.Company_Name ? values.Company_Name : "",
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
