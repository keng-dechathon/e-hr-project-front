import * as Actions from "./actions";

export const initialState = {
  locationInformation: {},
  chargeCodeInformation: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_LOCATION_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_LOCATION_INFORMATION.SUCCESS:
      return {
        ...state,
        locationInformation: action.payload.data,
      };
    case Actions.GET_LOCATION_INFORMATION.FAILURE:
      return {
        ...state,
        locationInformation: {},
      };
    case Actions.GET_CHARGECODE_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_CHARGECODE_INFORMATION.SUCCESS:
      return {
        ...state,
        chargeCodeInformation: action.payload.data,
      };
    case Actions.GET_CHARGECODE_INFORMATION.FAILURE:
      return {
        ...state,
        chargeCodeInformation: {},
      };
    default:
      return state;
  }
};
