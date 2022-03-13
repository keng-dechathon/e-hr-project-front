import * as Types from "./types";
import API from "../../utils/api";

import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { pushSnackbarAction } from "../layout/actions";
import { apiUrl } from "../../utils/apiUrl";

export const GET_LEAVEMANAGE_INFORMATION = createRequestTypes(
  Types.GET_LEAVEMANAGE_INFORMATION
);

export const getLeaveManagementInformation = (config, data = {}) =>
  createAction(
    GET_LEAVEMANAGE_INFORMATION.REQUEST,
    { Option: "Get_Leave_Req_Mgmt" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.leave,
      params: data,
      ...config,
    }
  );

export const responseLeaveRequest = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.leave, {
      Option: "Response_Leave_Req",
      Status: values.Status,
      Req_id: values.Req_id,
      Comment: values.Comment,
      Leave_type: values.Leave_type,
      Depend: values.Depend,
    })
    .then((response) => {
      if (values.Status) pushSnackbarAction("success", "Approve success");
      else if (values.Status) pushSnackbarAction("success", "Deline success");
      else pushSnackbarAction("success", " success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};
