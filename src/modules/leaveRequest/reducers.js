import * as Actions from "./actions";

export const initialState = {
  leaveInformation: {},
  leaveInformationByID: {},
  leaveRequestInformation: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_LEAVE_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_LEAVE_INFORMATION.SUCCESS:
      return {
        ...state,
        leaveInformation: action.payload.data,
      };
    case Actions.GET_LEAVE_INFORMATION.FAILURE:
      return {
        ...state,
        leaveInformation: {},
      };
    case Actions.GET_LEAVEBYID_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_LEAVEBYID_INFORMATION.SUCCESS:
      return {
        ...state,
        leaveInformationByID: action.payload.data,
      };
    case Actions.GET_LEAVEBYID_INFORMATION.FAILURE:
      return {
        ...state,
        leaveInformationByID: {},
      };
    case Actions.GET_LEAVEREQ_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_LEAVEREQ_INFORMATION.SUCCESS:
      return {
        ...state,
        leaveRequestInformation: action.payload.data,
      };
    case Actions.GET_LEAVEREQ_INFORMATION.FAILURE:
      return {
        ...state,
        leaveRequestInformation: {},
      };
    default:
      return state;
  }
};
