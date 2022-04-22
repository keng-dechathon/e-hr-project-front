import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_EMPINFO_INFORMATION = createRequestTypes(
  Types.GET_EMPINFO_INFORMATION
);
export const GET_EMPBYID_INFORMATION = createRequestTypes(
  Types.GET_EMPBYID_INFORMATION
);

export const getEmployeeInformtion = (config, data = {}) =>
  createAction(
    GET_EMPINFO_INFORMATION.REQUEST,
    {},
    {
      method: "POST",
      url: apiUrl.eHRService.common.employeeInfomation,
      params: data,
      ...config,
    }
  );

export const getEmployeeInformtionByID = (config, data = {}, ID) =>
  createAction(
    GET_EMPBYID_INFORMATION.REQUEST,
    { Option: "Get_Profile_By_Id", Id: ID },
    {
      method: "POST",
      url: apiUrl.eHRService.identity.profile,
      params: data,
      ...config,
    }
  );

export const updateProfileById = async (values) => {
  console.log(values);
  return API()
    .post(apiUrl.eHRService.common.employeeMgnt, {
      Option: "Update",
      Emp_id: values.Id ? values.Id : "",
      Img: values.Img ? values.Img : "",
      Username: values.Username ? values.Username : "",
      Address: values.Address ? values.Address : "",
      Lastname: values.Lastname ? values.Lastname : "",
      Title: values.Title ? values.Title : "",
      Gender: values.Gender ? values.Gender : "",
      Firstname: values.Firstname ? values.Firstname : "",
      Role: values.Role ? values.Role : "",
      Position_ID: values.Position ? values.Position : "",
      Phone: values.Phone ? values.Phone : "",
      BirthDate: values.BirthDate ? values.BirthDate : "",
      Comp_ID: values.Company ? values.Company : "",
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

export const deleteEmployeeById = async (id) => {
  return API()
    .post(apiUrl.eHRService.common.employeeMgnt, {
      Option: "Delete",
      Value: id,
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "delete success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const addEmployee = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.employeeMgnt, {
      Option: "Add",
      Comp_ID: values.Comp_ID ? values.Comp_ID : "",
      Username: values.Email ? values.Email : "",
      Position_ID: values.Position_ID ? values.Position_ID : "",
      Lastname: values.Lastname ? values.Lastname : "",
      Title: values.Title ? values.Title : "",
      Gender: values.Gender ? values.Gender : "",
      Firstname: values.Firstname ? values.Firstname : "",
      Role: values.Role ? values.Role : "",
      BirthDate: values.BirthDate ? values.BirthDate : "",
      Phone: values.Phone ? values.Phone : "",
      Address: values.Address ? values.Address : "",
      Img: values.Img ? values.Img : "",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => { 
      if (error.response.status === 400)
        pushSnackbarAction("error", error.response.data.message);
      else pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const activeEmployee = async (id) => {
  return API()
    .post(apiUrl.eHRService.common.employeeMgnt, {
      Option: "Change_Active",
      Value: id ? id : [],
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "active success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};
