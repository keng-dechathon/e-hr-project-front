import * as Types from "./types";
import API from "../../utils/api";

import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { pushSnackbarAction } from "../layout/actions";
import { apiUrl } from "../../utils/apiUrl";
import { values } from "lodash";

export const GET_LEAVE_INFORMATION = createRequestTypes(
  Types.GET_LEAVE_INFORMATION
);
export const GET_LEAVEBYID_INFORMATION = createRequestTypes(
  Types.GET_LEAVEBYID_INFORMATION
);
export const GET_LEAVEREQ_INFORMATION = createRequestTypes(
  Types.GET_LEAVEREQ_INFORMATION
);

export const getLeaveInformation = (config, data = {}) =>
  createAction(
    GET_LEAVE_INFORMATION.REQUEST,
    {},
    {
      method: "POST",
      url: apiUrl.eHRService.common.leave,
      params: data,
      ...config,
    }
  );

export const getLeaveInformationByID = (config, data = {}, id) =>
  createAction(
    GET_LEAVEBYID_INFORMATION.REQUEST,
    { Option: "Get_Leave_info_By_Empid", Emp_id: id },
    {
      method: "POST",
      url: apiUrl.eHRService.common.leave,
      params: data,
      ...config,
    }
  );

export const getLeaveRequestInformation = (config, data = {}) =>
  createAction(
    GET_LEAVEREQ_INFORMATION.REQUEST,
    { Option: "Get_Leave_Req" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.leave,
      params: data,
      ...config,
    }
  );

export const cancleLeaveRequest = async (id, depend) => {
  return API()
    .post(apiUrl.eHRService.common.leave, {
      Option: "Send_Cancellation",
      Req_id: id ? id : "",
      Depend: depend ? depend : "",
    })
    .then((response) => {
      pushSnackbarAction("success", "cancle success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const sendLeaveRequest = async (values) => {
  console.log(values);
  return API()
    .post(apiUrl.eHRService.common.leave, {
      Option: "Send_Leave_Req",
      Type_ID: values.Type_ID,
      Emp_id: values.Emp_id,
      Depend: values.Depend,
      Begin: values.Begin,
      End: values.End,
      Detail: values.Detail,
      Emergency: values.Emergency,
    })
    .then((response) => {
      pushSnackbarAction("success", "Send success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};
