import * as Actions from "./actions";

export const initialState = {
  teamByHostInformation: {},
  timeSheetInformationByID:{},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_TEAMBYHOST_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_TEAMBYHOST_INFORMATION.SUCCESS:
      return {
        ...state,
        teamByHostInformation: action.payload.data,
      };
    case Actions.GET_TEAMBYHOST_INFORMATION.FAILURE:
      return {
        ...state,
        teamByHostInformation: {},
      };
      case Actions.GET_TIMESHEETBYID_INFORMATION.REQUEST:
        return {    
          ...state,
        };
      case Actions.GET_TIMESHEETBYID_INFORMATION.SUCCESS:
        return {
          ...state,
          timeSheetInformationByID: action.payload.data,
        };
      case Actions.GET_TIMESHEETBYID_INFORMATION.FAILURE:
        return {
          ...state,
          timeSheetInformationByID: {},
        };
    default:
      return state;
  }
};
