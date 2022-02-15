import * as Actions from './actions'

export const initialState = {
    timesheetByDate: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_TIMESHEETBYDATE_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_TIMESHEETBYDATE_INFORMATION.SUCCESS:

            return {
                ...state,
                timesheetByDate: action.payload.data
            }
        case Actions.GET_TIMESHEETBYDATE_INFORMATION.FAILURE:
            return {
                ...state,
                timesheetByDate: {}
            }
        default:
            return state
    }
}
