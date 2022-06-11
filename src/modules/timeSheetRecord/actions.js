import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";
import store from "../../stores/stores";

export const GET_TIMESHEETBYDATE_INFORMATION = createRequestTypes(
  Types.GET_TIMESHEETBYDATE_INFORMATION
);

export const updateDateState = (date = new Date()) =>
  store.dispatch({
    type: "UPDATE_DATE_STATE",
    date: date,
  });

export const clearDateState = () =>
  store.dispatch({
    type: "CLEAR_DATE_STATE",
  });

export const getTimeSheetInformationByDate = (config, data = {}, Date) =>
  createAction(
    GET_TIMESHEETBYDATE_INFORMATION.REQUEST,
    { Option: "Show_Time_Sheet_By_Date", Date: Date },
    {
      method: "POST",
      url: apiUrl.eHRService.common.timesheet,
      params: data,
      ...config,
    }
  );

export const addTimeSheet = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.timesheet, {
      Option: "Add_Time_Sheet",
      Detail: values.Detail ? values.Detail : "",
      Remark: values.Remark ? values.Remark : "",
      Date: values.Date ? values.Date : "",
      Start_at: values.Start_at ? values.Start_at : "",
      End_at: values.End_at ? values.End_at : "",
      Location_id: values.Location_id ? values.Location_id : "",
      Charge_Code_Id: values.Charge_Code_Id ? values.Charge_Code_Id : "",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const updateTimeSheet = async (values) => {
  console.log(values);
  return API()
    .post(apiUrl.eHRService.common.timesheet, {
      Option: "Update_Time_Sheet",
      Sheet_id: values.Sheet_id ? values.Sheet_id : "",
      Detail: values.Detail ? values.Detail : "",
      Remark: values.Remark ? values.Remark : "",
      Start_at: values.Start ? values.Start : "",
      End_at: values.End ? values.End : "",
      Location_id: values.Location_id ? values.Location_id : "",
      Charge_Code_Id: values.Charge_code_id ? values.Charge_code_id : "",
    })
    .then((response) => {
      // if (!values.Remark && !values.Detail)
      //   pushSnackbarAction("success", "update   success");     
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const deleteTimeSheet = async (id) => {
  return API()
    .post(apiUrl.eHRService.common.timesheet, {
      Option: "Delete_Time_Sheet",
      Sheet_id: id ? id : "",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "delete   success");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};
