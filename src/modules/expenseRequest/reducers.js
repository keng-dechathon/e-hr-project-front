import * as Actions from "./actions";

export const initialState = {
  myExpenseInformation: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_MYEXPENSE_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_MYEXPENSE_INFORMATION.SUCCESS:
      return {
        ...state,
        myExpenseInformation: action.payload.data,
      };
    case Actions.GET_MYEXPENSE_INFORMATION.FAILURE:
      return {
        ...state,
        myExpenseInformation: {},
      }; 
    default:
      return state;
  }
};
