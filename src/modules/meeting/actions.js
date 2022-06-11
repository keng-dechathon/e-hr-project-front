import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";
import store from "../../stores/stores";

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

export const updateAddState = (
  Emp_message = "false",
  Room_message = "false",
  Emp = {},
  Status = ""
) =>
  store.dispatch({
    type: "UPDATE_ADD_STATE",
    Emp_message: Emp_message,
    Emp: Emp,
    Room_message: Room_message,
    Status: Status,
  });

export const updateSubmitting = (submitting = "false") =>
  store.dispatch({
    type: "UPDATE_SUBMITTING_STATE",
    submitting: submitting,
  });

export const clearAddState = () =>
  store.dispatch({
    type: "CLEAR_ADD_STATE",
  });

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
    { Option: "Get_Create_Meeting" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.meeting,
      params: data,
      ...config,
    }
  );

export const addMeeting = async (values, setStatus) => {
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
      setStatus(true);
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      setStatus(false);
      if (error.response.status === 400) {
        updateAddState(
          error.response.data.Emp_message,
          error.response.data.Room_message,
          error.response.data.Emp,
          error.response.status
        );
      } else {
        pushSnackbarAction("error", "Server Error.");
      }
      return { status: "fail" };
    });
};

export const forceAddMeeting = async (values, setStatus) => {
  console.log("is force");
  return API()
    .post(apiUrl.eHRService.common.meeting, {
      Option: "Confirm",
      Value: values.members ? values.members : "",
      Date: values.Date ? values.Date : "",
      Start_at: values.Start_at ? values.Start_at : "",
      End_at: values.End_at ? values.End_at : "",
      Room_Id: values.Room_Id ? values.Room_Id : "",
      Subject: values.Subject ? values.Subject : "",
      Description: values.Description ? values.Description : "",
    })
    .then((response) => {
      setStatus(true);
      clearAddState();
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      setStatus(false);
      console.log(error);
      if (error.response.status === 400) {
        clearAddState();
        updateAddState(
          error.response.data.Emp_message,
          error.response.data.Room_message,
          error.response.data.Emp,
          error.response.status
        );
      } else {
        pushSnackbarAction("error", "Server Error.");
      }
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
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const editMeeting = async (values, setStatus) => {
  console.log(values);
  return API()
    .post(apiUrl.eHRService.common.meeting, {
      Option: "Update",
      Meeting_id: values.Meeting_id ? values.Meeting_id : "",
      Date: values.Date ? values.Date : "",
      Start_at: values.Start_at ? values.Start_at : "",
      End_at: values.End_at ? values.End_at : "",
      Room_Id: values.Room_Id ? values.Room_Id : "",
      Subject: values.Subject ? values.Subject : "",
      Description: values.Description ? values.Description : "",
      Value: values.members ? values.members : "",
    })
    .then((response) => {
      setStatus(true);
      // console.log(response);
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      setStatus(false);
      if (error.response.status === 400) {
        updateAddState(
          error.response.data.Emp_message,
          error.response.data.Room_message,
          error.response.data.Emp,
          error.response.status
        );
      } else {
        pushSnackbarAction("error", "Server Error.");
      }
      return { status: "fail" };
    });
};

export const forceEditMeeting = async (values, setStatus) => {
  console.log(values);
  return API()
    .post(apiUrl.eHRService.common.meeting, {
      Option: "Confirm_Update",
      Meeting_id: values.Meeting_id ? values.Meeting_id : "",
      Date: values.Date ? values.Date : "",
      Start_at: values.Start_at ? values.Start_at : "",
      End_at: values.End_at ? values.End_at : "",
      Room_Id: values.Room_Id ? values.Room_Id : "",
      Subject: values.Subject ? values.Subject : "",
      Description: values.Description ? values.Description : "",
      Value: values.members ? values.members : "",
    })
    .then((response) => {
      setStatus(true);
      // console.log(response);
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      setStatus(false);
      if (error.response.status === 400) {
        updateAddState(
          error.response.data.Emp_message,
          error.response.data.Room_message,
          error.response.data.Emp,
          error.response.status
        );
      } else {
        pushSnackbarAction("error", "Server Error.");
      }
      return { status: "fail" };
    });
};

export const deleteMeetingRoom = async (Meeting_id) => {
  return API()
    .post(apiUrl.eHRService.common.meeting, {
      Option: "Delete_Meeting_Room",
      Value: Meeting_id ? Meeting_id : "",
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

export const addMeetingRoom = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.meeting, {
      Room_Name: values.Room_Name ? values.Room_Name : "",
      description: values.description ? values.description : "",
      Option: "Add_Meeting_Room",
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

export const updateMeetingRoom = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.meeting, {
      Room_Id: values.Room_Id ? values.Room_Id : "",
      Room_Name: values.Room_Name ? values.Room_Name : "",
      description: values.description ? values.description : "",
      Option: "Update_Meeting_Room",
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
