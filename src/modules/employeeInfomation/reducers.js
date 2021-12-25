import * as Actions from './actions'

export const initialState = {
    empInformation: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_EMPINFO_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_EMPINFO_INFORMATION.SUCCESS:

            return {
                ...state,
                empInformation: action.payload.data
            }
        case Actions.GET_EMPINFO_INFORMATION.FAILURE:
            return {
                ...state,
                empInformation: {}
            }
        default:
            return state
    }
}
