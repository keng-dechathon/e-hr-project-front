import * as Actions from "./actions";

export const initialState = {
  allCheckInformation: {},
  toDayCheckInformation: {},
  yearCheckInformation: {},
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
    default:
      return state;
  }
};
