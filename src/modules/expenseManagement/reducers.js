import * as Actions from "./actions";

export const initialState = {
  allExpenseInformation: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ALLEXPENSE_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_ALLEXPENSE_INFORMATION.SUCCESS:
      return {
        ...state,
        allExpenseInformation: action.payload.data,
      };
    case Actions.GET_ALLEXPENSE_INFORMATION.FAILURE:
      return {
        ...state,
        allExpenseInformation: {},
      }; 
    default:
      return state;
  }
};
