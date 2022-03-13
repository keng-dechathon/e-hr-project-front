import * as Actions from "./actions";

export const initialState = {
  leaveManagementInformation:{},
};

export default (state = initialState, action) => {
  switch (action.type) {  
      case Actions.GET_LEAVEMANAGE_INFORMATION.REQUEST:
        return {
          ...state,
        };
      case Actions.GET_LEAVEMANAGE_INFORMATION.SUCCESS:
        return {
          ...state,
          leaveManagementInformation: action.payload.data,
        };
      case Actions.GET_LEAVEMANAGE_INFORMATION.FAILURE:
        return {
          ...state,
          leaveManagementInformation: {},
        };
    default:
      return state;
  }
};
