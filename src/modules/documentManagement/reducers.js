import * as Actions from "./actions";

export const initialState = {
  allDocumentInformation: {},
  documentType: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ALLDOCUMENT_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_ALLDOCUMENT_INFORMATION.SUCCESS:
      return {
        ...state,
        allDocumentInformation: action.payload.data,
      };
    case Actions.GET_ALLDOCUMENT_INFORMATION.FAILURE:
      return {
        ...state,
        allDocumentInformation: {},
      };
    case Actions.GET_ALLDOCUMENT_TYPE.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_ALLDOCUMENT_TYPE.SUCCESS:
      return {
        ...state,
        documentType: action.payload.data,
      };
    case Actions.GET_ALLDOCUMENT_TYPE.FAILURE:
      return {
        ...state,
        documentType: {},
      };
    default:
      return state;
  }
};
