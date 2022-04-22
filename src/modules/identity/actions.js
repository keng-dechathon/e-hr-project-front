import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import API from "../../utils/api";
import { pushSnackbarAction } from "../layout/actions";

export const GET_ACCOUNT_INFORMATION = createRequestTypes(
  Types.GET_ACCOUNT_INFORMATION
);

export const getAccountInformation = (config, data = {}) =>
  createAction(
    GET_ACCOUNT_INFORMATION.REQUEST,
    {},
    {
      method: "POST",
      url: apiUrl.eHRService.identity.profile,
      params: data,
      ...config,
    }
  );

export const updateProfile = async (values) => {
  return API()
    .post(apiUrl.eHRService.identity.profile, {
      Option: "Update",
      Img: values.Img ? values.Img : "",
      Email: values.Email ? values.Email : "",
      Address: values.Address ? values.Address : "",
      Lastname: values.Lastname ? values.Lastname : "",
      Title: values.Title ? values.Title : "",
      Gender: values.Gender ? values.Gender : "",
      Firstname: values.Firstname ? values.Firstname : "",
      Role: values.Role ? values.Role : "",
      Phone: values.Phone ? values.Phone : "",
      BirthDate: values.BirthDate ? values.BirthDate : "",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};
