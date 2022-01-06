import * as Actions from './actions'

export const initialState = {
    leaveTypeInformation: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_LEAVETYPE_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_LEAVETYPE_INFORMATION.SUCCESS:

            return {
                ...state,
                leaveTypeInformation: action.payload.data
            }
        case Actions.GET_LEAVETYPE_INFORMATION.FAILURE:
            return {
                ...state,
                leaveTypeInformation: {}
            }
        default:
            return state
    }
}
