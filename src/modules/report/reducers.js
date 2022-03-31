import * as Actions from "./actions";

export const initialState = {
  allCheckInformation: {},
  toDayCheckInformation: {},
  yearCheckInformation: {},
  allLeaveInformation: {},
  allRestOfLeaveInformation:{},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ALLCHECK_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_ALLCHECK_INFORMATION.SUCCESS:
      return {
        ...state,
        allCheckInformation: action.payload.data,
      };
    case Actions.GET_ALLCHECK_INFORMATION.FAILURE:
      return {
        ...state,
        allCheckInformation: {},
      };
    case Actions.GET_TODAYCHECK_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_TODAYCHECK_INFORMATION.SUCCESS:
      return {
        ...state,
        toDayCheckInformation: action.payload.data,
      };
    case Actions.GET_TODAYCHECK_INFORMATION.FAILURE:
      return {
        ...state,
        toDayCheckInformation: {},
      };
    case Actions.GET_YEARCHECK_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_YEARCHECK_INFORMATION.SUCCESS:
      return {
        ...state,
        yearCheckInformation: action.payload.data,
      };
    case Actions.GET_YEARCHECK_INFORMATION.FAILURE:
      return {
        ...state,
        yearCheckInformation: {},
      };
    case Actions.GET_ALLLEAVE_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_ALLLEAVE_INFORMATION.SUCCESS:
      return {
        ...state,
        allLeaveInformation: action.payload.data,
      };
    case Actions.GET_ALLLEAVE_INFORMATION.FAILURE:
      return {
        ...state,
        allLeaveInformation: {},
      };
      case Actions.GET_ALLREST_INFORMATION.REQUEST:
        return {
          ...state,
        };
      case Actions.GET_ALLREST_INFORMATION.SUCCESS:
        return {
          ...state,
          allRestOfLeaveInformation: action.payload.data,
        };
      case Actions.GET_ALLREST_INFORMATION.FAILURE:
        return {
          ...state,
          allRestOfLeaveInformation: {},
        };
    default:
      return state;
  }
};
