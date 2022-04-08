import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_MYEXPENSE_INFORMATION = createRequestTypes(
  Types.GET_MYEXPENSE_INFORMATION
);

export const getMyExpenseRequest = (config, data = {}) =>
  createAction(
    GET_MYEXPENSE_INFORMATION.REQUEST,
    { Option: "Get_My_Request" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.expense,
      params: data,
      ...config,
    }
  );
