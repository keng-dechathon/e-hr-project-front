import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_MEETINGROOM_INFORMATION = createRequestTypes(
  Types.GET_MEETINGROOM_INFORMATION
);
export const GET_MEETINGBYID_INFORMATION = createRequestTypes(
  Types.GET_MEETINGBYID_INFORMATION
);
export const GET_MEETINGBYMULTIID_INFORMATION = createRequestTypes(
  Types.GET_MEETINGBYMULTIID_INFORMATION
);
export const GET_MEETINGBYROOMID_INFORMATION = createRequestTypes(
  Types.GET_MEETINGBYROOMID_INFORMATION
);
export const GET_MEETINGBYCREATOR_INFORMATION = createRequestTypes(
    Types.GET_MEETINGBYCREATOR_INFORMATION
  );
  

export const getMeetingRoomInformation = (config, data = {}) =>
  createAction(
    GET_MEETINGROOM_INFORMATION.REQUEST,
    { Option: "Show_Meeting_Room" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.meeting,
      params: data,
      ...config,
    }
  );

export const getMeetingInformationById = (config, data = {}, Emp_Id) =>
  createAction(
    GET_MEETINGBYID_INFORMATION.REQUEST,
    { Option: "Show_Employee_Meeting_By_ID", Emp_Id: Emp_Id },
    {
      method: "POST",
      url: apiUrl.eHRService.common.meeting,
      params: data,
      ...config,
    }
  );

export const getMeetingInformationByMultiId = (config, data = {}, Emp_Id) =>
  createAction(
    GET_MEETINGBYMULTIID_INFORMATION.REQUEST,
    { Option: "Show_Selected_Employee_Meeting_Detail", Value: Emp_Id },
    {
      method: "POST",
      url: apiUrl.eHRService.common.meeting,
      params: data,
      ...config,
    }
  );

export const getMeetingInformationByRoomId = (config, data = {}, Emp_Id) =>
  createAction(
    GET_MEETINGBYROOMID_INFORMATION.REQUEST,
    { Option: "Show_Meeting_Room_Detail", Value: Emp_Id },
    {
      method: "POST",
      url: apiUrl.eHRService.common.meeting,
      params: data,
      ...config,
    }
  );

export const getMeetingInformationByCreator = (config, data = {}) =>
  createAction(
    GET_MEETINGBYCREATOR_INFORMATION.REQUEST,
    { Option: "Get_Create_Meeting"},
    {
      method: "POST",
      url: apiUrl.eHRService.common.meeting,
      params: data,
      ...config,
    }
  );

export const addMeeting = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.meeting, {
      Option: "Add_Meeting",
      Value: values.members ? values.members : "",
      Date: values.Date ? values.Date : "",
      Start_at: values.Start_at ? values.Start_at : "",
      End_at: values.End_at ? values.End_at : "",
      Room_Id: values.Room_Id ? values.Room_Id : "",
      Subject: values.Subject ? values.Subject : "",
      Description: values.Description ? values.Description : "",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};

export const deleteMeeting = async (Meeting_id) => {
  return API()
    .post(apiUrl.eHRService.common.meeting, {
      Option: "Delete_Meeting",
      Meeting_id: Meeting_id ? Meeting_id : "",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "delete success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};
