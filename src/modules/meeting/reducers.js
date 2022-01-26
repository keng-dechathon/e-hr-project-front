import * as Actions from './actions'

export const initialState = {
    meetingInformation: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_MEETING_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_MEETING_INFORMATION.SUCCESS:
            return {
                ...state,
                meetingInformation: action.payload.data
            }
        case Actions.GET_MEETING_INFORMATION.FAILURE:
            return {
                ...state,
                meetingInformation: {}
            }
        default:
            return state
    }
}
