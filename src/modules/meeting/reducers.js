import * as Actions from "./actions";

export const initialState = {
  meetingRoomInformation: {},
  meetingInformationById: {},
  meetingInformationByMultiId: {},
  meetingInformationByRoomId: {},
  meetingInformationByCreator: {},
  addState: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_MEETINGROOM_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_MEETINGROOM_INFORMATION.SUCCESS:
      return {
        ...state,
        meetingRoomInformation: action.payload.data,
      };
    case Actions.GET_MEETINGROOM_INFORMATION.FAILURE:
      return {
        ...state,
        meetingRoomInformation: {},
      };
    case Actions.GET_MEETINGBYID_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_MEETINGBYID_INFORMATION.SUCCESS:
      return {
        ...state,
        meetingInformationById: action.payload.data,
      };
    case Actions.GET_MEETINGBYID_INFORMATION.FAILURE:
      return {
        ...state,
        meetingInformationById: {},
      };
    case Actions.GET_MEETINGBYMULTIID_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_MEETINGBYMULTIID_INFORMATION.SUCCESS:
      return {
        ...state,
        meetingInformationByMultiId: action.payload.data,
      };
    case Actions.GET_MEETINGBYMULTIID_INFORMATION.FAILURE:
      return {
        ...state,
        meetingInformationByMultiId: {},
      };
    case Actions.GET_MEETINGBYROOMID_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_MEETINGBYROOMID_INFORMATION.SUCCESS:
      return {
        ...state,
        meetingInformationByRoomId: action.payload.data,
      };
    case Actions.GET_MEETINGBYROOMID_INFORMATION.FAILURE:
      return {
        ...state,
        meetingInformationByRoomId: {},
      };
    case Actions.GET_MEETINGBYCREATOR_INFORMATION.REQUEST:
      return {
        ...state,
      };
    case Actions.GET_MEETINGBYCREATOR_INFORMATION.SUCCESS:
      return {
        ...state,
        meetingInformationByCreator: action.payload.data,
      };
    case Actions.GET_MEETINGBYCREATOR_INFORMATION.FAILURE:
      return {
        ...state,
        meetingInformationByCreator: {},
      };
    case "UPDATE_ADD_STATE":
      return {
        ...state,
        addState: {
          Emp_message: action.Emp_message,
          Emp: action.Emp,
          Room_message: action.Room_message,
          Status:action.Status,
        },
      };
    case "CLEAR_ADD_STATE":
      return {
        ...state,
        addState: {},
      };
    default:
      return state;
  }
};
