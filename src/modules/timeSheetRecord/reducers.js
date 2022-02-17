import * as Actions from "./actions";

export const initialState = {
  timesheetByDate: {},
  dateState: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_TIMESHEETBYDATE_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_TIMESHEETBYDATE_INFORMATION.SUCCESS:
      return {
        ...state,
        timesheetByDate: action.payload.data,
      };
    case Actions.GET_TIMESHEETBYDATE_INFORMATION.FAILURE:
      return {
        ...state,
        timesheetByDate: {},
      };
    case "UPDATE_DATE_STATE":
      return {
        ...state,
        dateState: {
          date: action.date,         
        },
      };
    case "CLEAR_DATE_STATE":
      return {
        ...state,
        dateState: {},
      };
    default:
      return state;
  }
};
