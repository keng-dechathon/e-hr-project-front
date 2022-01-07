import * as Actions from './actions'

export const initialState = {
    holidaysInformation: {},
    workingTimeInformation: {},
    dayOffInformation: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_HOLIDAYS_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_HOLIDAYS_INFORMATION.SUCCESS:

            return {
                ...state,
                holidaysInformation: action.payload.data
            }
        case Actions.GET_HOLIDAYS_INFORMATION.FAILURE:
            return {
                ...state,
                holidaysInformation: {}
            }
        case Actions.GET_WORKINGTIME_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_WORKINGTIME_INFORMATION.SUCCESS:

            return {
                ...state,
                workingTimeInformation: action.payload.data
            }
        case Actions.GET_WORKINGTIME_INFORMATION.FAILURE:
            return {
                ...state,
                workingTimeInformation: {}
            }
        case Actions.GET_DAYOFF_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_DAYOFF_INFORMATION.SUCCESS:
            return {
                ...state,
                dayOffInformation: action.payload.data
            }
        case Actions.GET_DAYOFF_INFORMATION.FAILURE:
            return {
                ...state,
                dayOffInformation: {}
            }
        default:
            return state
    }
}


