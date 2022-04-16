import * as Actions from "./actions";

export const initialState = {
  myDocumentInformation: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_MYDOCUMENT_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_MYDOCUMENT_INFORMATION.SUCCESS:
      return {
        ...state,
        myDocumentInformation: action.payload.data,
      };
    case Actions.GET_MYDOCUMENT_INFORMATION.FAILURE:
      return {
        ...state,
        myDocumentInformation: {},
      };
    default:
      return state;
  }
};
