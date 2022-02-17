import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_LOCATION_INFORMATION = createRequestTypes(
  Types.GET_LOCATION_INFORMATION
);
export const GET_CHARGECODE_INFORMATION = createRequestTypes(
  Types.GET_CHARGECODE_INFORMATION
);

export const getLocation = (config, data = {}) =>
  createAction(
    GET_LOCATION_INFORMATION.REQUEST,
    { Option: "Main" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.location,
      params: data,
      ...config,
    }
  );

export const getChargeCode = (config, data = {}) =>
  createAction(
    GET_CHARGECODE_INFORMATION.REQUEST,
    { Option: "Main" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.chargecode,
      params: data,
      ...config,
    }
  );
