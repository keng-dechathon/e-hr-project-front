import * as Actions from './actions'

export const initialState = {
    meetingRoomInformation: {},
    meetingInformationById: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_MEETINGROOM_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_MEETINGROOM_INFORMATION.SUCCESS:
            return {
                ...state,
                meetingRoomInformation: action.payload.data
            }
        case Actions.GET_MEETINGROOM_INFORMATION.FAILURE:
            return {
                ...state,
                meetingRoomInformation: {}
            }
        case Actions.GET_MEETINGBYID_INFORMATION.REQUEST:
            
            return {
                ...state
            }
        case Actions.GET_MEETINGBYID_INFORMATION.SUCCESS:
            return {
                ...state,
                meetingInformationById: action.payload.data
            }
        case Actions.GET_MEETINGBYID_INFORMATION.FAILURE:
            return {
                ...state,
                meetingInformationById: {}
            }
        default:
            return state
    }
}
