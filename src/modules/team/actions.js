import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_TEAMS_INFORMATION = createRequestTypes(
  Types.GET_TEAMS_INFORMATION
);
export const GET_MEMBERS_INFORMATION = createRequestTypes(
  Types.GET_MEMBERS_INFORMATION
);
export const GET_TEAMSBYID_INFORMATION = createRequestTypes(
  Types.GET_TEAMSBYID_INFORMATION
);

export const getTeamsInformation = (config, data = {}) =>
  createAction(
    GET_TEAMS_INFORMATION.REQUEST,
    {},
    {
      method: "POST",
      url: apiUrl.eHRService.common.team,
      params: data,
      ...config,
    }
  );

export const getTeamsInformationById = (config, data = {}, id) =>
  createAction(
    GET_TEAMSBYID_INFORMATION.REQUEST,
    { Option: "Get_Team_By_Emp_id", Emp_id: id },
    {
      method: "POST",
      url: apiUrl.eHRService.common.team,
      params: data,
      ...config,
    }
  );

export const getMemberInformation = (config, data = {}, id) =>
  createAction(
    GET_MEMBERS_INFORMATION.REQUEST,
    { Option: "Member", Team_id: id },
    {
      method: "POST",
      url: apiUrl.eHRService.common.team,
      params: data,
      ...config,
    }
  );

export const addTeam = async (values, hostID, creatorID, memberID) => {
  console.log(memberID);
  return API()
    .post(apiUrl.eHRService.common.team, {
      Team_name: values.teamname ? values.teamname : "",
      Creator: creatorID ? creatorID : "",
      Team_Host: hostID ? hostID : "",
      Value: memberID ? memberID : "",
      Option: "Add",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};

export const deleteMember = async (Team_id, emp_id) => {
  return API()
    .post(apiUrl.eHRService.common.team, {
      Team_id: Team_id,
      Value: emp_id,
      Option: "Delete_Member",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};

export const addMember = async (Team_id, memberID) => {
  return API()
    .post(apiUrl.eHRService.common.team, {
      Team_id: Team_id ? Team_id : "",
      Value: memberID,
      Option: "Add_Member",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};

export const updateTeam = async (Team_id, Team_name, Team_Host) => {
  return API()
    .post(apiUrl.eHRService.common.team, {
      Team_id: Team_id ? Team_id : "",
      Team_name: Team_name ? Team_name : "",
      Team_Host: Team_Host ? Team_Host : "",
      Option: "Team_Update",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};

export const deleteTeam = async (teamID) => {
  return API()
    .post(apiUrl.eHRService.common.team, {
      Value: teamID ? teamID : "",
      Option: "Delete_Team",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("Server Error", "Server Error.");
      return { status: "fail" };
    });
};
